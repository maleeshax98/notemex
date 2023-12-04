import md5 from "md5";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { AuthOptions } from "../../auth/[...nextauth]/route";
export async function POST(req) {
  try {
    const session = await getServerSession(AuthOptions);

    if (!session) {
      return NextResponse.json({ success: false }, { status: 500 });
    }

    const { merchant_id, payhere_currency, note_id } = await req.json();

    const mSec = process.env.MS; // Merchernt Secret use .env

    const note = await prisma.Note.findUnique({
      where: {
        id: note_id,
      },
      include: {
        userNotes: {
          select: {
            userId: true,
          },
        }
      }
    });

    if (note?.userNotes[0].userId === session?.user?.id) {
      return NextResponse.json({ error: "You can't but your own note!" }, { status: 500 });
    }

    let order = null;

    const orderExists = await prisma.Orders.findFirst({
      where: {
        status: "PENDING",
        amount: note.price,
        addedToWallet: false,
        noteId: note.id,
        userId: session?.user?.id,
      },
    });

    if (orderExists) {
      order = orderExists;
    } else {
      const newOrder = await prisma.Orders.create({
        data: {
          status: "PENDING",
          amount: note.price,
          addedToWallet: false,
          noteId: note.id,
          userId: session?.user?.id,
        },
      });
      order = newOrder;
    }

    if (note.approved !== "APPROVED") {
      return NextResponse.json(
        { error: "Unauthorized Payment1" },
        { status: 500 }
      );
    }

    if (note.type !== "Pro") {
      return NextResponse.json(
        { error: "Unauthorized Payment2" },
        { status: 500 }
      );
    }

    if (note.price <= 0) {
      return NextResponse.json(
        { error: "Unauthorized Payment3" },
        { status: 500 }
      );
    }

    // console.log(order);

    if (!order) {
      return NextResponse.json(
        { error: "Unauthorized Payment4" },
        { status: 500 }
      );
    }

    const hashText =
      merchant_id +
      order.id +
      note.price.toFixed(2) +
      payhere_currency +
      md5(mSec).toLocaleUpperCase();

    const hash = md5(hashText).toLocaleUpperCase();

    return NextResponse.json(
      {
        hash,
        payhere_amount: note.price,
        order_id: order.id,
        title: note.title,
      },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Somthing went wrong" }, { status: 500 });
  }
}
