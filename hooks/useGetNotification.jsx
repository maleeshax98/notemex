import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function useGetNotification() {
  const [seen, setSeen] = useState(null);
  const [unSeen, setUnSeen] = useState(null);

  const run = async (action) => {
    if (action === "get") {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/notifications?action=${action}`
        );
        if (res?.data?.seen && res?.data?.unseen) {
          setSeen(res?.data?.seen);
          setUnSeen(res?.data?.unseen);
        }

        console.log(res);
      } catch (err) {
        console.error(err);
        toast.error("Somthing went wrong");
      }
    } else {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/notifications?action=${action}`
        );
        // if (!res?.data?.success) {
        //   toast.error("Somthing went wrong");
        // }
      } catch (err) {
        console.error(err);
        toast.error("Somthing went wrong");
      }
    }
  };

  return { seen, unSeen, run };

}
