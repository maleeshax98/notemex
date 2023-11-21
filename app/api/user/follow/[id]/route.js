import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { AuthOptions } from "../../../auth/[...nextauth]/route";

export async function PATCH(req, { params }) {
  try {
    const session = await getServerSession(AuthOptions);

    if (!session) {
      return NextResponse.json(
        { error: "Unauthenticated Request" },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(req.url);
    const actionType = searchParams.get("t");

    const requesterUserId = session?.user?.id;
    const targetUserId = params.id;

    if (requesterUserId === targetUserId) {
      return NextResponse.json({ error: "Asada?" }, { status: 500 });
    }

    if (
      !mongoose.Types.ObjectId.isValid(requesterUserId) ||
      !mongoose.Types.ObjectId.isValid(targetUserId)
    ) {
      return NextResponse.json({ error: "404 Not Found" }, { status: 404 });
    }

    const requesterUser = await getUserById(requesterUserId);
    const targetUser = await getUserById(targetUserId);

    if (!requesterUser || !targetUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (actionType === "follow") {
      await follow(requesterUserId, targetUserId);
      return NextResponse.json({ success: true }, { status: 200 });
    }

    if (actionType === "unFollow") {
      await unFollow(requesterUserId, targetUserId);
      return NextResponse.json({ success: true }, { status: 200 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

async function getUserById(userId) {
  return await prisma.user.findUnique({
    where: { id: userId },
  });
}

async function follow(requesterUserId, targetUserId) {
  const session = await getServerSession(AuthOptions);

  const requesterFollowing = await prisma.user.findUnique({
    where: {
      id: requesterUserId,
    },
    select: {
      following: true,
    },
  });

  const isAlreadyFollowing =
    requesterFollowing.following.includes(targetUserId);

  const targetUserFollowers = await prisma.user.findUnique({
    where: {
      id: targetUserId,
    },
    select: {
      followers: true,
    },
  });

  const isAlreadyFollower =
    targetUserFollowers.followers.includes(requesterUserId);

  if (!isAlreadyFollowing && !isAlreadyFollower) {
    const updateRequesterUser = await prisma.user.update({
      where: {
        id: requesterUserId,
      },
      data: {
        following: { push: targetUserId },
      },
    });

    const updateTargetUser = await prisma.user.update({
      where: {
        id: targetUserId,
      },
      data: {
        followers: { push: requesterUserId },
      },
    });

    const exists = await prisma.Notifications.findFirst({
      where: { userId: targetUserId },
      select: { id: true, notifications: true },
    });

    const notificationData = {
      noteId: null,
      title: `${session?.user?.name} is a new follower`,
      name: session?.user?.name,
      image: session?.user?.image,
      time: new Date(),
      seen: false,
      followerId: requesterUserId,
    };

    if (exists) {
      exists.notifications =
        exists.notifications.length >= 10
          ? [notificationData]
          : [...exists.notifications, notificationData];

      await prisma.Notifications.update({
        where: { id: exists.id, userId: targetUserId },
        data: { notifications: exists.notifications },
      });
    } else {
      await prisma.Notifications.create({
        data: { userId: targetUserId, notifications: [notificationData] },
      });
    }

    // console.log(updateRequesterUser);
    // console.log(updateTargetUser);
  } else {
    throw new Error("Already Followed");
  }
}

async function unFollow(requesterUserId, targetUserId) {
  const requesterFollowing = await prisma.user.findUnique({
    where: {
      id: requesterUserId,
    },
    select: {
      following: true,
    },
  });

  const isAlreadyFollowing =
    requesterFollowing.following.includes(targetUserId);

  const targetUserFollowers = await prisma.user.findUnique({
    where: {
      id: targetUserId,
    },
    select: {
      followers: true,
    },
  });

  const isAlreadyFollower =
    targetUserFollowers.followers.includes(requesterUserId);

  if (isAlreadyFollowing && isAlreadyFollower) {
    requesterFollowing.following = requesterFollowing.following.filter(
      (item) => item !== targetUserId
    );
    targetUserFollowers.followers = targetUserFollowers.followers.filter(
      (item) => item !== requesterUserId
    );

    const updateRequesterUser = await prisma.user.update({
      where: {
        id: requesterUserId,
      },
      data: {
        following: requesterFollowing.following,
      },
    });

    const updateTargetUser = await prisma.user.update({
      where: {
        id: targetUserId,
      },
      data: {
        followers: targetUserFollowers.followers,
      },
    });

    // console.log(updateRequesterUser);
    // console.log(updateTargetUser);
  } else {
    throw new Error("Not already followed");
  }
}
