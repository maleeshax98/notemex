import { NextResponse } from "next/server";
import mongoose from "mongoose";
export async function GET(req, { params }) {
  try {
    const { id } = params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "404 Not Found" },
        { status: 404 }
      );
    }
    const post = await prisma.note.findUnique({
      where: {
        id: id,
        approved: "APPROVED",
      },
      include: {
        userNotes: {
          include: {
            user: true,
          },
        },
      },
    });
    
    if (!post) {
      return NextResponse.json(
        { error: "404 Not Found" },
        { status: 404 }
      );
    }

    console.log(post)

    return NextResponse.json({ post: post }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Somthing went wrong" }, { status: 500 });
  }
}
