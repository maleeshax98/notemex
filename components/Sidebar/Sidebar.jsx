"use client";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
} from "@/Context/ThemeContext/ThemeContext";

import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@/Context/ThemeContext/ThemeContext";

import {
  ChevronRightIcon,
  ChevronDownIcon,
  CubeTransparentIcon,
} from "@/Context/ThemeContext/ThemeContext";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function Sidebar() {
  const pathName = usePathname();
  const [open, setOpen] = useState(0);
  const [openAlert, setOpenAlert] = useState(true);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <div className="  fixed bg-[#ffffff]  rounded-lg flex flex-col gap-[10px] max-w-[250px] p-4 min-h-screen min-w-[250px] ">
      <div>
        <div>
          <h1 className="font-bold text-xl text-[#0295FF]">NoteMe X</h1>
          <p className="text-xs text-gray-400">Let&apos;s share knowladge</p>
        </div>
      </div>
      <div className="mt-[20px] flex flex-col gap-[20px]">
        <div
          className={`flex justify-start items-center gap-[15px] ${
            pathName === "/acount" ? "bg-[#e8e8e89e] rounded-md p-2" : ""
          }`}
        >
          <Image
            src={"icons/note.svg"}
            width={25}
            height={25}
            alt="notes"
            className={`${pathName === "/acount" ? "towhite" : ""}`}
          />
          <h1
            className={`font-semibold text-sm  ${
              pathName === "/acount" ? "text-[#333333]" : "text-[#a1a1a1]"
            }`}
          >
            My notes
          </h1>
        </div>
        <Link href={"/user/followers"}>
          <div
            className={`flex justify-start items-center gap-[15px] ${
              pathName === "/acount/followers"
                ? "bg-[#000000] rounded-md p-2"
                : ""
            }`}
          >
            <Image
              src={"icons/new/following.svg"}
              width={25}
              height={25}
              alt="notes"
              className={`${pathName === "/acount/followers" ? "towhite" : ""}`}
            />
            <h1
              className={`font-semibold text-sm  ${
                pathName === "/acount/followers"
                  ? "text-[#000000]"
                  : "text-[#a1a1a1]"
              }`}
            >
              My followers
            </h1>
          </div>
        </Link>
        <div
          className={`flex justify-start items-center gap-[15px] ${
            pathName === "/acount/earnings" ? "bg-[#000000] rounded-md p-2" : ""
          }`}
        >
          <Image
            src={"icons/new/money.svg"}
            width={25}
            height={25}
            alt="notes"
            className={`${pathName === "/acount/earnings" ? "towhite" : ""}`}
          />
          <h1
            className={`font-semibold text-sm  ${
              pathName === "/acount/earnings"
                ? "text-[#000000]"
                : "text-[#a1a1a1]"
            }`}
          >
            Earnings
          </h1>
        </div>
        <div
          className={`flex justify-start items-center gap-[15px] ${
            pathName === "/acount/withdrawals"
              ? "bg-[#000000] rounded-md p-2"
              : ""
          }`}
        >
          <Image
            src={"icons/new/withdraw.svg"}
            width={25}
            height={25}
            alt="notes"
            className={`${pathName === "/acount/withdrawals" ? "towhite" : ""}`}
          />
          <h1
            className={`font-semibold text-sm  ${
              pathName === "/acount/withdrawals"
                ? "text-[#000000]"
                : "text-[#a1a1a1]"
            }`}
          >
            withdrawals
          </h1>
        </div>
        <div
          className={`flex justify-start items-center gap-[15px] ${
            pathName === "/acount/purchased"
              ? "bg-[#000000] rounded-md p-2"
              : ""
          }`}
        >
          <Image
            src={"icons/new/purchased.svg"}
            width={25}
            height={25}
            alt="notes"
            className={`${pathName === "/acount/purchased" ? "towhite" : ""}`}
          />
          <h1
            className={`font-semibold text-sm  ${
              pathName === "/acount/purchased"
                ? "text-[#000000]"
                : "text-[#a1a1a1]"
            }`}
          >
            Purchased notes
          </h1>
        </div>
        <div
          className={`flex justify-start items-center gap-[15px] cursor-pointer ${
            pathName === "/acsfdsfount" ? "bg-[#000000] rounded-md p-2" : ""
          }`}
          onClick={() => {
            signOut();
          }}
        >
          <Image
            src={"icons/new/logout.svg"}
            width={25}
            height={25}
            alt="notes"
            className={`${pathName === "/acosdfdfunt" ? "towhite" : ""}`}
          />
          <h1
            className={`font-semibold text-sm  ${
              pathName === "/acosdfsdfunt" ? "text-[#000000]" : "text-[#a1a1a1]"
            }`}
          >
            Logout
          </h1>
        </div>
      </div>
    </div>
  );
}
