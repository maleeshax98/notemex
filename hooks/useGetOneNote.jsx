"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function useGetOneNote(id) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const get = async (id) => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${id}`
      );

      const resData = res?.data?.post;
        console.log(typeof(data))
      await setData(resData);

      setLoading(false);
    } catch (err) {
      setLoading(false);
      if (err?.response?.data?.error) {
        setError(err?.response?.data?.error);
      } else {
        setError("Something went wrong!");
      }
    }
  };

  useEffect(() => {
    get(id);
  }, [id]);

  return { data, error, loading };
}
