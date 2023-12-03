"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function useGetTransactions() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [myMoney, setMyMoney] = useState(0);
  const [fullIncome, setFullIncome] = useState(0);
  const [fullWithdrawals, setFullWithdrawals] = useState(0);
  const [fullExpenses, setFullExpenses] = useState(0);
  const [loadedAmount, setLoadedAmount] = useState(false);

  const getTransactions = async (page, id) => {
    try {
      setLoadedAmount(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${id}/transactions`
      );
      console.log(res);
      if (res?.data?.data) {
        setLoadedAmount(false);
        setData(res?.data?.data);
        setMyMoney(res?.data?.myMoney);
        setFullIncome(res?.data?.fullIncome);
        setFullWithdrawals(res?.data?.fullWithdrawals);
        setFullExpenses(res?.data?.fullExpenses);
      }
    } catch (err) {
      setLoadedAmount(false);
      console.log(err);
      if (err?.response?.data?.error) {
        setError(err?.response?.data?.error);
        return toast.error(err?.response?.data?.error);
      } else {
        return toast.error("Somthing went wrong!");
      }
    }
  };

  return {
    data,
    error,
    getTransactions,
    myMoney,
    fullIncome,
    fullWithdrawals,
    fullExpenses,
    loadedAmount
  };
}
