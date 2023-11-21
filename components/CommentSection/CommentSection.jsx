"use client";
import {
  Textarea,
  Button,
  IconButton,
} from "@/Context/ThemeContext/ThemeContext";
import useAddComment from "@/hooks/useAddComment";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CommentSection({ id }) {
  const [comment, setComment] = useState("");
  const { add, loading } = useAddComment();

  const handleAdd = async () => {
    if (!comment || !comment.trim()) {
      return toast.error("Please fill the comment box.");
    }

    await add(id, comment);
  };
  return (
    <div>
      {loading && (
        <div className="m-[20px]">
          <Image
            src={"/icons/new/loadingnew.svg"}
            width={40}
            height={40}
            alt="loading"
            className=" animate-spin"
          />
        </div>
      )}
      <div className="relative max-w-[450px] border-2 p-2 rounded-md">
        <Textarea
          variant="static"
          placeholder="Your Comment"
          rows={8}
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
        <div className="flex w-full justify-between py-1.5">
          <IconButton variant="text" color="blue-gray" size="sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
              />
            </svg>
          </IconButton>
          <div className="flex gap-2">
            <Button
              size="sm"
              color="red"
              variant="text"
              className="rounded-md font-semibold"
              onClick={() => {
                setComment("");
              }}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              className="rounded-md font-semibold bg-[#3269ff]"
              onClick={() => {
                handleAdd();
              }}
            >
              Post Comment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
