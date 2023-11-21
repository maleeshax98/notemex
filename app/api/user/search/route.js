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
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");
    const param = searchParams.get("page");

    const page = param;
    console.log("page = ", page);
    const postsPerPage = 5;
    const skip = postsPerPage * (page - 1);
    const searchedWords = query.split(" ");
    console.log(searchedWords);
    
    const allUsersCount = await prisma.user.count({
        where: {
          OR: [
            ...searchedWords.map((word) => ({
              name: {
                contains: word,
                mode: 'insensitive'
              },
            })),
          ],
        },
        
      });

    const hasMore = skip + postsPerPage < allUsersCount;


    const users = await prisma.user.findMany({
      where: {
        OR: [
          ...searchedWords.map((word) => ({
            name: {
              contains: word,
              mode: 'insensitive'
            },
          })),
        ],
      },
      select: {
        name: true,
        image: true,
        id: true
      }
    });

    return NextResponse.json({ users, hasMore }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Something went wrong2" },
      { status: 500 }
    );
  }
}
