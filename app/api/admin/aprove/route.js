// app/api/admin/approve/route.js
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// If you use next-auth, uncomment and configure the lines below.
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/lib/auth"; // where you configure NextAuth

export async function POST(req) {
  try {
    const body = await req.json();
    const { noteId } = body;
    if (!noteId) return NextResponse.json({ message: "noteId is required" }, { status: 400 });

    // ====== AUTH CHECK (adjust for your auth setup) ======
    // Example using next-auth:
    // const session = await getServerSession(authOptions);
    // if (!session) return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    // const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    // if (!user || user.role !== "ADMIN") return NextResponse.json({ message: "Forbidden" }, { status: 403 });

    // If you don't use next-auth, add your own admin check here.
    // For quick local testing you can use an ADMIN token header, but DO NOT use that in production.
    // Example:
    // const adminSecret = process.env.ADMIN_SECRET;
    // if (req.headers.get("x-admin-secret") !== adminSecret) return NextResponse.json({ message: "Forbidden" }, { status: 403 });

    // ====== Update note ======
    const updated = await prisma.note.update({
      where: { id: noteId },
      data: { approved: "APPROVED", updatedAt: new Date() },
    });

    // Optionally: create a notification for the user, etc.

    return NextResponse.json({ message: "Approved", note: { id: updated.id, approved: updated.approved } }, { status: 200 });
  } catch (err) {
    console.error("approve error", err);
    return NextResponse.json({ message: "Server error", error: String(err) }, { status: 500 });
  }
}
