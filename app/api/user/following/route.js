import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { AuthOptions } from "../../auth/[...nextauth]/route";

export async function GET(req) {
  const session = await getServerSession(AuthOptions);
  if (!session) {
    return NextResponse.json(
      { error: "Unauthenticated Request1" },
      { status: 403 }
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const param = searchParams.get("page");
    const page = param;
    const postsPerPage = 10;
    const skip = postsPerPage * (page - 1);

    const userId = session?.user?.id;

    const ids = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        following: true,
      },
    });

    const allFollowersCount = await prisma.user.count({
      where: {
        id: {
          in: ids.following,
        },
      },
    });

    const hasMore = skip + postsPerPage < allFollowersCount;

    const followers = await prisma.user.findMany({
      where: {
        id: {
          in: ids.following,
        },
      },

      select: {
        name: true,
        image: true,
        id: true,
        followers: true,
      },

      take: postsPerPage,
      skip: skip,
      orderBy: {
        createdAt: "desc",
      },
    });

    console.log(followers)

    return NextResponse.json({ followers, hasMore }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Something went wrong2" },
      { status: 500 }
    );
  }
}
