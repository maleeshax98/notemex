import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { AuthOptions } from "../../auth/[...nextauth]/route";

export async function POST(req) {
  try {
    const session = await getServerSession(AuthOptions);
    if (!session) {
      return NextResponse.json(
        { error: "Unauthenticated Request1" },
        { status: 403 }
      );
    }
    const id = session?.user?.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "404 Not Found" }, { status: 404 });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Something went wrong" },
        { status: 500 }
      );
    }

    const walletAmount = user?.wallet;

    const { amount, aName, aNumber, bName, email, pNumber } = await req.json();
    console.log(amount, walletAmount - 50)
    if (amount > walletAmount - 50) {
      return NextResponse.json(
        { error: "Please enter a valid amount" },
        { status: 500 }
      );
    }

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

    const reachedMax = await prisma.Withdrawals.count({
      where: {
        status: "PENDING",
        userId: id,
        removedFromWallet: false,
      },
    });
    console.log(reachedMax)
    if(reachedMax > 0){
      return NextResponse.json(
        { error: "A withdrawal request is on pending!" },
        { status: 500 }
      );
    }

    const withdraw = await prisma.Withdrawals.create({
      data: {
        amount: parseInt(amount),
        removedFromWallet: false,
        acountName: aName,
        acountNumber: aNumber,
        bankName: bName,
        email: email,
        phoneNum: pNumber,
        userId: id,
        status: "PENDING",
      },
    });

    if (!withdraw) {
      return NextResponse.json(
        { error: "Somthing went wrong" },
        { status: 500 }
      );
    }

    console.log(withdraw);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Something went wrong2" },
      { status: 500 }
    );
  }
}
