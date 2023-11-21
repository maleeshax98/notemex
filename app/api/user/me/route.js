import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { AuthOptions } from "../../auth/[...nextauth]/route";

export async function GET(req, { params }) {
  const session = await getServerSession(AuthOptions);

  if (!session) {
    return NextResponse.json(
      { error: "Unauthenticated Request1" },
      { status: 403 }
    );
  }

  try {
    const id = session?.user?.id
    const { searchParams } = new URL(req.url);
    const param = searchParams.get("page");

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Unauthenticated Request2" },
        { status: 403 }
      );
    }

    const page = param;
    // console.log("page = ", page);
    const postsPerPage = 5;
    const skip = postsPerPage * (page - 1);

    const allUserNotes = await prisma.note.count({
      where: {
        userNotes: {
          every: {
            userId: id,
          },
        },
      },
    });
    // console.log("id", id)
    // console.log("allUserNotes", allUserNotes)

    const hasMore = skip + postsPerPage < allUserNotes;

    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User can't be found" },
        { status: 404 }
      );
    }

    const notes = await prisma.note.findMany({
      take: postsPerPage,
      skip: skip,
      orderBy: {
        createdAt: "desc",
      },
      where: {
        userNotes: {
          every: {
            userId: id,
            // note: {
            //   approved: "APPROVED",
            // },
          },
        },
      },
      include: {
        userNotes: {
          include: {
            user: true,
          },
        },
      },
    });

    // console.log(notes);

    // const notes = await prisma.note.findMany({

    // })

    // console.log(user);

    return NextResponse.json({ user: user, hasMore, notes, count: allUserNotes }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Something went wrong2" },
      { status: 500 }
    );
  }
}
