import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function UserSearchList({ data }) {
  return (
    <div className=" flex flex-col gap-[15px] mt-[10px]">
      {data &&
        data.map((user) => (
          <div key={user.id}>
            <Link href={`/user/${user?.id}`}>
              <div className="flex items-center gap-[10px] p-2">
                <div>
                  <Image
                    src={user?.image}
                    alt="user image"
                    width={50}
                    height={50}
                    className=" rounded-full"
                  />
                </div>
                <div>
                  <p className=" font-semibold text-md ">{user?.name}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
    </div>
  );
}
