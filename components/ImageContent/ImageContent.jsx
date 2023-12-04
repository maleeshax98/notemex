"use client";
import Image from "next/image";
import React, { useState } from "react";
import styles from "./ImageContent.module.css";
import ViewImage from "../ViewImage/ViewImage";
import ModalImage from "react-modal-image";

export default function ImageContent({ link }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      {/* <ViewImage link={link} open={open} setOpen={setOpen} /> */}
      <div className="w-[250px] h-[250px] bg-black overflow-hidden rounded-lg relative cursor-pointer">
        <ModalImage
          small={link}
          large={link}
          alt=""
          className="object-cover w-full h-full z-50"
        />
        
        {/* <div className="bg-[#ffffff6e] absolute top-0 left-0 z-10 w-full h-full">
          <center>
            <p className="font-semibold text-white mt-[50%]">
              Click Here To View
            </p>
          </center>
        </div> */}
      </div>
    </div>
  );
}
