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
import PayButton from "./_components/PayButton/PayButton";
import { Button } from "@/Context/ThemeContext/ThemeContext";
import { useRouter } from "next/navigation";

export default function PostPage({ params }) {
  const route = useRouter();

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
    setLikes(data?.likes.length);

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
    if(error === 'Signing in is required to view'){
      setTimeout(() => {
        route.push("/signin")
      }, 1000)
    }
    return (
      <div>
        <div className="m-[20px]">
          <center>
            <p className=" text-red-500 text-xl font-bold"> {error} </p>
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
      <div className="m-[15px]  mt-[30px]">
        <button
          className=" p-2 font-semibold shadow-md mb-[20px] bg-white rounded-lg"
          onClick={() => {
            window.history.back();
          }}
        >
          Go Back
        </button>
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
        </div>
        <div className="m-[20px]">
          
          {data?.type === "Free" ? (
            <div className="mt-[0px] mb-[50px] p-2">
              <div className="mb-[15px] flex gap-[10px] flex-wrap justify-center">
                {data?.images.map((img) => (
                  <div key={img}>
                    <ImageContent link={img} />
                    <div>
                      <p className="text-sm text-gray-600 text-center">
                        Click to view
                      </p>
                    </div>
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
                        <Link href={file}>
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
          ) : data?.type === "Pro" ? (
            status === "authenticated" ? (
              data?.userNotes[0]?.user?.id === session?.user?.id ? (
                <>
                  <div className="mt-[0px] mb-[50px] p-2">
                    <div className="mb-[15px] flex gap-[10px] flex-wrap justify-center">
                      {data?.images.map((img) => (
                        <div key={img}>
                          <ImageContent link={img} />
                          <div>
                            <p className="text-sm text-gray-600 text-center">
                              Click to view
                            </p>
                          </div>
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
                              <Link href={file}>
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
                </>
              ) : data?.have === true ? (
                <div className="mt-[0px] mb-[50px] p-2">
                  <div className="mb-[15px] flex gap-[10px] flex-wrap justify-center">
                    {data?.images.map((img) => (
                      <div key={img}>
                        <ImageContent link={img} />
                        <div>
                          <p className="text-sm text-gray-600 text-center">
                            Click to view
                          </p>
                        </div>
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
                            <Link href={file}>
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
              ) : (
                <div>
                  <center>
                    <p className="">{data?.desc}</p>
                    <div className="flex gap-[10px]">
                      <Link href={"#comments"}>
                        <p className="mt-[10px] text-blue-600 cursor-pointer">
                          Reviews
                        </p>
                      </Link>
                      <Link href="/info/refund">
                        <p className="mt-[10px] text-blue-600 cursor-pointer">
                          Reufund policy & Terms and conditions
                        </p>
                      </Link>
                    </div>
                    <div className="flex justify-center mt-[10px] border-2 shadow-sm p-4 rounded-lg">
                      <div className="text-left">
                        <p className="font-bold text-2xl text-gray-800">
                          Rs.{data?.price}.00
                        </p>
                        <p className="text-xs text-gray-500 mb-[10px]">
                          *This is a pro note and you need to buy it
                        </p>
                        <PayButton noteId={data?.id} />
                      </div>
                    </div>
                  </center>
                </div>
              )
            ) : (
              <div>
                <center>
                  <div>
                    <p className="font-bold text-xl text-gray-800">
                      Login to countinue and buy note
                    </p>
                    <Link href={"#comments"}>
                      <p className="mb-[10px] text-blue-600 cursor-pointer">
                        Reviews
                      </p>
                    </Link>
                    <Button
                      size="lg"
                      variant="outlined"
                      color="blue-gray"
                      className="flex items-center gap-3 p-2"
                      onClick={() => {
                        route.push("/signin");
                      }}
                    >
                      <Image
                        src="/icons/google.svg"
                        alt="metamask"
                        width={20}
                        height={20}
                        className="h-6 w-6"
                      />
                      Continue with Google
                    </Button>
                  </div>
                </center>
              </div>
            )
          ) : (
            <>
              <p>{data?.desc}</p>
            </>
          )}
        </div>
        <div className="mt-[40px] mb-[40px]">
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
        <div className="mt-[50px]">
          <CommentSection id={data?.id} />
        </div>
        <section id="comments">
          <CommentList id={data?.id} />
        </section>
      </div>
    );
  }
}
