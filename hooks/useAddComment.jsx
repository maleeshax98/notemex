"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import CryptoJS from "crypto-js";

export default function useAddComment() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const add = async (id, comment) => {
    try {
      setLoading(true);
      const secretValue = process.env.NEXT_PUBLIC_NOTEMEX_SECRET_NORMAL;
      const secret_api_x = CryptoJS.AES.encrypt(
        secretValue,
        process.env.NEXT_PUBLIC_NOTEMEX_SECRET_NORMAL_KEY
      ).toString();
      
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/comment`,
        {
          comment,
          noteId: id,
        },
        {
          headers: {
            secret_api_x: secret_api_x,
          },
        }
      );

      if (res?.data?.comment) {
        setLoading(false);
        await toast.success("Comment Added.");
        window.location.reload();
        return;
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

  return { add, loading };
}
