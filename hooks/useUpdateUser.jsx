"use client"
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function useUpdateUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null)
  const router = useRouter();
  const { update: updateUser, status } = useSession()
  const reloadSession = () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  };
  const update = async (name, bio, image, coverImage) => {
    try {
      setError(null)
      setLoading(true);

      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user`,
        {
          name, bio, image, coverImage
        }
      );

      if (res?.data?.user) {
        setLoading(false);
        // router.push("/acount");
        if(status === "authenticated"){
          await updateUser({
            name: name,
            bio: bio,
            image: image,
            coverImage: coverImage
          })
        }
        await toast.success("Successfully Updated!");
        // window.location.reload();
        reloadSession();
      }

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      if (err?.response?.data?.error) {
        setError(err?.response?.data?.error);
        return toast.error(err?.response?.data?.error);
      } else {
        return toast.error("Somthing went wrong!");
      }
    }
  };
  return { update, loading };
}
