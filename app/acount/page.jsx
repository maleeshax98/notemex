"use client";
import AcountHeader from "@/components/AcountHeader/AcountHeader";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import React, { useEffect, useState } from "react";

import Styles from "./styles.module.css";
import { Drawer } from "@/Context/ThemeContext/ThemeContext";
import CardList from "@/components/CardList/CardList";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import useGetAllNotes from "@/hooks/useGetAllNotes";
import LoadingCard from "@/components/LoadingCard/LoadingCard";
import useGetMyPosts from "@/hooks/useGetMyPosts";
import AcountEditModel from "@/components/AcountEditModel/AcountEditModel";
import { useSession } from "next-auth/react";

export default function Acount() {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const [approved, setApproved] = useState(0);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  const { inView, ref } = useInView();
  const [page, setPage] = useState(1);
  const { get, loading, newData: data, hasMore } = useGetMyPosts();
  const [finalData, setFinalData] = useState([]);
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

  // useEffect(() => {
  //   if (approved === 1) {
  //     const filteredData = data.filter((note) => note.approved === "APPROVED");
  //     setFinalData(filteredData);
  //   } else if (approved === 0) {
  //     const filteredData = data.filter((note) => note.approved === "PENDING");
  //     setFinalData(filteredData);
  //   }
  // }, [approved, data]);

  const { data: session } = useSession();

  if (session) {
    return (
      <div className="p-3">
        <AcountEditModel open={open2} setOpen={setOpen2} />

        <div className={`${Styles.container} lg:flex`}>
          {/* <div className={Styles.sidebar}>
            <Drawer open={open} onClose={closeDrawer} className="p-4">
              <Sidebar />
            </Drawer>
            <div className="hidden lg:block ">
              <Sidebar />
            </div>
          </div> */}
          <div className={Styles.page}>
            {/* <button
              onClick={openDrawer}
              className="lg:hidden  z-[100] bg-white p-2 rounded-lg fixed shadow-md"
            >
              <Image
                src={"icons/new/menu.svg"}
                alt="menu"
                width={30}
                height={30}
              />
            </button> */}
            <AcountHeader setOpen={setOpen2} />
            {/* <div className="flex items-center justify-center mt-[10px] gap-[20px]">
              <button
                className={`${
                  approved
                    ? "bg-blue-600 p-2 rounded-md text-white"
                    : "p-2 border-2 rounded-md"
                }`}
                onClick={() => {
                  setApproved(1);
                }}
              >
                Approved
              </button>
              <button
                className={`${
                  !approved
                    ? "bg-blue-600 p-2 rounded-md text-white"
                    : "p-2 border-2 rounded-md"
                }`}
                onClick={() => {
                  setApproved(0);
                }}
              >
                Pending
              </button>
            </div> */}
            
            <div>
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
            </div>
          </div>
        </div>
      </div>
    );
  }else{
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
    )
  }
}
