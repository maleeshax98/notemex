'use client'
 
import CardList from "@/components/CardList/CardList";
import LoadingCard from "@/components/LoadingCard/LoadingCard";
import UserSearchList from "@/components/UserSearchList/UserSearchList";
import UserSearchListLoardingCard from "@/components/UserSearchList/UserSearchListLoardingCard";
import useSearch from "@/hooks/useSeach";
import useSearchUsers from "@/hooks/useSearchUsers";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useInView } from "react-intersection-observer";

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;


export default function Seacrh() {
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState("notes");

  const { inView, ref } = useInView();
  const [page, setPage] = useState(1);
  const { searcNotes, loading, hasMore, newData: data } = useSearch();

  const {
    searchUsers,
    loading: loadingUser,
    hasMore: hasMoreUsers,
    newData: userData,
  } = useSearchUsers();

  const [loaded, setLoaded] = useState(false);
//   const [usersLoaded, usersSetLoaded] = useState(false);

  const router = useRouter();
  const q = searchParams.get("q");
  if (!q) {
    toast.error("Please use search bar");
    router.push("/");
  }

  useEffect(() => {
    searcNotes(q, page);
    searchUsers(q, page);
    setLoaded(true);
  }, []);

  useEffect(() => {
    searcNotes(q, page);
    searchUsers(q, page);

    setLoaded(true);
  }, [q]);

  useEffect(() => {
    async function fetch() {
      if (inView) {
        setLoaded(false);
        await setPage((prev) => prev + 1);
        await searcNotes(q, page);
        await searchUsers(q, page);
        setLoaded(true);
      }
    }
    fetch();
  }, [inView]);
  // console.log(data);
  return (
    <div className="p-2">
      <center>
        <div className="flex items-center justify-center mt-[10px] gap-[20px]">
          <button
            className={`${
              filter === "notes"
                ? "bg-blue-600 p-2 rounded-md text-white"
                : "p-2 border-2 rounded-md"
            }`}
            onClick={() => {
              setFilter("notes");
            }}
          >
            Notes
          </button>
          <button
            className={`${
              filter === "users"
                ? "bg-blue-600 p-2 rounded-md text-white"
                : "p-2 border-2 rounded-md"
            }`}
            onClick={() => {
              setFilter("users");
            }}
          >
            Users
          </button>
        </div>
      </center>
      <p className="mt-[15px]">Here results for - {q}</p>
      <div>
        {filter === "notes" && (
          <div>
            <CardList data={data} />

            {!loading && !hasMore && loaded && (
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
        )}
        {filter === "users" && (
          <div>
            <UserSearchList data={userData} />

            {!loadingUser && !hasMoreUsers && loaded && (
              <div className="m-[20px]">
                <center>
                  <p> No more data to display!</p>
                </center>
              </div>
            )}
            {loadingUser && (
              <div className="mt-[-90px]">
                <UserSearchListLoardingCard />
                <UserSearchListLoardingCard />
                <UserSearchListLoardingCard />
                <UserSearchListLoardingCard />
                <UserSearchListLoardingCard />
              </div>
            )}
            {loaded && !loadingUser && hasMoreUsers && (
              <div ref={ref} className="mt-[-90px]">
                <UserSearchListLoardingCard />
                <UserSearchListLoardingCard />
                <UserSearchListLoardingCard />
                <UserSearchListLoardingCard />
                <UserSearchListLoardingCard />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
