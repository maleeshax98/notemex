"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import CommentCard from "../CommentCard/CommentCard";
import useGetComments from "@/hooks/useGetComments";

export default function CommentList({ id }) {
  const { inView, ref } = useInView();
  const [page, setPage] = useState(1);
  const { get, loading, newData: data, hasMore } = useGetComments();

  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    get(page, id);
    setLoaded(true);
  }, []);

  useEffect(() => {
    async function fetch() {
      if (inView) {
        setLoaded(false);
        await setPage((prev) => prev + 1);
        await get(page, id);
        setLoaded(true);
      }
    }
    fetch();
  }, [inView]);

  return (
    <div className="mb-[150px]">
      {data &&
        data.map((comment) => <CommentCard key={comment.id} data={comment} postId={id}/>)}
      <div className="m-[20px]">
        <center>
          {!loading && !hasMore && (
            <div className="m-[20px]">
              <center>
                <p>No more comments..</p>
              </center>
            </div>
          )}
          {loading && (
            <Image
              src={"/icons/new/loadingnew.svg"}
              width={40}
              height={40}
              alt="loading"
              className=" animate-spin"
            />
          )}
          {loaded && !loading && hasMore && (
            <Image
              ref={ref}
              src={"/icons/new/loadingnew.svg"}
              width={40}
              height={40}
              alt="loading"
              className=" animate-spin"
            />
          )}
        </center>
      </div>
    </div>
  );
}
