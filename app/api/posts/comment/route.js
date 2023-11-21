import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { AuthOptions } from "../../auth/[...nextauth]/route";
import { headers } from "next/headers";
import mongoose from "mongoose";
import CryptoJS from "crypto-js";

const secretKey = process.env.NEXT_PUBLIC_NOTEMEX_SECRET_NORMAL_KEY;

export async function POST(req) {
  const session = await getServerSession(AuthOptions);
  const headersList = headers();
  const secret_api_x_value = headersList.get("secret_api_x");
  
  if (!session) {
    return NextResponse.json(
      { error: "Unauthenticated Request" },
      { status: 403 }
    );
  }

  try {
    const bytes = CryptoJS.AES.decrypt(secret_api_x_value, secretKey);
    const secret_api_x = bytes.toString(CryptoJS.enc.Utf8);

    const body = await req.json();
    const { comment, noteId } = body;
    if (!mongoose.Types.ObjectId.isValid(noteId)) {
      return NextResponse.json(
        { error: "Unauthenticated Request" },
        { status: 403 }
      );
    }
    if (!mongoose.Types.ObjectId.isValid(session?.user?.id)) {
      return NextResponse.json(
        { error: "Unauthenticated Request" },
        { status: 403 }
      );
    }
    if (secret_api_x !== process.env.NEXT_PUBLIC_NOTEMEX_SECRET_NORMAL) {
      return NextResponse.json(
        { error: "Unauthenticated Request" },
        { status: 403 }
      );
    }

    const newComment = await prisma.comments.create({
      data: {
        comment,
        userId: session?.user?.id,
        noteId: noteId,
      },
    });

    console.log(newComment);

    return NextResponse.json({ comment: "Comment Added" }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Somthing went wrong" }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const param = searchParams.get("page");
    console.log(param);

    const noteId = searchParams.get("id");
    if (!mongoose.Types.ObjectId.isValid(noteId)) {
      return NextResponse.json(
        { error: "Unauthenticated Request" },
        { status: 403 }
      );
    }
    const headersList = headers();
    const secret_api_x_value = headersList.get("secret_api_x");
    const bytes = CryptoJS.AES.decrypt(secret_api_x_value, secretKey);
    const secret_api_x = bytes.toString(CryptoJS.enc.Utf8);

    if (secret_api_x !== process.env.NEXT_PUBLIC_NOTEMEX_SECRET_NORMAL) {
      return NextResponse.json(
        { error: "Unauthenticated Request" },
        { status: 403 }
      );
    }

    const page = param;
    const commentsPerPage = 5;
    const skip = commentsPerPage * (page - 1);
    const allCommentsCount = await prisma.comments.count({
      where: { noteId: noteId },
    });
    const hasMore = skip + commentsPerPage < allCommentsCount;

    const comments = await prisma.comments.findMany({
      where: {
        noteId: noteId,
      },
      take: commentsPerPage,
      skip: skip,
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // console.log(comments);

    return NextResponse.json({ comments, hasMore }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Somthing went wrong" }, { status: 500 });
  }
}
