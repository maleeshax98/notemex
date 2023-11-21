"use client";
import React, { useState } from "react";
import axios from "axios";

export default function useGetMax() {
  const [max, setMax] = useState(0);
  const get = async (page) => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/recommended?page=${page}`
      );

      if (res?.data?.results) {
        console.log(res?.data?.results);
        setData(res?.data?.results);
        setLoading(false);
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
  return { get, loading, data };
}
