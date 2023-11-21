import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { AuthOptions } from "../../auth/[...nextauth]/route";

export async function PATCH(req) {
  const session = await getServerSession(AuthOptions);

  if (!session) {
    return NextResponse.json(
      { error: "Unauthenticated Request" },
      { status: 403 }
    );
  }

  try {
    const id = session?.user?.id;
    const body = await req.json();
    const { searches, tags } = body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "404 Not Found" }, { status: 404 });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        searches: true,
        tags: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "404 Not Found" }, { status: 404 });
    }

    const userSearches = user?.searches;
    const userTags = user?.tags;

    if (searches && searches.trim()) {
      if (!userSearches.includes(searches)) {
        if (JSON.stringify(userSearches) !== JSON.stringify(searches)) {
          const newUser = await prisma.user.update({
            where: {
              id: id,
            },
            data: {
              searches: [...userSearches, searches],
            },
          });
        }
      }
    }

    if (tags && tags.length > 0) {
      let newTags = tags.map(function (element) {
        return element.toLowerCase();
      });
      if (JSON.stringify(userTags) !== JSON.stringify(tags)) {
        const newUser = await prisma.user.update({
          where: {
            id: id,
          },
          data: {
            tags: newTags,
          },
        });
      }
    }

    return NextResponse.json({ success: "Done!" }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
