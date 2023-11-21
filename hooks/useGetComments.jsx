import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import CryptoJS from "crypto-js";

export default function useGetComments() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(0);
  const [newData, setNewData] = useState([]);

  const setError = (error) => {
    console.error(error);
    toast.error(error);
  };

  const get = async (page, id) => {
    try {
      setLoading(true);
      const secretValue = process.env.NEXT_PUBLIC_NOTEMEX_SECRET_NORMAL;
      const secret_api_x = CryptoJS.AES.encrypt(
        secretValue,
        process.env.NEXT_PUBLIC_NOTEMEX_SECRET_NORMAL_KEY
      ).toString();
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/comment?page=${page}&id=${id}`,
        {
          headers: {
            secret_api_x: secret_api_x,
          },
        }
      );

      const resData = res?.data?.comments;

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
