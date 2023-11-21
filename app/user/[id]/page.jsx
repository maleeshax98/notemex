"use client";
import React, { useEffect, useState } from "react";

import Styles from "./styles.module.css";
import CardList from "@/components/CardList/CardList";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import LoadingCard from "@/components/LoadingCard/LoadingCard";
import useGetMyPosts from "@/hooks/useGetMyPosts";
import { useSession } from "next-auth/react";
import UserAcountHeader from "@/components/UserAcountHeader/UserAcountHeader";
import useGetUser from "@/hooks/useGetUser";
import { useRouter } from "next/navigation";

export default function Page({ params }) {
  const { id } = params;
  const { inView, ref } = useInView();
  const [page, setPage] = useState(1);
  const {
    getUser,
    newData: data,
    error,
    loading,
    hasMore,
    notes,
  } = useGetUser();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getUser(page, id);
    setLoaded(true);
  }, []);

  // useEffect(() => {
  //   setPage(1)
  //   getUser(page, id);
  //   setLoaded(true);
  // }, [id]);

  useEffect(() => {
    async function fetch() {
      if (inView) {
        setLoaded(false);
        await setPage((prev) => prev + 1);
        await getUser(page, id);
        setLoaded(true);
      }
    }
    fetch();
  }, [inView]);

  const { data: session } = useSession();
  const router = useRouter()
  if(id === session?.user?.id){
    router.push("/acount")
  }
  // console.log(data)
  if (session) {
    return (
      <div className="p-3">
        <div className={`${Styles.container} lg:flex`}>
          <div className={Styles.page}>
            <UserAcountHeader id={id} count={notes} />
            <div>
              <div className="mt-[15px]">
                <CardList data={data} />
              </div>
              {!loading && !hasMore && (
                <div className="m-[20px]">
                  <center>
                    <p> No more data to display!</p>
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
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <center>
          <div className="m-[20px]">
            <Image
              src={"/icons/new/loadingnew.svg"}
              width={40}
              height={40}
              alt="loading"
              className=" animate-spin"
            />
          </div>
        </center>
      </div>
    );
  }
}
