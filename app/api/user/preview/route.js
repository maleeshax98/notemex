import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await prisma.User.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        name: true,
        image: true
      }
    });

    return NextResponse.json({ users: users }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Somthing Went Wrong " },
      { status: 500 }
    );
  }
}
