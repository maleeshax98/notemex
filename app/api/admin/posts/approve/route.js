import { AuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PATCH(req) {
  // const session = await getServerSession(AuthOptions)

  try {
    const body = await req.json();
    const { noteId, title, name, image, userId, followerId, SECRET } = body;

    if (SECRET !== "8DhzlaSyc61wJqSzFiTFqw==") {
      return NextResponse.json(
        { error: "Something went wrong" },
        { status: 500 }
      );
    }

    
    const followers = await prisma.user.findUnique({
      where: { id: userId },
      select: { followers: true },
    });

    for (const fId of followers.followers) {
      const exists = await prisma.Notifications.findFirst({
        where: { userId: fId },
        select: { id: true, notifications: true },
      });

      const notificationData = {
        noteId,
        title,
        name,
        image,
        time: new Date(),
        seen: false,
        followerId,
      };

      if (exists) {
        exists.notifications =
          exists.notifications.length >= 10
            ? [notificationData]
            : [...exists.notifications, notificationData];

        await prisma.Notifications.update({
          where: { id: exists.id, userId: fId },
          data: { notifications: exists.notifications },
        });
      } else {
        await prisma.Notifications.create({
          data: { userId: fId, notifications: [notificationData] },
        });
      }
    }

    return NextResponse.json(
      { success: "Updated Successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
