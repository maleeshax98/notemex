"use client";
import React, { useEffect, useState } from "react";
import { Alert, Input, Dialog } from "@/Context/ThemeContext/ThemeContext";
import Image from "next/image";
import Link from "next/link";

export default function HowToUseModel() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const isDisabled = localStorage.getItem("isHelpModelDisabled");
    if (isDisabled) {
      setOpen(false);
      return;
    }

    setOpen(true);
  }, []);

  const updateLocalStorage = () => {
    setOpen(false);
    localStorage.setItem("isHelpModelDisabled", true);
  };
  return (
    <div>
      <Dialog open={open} size="xl" className="relative h-[80vh]">
        <div className="p-4 flex felx-wrap gap-[10px] items-center">
          <Image
            src="/icons/new/close.svg"
            className="cursor-pointer"
            alt=""
            width={35}
            height={35}
            onClick={() => {
              setOpen((prev) => !prev);
            }}
          />
          <div>
            <button
              onClick={() => {
                updateLocalStorage();
              }}
              className="font-semibold p-2 px-2 rounded-md bg-white border-2 outline-none shadow-sm hover:shadow-md text-gray-700 text-sm"
            >
              Don't Show Again
            </button>
          </div>
        </div>
        <div className="my-[10px]">
          <h1 className="font-bold text-black text-2xl">How to use NoteMe X</h1>
          <p className="text-sm text-gray-400">
            Start sharing your notes and earn followers
          </p>
        </div>
        <div>
          <iframe
            className="w-full h-[50vh] aspect-video"
            src="https://www.youtube.com/embed/bPtqd17YD74"
            title="About NoteMe X - A note sharing platform"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
            allowfullscreen
          ></iframe>
        </div>
        <Link href={"https://www.youtube.com/embed/bPtqd17YD74"}>
          <button className="font-semibold m-[10px] p-2 px-2 rounded-md bg-red-600  outline-none shadow-sm hover:shadow-md text-white text-sm">
            Wtach The Video on YouTube
          </button>
        </Link>
      </Dialog>
    </div>
  );
}
