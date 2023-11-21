"use client";
import React, { useEffect, useState } from "react";
import Styles from "./SingleCard.module.css";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import toast from "react-hot-toast";
import Image from "next/image";
import useLike from "@/hooks/useLike";
import useGetLikes from "@/hooks/useGetLikes";
import { useSession } from "next-auth/react";
import useDeleteNote from "@/hooks/useDeleteNote";
import { usePathname } from "next/navigation";

export default function SingleCard({ data }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const { data: session, status } = useSession();
  const pathName = usePathname();

  useEffect(() => {
    const userId = session?.user?.id;
    if (data?.likes?.includes(userId)) {
      setLiked(true);
      setLikes(data?.likes.length);
    }
  }, [data, session]);

  const formattedTime = formatDistanceToNow(new Date(data?.createdAt), {
    addSuffix: true,
  });

  const toastStyles = {
    style: {
      border: "1px solid #ffffff",
      backgroundColor: "#ffffff",
      padding: "16px",
      color: "#000000",
    },
  };

  const share = () => {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_BASE_URL}/notes/${data?.id}`
    );
    toast.success("Shareble link copied", toastStyles);
  };
  const titleCapitalized = data?.title
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const { like, disLike } = useLike();
  const { deleteNote } = useDeleteNote();

  return (
    <div
      className={`${Styles.container} md:flex p-4 m-4 rounded-lg max-w-[1050px] bg-[#ffffff] myshadow`}
    >
      <div
        className={`${Styles.details} flex flex-col gap-[10px] mb-[10px] md:mb-[0px]`}
      >
        <Link
          href={
            pathName === "/acount" && data?.approved !== "APPROVED"
              ? "#"
              : `/notes/${data?.id}`
          }
        >
          <div className="flex gap-[20px] items-center">
            <Image
              src="/icons/note.svg"
              className="w-[30px] h-[30px]"
              width={30}
              height={30}
              alt=""
            />
            <div className="flex items-center gap-[10px]">
              <Image
                src="/icons/clock.svg"
                className="w-[20px] h-[20px]"
                alt=""
                width={20}
                height={20}
              />
              <p className="text-[#747474] font-semibold text-xs">
                {formattedTime}
              </p>
            </div>
            {pathName === "/acount" && (
              <div className="flex items-center gap-[10px]">
                <Image
                  src={
                    data?.approved === "PENDING"
                      ? `/icons/new/pending.svg`
                      : `/icons/new/approved.svg`
                  }
                  className="w-[20px] h-[20px]"
                  alt=""
                  width={20}
                  height={20}
                />
                <p className="text-[#747474] font-semibold text-xs">
                  {data?.approved.toLowerCase()}
                </p>
              </div>
            )}
          </div>

          <div>
            <h1 className="text-[#626262] font-bold text-lg md:text-2xl">
              {titleCapitalized}
            </h1>
            <p className="text-[#c5c5c5] font-normal text-xs">
              {data?.desc.slice(0, 150)}...
            </p>
          </div>
        </Link>
        {data?.userNotes && (
          <Link href={`/user/${data?.userNotes[0]?.user?.id}`}>
            <div className="flex items-center gap-[10px] mt-2">
              <div className="rounded-full w-[30px] h-[30px] overflow-hidden relative">
                <Image
                  src={data?.userNotes[0]?.user?.image}
                  fill
                  className="object-cover w-full h-full"
                  alt=""
                />
              </div>
              <div>
                <p className="text-[#747474] font-semibold text-xs">
                  {data?.userNotes[0]?.user?.name}
                </p>
                <p className="text-[#a0a0a0] font-semibold text-xs">
                  Followers {data?.userNotes[0]?.user?.followers?.length}
                </p>
              </div>
              {/* <button className="follow-btn">Follow</button> */}
            </div>
          </Link>
        )}
      </div>

      <div
        className={`${Styles.price} flex flex-col ${
          data?.type === "Pro" ? "justify-between" : "justify-end"
        }`}
      >
        {data?.type === "Pro" && (
          <div className=" flex  text-lg gap-[10px] items-center">
            {/* <h1 className='text-white font-bold text-xl'>Free</h1> */}
            <h1 className="text-[#0295FF] font-bold text-md">Premium</h1>
            <h1 className="text-[#0295FF] font-bold text-xl">{data?.price}$</h1>
          </div>
        )}
        <div className="flex gap-[20px] items-center">
          {data &&
            session &&
            status === "authenticated" &&
            data?.approved === "APPROVED" && (
              <div className="flex font-semibold gap-[3px] text-sm items-center text-gray-600">
                {liked && (
                  <Image
                    src="/icons/new/likeFilled.svg"
                    className="w-[20px] h-[20px] cursor-pointer"
                    width={20}
                    height={20}
                    alt=""
                    onClick={() => {
                      disLike(data?.id);
                      setLiked(false);
                      setLikes((prev) => prev - 1);
                    }}
                  />
                )}
                {!liked && (
                  <Image
                    src="/icons/like.svg"
                    className="w-[20px] h-[20px] cursor-pointer"
                    width={20}
                    height={20}
                    alt=""
                    onClick={() => {
                      like(data?.id);
                      setLiked(true);
                      setLikes((prev) => prev + 1);
                    }}
                  />
                )}
                <div>
                  <p>{likes}</p>
                </div>
              </div>
            )}

          <Image
            src="/icons/new/share.svg"
            className="w-[20px] h-[20px] cursor-pointer"
            alt=""
            onClick={() => {
              share();
            }}
            width={20}
            height={20}
          />
          <Link href={`/notes/${data?.id}#comments`}>
            <Image
              src="/icons/comment.svg"
              width={20}
              height={20}
              className="w-[25px] h-[25px] cursor-pointer"
              alt=""
            />
          </Link>
          {data?.userNotes && (
            <>
              {session?.user?.id === data?.userNotes[0]?.user?.id && (
                <Image
                  src="/icons/new/delete.svg"
                  width={15}
                  height={15}
                  className="w-[25px] h-[25px] cursor-pointer"
                  alt=""
                  onClick={() => {
                    deleteNote(data?.id);
                  }}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
