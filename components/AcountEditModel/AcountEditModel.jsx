"use client";
import React, { useEffect, useState } from "react";
import { Alert, Input, Dialog } from "@/Context/ThemeContext/ThemeContext";
import Image from "next/image";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import useUpdateUser from "@/hooks/useUpdateUser";
import ToasterContext from "@/Context/ToastContext/ToastContext";
import useImageUpload from "@/hooks/useImageUpload";
import useDpUpload from "@/hooks/useDpUpload";
export default function AcountEditModel({ open, setOpen, setEdited }) {
  const { data: session } = useSession();
  const [query, setQuery] = useState(null);
  // const [loading ,setLoading] = useState(false)

  const [name, setName] = useState(session?.user?.name);
  const [bio, setBio] = useState(session?.user?.bio);
  const [image, setImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  const { uploading, imgURL, handleImgChange } = useImageUpload();
  const {
    uploading: uploadingDP,
    imgURL: dpURL,
    handleImgChange: handleDpChange,
  } = useDpUpload();

  useEffect(() => {
    if (session?.user?.name) {
      setName(session?.user?.name);
    }
    if (session?.user?.bio) {
      setBio(session?.user?.bio);
    }
    if (imgURL) {
      setCoverImage(imgURL);
    }
    if (dpURL) {
      setImage(dpURL);
    }
  }, [session, imgURL, dpURL]);

  const { update, loading } = useUpdateUser();
  const save = async () => {
    if (!name && !name.trim()) {
      toast.error("Please enter a name");
    }

    if (!bio && !setBio.trim()) {
      toast.error("Please enter a bio");
    }

    await update(name, bio, image, coverImage);

    setOpen((prev) => !prev);
    setEdited(true);
  };

  if (session?.user) {
    return (
      <div className="p-[5px]">
        <Dialog open={open} className="max-h-[450px] overflow-auto">
          <ToasterContext />

          <div className="m-2">
            <button
              className="bg-red-600 p-2 rounded-full text-white font-semibold text-sm"
              onClick={() => {
                toast.error("Closed without saving");
                setOpen((prev) => !prev);
              }}
            >
              Close without saving
            </button>
          </div>
          <div className="p-4">
            <div className="w-full h-[150px] rounded-md overflow-hidden relative">
              <Image
                src={
                  coverImage ? `${imgURL} ` : `${session?.user?.coverImage} `
                }
                className="w-full h-full object-cover rounded-md "
                fill
                alt="cover image"
              />
              <div
                className={`w-full h-full text-center ${
                  imgURL ? "bg-[#0000007a]" : "bg-[#000000c4]"
                } absolute z-10`}
              >
                <p className=" font-bold text-white m-[20px]">Change Photo</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImgChange}
                  className=" opacity-0 h-full w-full"
                />
              </div>
            </div>
            <div className="relative w-[150px] h-[150px] rounded-full border-4 border-gray-300 mt-[15px]">
              <Image
                src={image ? `${image}` : `${session?.user?.image}`}
                className="w-full h-full object-cover rounded-full "
                fill
                alt="DP"
              />
              <div className="w-full h-full text-center bg-[#000000c4] absolute z-10 rounded-full">
                <p className=" font-bold text-white m-[20px]">Change Photo</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleDpChange}
                  className=" opacity-0 h-full w-full"
                />
              </div>
            </div>
            <div className="mt-[10px]">
              <div>
                <p className="text-xs">Change name</p>
                <input
                  type="text"
                  value={name || ""}
                  className="p-2 rounded-md border-2 outline-none text-sm font-semibold w-full"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="mt-[10px]">
                <p className="text-xs">Change Bio</p>
                <textarea
                  type="text"
                  value={bio}
                  className="p-2 rounded-md border-2 outline-none text-sm font-semibold w-full h-[150px]"
                  onChange={(e) => {
                    setBio(e.target.value);
                  }}
                />
              </div>
              <div className="mt-[10-px]">
                {loading || uploading || uploadingDP ? (
                  <button
                    className="p-2 rounded-md bg-blue-300 font-semibold text-center text-white"
                    disabled
                  >
                    <span className="flex items-center justify-center gap-[10px]">
                      <p>Save</p>
                      <Image
                        src={"/icons/new/spinner.svg"}
                        alt="Spin"
                        width={30}
                        height={30}
                        className=" animate-spin"
                      />
                    </span>
                  </button>
                ) : (
                  <button
                    className="p-2 rounded-md bg-blue-600 font-semibold text-center text-white"
                    onClick={() => {
                      save();
                    }}
                  >
                    Save
                  </button>
                )}
              </div>
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}
