import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function useSavedNotes() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(0);
  const [newData, setNewData] = useState([]);

  const setError = (error) => {
    console.error(error);
    toast.error(error);
  };

  const get = async (page) => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/saved?page=${page}`
      );

      const resData = res?.data?.results;

      console.log(resData);
      if (resData) {
        setData(resData);
        setHasMore(res?.data?.hasMore);
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      if (err?.response?.data?.error) {
        setError(err?.response?.data?.error);
      } else {
        setError("Something went wrong!");
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

  return { get, loading, data, hasMore, newData };
}
