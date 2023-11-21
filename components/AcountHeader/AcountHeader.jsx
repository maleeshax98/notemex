"use client";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const toastStyles = {
  style: {
    border: "1px solid #ffffff",
    backgroundColor: "#ffffff",
    padding: "16px",
    color: "#000000",
  },
};

function AcountHeader({ setOpen }) {
  const { data: session } = useSession();
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  const fetchUser = async (id) => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/me?page=1`
      );
      if (res?.data?.user) {
        const followers = res?.data?.user?.followers?.length;
        const followings = res?.data?.user?.following?.length;
        setCount(res?.data?.count);
        setFollowers(followers);
        setFollowing(followings);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);

      console.log(err);
      if (err?.response?.data?.error) {
        return toast.error(err?.response?.data?.error);
      } else {
        return toast.error("Somthing went wrong!");
      }
    }
  };

  useEffect(() => {
    fetchUser(session?.user?.id);
  }, [session]);

  const share = () => {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user/${session?.user?.id}`
    );
    toast.success("Shareble link copied", toastStyles);
  };

  // console.log(session)

  return (
    <div className="">
      <div>
        <center>
          <div className="relative rounded-lg max-w-[1280px]">
            <button
              className="z-[100] bg-white p-2 rounded-lg absolute shadow-md top-0 right-0 m-[10px]"
              onClick={() => {
                share();
              }}
            >
              <Image
                src={"icons/new/share.svg"}
                alt="menu"
                width={25}
                height={25}
              />
            </button>
            <button
              className="z-[100] bg-white p-2 rounded-lg absolute shadow-md top-0 left-0 m-[10px]"
              onClick={() => {
                window.history.back();
              }}
            >
              <Image
                src={"/icons/new/back.svg"}
                alt="menu"
                width={25}
                height={25}
              />
            </button>
            <button
              className="z-[100] bg-white p-2 rounded-lg absolute shadow-md top-12 left-0 m-[10px] "
              onClick={() => {
                signOut()
              }}
            >
              Log Out
            </button>
            <button className="z-[100] bg-white p-2 rounded-lg absolute shadow-md top-20 right-0 m-[10px]">
              <Image
                src={"icons/new/edit.svg"}
                alt="menu"
                width={25}
                height={25}
                onClick={() => {
                  setOpen((prev) => !prev);
                }}
              />
            </button>
            <div className="w-full h-[150px] rounded-md overflow-hidden relative">
              <Image
                src={session?.user?.coverImage}
                className="w-full h-full object-cover rounded-md "
                fill
                alt="cover image"
              />
            </div>
            <div className="relative w-[150px] h-[150px] rounded-full border-4 border-gray-300 mt-[-80px]">
              <Image
                src={session?.user?.image}
                className="w-full h-full object-cover rounded-full "
                fill
                alt="DP"
              />
            </div>
            <div className="mt-[5px]">
              <center>
                <div className="flex justify-center items-center">
                  <h1 className="font-semibold">{session?.user?.name}</h1>
                  <span className=" bg-[#ffdd47] p-1 ml-1 rounded-full text-xs text-[#a43232]">
                    {" "}
                    Hero{" "}
                  </span>
                </div>
                <p className="max-w-[450px] text-sm text-gray-500">
                  {session?.user?.bio === "0"
                    ? "Add a bio"
                    : `${session?.user?.bio}`}
                </p>
                <div className="mt-[10px] flex flex-wrap gap-[15px] items-start justify-center">
                  <div className=" border-r-2 p-2">
                    <h1 className="font-semibold text-gray-600 ">All Notes</h1>
                    <h1 className="font-semibold text-gray-600 ">{count}</h1>
                  </div>
                  <div className=" border-r-2 p-2">
                    <h1 className="font-semibold text-blue-600 ">Followers</h1>
                    <h1 className="font-semibold text-blue-600 ">
                      {followers}
                    </h1>
                  </div>
                  <div className="p-2">
                    <h1 className="font-semibold text-gray-600 ">Following</h1>
                    <h1 className="font-semibold text-gray-600 ">
                      {following}
                    </h1>
                  </div>
                </div>
              </center>
            </div>
          </div>
        </center>
      </div>
    </div>
  );
}

export default AcountHeader;
