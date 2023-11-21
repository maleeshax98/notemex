import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  const { searchParams } = new URL(req.url);
  console.log(searchParams)
  const followerid = searchParams.get("followerId");
  const followingid = searchParams.get("followingId");
console.log(followerid)
  try {
    const follow = await prisma.UserRelation.create({
        data: {
          followerId: followerid,
          followingId: followingid,
        },
      })
      console.log(follow)
      return NextResponse.json(
        { success: "done" },
        { status: 200 }
      );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Something went wrong2" },
      { status: 500 }
    );
  }
}

export async function GET(req, { params }) {
    const follow = await prisma.user.findMany({
        
        include: {
            followers: {
                include: {
                    follower: true,
                    following: true
                }
            },
            followingRelations: {
                include: {
                    follower: true,
                    following: true
                }
            }
        }
    })
      return NextResponse.json(
        { success: follow },
        { status: 200 }
      );
}