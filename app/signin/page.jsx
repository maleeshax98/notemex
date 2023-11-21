"use client"
import { Button } from "@/Context/ThemeContext/ThemeContext"
import { signIn, useSession } from "next-auth/react"
import Image from "next/image";

export default function SignIn() {
    const { data: session, status } = useSession()
    // console.log(session)
    return (
        <div className="h-[100dvh] flex flex-col items-center justify-center">
            <div className="flex flex-col items-center gap-4 p-9">
                <div className="text-center">
                    <h1 className="font-bold text-3xl text-light-blue-600">NoteMe X.</h1>
                    <p className="text-sm text-gray-400">Share your educational notes and skills with others..</p>
                </div>
                <Button
                    size="lg"
                    variant="outlined"
                    color="blue-gray"
                    className="flex items-center gap-3"
                    onClick={ () => { signIn("google") }}
                >
                    <Image src="/icons/google.svg" alt="metamask" width={6} height={6} className="h-6 w-6" />
                    Continue with Google
                </Button>
            </div>
        </div>
    )
}
