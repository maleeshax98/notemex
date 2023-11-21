import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { AuthOptions } from "@/app/api/auth/[...nextauth]/route";

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
    const commentId = searchParams.get("cid");

    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      return NextResponse.json(
        { error: "Unauthenticated Request" },
        { status: 403 }
      );
    }

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
    const checkAvilability = await prisma.Comments.findFirst({
      where: {
        id: commentId,
        userId: userId,
        noteId: noteId,
      },
    });

    if (!checkAvilability) {
      return NextResponse.json(
        { error: "Unauthenticated Request" },
        { status: 403 }
      );
    }

    const delComment = await prisma.Comments.delete({
      where: {
        id: commentId,
      },
    });


    return NextResponse.json(
      { success: "Successfully Deleted" },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Somthing Went Wrong" },
      { status: 500 }
    );
  }
}
