import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function useSearch() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(0);
  const [newData, setNewData] = useState([]);
  const [oldQ, setOldQ] = useState(null)
  const setError = (error) => {
    console.error(error);
    toast.error(error);
  };

  const searcNotes = async (q, page) => {
    try {
      if(q !== oldQ){
        setData([])
        setNewData([])
        setOldQ(q)
      }
      setLoading(true);

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/search?q=${q}&page=${page}`
      );

      const resData = res?.data?.notes;

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

  return { searcNotes, loading, data, hasMore, newData };
}
