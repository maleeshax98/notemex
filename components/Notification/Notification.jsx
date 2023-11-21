// "use client"
import React, { useEffect, useState } from "react";
import { NavbarMT, Badge, Dialog } from "@/Context/ThemeContext/ThemeContext";
import Image from "next/image";
import useGetNotification from "@/hooks/useGetNotification";
import NotificationCard from "../NotificationCard/NotificationCard";

export default function Notification() {
  const { seen, unSeen, run } = useGetNotification();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
    run("set");
  };

  useEffect(() => {
    run("get");
  }, []);

  return (
    <div className="mt-2 mr-2">
      {unSeen && unSeen.length != 0 ? (
        <Badge content={unSeen ? unSeen.length : 0}>
          <Image
            src="/icons/new/notifications.svg"
            alt=""
            width={35}
            height={35}
            onClick={handleOpen}
            className=" cursor-pointer"
          />
        </Badge>
      ) : (
        <Image
          src="/icons/new/notifications.svg"
          alt=""
          width={35}
          height={35}
          onClick={handleOpen}
          className=" cursor-pointer"
        />
      )}

      <Dialog
        open={open}
        handler={handleOpen}
        className="outline-none border-none max-h-[350px] overflow-y-auto max-w-[350px]"
        
      >
        <div className="flex flex-wrap gap-[15px] items-center fixed bg-white w-[100%] z-10 max-w-[350px]">
          <h1 className="font-bold text-xl p-2 ">Notifications</h1>
          <Image
            src="/icons/new/notifications.svg"
            alt=""
            width={20}
            height={20}
          />
        </div>
        <div className="p-4  flex flex-col gap-[15px] mt-[35px]">
          {unSeen && unSeen.map((n) => <NotificationCard data={n} key={n.id} />)}
          {seen && seen.map((n) => <NotificationCard data={n}  key={n.id}/>)}
        </div>
      </Dialog>
    </div>
  );
}
