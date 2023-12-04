import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { AuthOptions } from "../../auth/[...nextauth]/route";
import mongoose from "mongoose";

export async function GET() {
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

    const withdrawals = await prisma.Withdrawals.findMany({
      //   where: {
      //     status: "PENDING",
      //     removedFromWallet: false,
      //   },
    });

    if (!withdrawals) {
      return NextResponse.json(
        { error: "Somthing went wrong " },
        { status: 500 }
      );
    }

    return NextResponse.json({ withdrawals: withdrawals }, { status: 200 });
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

    const { id: wId, action } = await req.json();

    if (action === "APPROVE") {
      const request = await prisma.Withdrawals.findUnique({
        where: {
          id: wId,
          status: "PENDING",
          removedFromWallet: false,
        },
      });

      if (!request) {
        return NextResponse.json(
          { error: "Somthing went wrong " },
          { status: 500 }
        );
      }

      const user = await prisma.user.findUnique({
        where: {
          id: request.userId,
        },
      });

      if (user.wallet - 50 < request.amount) {
        return NextResponse.json(
          { error: "Not valid amount!" },
          { status: 500 }
        );
      }

      const userUpdated = await prisma.user.update({
        where: {
          id: request.userId,
        },
        data: {
          wallet: user?.wallet - request?.amount,
        },
      });

      if (!userUpdated) {
        return NextResponse.json(
          { error: "Somthing went wrong" },
          { status: 500 }
        );
      }

      const updateReq = await prisma.withdrawals.update({
        where: {
          id: wId,
        },
        data: {
          status: "APPROVED",
          removedFromWallet: true,
        },
      });

      if (!updateReq) {
        return NextResponse.json(
          { error: "Somthing went wrong" },
          { status: 500 }
        );
      }

      console.log(updateReq);

      return NextResponse.json({ success: "Approved" }, { status: 200 });
    } else if (action === "REJECT") {
      const request = await prisma.Withdrawals.findUnique({
        where: {
          id: wId,
          status: "PENDING",
        },
      });

      if (!request) {
        return NextResponse.json(
          { error: "Somthing went wrong " },
          { status: 500 }
        );
      }

      const user = await prisma.user.findUnique({
        where: {
          id: request.userId,
        },
      });

      if (!user) {
        return NextResponse.json(
          { error: "Somthing went wrong " },
          { status: 500 }
        );
      }
      
      const updateReq = await prisma.Withdrawals.update({
        where: {
          id: wId,
        },
        data: {
          removedFromWallet: false,
          status: "REJECTED",
        },
      });

      if (!updateReq) {
        return NextResponse.json(
          { error: "Somthing went wrong " },
          { status: 500 }
        );
      }

      return NextResponse.json({ success: "Rejected" }, { status: 200 });
    } else if (action === "CHECK") {
      const request = await prisma.Withdrawals.findUnique({
        where: {
          id: wId,
          status: "PENDING",
          removedFromWallet: false,
        },
      });

      if (!request) {
        return NextResponse.json(
          { error: "Somthing went wrong " },
          { status: 500 }
        );
      }
      const user = await prisma.user.findUnique({
        where: {
          id: request.userId,
        },
      });

      if (user.wallet - 50 < request.amount) {
        return NextResponse.json(
          { error: "Not valid amount!" },
          { status: 500 }
        );
      } else {
        return NextResponse.json(
          { success: "Valid Request!" },
          { status: 200 }
        );
      }
    }

    return NextResponse.json(
      { error: "Somthing went wrong " },
      { status: 500 }
    );

    // return NextResponse.json({ withdrawals: withdrawals }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Somthing went wrong " },
      { status: 500 }
    );
  }
}
