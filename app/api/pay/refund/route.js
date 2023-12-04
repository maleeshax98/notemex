import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { AuthOptions } from "../../auth/[...nextauth]/route";
import mongoose from "mongoose";

export async function POST(req) {
  try {
    const session = await getServerSession(AuthOptions);
    const id = session?.user?.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Unauthenticated Request" },
        { status: 403 }
      );
    }

    const { orderId, aName, aNumber, bName, email, pNumber } = await req.json();

    if (
      !aName.trim() ||
      !aNumber.trim() ||
      !bName.trim() ||
      !email.trim() ||
      !pNumber.trim()
    ) {
      return NextResponse.json(
        { error: "Please fill every field." },
        { status: 500 }
      );
    }

    const order = await prisma.orders.findUnique({
      where: {
        id: orderId,
        status: "DONE",
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


    if (!order) {
      return NextResponse.json(
        { error: "Somthing went wrong" },
        { status: 500 }
      );
    }

    const dateToCheck = new Date(order?.createdAt);
    const currentDate = new Date();
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

    if (id !== order.userId) {
      return NextResponse.json(
        { error: "Unauthenticated request" },
        { status: 403 }
      );
    }

    const refund = await prisma.refund.create({
      data: {
        amount: order?.amount,
        noteId: order?.noteId,
        userId: id,
        acountName: aName,
        acountNumber: aNumber,
        bankName: bName,
        email: email,
        phoneNum: pNumber,
        orderId: order.id
      },
    });

    if (!refund) {
      return NextResponse.json(
        { error: "Somthing went wrong " },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: "Waiting for review." },
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
