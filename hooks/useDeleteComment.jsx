"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function useDeleteComment() {
    const deleteComment = async (id, cid) => {
        try {
    
          const promise = toast.promise(
            axios.delete(
              `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/comment/delete?id=${id}&cid=${cid}`
            ),
            {
              loading: "Deleting The Comment",
              success: "Comment is deleted.",
              error: "Something went wrong14",
            }
          );
    
          const res = await promise;
          const resData = res?.data?.success;
          console.log(res);
          if (!resData) {
            toast.error("Somthing went wrong12");
          } else {
            window.location.reload()
          }
        } catch (err) {
          console.error(err);
          toast.error("Somthing went wrong13");
        }
      };
    
      return { deleteComment };
}
