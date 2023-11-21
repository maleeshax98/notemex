"use client";
import { Dialog } from "@/Context/ThemeContext/ThemeContext";
import Image from "next/image";

export default function ViewImage({ open, link, setOpen }) {
  const handleOpen = () => setOpen(!open);
  return (
    <Dialog open={open} size="xl" handler={handleOpen} className="">
      <div className=" relative overflow-hidden  h-[80vh]">
        <Image
          src={link}
          fill
          className=" object-cover w-full h-full rounded-lg"
          alt="iamge"
        />
      </div>
    </Dialog>
  );
}
