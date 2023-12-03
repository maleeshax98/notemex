import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { AuthOptions } from "../../auth/[...nextauth]/route";
export async function GET(req, { params }) {
  try {
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "404 Not Found" }, { status: 404 });
    }

    const getPost = await prisma.note.findUnique({
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

    // console.log(getPost);

    if (!getPost) {
      return NextResponse.json({ error: "404 Not Found" }, { status: 404 });
    }

    if (getPost.type === "Pro") {
      const session = await getServerSession(AuthOptions);

      if (!session) {
        return NextResponse.json(
          { error: "Unauthorized Request" },
          { status: 500 }
        );
      }
      
      if (session?.user?.id === getPost.userNotes[0]?.user?.id) {
        return NextResponse.json({ post: getPost }, { status: 200 });
      } else {
        const checkOrder = await prisma.Orders.findFirst({
          where: {
            noteId: id,
            userId: session?.user?.id,
            status: "DONE",
          },
        });

        if (!checkOrder) {
          const note = {
            ...getPost,
            content: "",
            images: [],
            files: [],
            have: false,
          };

          console.log(note);
          return NextResponse.json({ post: note }, { status: 200 });
        } else if (checkOrder) {
          const note = {
            ...getPost,
            have: true,
          };
          return NextResponse.json({ post: note }, { status: 200 });
        } else {
          return NextResponse.json(
            { error: "Somthing went wrong" },
            { status: 500 }
          );
        }
      }
    }

    return NextResponse.json({ post: getPost }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Somthing went wrong" }, { status: 500 });
  }
}
