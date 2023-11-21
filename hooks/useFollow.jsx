import axios from "axios";
import React from "react";
import toast from "react-hot-toast";

export default function useFollow() {
  const follow = async (id, type) => {
    try {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/follow/${id}?t=${type}`
      );
      const resData = res?.data?.success;
    console.log(res)
      if (!resData) {
        toast.error("Somthing went wrong23");
      }
    } catch (err) {
      console.error(err);
      toast.error("Somthing went wrong");
    }
  };

  return { follow };
}
