"use client";
import React, { useEffect, useState } from "react";
import Styles from "./styles.module.css";
import Image from "next/image";
import TransactionCradList from "@/components/TransactionCradList/TransactionCradList";
import { useSession } from "next-auth/react";
import useGetTransactions from "@/hooks/useGetTransactions";
import Link from "next/link";

export default function Wallet() {
  //   const data = [
  //     {
  //       Id: "John Michael",
  //       Date: "Manager",
  //       Type: "23/04/18",
  //       Amount: 80.0,
  //       Status: "Approved",
  //     },
  //   ];

  const { data: session } = useSession();
  const {
    data,
    error,
    getTransactions,
    myMoney,
    fullIncome,
    fullWithdrawals,
    fullExpenses,
  } = useGetTransactions();
  const [state, setState] = useState("None");

  useEffect(() => {
    getTransactions(session?.user?.id);
  }, []);

  return (
    <div className="p-4 mb-[150px]">
      <div className="flex gap-[30px]  flex-wrap justify-center items-center">
        <div className="flex flex-col ">
          <p className="text-sm text-gray-600">My Money</p>
          <p className="font-bold text-2xl">Rs.{myMoney}</p>
        </div>
        <div className="flex flex-col ">
          <p className="text-sm text-gray-600">Income</p>
          <p className="font-bold text-2xl">Rs.{fullIncome}</p>
        </div>
        <div className="flex flex-col ">
          <p className="text-sm text-gray-600">Withdrawals</p>
          <p className="font-bold text-2xl">Rs.{fullWithdrawals}</p>
        </div>
        <div className="flex flex-col ">
          <p className="text-sm text-gray-600">Expenses</p>
          <p className="font-bold text-2xl">Rs.{fullExpenses}</p>
        </div>
      </div>
      <center>
        <div>
          <Link href={"/wallet/withdraw"}>
            <button className="p-2 rounded-md bg-blue-600 text-sm text-white my-[25px]">
              Withdraw Money
            </button>
          </Link>
        </div>
      </center>
      <div className="flex gap-[10px] font-semibold overflow-x-auto w-full cursor-pointer">
        <p
          onClick={() => {
            setState("None");
          }}
          className={state === "None" ? "text-blue-600" : ""}
        >
          All Transactions
        </p>
        <p
          onClick={() => {
            setState("Income");
          }}
          className={state === "Income" ? "text-blue-600" : ""}
        >
          My Income
        </p>
        <p
          onClick={() => {
            setState("Expense");
          }}
          className={state === "Expense" ? "text-blue-600" : ""}
        >
          My Expenses
        </p>
        <p
          onClick={() => {
            setState("Withdrawal");
          }}
          className={state === "Withdrawal" ? "text-blue-600" : ""}
        >
          My Withdrawals
        </p>
      </div>

      <div className={Styles.body}>
        <TransactionCradList TABLE_ROWS={data} state={state} />
      </div>
    </div>
  );
}
// 0.All transaction
// 1.My income
// 2.Withdrwals
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
