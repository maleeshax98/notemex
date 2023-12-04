import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { AuthOptions } from "../../auth/[...nextauth]/route";
import mongoose from "mongoose";

export async function GET(req) {
  try {
    const session = await getServerSession(AuthOptions);
    const id = session?.user?.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Unauthenticated Request" },
        { status: 403 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    const role = user?.role;

    if (role !== "ADMIN") {
      return NextResponse.json(
        { error: "Somthing went wrong " },
        { status: 500 }
      );
    }

    const pendingReFunds = await prisma.refund.findMany({
      where: {
        status: "PENDING",
      },
    });

    const doneReFunds = await prisma.refund.findMany({
      where: {
        status: "REFUNDED",
      },
    });

    const final = [...pendingReFunds, ...doneReFunds];

    return NextResponse.json(
      {
        data: final,
      },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Somthing went wrong " },
      { status: 500 }
    );
  }
}

export async function PATCH(req) {
  try {
    const session = await getServerSession(AuthOptions);
    const id = session?.user?.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Unauthenticated Request" },
        { status: 403 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    const role = user?.role;

    if (role !== "ADMIN") {
      return NextResponse.json(
        { error: "Somthing went wrong " },
        { status: 500 }
      );
    }

    const { refundId, action } = await req.json();

    const refundDoc = await prisma.refund.findUnique({
      where: {
        id: refundId,
      },
    });

    if (!refundDoc) {
      return NextResponse.json(
        { error: "Somthing went wrong " },
        { status: 500 }
      );
    }

    const orderDoc = await prisma.orders.findUnique({
      where: {
        id: refundDoc.orderId,
      },
      include: {
        note: {
          include: {
            userNotes: {
              select: {
                userId: true,
              },
            },
          },
        },
      },
    });

    if (!orderDoc) {
      return NextResponse.json(
        { error: "Somthing went wrong " },
        { status: 500 }
      );
    }

    const currentDate = new Date(orderDoc?.createdAt);
    const dateToCheck = new Date(refundDoc?.createdAt);
    const timeDifference = currentDate - dateToCheck;
    const minutesDifference = timeDifference / (1000 * 60);

    if (minutesDifference > 15) {
      return NextResponse.json(
        {
          error: "Refund requst is not valid. The order is older than 15 min. ",
        },
        { status: 500 }
      );
    }

    if (action === "APPROVE") {
      const noteOwner = await prisma.user.findUnique({
        where: {
          id: orderDoc.note.userNotes[0].userId,
        },
      });

      if (!noteOwner) {
        return NextResponse.json(
          { error: "Somthing went wrong " },
          { status: 500 }
        );
      }

      const updateNoteOwner = await prisma.user.update({
        where: {
          id: orderDoc.note.userNotes[0].userId,
        },
        data: {
          wallet: parseInt(noteOwner?.wallet) - parseInt(orderDoc.amount),
        },
      });

      if (!updateNoteOwner) {
        return NextResponse.json(
          { error: "Somthing went wrong " },
          { status: 500 }
        );
      }

      const updateOrder = await prisma.orders.update({
        where: {
          id: orderDoc.id,
        },
        data: {
          status: "REFUNDED",
          addedToWallet: false,
        },
      });

      if (!updateOrder) {
        return NextResponse.json(
          { error: "Somthing went wrong " },
          { status: 500 }
        );
      }

      const updateRefund = await prisma.refund.update({
        where: {
          id: refundId,
        },
        data: {
          status: "REFUNDED",
        },
      });

      if (!updateRefund) {
        return NextResponse.json(
          { error: "Somthing went wrong " },
          { status: 500 }
        );
      }

      return NextResponse.json({ success: "Approved" }, { status: 200 });
    } else if (action === "CHECK") {
      const orderDoc = await prisma.orders.findUnique({
        where: {
          id: refundDoc.orderId,
          status: "DONE",
        },
      });

      if (!orderDoc) {
        return NextResponse.json(
          { error: "Somthing went wrong " },
          { status: 500 }
        );
      }

      if (refundDoc.amount !== orderDoc.amount) {
        return NextResponse.json(
          { error: "Amount is not same" },
          { status: 500 }
        );
      }

      if (refundDoc.status !== "PENDING") {
        return NextResponse.json(
          { error: "Not in pending status" },
          { status: 500 }
        );
      }

      return NextResponse.json({ success: "Good to go" }, { status: 200 });
    } else if (action === "REJECT") {
      const updateRefund = await prisma.refund.update({
        where: {
          id: refundId,
        },
        data: {
          status: "REJECTED",
        },
      });

      if (!updateRefund) {
        return NextResponse.json(
          { error: "Somthing went wrong " },
          { status: 500 }
        );
      }
      return NextResponse.json({ success: "Rejected" }, { status: 200 });
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Somthing went wrong " },
      { status: 500 }
    );
  }
}
