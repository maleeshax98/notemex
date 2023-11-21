"use client";
import Image from "next/image";
import React from "react";
import { formatDistanceToNow } from "date-fns";
import { useSession } from "next-auth/react";
import useDeleteComment from "@/hooks/useDeleteComment";

export default function CommentCard({ postId, data }) {
  const formattedTime = formatDistanceToNow(new Date(data?.createdAt), {
    addSuffix: true,
  });
  const { data: session } = useSession();
  const { deleteComment } = useDeleteComment()
  return (
    <div className="mt-[30px] max-w-[650px] border-2 p-2 rounded-lg">
      <div className="flex flex-col gap-[15px]">
        <div className="flex gap-[10px] flex-wrap items-center">
          <div className="flex gap-[10px] items-center">
            <div className="rounded-full w-[30px] h-[30px] overflow-hidden relative">
              <Image
                src={data?.user?.image}
                fill
                className="object-cover w-full h-full"
                alt=""
              />
            </div>
            <p className=" text-xs text-gray-500">{data?.user?.name}</p>
          </div>
          <div className="flex gap-[10px] items-center">
            <Image
              src="/icons/clock.svg"
              width={20}
              height={20}
              className="w-[20px] h-[20px]"
              alt=""
            />
            <p className=" text-xs text-gray-500">{formattedTime}</p>
          </div>
        </div>
        <div>
          <p className=" text-gray-800 text-xs md:text-sm">{data?.comment}</p>
          {session?.user?.id === data?.user?.id && (
            <Image
              src={"/icons/new/delete.svg"}
              width={20}
              height={20}
              alt="Delete"
              className="mt-[10px] cursor-pointer"
              onClick={() => {
                deleteComment(postId, data?.id)
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
