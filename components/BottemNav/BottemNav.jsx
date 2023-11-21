"use client";
import { Badge } from "@/Context/ThemeContext/ThemeContext";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function BottemNav() {
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

  const pathName = usePathname();
  if (pathName === "/signin") {
    return null;
  }
  if (pathName === "/notes/add") {
    return null;
  }
  if (pathName === "/acount") {
    return null;
  }
  return (
    <div className="fixed bottom-0 w-full  md:hidden z-50">
      <div
        className={`${
          isVisible ? "block" : "hidden"
        } bg-white rounded-lg w-[50px] h-[50px] shadow-lg flex justify-center m-[20px] items-center p-2`}
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
      <div className="">
        <div className="flex justify-center cursor-pointer">
          <div className="bg-[#ffffff] p-3 flex justify-center items-center rounded-lg w-full  shadow-2xl">
            <div className="flex items-center justify-between w-full">
              <div>
                <Link href={"/"}>
                  <div className="text-center">
                    <div
                      className={` ${
                        pathName === "/" ? "bg-[#ededed30] p-2 rounded-lg" : ""
                      }`}
                    >
                      <Image
                        src={"/icons/new/home.svg"}
                        alt="Home Icon"
                        width={35}
                        height={35}
                        className=" bg-transparent"
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
                      <Badge content="5">
                        <div
                          className={` ${
                            pathName === "/"
                              ? "bg-[#ededed30] p-2 rounded-lg"
                              : ""
                          }`}
                        >
                          <Image
                            src={"/icons/new/following.svg"}
                            alt="Home Icon"
                            width={30}
                            height={35}
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
                        pathName === "/" ? "bg-[#ededed30] p-2 rounded-lg" : ""
                      }`}
                    >
                      <Image
                        src={"/icons/new/add.svg"}
                        alt="Home Icon"
                        width={35}
                        height={35}
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
                        pathName === "/" ? "bg-[#ededed30] p-2 rounded-lg" : ""
                      }`}
                    >
                      <Image
                        src={"/icons/new/skills.svg"}
                        alt="Home Icon"
                        width={30}
                        height={35}
                      />
                    </div>
                    <h1 className="text-gray-400 text-xs">Skills</h1>
                  </div>
                </Link>
              </div>
              <div>
                <div className="text-center">
                  <div
                    className={` ${
                      pathName === "/" ? "bg-[#ededed30] p-2 rounded-lg" : ""
                    }`}
                  >
                    <Image
                      src={"/icons/new/shorts.svg"}
                      alt="Home Icon"
                      width={35}
                      height={35}
                    />
                  </div>
                  <h1 className="text-gray-400 text-xs">Shorts</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// <Link href="/notes">
//                         <div className='bg-[#ffffff] p-[10px] flex flex-col justify-center gap-[5px] rounded-md min-w-[64px] shadow-md'>
//                             <center>
//                             <Image src="/icons/note.svg" alt="" className={`w-[25px] h-[25px]  `}
//                             />
//                             <p className={`text-xs text-[#404040]`}>Notes</p>
//                             </center>
//                         </div>
//                     </Link>
//                     <div className='bg-[#ffffff] p-[10px] flex flex-col justify-center gap-[5px] rounded-md min-w-[64px] shadow-md'>
//                         <center>
//                         <Image src="/icons/video.svg" alt="" className="w-[25px] h-[25px] no-active-svg"
//                         />
//                         <p className='text-xs text-[#404040]'>Shorts</p>
//                         </center>
//                     </div>
//                     <div className='bg-[#ffffff] p-[10px] flex flex-col justify-center gap-[5px] rounded-md min-w-[64px] shadow-md'>
//                         <center>
//                         <Image src="/icons/money.svg" alt="" className="w-[25px] h-[25px] no-active-svg"
//                         />
//                         <p className='text-xs text-[#404040]'>Earn</p>
//                         </center>
//                     </div>
//                     <div className='bg-[#ffffff] p-[10px] flex flex-col justify-center gap-[5px] rounded-md min-w-[64px] shadow-md'>
//                         <center>
//                         <Image src="/icons/search.svg" alt="" className="w-[25px] h-[25px] no-active-svg"
//                         />
//                         <p className='text-xs text-[#404040]'>Search</p>
//                         </center>
//                     </div>
//                     <Link href="/notes/add">
//                         <div className='bg-[#ffffff] p-[10px] flex flex-col justify-center gap-[5px] rounded-md min-w-[64px] shadow-md'>
//                             <center>
//                             <Image src="/icons/upload.svg" alt="" className="w-[25px] h-[25px] no-active-svg"
//                             />
//                             <p className='text-xs text-[#10926B]'>Upload</p>
//                             </center>
//                         </div>
//                     </Link>
