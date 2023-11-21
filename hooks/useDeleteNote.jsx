"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function useDeleteNote() {
  const router = useRouter();
  const deleteNote = async (id) => {
    try {

      const promise = toast.promise(
        axios.delete(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/delete?id=${id}`
        ),
        {
          loading: "Deleting The note",
          success: "Note is deleted.",
          error: "Something went wrong",
        }
      );

      const res = await promise;
      const resData = res?.data?.success;
      console.log(res);
      if (!resData) {
        toast.error("Somthing went wrong");
      } else {
        window.location.reload()
      }
    } catch (err) {
      console.error(err);
      toast.error("Somthing went wrong");
    }
  };

  return { deleteNote };
}
