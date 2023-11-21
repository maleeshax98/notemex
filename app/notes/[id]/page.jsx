"use client";
import CommentSection from "@/components/CommentSection/CommentSection";
import styles from "./styles.module.css";
import useGetOneNote from "@/hooks/useGetOneNote";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import toast from "react-hot-toast";
import ImageContent from "@/components/ImageContent/ImageContent";
import Link from "next/link";
import CommentList from "@/components/CommentList/CommentList";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useLike from "@/hooks/useLike";
import useUpdateRecoUser from "@/hooks/useUpdateRecoUser";

export default function PostPage({ params }) {
  const { data, error, loading } = useGetOneNote(params.id);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const { data: session, status } = useSession();
  const { update } = useUpdateRecoUser();
  useEffect(() => {
    const userId = session?.user?.id;
    if (data?.likes?.includes(userId)) {
      setLiked(true);
      setLikes(data?.likes.length);
    }

    if (data?.title || data?.tags) {
      update(
        data?.title
          .split(" ")
          .map((word) => word.charAt(0).toLowerCase() + word.slice(1))
          .join(" ") || "",
        data?.tags || []
      );
    }
  }, [data, session]);
  const toastStyles = {
    style: {
      border: "1px solid #ffffff",
      backgroundColor: "#ffffff",
      padding: "16px",
      color: "#000000",
    },
  };

  const titleCapitalized = data?.title
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const { like } = useLike();

  if (error) {
    return (
      <div>
        <div className="m-[20px]">
          <center>
            <p className=" text-red-500 text-lg"> {error} </p>
          </center>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div>
        <center>
          <div className="m-[20px]">
            <Image
              src={"/icons/new/loadingnew.svg"}
              width={40}
              height={40}
              alt="loading"
              className=" animate-spin"
            />
          </div>
        </center>
      </div>
    );
  }

  if (data && !loading && !error) {
    const formattedTime = formatDistanceToNow(new Date(data?.createdAt), {
      addSuffix: true,
    });
    // console.log(data);
    const share = () => {
      navigator.clipboard.writeText(
        `${process.env.NEXT_PUBLIC_BASE_URL}/notes/${data?.id}`
      );
      toast.success("Shareble link copied", toastStyles);
    };
    return (
      <div className="m-[15px]">
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
              width={20}
              height={20}
              alt=""
            />
            <p className="text-[#747474] font-semibold text-xs">
              {formattedTime}
            </p>
          </div>
        </div>

        <div className="mt-[20px]">
          <h1 className="text-[#626262] font-bold text-2xl">
            {titleCapitalized}
          </h1>
          <Link href={`/user/${data?.userNotes[0]?.user?.id}`}>
            <div className="mt-[10px]">
              <div className="flex items-center gap-[10px]">
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
                    Followers {data?.userNotes[0]?.user?.followers.length}
                  </p>
                </div>
              </div>
            </div>
          </Link>
          <div className="mt-[20px]">
            <div className="flex gap-[20px] items-center">
              {data && session && status === "authenticated" && (
                <div className="flex font-semibold gap-[3px] text-sm items-center text-gray-600">
                  {liked && (
                    <Image
                      src="/icons/new/likeFilled.svg"
                      className="w-[20px] h-[20px]"
                      width={20}
                      height={20}
                      alt=""
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
                className="w-[20px] h-[20px]"
                alt=""
                onClick={() => {
                  share();
                }}
                width={20}
                height={20}
              />
              <Link href={"#comments"}>
                <Image
                  src="/icons/comment.svg"
                  className="w-[25px] h-[25px]"
                  alt=""
                  width={25}
                  height={25}
                />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-[0px] mb-[50px] p-2">
          <div className="mb-[15px] flex gap-[10px] flex-wrap justify-center">
            {data?.images.map((img) => (
              <div key={img}>
                <ImageContent link={img} />
              </div>
            ))}
            {/* <ImageContent /> */}
          </div>
          <div className="mb-[15px] flex gap-[10px] flex-wrap justify-center">
            {data?.files.length > 0 && (
              <>
                {data?.files.map((file, index) => (
                  <div
                    key={file}
                    className="flex justify-center items-center flex-wrap gap-[10px]"
                  >
                    <Link href={file} download={"notemex"}>
                      <button className="p-2 rounded-md text-white font-semibold text-center bg-blue-700">
                        Download File {index + 1}
                      </button>
                    </Link>
                  </div>
                ))}
              </>
            )}
          </div>
          <div
            className={styles.default}
            dangerouslySetInnerHTML={{ __html: data?.content }}
          ></div>
        </div>

        <div className="mt-[15px]">
          <CommentSection id={data?.id} />
        </div>
        <section id="comments">
          <CommentList id={data?.id} />
        </section>
      </div>
    );
  }
}
