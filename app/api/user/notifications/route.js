import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { AuthOptions } from "../../auth/[...nextauth]/route";

export async function GET(req) {
  const session = await getServerSession(AuthOptions);

  if (!session) {
    return NextResponse.json(
      { error: "Unauthenticated Request" },
      { status: 403 }
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const action = searchParams.get("action");
    console.log(action);

    const id = session?.user?.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "404 Not Found" }, { status: 404 });
    }

    const notifications = await prisma.Notifications.findFirst({
      where: {
        userId: session?.user?.id,
      },
      select: {
        notifications: true,
        id: true,
      },
    });
    // console.log(final);
    const seen = [];
    const unseen = [];

    if (notifications) {
      const final = notifications?.notifications;
      final?.map((n) => {
        if (n.seen === true) {
          seen.push(n);
        } else if (n.seen === false) {
          unseen.push(n);
        }
      });

      if (action === "get") {
        return NextResponse.json({ seen, unseen }, { status: 200 });
      } else if (action === "set") {
        const newArr = [];

        unseen.map((un) => {
          un.seen = true;
        });

        unseen.map((un) => {
          newArr.push(un);
        });

        seen.map((sn) => {
          newArr.push(sn);
        });

        const setNotifications = await prisma.Notifications.update({
          where: {
            id: notifications.id,
            userId: session?.user?.id,
          },
          data: {
            notifications: newArr,
          },
        });

        //   console.log(setNotifications)

        return NextResponse.json({ success: "Done!" }, { status: 200 });
      } else {
        return NextResponse.json(
          { error: "Something went wrong" },
          { status: 500 }
        );
      }
    } else {
      return NextResponse.json({ seen, unseen }, { status: 200 });
    }
    
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
