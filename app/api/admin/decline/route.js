// app/api/admin/decline/route.js
import { NextResponse } from "next/server";
import prisma from "@/libs/db";

// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/lib/auth";

export async function POST(req) {
  try {
    const body = await req.json();
    const { noteId } = body;
    if (!noteId) return NextResponse.json({ message: "noteId is required" }, { status: 400 });

    // ====== AUTH CHECK (same as in approve route) ======
    // See approve/route.js comments.

    // Option A: delete the note
    // await prisma.note.delete({ where: { id: noteId } });

    // Option B (recommended): mark as declined by setting Approved to a new enum value
    // Your schema only has APPROVED and PENDING, so to "decline" we can:
    // - delete the record, OR
    // - add a "DECLINED" enum member and migrate schema
    // For safety let's delete the note and create a notification (or keep a record elsewhere).
    const deleted = await prisma.note.delete({ where: { id: noteId } });

    return NextResponse.json({ message: "Declined / deleted", noteId: deleted.id }, { status: 200 });
  } catch (err) {
    console.error("decline error", err);
    return NextResponse.json({ message: "Server error", error: String(err) }, { status: 500 });
  }
}
