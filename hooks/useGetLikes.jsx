"use client";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

function useGetLikes() {
  const [likes, setLikes] = useState(null);
  const [liked, setLiked] = useState(null);
  const [loading, setLoading] = useState(false);

  const get = async (id) => {
    try {
      setLoading(true)
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/like/${id}`
      );
      if (res?.data?.likes) {
        setLikes(res?.data?.likes);
        setLiked(res?.data?.liked);
        setLoading(false)
      }
      console.log(res);

    } catch (err) {
      console.error(err);
      toast.error("Somthing went wrong");
    }
  };

  return { get, likes, liked, setLiked, loading };
}

export default useGetLikes;
