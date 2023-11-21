import axios from "axios";
import React from "react";
import toast from "react-hot-toast";

export default function useLike() {
  const like = async (id) => {
    try {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/like/${id}`
      );
      const resData = res?.data?.user;
    console.log(res)
      if (!resData) {
        toast.error("Somthing went wrong");
      }
    } catch (err) {
      console.error(err);
      toast.error("Somthing went wrong");
    }
  };

  const disLike = async (id) => {
    try {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/dislike/${id}`
      );
      const resData = res?.data?.user;
    console.log(res)
      if (!resData) {
        toast.error("Somthing went wrong");
      }
    } catch (err) {
      console.error(err);
      toast.error("Somthing went wrong");
    }
  }

  return { like, disLike };
}
