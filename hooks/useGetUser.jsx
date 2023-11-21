"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function useGetUser() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [newData, setNewData] = useState([]);
  const [notes, setNotes] = useState(0);

  const getUser = async (page, id) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${id}?page=${page}`
      );
      if (res?.data?.user) {
        setData(res?.data?.notes);
        setHasMore(res?.data?.hasMore);
        setNotes(res?.data?.count)
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

  useEffect(() => {
    data.forEach((element) => {
      if (!newData.some((item) => item.id === element.id)) {
        setNewData((prevData) => [...prevData, element]);
      }
    });
  }, [data]);

  return { data, getUser, error, loading, hasMore, newData, notes };
}
