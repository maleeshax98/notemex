// app/admin/page.jsx
import prisma from "@/libs/db"; // adjust path if needed
import { formatDistanceToNow } from "date-fns";
import React from "react";

export default async function AdminPage() {
  // server-side fetch of pending notes
  const pendingNotes = await prisma.note.findMany({
    where: { approved: "PENDING" },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      desc: true,
      tags: true,
      createdAt: true,
      userNotes: { take: 1, select: { user: { select: { id: true, name: true, email: true } } } },
      images: true,
    },
  });

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Admin — Pending Notes</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        This view shows notes awaiting approval. Approve to make them public, or decline to reject.
      </p>

      <PendingNotesClient initialNotes={pendingNotes} />
    </main>
  );
}

/* Client component inside same file so we only need one page.jsx file */
function PendingNotesClient({ initialNotes }) {
  "use client";
  const [notes, setNotes] = React.useState(initialNotes || []);
  const [loadingId, setLoadingId] = React.useState(null);
  const [error, setError] = React.useState(null);

  async function handleAction(noteId, action) {
    setError(null);
    setLoadingId(noteId);
    try {
      const res = await fetch(`/api/admin/${action}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ noteId }),
        credentials: "same-origin",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Request failed");

      // remove note from list on success
      setNotes((prev) => prev.filter((n) => n.id !== noteId));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingId(null);
    }
  }

  if (!notes || notes.length === 0) {
    return <div className="text-center text-gray-600">No pending notes.</div>;
  }

  return (
    <div>
      {error && <div className="mb-4 text-red-600">Error: {error}</div>}
      <ul className="space-y-4">
        {notes.map((note) => (
          <li key={note.id} className="border rounded p-4 shadow-sm">
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{note.title}</h2>
                <p className="text-sm text-gray-700 mt-1">{note.desc?.slice(0, 300)}</p>
                {note.tags?.length > 0 && (
                  <div className="mt-2 flex gap-2 flex-wrap">
                    {note.tags.map((t) => (
                      <span key={t} className="text-xs px-2 py-1 border rounded">{t}</span>
                    ))}
                  </div>
                )}
                <div className="mt-2 text-xs text-gray-500">
                  {note.userNotes?.[0]?.user ? (
                    <>Submitted by {note.userNotes[0].user.name || note.userNotes[0].user.email} · {formatDistanceToNow(new Date(note.createdAt))} ago</>
                  ) : (
                    <>Submitted {formatDistanceToNow(new Date(note.createdAt))} ago</>
                  )}
                </div>
              </div>

              <div className="flex-shrink-0 flex flex-col gap-2">
                <button
                  className="px-3 py-1 bg-green-600 text-white rounded disabled:opacity-60"
                  disabled={loadingId === note.id}
                  onClick={() => handleAction(note.id, "approve")}
                >
                  {loadingId === note.id ? "Working..." : "Approve"}
                </button>

                <button
                  className="px-3 py-1 bg-red-600 text-white rounded disabled:opacity-60"
                  disabled={loadingId === note.id}
                  onClick={() => handleAction(note.id, "decline")}
                >
                  {loadingId === note.id ? "Working..." : "Decline"}
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
