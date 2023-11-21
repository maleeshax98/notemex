"use client";
import FollowingCard from "@/components/FollowingCard/FollowingCard";
import UserSearchListLoardingCard from "@/components/UserSearchList/UserSearchListLoardingCard";
import useGetFollowings from "@/hooks/useGetFollowings";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function Following() {
  const { inView, ref } = useInView();
  const [page, setPage] = useState(1);
  const [loaded, setLoaded] = useState(false);
  const { get, loading, data, hasMore } = useGetFollowings();
  useEffect(() => {
    get(page);
    setLoaded(true);
  }, []);

  useEffect(() => {
    async function fetch() {
      if (inView) {
        setLoaded(false);
        await setPage((prev) => prev + 1);
        await get(page);
        setLoaded(true);
      }
    }
    fetch();
  }, [inView]);

  return (
    <div className="">
      {data.map((doc) => (
        <FollowingCard data={doc}  key={doc.id}/>
      ))}
      {loaded && !loading && !hasMore && (
        <div className="m-[20px]">
          <center>
            <p>No more data..</p>
          </center>
        </div>
      )}
      <center>
        {loading && (
          <div className="">
            <UserSearchListLoardingCard />
            <UserSearchListLoardingCard />
            <UserSearchListLoardingCard />
            <UserSearchListLoardingCard />
            <UserSearchListLoardingCard />
          </div>
        )}
        {loaded && !loading && hasMore && (
          <div ref={ref} className="">
            <UserSearchListLoardingCard />
            <UserSearchListLoardingCard />
            <UserSearchListLoardingCard />
            <UserSearchListLoardingCard />
            <UserSearchListLoardingCard />
          </div>
        )}
      </center>
    </div>
  );
}
