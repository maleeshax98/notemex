"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function useAddNote() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState(null);
  const router = useRouter();
  const add = async (
    title,
    content,
    imgArr,
    tags,
    filesArr,
    desc,
    type,
    intPrice
  ) => {
    try {
      setLoading(true);
      const images = imgArr;
      const files = filesArr;

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`,
        {
          title,
          content,
          images,
          files,
          tags,
          desc,
          type,
          price: intPrice,
        }
      );

      if (res?.data?.post) {
        setLoading(false);
        setData(res?.data?.post);
        console.log(res?.data);
        // router.push("/acount")
        // return ( toast.success('Successfully Added!') )
        setSuccess(true);
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
  return { add, loading, success, data };
}
