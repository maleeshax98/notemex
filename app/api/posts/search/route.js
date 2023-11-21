import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { AuthOptions } from "../../auth/[...nextauth]/route";

export async function GET(req, { params }) {
  const session = await getServerSession(AuthOptions);
  if (!session) {
    return NextResponse.json(
      { error: "Unauthenticated Request1" },
      { status: 403 }
    );
  }

  try {
    const id = session?.user?.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "404 Not Found" }, { status: 404 });
    }
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");
    const param = searchParams.get("page");

    const page = param;
    console.log("page = ", page);
    const postsPerPage = 5;
    const skip = postsPerPage * (page - 1);
    const searchedWords = query.split(" ");

    // Call the combined function
    const { allNotesCount, hasMore, tagsNotes } = await combinedQuery(
      searchedWords,
      postsPerPage,
      skip
    );
    return NextResponse.json({ hasMore, notes: tagsNotes }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Something went wrong2" },
      { status: 500 }
    );
  }
}
const combinedQuery = async (searchedWords, postsPerPage, skip) => {
  const allNotesCount = await prisma.note.count({
    where: {
      OR: [
        {
          tags: {
            hasSome: searchedWords.map((tag) => tag.toLowerCase()),
          },
        },
        ...searchedWords.map((word) => ({
          title: {
            contains: word.toLowerCase(),
          },
        })),
      ],
      approved: "APPROVED",
    },
  });

  const tagsNotes = await prisma.note.findMany({
    where: {
      OR: [
        {
          tags: {
            hasSome: searchedWords,
          },
        },
        ...searchedWords.map((word) => ({
          title: {
            contains: word.toLowerCase(),
          },
        })),
      ],
      approved: "APPROVED",
    },
    take: postsPerPage,
    skip: skip,
    include: {
      userNotes: {
        include: {
          user: true,
        },
      },
    },
  });

  const hasMore = skip + postsPerPage < allNotesCount;

  // Return the results as an object
  return { allNotesCount, hasMore, tagsNotes };
};
