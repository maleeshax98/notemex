import { getServerSession } from "next-auth";
import { AuthOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function DELETE(req) {
  try {
    const session = await getServerSession(AuthOptions);

    if (!session) {
      return NextResponse.json(
        { error: "Unauthenticated Request" },
        { status: 403 }
      );
    }

    const userId = session?.user?.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { error: "Unauthenticated Request" },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(req.url);
    const noteId = searchParams.get("id");

    if (!mongoose.Types.ObjectId.isValid(noteId)) {
      return NextResponse.json(
        { error: "Unauthenticated Request" },
        { status: 403 }
      );
    }

    const userExists = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!userExists) {
      return NextResponse.json(
        { error: "Unauthenticated Request" },
        { status: 403 }
      );
    }

    const noteExists = await prisma.note.findUnique({
      where: {
        id: noteId,
      },
    });

    if (!noteExists) {
      return NextResponse.json(
        { error: "Unauthenticated Request" },
        { status: 403 }
      );
    }

    const checkOwnerShip = await prisma.UserNote.findFirst({
      where: {
        userId: userId,
        noteId: noteId,
      },
    });

    if (!checkOwnerShip) {
      return NextResponse.json(
        { error: "Unauthenticated Request" },
        { status: 403 }
      );
    }

    // const deleteUserNote = await prisma.UserNote.delete({
    //   where: {
    //     id: noteId,
    //     userId: userId,
    //   },
    // });

    // const deleteNote = await prisma.note.delete({
    //   where: {
    //     id: noteId,
    //   },
    // });

    // const delteUserNoteLike = await prisma.UserNoteLike.deleteMany({
    //   where: {
    //     id: noteId,
    //     userId: userId,
    //   },
    // });

    // const deleteComments = await prisma.Comments.deleteMany({
    //   where: {
    //     id: noteId,
    //     userId: userId,
    //   },
    // });

    await prisma.$transaction([
      // Delete related comments
      prisma.Comments.deleteMany({
        where: {
          noteId: noteId,
          userId: userId,
        },
      }),
      // Delete related user notes
      prisma.userNote.deleteMany({
        where: {
          noteId: noteId,
          userId: userId,
        },
      }),
      // Delete related user note likes
      prisma.UserNoteLike.deleteMany({
        where: {
          noteId: noteId,
          userId: userId,
        },
      }),
      // Delete the note itself
      prisma.note.delete({
        where: {
          id: noteId,
        },
      }),
    ]);

    return NextResponse.json(
      { success: "Successfully Deleted" },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Somthing Went Wrong" }, { status: 500 });
  }
}
