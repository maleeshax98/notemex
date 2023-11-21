"use client"
import axios from 'axios';
import React, { useState } from 'react'

export default function useGetFollowings() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [hasMore, setHasMore] = useState(0)
  
    const get = async (page) => {
      try {
        setLoading(true);
  
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/following?page=${page}`
        ); 

        console.log(res)
  
        const resData = res?.data?.followers;
  
        if (resData) {
          setData(resData);
          setHasMore(res?.data?.hasMore);
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
  
    return { get, loading, data, hasMore };
}
