import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Libs() {
  const [data, setData] = useState([]);

  async function check(id) {
    try {
      const promise = toast.promise(
        axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/refund`, {
          refundId: id,
          action: "CHECK",
        }),
        {
          loading: "Checking...",
        }
      );
      const res = await promise;
      console.log(res);
      const resData = res?.data;

      if (resData.success) {
        toast.success(resData.success);
      }
    } catch (err) {
      console.log(err);
      if (err?.response?.data?.error) {
        toast.error(err?.response?.data?.error);
        return;
      } else {
        toast.error("Somthing went wrong!");
        return;
      }
    }
  }

  async function approve(id) {
    try {
      const promise = toast.promise(
        axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/refund`, {
          refundId: id,
          action: "APPROVE",
        }),
        {
          loading: "Checking...",
        }
      );
      const res = await promise;
      console.log(res);
      const resData = res?.data;

      if (resData.success) {
        toast.success(resData.success);
        window.location.reload();
      }

    } catch (err) {
      console.log(err);
      if (err?.response?.data?.error) {
        toast.error(err?.response?.data?.error);
        return;
      } else {
        toast.error("Somthing went wrong!");
        return;
      }
    }
  }

  async function reject(id) {
    try {
      const promise = toast.promise(
        axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/refund`, {
          refundId: id,
          action: "REJECT",
        }),
        {
          loading: "Checking...",
        }
      );
      const res = await promise;
      console.log(res);
      const resData = res?.data;

      if (resData.success) {
        toast.success(resData.success);
        window.location.reload();
      }

    } catch (err) {
      console.log(err);
      if (err?.response?.data?.error) {
        toast.error(err?.response?.data?.error);
        return;
      } else {
        toast.error("Somthing went wrong!");
        return;
      }
    }
  }

  async function get() {
    try {
      const promise = toast.promise(
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/refund`),
        {
          loading: "Loading...",
          success: "Success",
        }
      );

      const res = await promise;
      console.log(res);
      const resData = res?.data;

      if (resData.data) {
        setData(resData.data);
        // toast.success(resData.withdrawals);
      } else {
        toast.success("Somthing went wrong");
      }
    } catch (err) {
      console.log(err);
      if (err?.response?.data?.error) {
        toast.error(err?.response?.data?.error);
        return;
      } else {
        toast.error("Somthing went wrong!");
        return;
      }
    }
  }

  return { check, get, data, approve, reject };
}
