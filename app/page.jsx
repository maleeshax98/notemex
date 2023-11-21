"use client"
import React, { useEffect, useState } from "react"; 
import CardList from "@/components/CardList/CardList";
import { useInView } from "react-intersection-observer";
import useGetAllNotes from "@/hooks/useGetAllNotes";
import LoadingCard from "@/components/LoadingCard/LoadingCard";

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;

export default function Home() {
  const { inView, ref } = useInView();
  const [page, setPage] = useState(1);
  const { get, loading, newData: data, hasMore } = useGetAllNotes();
  const [loaded, setLoaded] = useState(false);

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


  console.log(data)

  return (
    <main>
      <CardList data={data} />

      {!loading && !hasMore && (
        <div className="m-[20px]">
          <center>
            <p>No more data..</p>
          </center>
        </div>
      )}
      {loading && (
        <div className="mt-[-90px]">
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
        </div>
      )}
      {loaded && !loading && hasMore && (
        <div ref={ref} className="mt-[-90px]">
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
        </div>
      )}
    </main>
  );
}
