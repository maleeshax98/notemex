"use client";
import { Button } from "@/Context/ThemeContext/ThemeContext";
import UserList from "@/components/UsersList/UserList";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";

export default function SignIn() {
  const { data: session, status } = useSession();
  // console.log(session)
  return (
    <div className="h-[80dvh] flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-4 p-9">
        <div className="text-center">
          <h1 className="font-bold  text-light-blue-600 text-2xl md:text-3xl">
            NoteMe X.
          </h1>
          <p className="text-xs md:text-sm text-gray-400">
            Share your educational notes and skills with others..
          </p>
        </div>
        <Button
          size="lg"
          variant="outlined"
          color="blue-gray"
          className="flex items-center gap-3 text-xs md:text-base"
          onClick={() => {
            signIn("google");
          }}
        >
          <Image
            src="/icons/google.svg"
            alt="metamask"
            width={3}
            height={3}
            className="w-4 h-4 md:h-6 md:w-6"
          />
          Continue with Google
        </Button>
      </div>
      <div className="max-w-[1280px]">
        <UserList />
      </div>
    </div>
  );
}
