import Image from "next/image";
import React from "react";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

export default function NotificationCard({ data }) {
  const formattedTime = formatDistanceToNow(new Date(data?.time), {
    addSuffix: true,
  });
  return (
    <div>
      <Link href={data?.noteId ? `/notes/${data?.noteId}` : data?.followerId ? `/user/${data?.followerId}` : '#'} className=" border-none outline-none">
      <div className=" flex gap-[15px] items-center m-2">
        <div>
          <div className="rounded-full w-[30px] h-[30px] overflow-hidden relative">
            <Image
              src={data?.image}
              fill
              className="object-cover w-full h-full"
              alt=""
            />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-[10px]">
            <Image src="/icons/note.svg" width={15} height={15} alt="" />
            <p className="text-xs"> {formattedTime}</p>
          </div>
          <div className="flex gap-[15px]">
            <div>
              <h1 className="font-semibold">{data?.title.slice(0, 150)}</h1>
              <p className="text-xs">{data?.name.slice(0, 150)}</p>
            </div>
            <div>
              {data?.seen === false ? (
                <div className="w-[15px] h-[15px] bg-red-600 rounded-full"></div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
      </Link>

      <hr />
    </div>
  );
}
