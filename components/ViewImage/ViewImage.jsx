"use client";
import { Dialog } from "@/Context/ThemeContext/ThemeContext";
import Image from "next/image";
import ModalImage from "react-modal-image";

export default function ViewImage({ open, link, setOpen }) {
  const handleOpen = () => setOpen(!open);
  return (
    <Dialog open={open} handler={handleOpen} className="">
      {/* <div className="relative h-[100vh]"> */}
    {/* <Image
      src={link}
      fill
      className=" rounded-lg"
      alt="image"
    /> */}
    <ModalImage
        small={link}
        large={link}
        alt="Hello World!"
      />
  {/* </div> */}
    </Dialog>
  );
}
