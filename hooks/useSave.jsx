import axios from "axios";
import React from "react";
import toast from "react-hot-toast";

export default function useSave() {
  const save = async (id) => {
    try {
      const promise = toast.promise(
        axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/saved`, {
          id: id,
        }),
        {
          loading: "Saving note.",
          success: "Note saved successfully.",
          error: "Something went wrong",
        }
      );
      //   const resData = res?.data?.success;
      //   if (resData) {
      //     toast.success("Note saved successfully.");
      //   }
      //   console.log(res);
      //   if (!resData) {
      //     toast.error("Somthing went wrong");
      //   }
    } catch (err) {
      console.error(err);
      toast.error("Somthing went wrong");
    }
  };

  return { save };
}
