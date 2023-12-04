import { getServerSession } from "next-auth";
import { AuthOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(req) {
  const session = await getServerSession(AuthOptions);

  if (!session) {
    return NextResponse.json(
      { error: "Unauthenticated Request" },
      { status: 403 }
    );
  }

  try {
    const { id: noteId } = await req.json();

    const id = session?.user?.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "404 Not Found" }, { status: 404 });
    }

    const note = await prisma.note.findUnique({
      where: {
        id: noteId,
      },
    });

    if (note.approved !== "APPROVED") {
      return NextResponse.json(
        { error: "Unauthenticated Request" },
        { status: 403 }
      );
    }

    const alreadySaved = await prisma.saved.findFirst({
      where: {
        userId: id,
        noteId: noteId,
      },
    });

    if (alreadySaved) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const saved = await prisma.Saved.create({
      data: {
        userId: id,
        noteId: noteId,
      },
    });

    if (!saved) {
      return NextResponse.json(
        { error: "Unauthenticated Request" },
        { status: 403 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

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
    const param = searchParams.get("page");
    console.log(param);

    const id = session?.user?.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "404 Not Found" }, { status: 404 });
    }

    const page = param;
    console.log("page = ", page);
    const postsPerPage = 5;
    const skip = postsPerPage * (page - 1);

    const allNotesCount = await prisma.Saved.count({ where: { userId: id } });

    const hasMore = skip + postsPerPage < allNotesCount;

    const saved = await prisma.Saved.findMany({
      where: {
        userId: id,
      },
      include: {
        note: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const results = [];

    saved.map((doc) => {
      results.push(doc.note);
    });

    console.log(results);

    return NextResponse.json({ results: results, hasMore }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
