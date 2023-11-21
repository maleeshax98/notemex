"use client";
import React, { useState } from "react";
import { Alert, Input, Dialog } from "@/Context/ThemeContext/ThemeContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
export default function SeachModal({ open, setOpen }) {
  const [query, setQuery] = useState("");
  const router = useRouter();
  // console.log(query)
  const handleSearch = async (e) => {
    e.preventDefault()
    if (query || !query.trim()) {
      setOpen( prev => !prev )
      router.push(`/notes/search?q=${query}`);
    }
  };
  return (
    <div className="p-[5px]">
      <Dialog open={open}>
        <div className="p-4">
          <Image
            src="/icons/new/close.svg"
            className="absolute top-0 right-0 cursor-pointer"
            alt=""
            width={35}
            height={35}
            onClick={() => {
              setOpen((prev) => !prev);
            }}
          />

          <div >
            <form className="flex gap-[5px] mt-[20px]" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search"
              className=" border-2 rounded-xl font-semibold text-gray-600 p-2 w-full outline-none focus:border-blue-400"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />
            <button className="text-sm bg-blue-600 font-semibold p-2 text-white rounded-xl">Search</button>
            </form>
            
          </div>
          <div className="mt-[10px]"></div>
        </div>
      </Dialog>
    </div>
  );
}
