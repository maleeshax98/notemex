import md5 from "md5";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { AuthOptions } from "../../auth/[...nextauth]/route";

export async function POST(req) {
  try {
    // const session = await getServerSession(AuthOptions);
    // if (!session) {
    //   return NextResponse.json({ success: false }, { status: 500 });
    // }

    const data = await req.formData();

    const order_id = data.get("order_id");
    const payhere_amount = data.get("payhere_amount");
    const payhere_currency = data.get("payhere_currency");
    const status_code = data.get("status_code");
    const md5sig = data.get("md5sig");
    const merchant_id = data.get("merchant_id");

    const mSec = process.env.MS; // Merchernt Secret use .env

    const hashText =
      merchant_id +
      order_id +
      payhere_amount +
      payhere_currency +
      status_code +
      md5(mSec).toLocaleUpperCase();

    const local_md5sig = md5(hashText).toLocaleUpperCase();

    // local_md5sig === md5sig && status_code === 2

    if (local_md5sig === md5sig && status_code === "2") {
      // console.log("test success");
      const checkOrder = await prisma.Orders.findUnique({
        where: {
          id: order_id,
          status: "PENDING",
          addedToWallet: false,
        },
      });

      // console.log("checkOrder", checkOrder);

      if (!checkOrder) {
        return NextResponse.json({ success: false }, { status: 500 });
      }

      const noteOwner = await prisma.Orders.findUnique({
        where: {
          id: order_id,
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

      // console.log("note id -", noteOwner);

      // console.log(noteOwnerId.note.userNotes[0].userId)

      if (!noteOwner) {
        return NextResponse.json({ success: false }, { status: 500 });
      }

      const noteOwnerId = noteOwner.note.userNotes[0].userId;

      const user = await prisma.User.findUnique({
        where: {
          id: noteOwnerId,
        },
      });

      if (!user) {
        return NextResponse.json({ success: false }, { status: 500 });
      }

      // console.log(user.wallet + payhere_amount)

      const update = await prisma.User.update({
        where: {
          id: noteOwnerId,
        },
        data: {
          wallet: user.wallet + parseInt(payhere_amount),
        },
      });

      // console.log("updateUser", update);

      if (!update) {
        return NextResponse.json({ success: false }, { status: 500 });
      }

      const order = await prisma.Orders.update({
        where: {
          id: order_id,
        },
        data: {
          status: "DONE",
          addedToWallet: true,
        },
      });

      // console.log("updatorder", order);

      if (!order) {
        return NextResponse.json({ success: false }, { status: 500 });
      }

      const saveNote = await prisma.Saved.create({
        data: {
          userId: checkOrder.userId,
          noteId: order.noteId,
        },
      });

      if (!saveNote) {
        return NextResponse.json({ success: false }, { status: 500 });
      }

      return NextResponse.json({ success: true }, { status: 200 });
    } else {
      console.log("test faild");

      return NextResponse.json({ success: false }, { status: 500 });
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Somthing went wrong" }, { status: 500 });
  }
}

// export async function GET() {
//   console.log("Wucanna dala");
//   return NextResponse.json({ error: "Somthing went wrong" }, { status: 500 });
// }
