"use client";
import Image from "next/image";
import React, { useState } from "react";
import styles from "./ImageContent.module.css";
import ViewImage from "../ViewImage/ViewImage";

export default function ImageContent({ link }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <ViewImage link={link} open={open} setOpen={setOpen} />
      <div
        className=" w-[250px] h-[250px] bg-black overflow-hidden rounded-lg relative cursor-pointer"
        onClick={() => {
          setOpen((prev) => !prev);
        }}
      >
        <Image
          src={link}
          fill
          alt="Image"
          className="img object-cover w-full h-full "
        />
        <div className="bg-[#ffffff6e] absolute top-0 left-0 z-10 w-full h-full">
          <center>
            <p className="font-semibold text-white mt-[50%]">
              Click Here To View
            </p>
          </center>
        </div>
      </div>
    </div>
  );
}
