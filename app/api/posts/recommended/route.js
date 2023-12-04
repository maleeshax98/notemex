import { NextResponse } from "next/server";
import { AuthOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
const { ObjectId } = require("mongodb");

function shuffleArray(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

function combineArraysWithoutDuplicates(arr1, arr2, uniqueKey) {
  const uniqueKeysSet = new Set(arr1.map((obj) => obj[uniqueKey]));
  for (const obj of arr2) {
    if (!uniqueKeysSet.has(obj[uniqueKey])) {
      arr1.push(obj);
      uniqueKeysSet.add(obj[uniqueKey]);
    }
  }

  return arr1;
}
export async function GET(req) {
  const session = await getServerSession(AuthOptions);

  if (!session) {
    // return NextResponse.json(
    //   { error: "Unauthenticated Request" },
    //   { status: 403 }
    // );
    try {
      const { searchParams } = new URL(req.url);
      const param = searchParams.get("page");
      const page = param;
      const postsPerPage = 5;
      const skip = postsPerPage * (page - 1);

      const allNotesCount = await prisma.note.count({
        where: { approved: "APPROVED" },
      });
      const hasMore = skip + postsPerPage < allNotesCount;

      const allNotes = await prisma.note.findMany({
        take: postsPerPage,
        skip: skip,
        where: {
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

      const finalNotes = shuffleArray(allNotes);

      return NextResponse.json(
        { results: finalNotes, hasMore },
        { status: 200 }
      );
    } catch (err) {
      console.error(err);
      return NextResponse.json(
        { error: "Something went wrong" },
        { status: 500 }
      );
    }
  } else {
    try {
      const { searchParams } = new URL(req.url);
      const param = searchParams.get("page");
      console.log(param);

      const id = session?.user?.id;

      const user = await prisma.user.findUnique({
        where: { id },
        select: {
          searches: true,
          tags: true,
        },
      });

      if (!user) {
        return NextResponse.json(
          { error: "Something went wrong" },
          { status: 500 }
        );
      }

      const searchedWords = user.searches;
      const userTags = user.tags;

      const page = param;
      console.log("page = ", page);
      const postsPerPage = 5;
      const skip = postsPerPage * (page - 1);

      const allNotesCount = await prisma.note.count({
        where: { approved: "APPROVED" },
      });
      const hasMore = skip + postsPerPage < allNotesCount;

      const tagsNotes = await prisma.note.findMany({
        where: {
          tags: {
            hasSome: userTags,
          },
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

      const matchingNotes = await prisma.note.findMany({
        where: {
          OR: searchedWords.map((word) => ({
            title: {
              contains: word,
            },
          })),
        },
        include: {
          userNotes: {
            include: {
              user: true,
            },
          },
        },
      });

      const filteredNotes = combineArraysWithoutDuplicates(
        matchingNotes,
        tagsNotes,
        "id"
      );

      const allNotes = await prisma.note.findMany({
        take: postsPerPage,
        skip: skip,
        where: {
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

      const toCombineFilters = shuffleArray(filteredNotes);

      const toCombineAll = shuffleArray(allNotes);

      const finalNotes = combineArraysWithoutDuplicates(
        toCombineFilters,
        toCombineAll,
        "id"
      );

      return NextResponse.json(
        { results: finalNotes, hasMore },
        { status: 200 }
      );
    } catch (err) {
      console.error(err);
      return NextResponse.json(
        { error: "Something went wrong" },
        { status: 500 }
      );
    }
  }
}
