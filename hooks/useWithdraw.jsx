import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function useWithdraw() {
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const make = async (name, number, bName, email, pNumber, amount) => {
    try {
      setLoading(true);

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/withdraw`,
        {
          amount: amount,
          aName: name,
          aNumber: number,
          bName: bName,
          email: email,
          pNumber: pNumber,
        }
      );

      if (res?.data?.success) {
        toast.success("Withdrawal request added");
        setLoading(false);
        setLoaded(true);
      } else {
        toast.error("Somthing went wrong!");
        setLoading(false);
      }

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      if (err?.response?.data?.error) {
        // setError(err?.response?.data?.error);
        return toast.error(err?.response?.data?.error);
      } else {
        return toast.error("Somthing went wrong!");
      }
    }
  };

  return { loading, make, loaded };
}
