import React from "react";
import { Badge } from "@/Context/ThemeContext/ThemeContext";
import Link from "next/link";
import Image from "next/image";

export default function FollowingCard({ data }) {
  return (
    <div>
      <div>
        <div className="flex gap-[15px] items-center justify-center">
          <div>
            <Link href={`/user/${data?.id}`}>
              <div className="flex items-center gap-[10px] p-2">
                <div>
                  <Image
                    src={
                      data?.image
                    }
                    alt="user image"
                    width={50}
                    height={50}
                    className=" rounded-full"
                  />
                </div>
                <div>
                  <p className=" font-semibold text-md ">{data?.name}</p>
                  <p className="text-[#a0a0a0] font-semibold text-xs">
                    Followers {data?.followers?.length}
                  </p>
                </div>
              </div>
            </Link>
          </div>
          <div>
            {/* <Badge content="" /> */}
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
}
