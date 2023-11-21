"use client";
import { NavbarMT, Badge } from "@/Context/ThemeContext/ThemeContext";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SeachModal from "../SeachModal/SeachModal";
import { useSession } from "next-auth/react";
import { Button } from "@/Context/ThemeContext/ThemeContext";
import Link from "next/link";
import Notification from "../Notification/Notification";

export default function Navbar() {
  const pathName = usePathname();
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show the button when scrolling down
      if (window.scrollY > 20) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Add smooth scrolling behavior
    });
  };

  const { data: session, status } = useSession();

  const route = useRouter();

  if (pathName === "/signin") {
    return null;
  }

  if (pathName === "/acount") {
    return null;
  }

  // if (pathName.split("/").includes("user")) {
  //   return null;
  // }

  // if (pathName.split("/").includes("note")) {
  //   return null;
  // }

  // alert(pathName)
  return (
    <div className="w-full">
      <div className="hidden md:block fixed bottom-0 left-0  m-[20px]">
        <div
          className={`${
            isVisible ? "block" : "hidden"
          } bg-white rounded-sm w-[50px] h-[50px] flex justify-center items-center p-2`}
        >
          <Image
            src={"/icons/new/toTop.svg"}
            alt="Home Icon"
            width={35}
            height={35}
            onClick={scrollToTop}
            className=" cursor-pointer"
          />
        </div>
      </div>
      <nav className="  w-full max-w-[1280px] px-4 py-3 md:mt-2 mb-4 shadow-sm z-50 bg-white rounded-md">
        <div className="flex flex-wrap items-center justify-between gap-y-4 text-white">
          <div>
            <h1 className="font-bold text-2xl text-[#0e1038]">NoteMe X.</h1>
          </div>

          <div className="hidden md:flex gap-[60px] items-center justify-center ">
            <div>
              <Link href={"/"}>
                <div className="text-center">
                  <div
                    className={` ${
                      pathName === "/" ? "bg-[#eaeaeade] p-2 rounded-lg" : ""
                    }`}
                  >
                    <Image
                      src={"/icons/new/home.svg"}
                      alt="Home Icon"
                      width={35}
                      height={35}
                      className={`${pathName === "/" ? "towhite" : ""}`}
                    />
                  </div>
                  <h1 className="text-gray-400 text-xs">Home</h1>
                </div>
              </Link>
            </div>
            <div>
              <Link href={"/user/following"}>
                <div className="text-center">
                  <center>
                    <Badge content="">
                      <div
                        className={` ${
                          pathName === "/user/following"
                            ? "bg-[#eaeaeade] p-2 rounded-lg"
                            : ""
                        }`}
                      >
                        <Image
                          src={"/icons/new/following.svg"}
                          alt="Home Icon"
                          width={30}
                          height={35}
                          className={`${
                            pathName === "/user/following" ? "towhite" : ""
                          }`}
                        />
                      </div>
                    </Badge>
                    <h1 className="text-gray-400 text-xs">Following</h1>
                  </center>
                </div>
              </Link>
            </div>

            <div>
              <Link href={"/notes/add"}>
                <div className="text-center">
                  <div
                    className={` ${
                      pathName === "/notes/add"
                        ? "bg-[#eaeaeade] p-2 rounded-lg"
                        : ""
                    }`}
                  >
                    <Image
                      src={"/icons/new/add.svg"}
                      alt="Home Icon"
                      width={35}
                      height={35}
                      className={`${
                        pathName === "/notes/add" ? "towhite" : ""
                      }`}
                    />
                  </div>
                  <h1 className="text-gray-400 text-xs">Add</h1>
                </div>
              </Link>
            </div>
            <div>
              <Link href={"/skills"}>
                <div className="text-center">
                  <div
                    className={` ${
                      pathName === "/beta/skills"
                        ? "bg-[#eaeaeade] p-2 rounded-lg"
                        : ""
                    }`}
                  >
                    <Image
                      src={"/icons/new/skills.svg"}
                      alt="Home Icon"
                      width={30}
                      height={35}
                      className={` ml-[15px]`}
                    />
                  </div>
                  <h1 className="text-gray-400 text-xs">Community</h1>
                </div>
              </Link>
            </div>
            <div>
              <div className="text-center">
                <div
                  className={` ${
                    pathName === "/beta/shorts"
                      ? "bg-[#eaeaeade] p-2 rounded-lg"
                      : ""
                  }`}
                >
                  <Image
                    src={"/icons/new/shorts.svg"}
                    className={`${
                      pathName === "/beta/shorts" ? "towhite" : ""
                    }`}
                    alt="Home Icon"
                    width={35}
                    height={35}
                  />
                </div>
                <h1 className="text-gray-400 text-xs">Shorts</h1>
              </div>
            </div>
          </div>

          <div>
            <div className="ml-auto flex gap-2 md:mr-4">
              <Image
                src="/icons/new/search.svg"
                className="cursor-pointer"
                onClick={() => {
                  setOpen(true);
                }}
                alt=""
                width={35}
                height={35}
              />
              <div>
                <Notification />
              </div>
              {session && status === "authenticated" ? (
                <Link href={"/acount"}>
                  <div className="rounded-full w-[50px] h-[50px] overflow-hidden relative">
                    <Image
                      src={session?.user?.image}
                      className="object-cover w-full h-full"
                      fill
                      alt=""
                    />
                  </div>
                </Link>
              ) : !session && status === "loading" ? (
                <div></div>
              ) : (
                <div>
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
                      className="h-6 w-6"
                    />
                    Continue with Google
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <SeachModal open={open} setOpen={setOpen} />
    </div>
  );
}

// <div>
//             <NavbarMT
//             className="mx-auto max-w-screen-xl  px-4 py-3 mt-4 mb-4 shadow-md"
//             >
//             <div className="flex flex-wrap items-center justify-between gap-y-4 text-white">
//                 <div>
//                     <h1 className="font-bold text-2xl text-[#0e1038]">NoteMe X.</h1>
//                 </div>

//                 <div className="ml-auto flex gap-2 md:mr-4">
//                     <div className='bg-[#ffffff] p-[10px] flex flex-col justify-center gap-[5px] rounded-full  shadow-md'>
//                             <center>
//                             <Image src="/icons/search.svg" alt="" className="w-[25px] h-[25px] no-active-svg"
//                             />
//                             </center>
//                     </div>
//                     <div className='rounded-full w-[50px] h-[50px] overflow-hidden relative'>
//                         <Image src="https://variety.com/wp-content/uploads/2017/10/eminem.jpg?w=1000" className='object-cover w-full h-full' alt="" />
//                     </div>
//                 </div>

//             </div>
//             </NavbarMT>
//         </div>
