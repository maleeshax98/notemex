import { AuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
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

    let orders = await prisma.Orders.findMany({
      where: {
        userId: id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    orders = orders.map((o) => {
      return {
        ...o,
        type: "Expense",
      };
    });

    if (!orders) {
      return NextResponse.json(
        { error: "Something went wrong2" },
        { status: 500 }
      );
    }

    let incomes = await prisma.Orders.findMany({
      select: {
        id: true,
        amount: true,
        addedToWallet: true,
        createdAt: true,
        status: true,
        note: {
          select: {
            userNotes: {
              where: {
                userId: id,
              },
              select: {
                userId: true,
              },
            },
          },
        },
      },
    });

    incomes = incomes.map((i) => {
      return {
        ...i,
        type: "Income",
      };
    });

    let filteredIncomes = incomes.filter(
      (item) => item.note.userNotes.length > 0
    );

    let withdrawals = await prisma.Withdrawals.findMany({
      where: {
        userId: id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    withdrawals = withdrawals.map((w) => {
      return {
        ...w,
        type: "Withdrawal",
      };
    });

    if (!withdrawals) {
      return NextResponse.json(
        { error: "Something went wrong2" },
        { status: 500 }
      );
    }

    const allTransactions = [...orders, ...withdrawals];
    allTransactions.sort((a, b) => b.createdAt - a.createdAt);

    // console.log("allTransactions", allTransactions);

    const finalTransactions = [...allTransactions, ...filteredIncomes];
    finalTransactions.sort((a, b) => b.createdAt - a.createdAt);
    console.log("finalTransactions", finalTransactions);

    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Something went wrong2" },
        { status: 500 }
      );
    }

    const myMoney = user?.wallet;
    let fullIncome = 0;
    let fullWithdrawals = 0;
    let fullExpenses = 0;

    filteredIncomes.map((i) => {
      if (i.status === "DONE") {
        fullIncome = fullIncome + i?.amount;
      }
    });

    withdrawals.map((w) => {
      if (w.status === "APPROVED") {
        fullWithdrawals = fullWithdrawals + w?.amount;
      }
    });

    orders.map((o) => {
      if (o.status === "DONE") {
        fullExpenses = fullExpenses + o?.amount;
      }
    });

    return NextResponse.json(
      {
        data: finalTransactions,
        myMoney,
        fullIncome,
        fullWithdrawals,
        fullExpenses,
      },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Something went wrong2" },
      { status: 500 }
    );
  }
}
