"use client";
import React from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from "@/Context/ThemeContext/ThemeContext";
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function Sidebar({ open, setOpen }) {
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  const { status } = useSession();
  return (
    <React.Fragment>
      {/* <Button onClick={openDrawer}>Open Drawer</Button> */}
      <Drawer
        open={open}
        onClose={closeDrawer}
        className="p-4 min-h-screen"
        placement="right"
      >
        <div className="mb-6 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            NoteMe X
          </Typography>
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
        <div className="flex cursor-pointer text-gray-900 flex-col font-smibold gap-[10px] rounded-md">
          <Link href={"/acount"}>
            <div className="p-2 #border-2 rounded-md flex gap-[10px] items-center">
              <Image
                src={"/icons/new/profile.svg"}
                width={30}
                height={30}
                alt="withdraw"
              />

              <p>My Acount</p>
            </div>
          </Link>
          <hr />
          <Link href={"/wallet"} onClick={closeDrawer}>
            <div className="p-2 #border-2 rounded-md flex gap-[10px] items-center">
              <Image
                src={"/icons/new/withdraw.svg"}
                width={30}
                height={30}
                alt="withdraw"
              />

              <p>My Wallet</p>
            </div>
          </Link>
          <hr />

          <div className="p-2 #border-2 rounded-md flex gap-[10px] items-center">
            <Image
              src={"/icons/new/money.svg"}
              width={30}
              height={30}
              alt="withdraw"
            />
            <p>Withdraw Money</p>
          </div>
          <hr />
          <Link href={"/info/privacy-policy"} onClick={closeDrawer}>
            <div className="p-2 #border-2 rounded-md flex gap-[10px] items-center">
              <Image
                src={"/icons/new/info.svg"}
                width={30}
                height={30}
                alt="withdraw"
              />

              <p>More Info</p>
            </div>
          </Link>

          <hr />
          {status === "authenticated" ? (
            <div
              className="p-2 #border-2 rounded-md flex gap-[10px] items-center"
              onClick={() => {
                signOut();
              }}
            >
              <Image
                src={"/icons/new/logout.svg"}
                width={30}
                height={30}
                alt="withdraw"
              />

              <p>Logout</p>
            </div>
          ) : (
            <div>
              <Button
                size="lg"
                variant="outlined"
                color="blue-gray"
                className="flex items-center gap-3 p-2"
                onClick={() => {
                  route.push("/signin");
                }}
              >
                <Image
                  src="/icons/google.svg"
                  alt="metamask"
                  width={20}
                  height={20}
                  className="h-6 w-6"
                />
                Continue with Google
              </Button>
            </div>
          )}
        </div>
      </Drawer>
    </React.Fragment>
  );
}
