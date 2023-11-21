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
      },
    });

    if (!note) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    // Check if the note is approved
    if (note.approved === "APPROVED") {
      // Check if the user has already liked the note
      const existingLike = await prisma.userNoteLike.findFirst({
        where: {
          userId: userId,
          noteId: noteId,
          liked: true,
        },
      });

      if (!existingLike) {
        // Assuming your model is named UserNoteLike
        const docId = await prisma.userNoteLike.findFirst({
          where: {
            userId: userId,
            noteId: noteId,
            liked: false,
          },
        });

        if (!docId) {
          const like = await prisma.userNoteLike.create({
            data: {
              userId: userId,
              noteId: noteId,
              liked: true,
            },
          });
        }

        if (docId) {
          const like = await prisma.userNoteLike.update({
            where: {
              id: docId.id,
              userId: userId,
              noteId: noteId,
            },
            data: {
              liked: true,
            },
          });
        }

        return NextResponse.json({ user: "user" }, { status: 200 });
      } else {
        return NextResponse.json(
          { error: "User has already liked the note" },
          { status: 400 }
        );
      }
    } else {
      return NextResponse.json(
        { error: "Note is not approved" },
        { status: 400 }
      );
    }
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

export async function GET(req, { params }) {
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
      },
    });

    if (!note) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    // Check if the note is approved
    const likes = await prisma.UserNoteLike.count({
      where: {
        noteId: noteId,
      },
    });
    console.log(likes);
    const liked = await prisma.UserNoteLike.findFirst({
      where: {
        userId: userId,
        noteId: noteId,
      },
    });
    if (liked) {
      if (likes) {
        return NextResponse.json({ likes, liked: true }, { status: 200 });
      }
    } else {
      return NextResponse.json({ likes: 0, liked: false }, { status: 200 });
    }
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
