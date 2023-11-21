import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { AuthOptions } from "@/app/api/auth/[...nextauth]/route";

export async function PATCH(req, { params }) {
  const session = await getServerSession(AuthOptions);

  if (!session) {
    return NextResponse.json(
      { error: "Unauthenticated Request1" },
      { status: 403 }
    );
  }

  try {
    // const body = await req.json();
    const { id: noteId } = params;
    console.log(noteId);
    const userId = session?.user?.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ error: "404 Not Found" }, { status: 404 });
    }

    const userExists = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!mongoose.Types.ObjectId.isValid(noteId)) {
      return NextResponse.json({ error: "404 Not Found" }, { status: 404 });
    }

    if (!userExists) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const note = await prisma.note.findUnique({
      where: {
        id: noteId,
        approved: "APPROVED",
      },
    });

    if (!note) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    const alreadyLiked = await prisma.note.findUnique({
      where: {
        id: noteId,
        approved: "APPROVED",
      },
      select: {
        likes: true,
      },
    });
    console.log(alreadyLiked)
    const checkAlreadyLiked = alreadyLiked.likes.includes(userId);

    if (!checkAlreadyLiked) {
      return NextResponse.json({ error: "Not Alread Liked" }, { status: 200 });
    }

    let newArray = alreadyLiked.likes.filter(item => item !== userId);

    const disLike = await prisma.note.update({
      where: {
        id: noteId,
        approved: "APPROVED",
      },
      data: {
        likes: newArray
      },
    });

    return NextResponse.json({ user: "User" }, { status: 200 });

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Something went wrong2" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
