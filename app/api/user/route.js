import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { AuthOptions } from "../auth/[...nextauth]/route";

export async function PATCH(req, { params }) {
  const session = await getServerSession(AuthOptions);

  if (!session) {
    return NextResponse.json(
      { error: "Unauthenticated Request1" },
      { status: 403 }
    );
  }
  try {
    const body = await req.json();
    const { name, bio, image, coverImage } = body;

    const id = session?.user?.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "404 Not Found" }, { status: 404 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { id: id },
    });

    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Update user fields
    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: {
        name: name || existingUser.name,
        bio: bio || existingUser.bio,
        image: image || existingUser.image,
        coverImage: coverImage || existingUser.coverImage,
      },
    });

    return NextResponse.json({ user: "user" }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Something went wrong2" },
      { status: 500 }
    );
  }
}
