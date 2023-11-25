import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { AuthOptions } from "../../auth/[...nextauth]/route";

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;

export async function GET(req, { params }) {
  try {
    const session = await getServerSession(AuthOptions);
    const { searchParams } = new URL(req.url);
    const param = searchParams.get("page");
    console.log(param);

    if (!session) {
      return NextResponse.json(
        { error: "Unauthenticated Request" },
        { status: 403 }
      );
    }
    const id = session?.user?.id;
    console.log(id);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "404 Not Found" }, { status: 404 });
    }

    const page = param;
    console.log("page = ", page);
    const postsPerPage = 5;
    const skip = postsPerPage * (page - 1);
    const allNotesCount = await prisma.note.count({
      where: {
        userNotes: {
          some: {
            userId: id,
          },
        },
      },
    });

    const hasMore = skip + postsPerPage < allNotesCount;

    const posts = await prisma.note.findMany({
      take: postsPerPage,
      skip: skip,
      where: {
        userNotes: {
          some: {
            userId: id,
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
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ results: posts, hasMore }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Somthing went wrong" }, { status: 500 });
  }
}
