import { getServerSession } from "next-auth";
import { AuthOptions } from "../auth/[...nextauth]/route";
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
    const id = session?.user?.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "404 Not Found" }, { status: 404 });
    }
    const body = await req.json();
    const { title, content, images, files, desc, tags, type, price } = body;
    const newTitle = title.toLowerCase();
    const newTags = tags.map((item) => item.toLowerCase());
    const newNote = await prisma.note.create({
      data: {
        title: newTitle,
        desc,
        content,
        images,
        files,
        tags: newTags,
        type: "Free",
        price,
      },
    });

    const ok = await prisma.userNote.create({
      data: {
        userId: session?.user?.id,
        noteId: newNote.id,
      },
    });

    console.log(ok)

    return NextResponse.json(
      { post: "Note added successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Somthing went wrong" }, { status: 500 });
  }
}
