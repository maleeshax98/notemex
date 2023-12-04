"use client";
import useFollow from "@/hooks/useFollow";
import { button } from "@material-tailwind/react";
import axios from "axios";
import { useSession } from "next-auth/react";
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

function UserAcountHeader({ id, count }) {
  const [data, setData] = useState(null);
  const [followed, setFollowed] = useState(false);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);

  const [loading, setLoading] = useState(true);

  const { data: session } = useSession();

  const fetchUser = async (id) => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${id}?page=1`
      );
      if (res?.data?.user) {
        setData(res?.data?.user);
        const followers = res?.data?.user?.followers?.length;
        const followings = res?.data?.user?.following?.length;

        setFollowers(followers);
        setFollowing(followings);

        if (res?.data?.user?.followers?.includes(session?.user?.id)) {
          setFollowed(true);
        }
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
    fetchUser(id);
  }, [id]);

  const { follow } = useFollow();
  // console.log(data);
  const handleFollow = () => {
    follow(id, "follow");
    setFollowed(true);
    setFollowers((prev) => prev + 1);
  };

  const handleUnFollow = () => {
    follow(id, "unFollow");
    setFollowed(false);
    setFollowers((prev) => prev - 1);
  };

  const share = () => {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user/${id}`
    );
    toast.success("Shareble link copied", toastStyles);
  };

  if (!data) {
    return (
      <div>
        <div className="w-full h-[180px] rounded-lg animate-pulse bg-gray-600"></div>
        <center>
          <div className="w-[150px] h-[150px] rounded-full animate-pulse bg-gray-800 mt-[-50px]"></div>
        </center>
        <center>
          <div className="w-[150px] h-[20px] rounded-lg animate-pulse bg-gray-600 mt-[15px]"></div>
          <div className="w-[100px] h-[20px] rounded-lg animate-pulse bg-gray-600 mt-[15px]"></div>
          <div className="w-[80px] h-[20px] rounded-lg animate-pulse bg-gray-600 mt-[15px]"></div>
        </center>
        <div className="flex flex-wrap gap-[15px] items-center justify-center mt-[15px]">
          <div className="w-[90px] h-[50px] rounded-lg animate-pulse bg-gray-600"></div>
          <div className="w-[90px] h-[50px] rounded-lg animate-pulse bg-gray-600"></div>
          <div className="w-[90px] h-[50px] rounded-lg animate-pulse bg-gray-600"></div>
        </div>
      </div>
    );
  }

  if (data) {
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
                  src={"/icons/new/share.svg"}
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

              <div className="w-full  h-[150px] md:h-[350px]  rounded-md overflow-hidden relative">
                <Image
                  src={data?.coverImage}
                  className="w-full h-full object-cover rounded-md "
                  fill
                  alt="cover image"
                />
              </div>

              <div className="relative w-[150px] h-[150px] rounded-full border-4 border-gray-300 mt-[-80px] bg-white">
                <Image
                  src={data?.image}
                  className="w-full h-full object-cover rounded-full "
                  fill
                  alt="DP"
                />
              </div>

              <div className="mt-[5px]">
                <center>
                  <h1 className="font-semibold">
                    {data?.name}{" "}
                    <span className=" bg-[#ffdd47] p-1 rounded-full text-xs text-[#a43232]">
                      {" "}
                      Hero{" "}
                    </span>
                  </h1>
                  <p className="max-w-[450px] text-sm text-gray-500 mb-[10px]">
                    {data?.bio !== "0" && `${data?.bio}`}
                  </p>
                  <div className=" items-center justify-center">
                    {!loading && (
                      <>
                        {followed ? (
                          <button
                            className=" rounded-full p-2 font-semibold text-gray-800 text-sm text-center bg-gray-400 px-4"
                            onClick={() => {
                              handleUnFollow();
                            }}
                          >
                            Unfollow
                          </button>
                        ) : (
                          <button
                            className=" rounded-full p-2 font-semibold text-white text-sm text-center bg-blue-600 px-4"
                            onClick={() => {
                              handleFollow();
                            }}
                          >
                            Follow
                          </button>
                        )}
                      </>
                    )}
                  </div>
                  <div className="mt-[10px] flex  flex-wrap gap-[15px] items-start justify-center">
                    <div>
                      <h1 className="font-semibold text-gray-600 ">
                        All Notes
                      </h1>
                      <h1 className="font-semibold text-gray-600 ">{count}</h1>
                    </div>
                    <div>
                      <h1 className="font-semibold text-blue-600 ">
                        Followers
                      </h1>
                      <h1 className="font-semibold text-blue-600 ">
                        {followers}
                      </h1>
                    </div>
                    <div>
                      <h1 className="font-semibold text-gray-600 ">
                        Following
                      </h1>
                      <h1 className="font-semibold text-gray-600 ">
                        {<h1>{following}</h1>}
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
}

export default UserAcountHeader;
