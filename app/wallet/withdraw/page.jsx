"use client";
import LoadingModel from "@/components/LoadingModel/LoadingModel";
import useGetTransactions from "@/hooks/useGetTransactions";
import useWithdraw from "@/hooks/useWithdraw";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Modal from "react-modal";

export default function Withdraw() {
  const { data: session } = useSession();
  const [formError, setFormError] = useState(null);
  const { data, error, getTransactions, myMoney, loadedAmount } =
    useGetTransactions();
  const [amount, setAmount] = useState(0);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [bName, setBName] = useState("");
  const [email, setEmail] = useState("");
  const [pNumber, setPNumber] = useState("");

  const { loading, make, loaded } = useWithdraw();
  const router = useRouter();

  useEffect(() => {
    getTransactions(session?.user?.id);
  }, []);

  const handleWithdrawal = async () => {
    if (!name.trim()) {
      toast.error("Please enter acount name");
      return;
    }
    if (!number.trim()) {
      toast.error("Please enter acount number");
      return;
    }
    if (!bName.trim()) {
      toast.error("Please enter bank name");
      return;
    }
    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }
    if (!pNumber.trim()) {
      toast.error("Please enter your phone number");
      return;
    }

    await make(name, number, bName, email, pNumber, amount);
  };

  console.log(loading);

  if (loadedAmount) {
    return (
      <div className="h-[90vh] flex justify-center items-center">
        <div className="">
          <center>
            <Image
              src={"/icons/new/loadingnew.svg"}
              width={120}
              height={120}
              alt="loading"
              className=" animate-spin"
            />
          </center>
          <h1 className=" text-base text-gray-800 font-bold text-center">
            Loading...
          </h1>
        </div>
      </div>
    );
  }

  if (loading && !loaded) {
    return (
      <div className="h-[90vh] flex justify-center items-center">
        <div className="">
          <center>
            <Image
              src={"/icons/new/loadingnew.svg"}
              width={120}
              height={120}
              alt="loading"
              className=" animate-spin"
            />
          </center>
          <h1 className=" text-base text-gray-800 font-bold text-center">
            Loading...
          </h1>
        </div>
      </div>
    );
  }

  if (!loading && loaded) {
    setTimeout(() => {
      router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/wallet`);
    }, 1000);
    return (
      <div className="h-[90vh] flex justify-center items-center ">
        <div className="">
          <h1 className="my-[20px] text-[#02D871] font-bold text-2xl text-center">
            We will send you a email after withdrawal is successed..
          </h1>
          <center>
            <Image
              src={"/gif/success.gif"}
              width={160}
              height={160}
              alt="loading"
              // className=" animate-spin"
            />
          </center>
          <h1 className="mt-[20px] text-base text-[#02D871] font-bold text-center">
            Success - Redirecting
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 mb-[250px] md:flex justify-center gap-[50px] items-center ">
      <div>
        <p className="text-sm text-gray-700">You have</p>
        <p className="text-3xl font-bold text-black">Rs.{myMoney}</p>
        <div className="my-[10px]">
          <p className="text-sm text-gray-700">
            Minimum withdrawal amount is Rs.50.
          </p>
          <p className="text-sm text-gray-700">
            Remember to save Rs.50 in your acount.
          </p>
        </div>
      </div>
      <div className="mt-[20px] flex flex-col gap-[20px]">
        <div className="flex flex-col">
          <label className="text-sm text-gray-600">
            Acount Name<span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            required
            className="p-2 rounded-lg text-black font-semibold border-2 md:w-[450px]"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-gray-600">
            Acount Number<span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            required
            className="p-2 rounded-lg text-black font-semibold border-2 md:w-[450px]"
            value={number}
            onChange={(e) => {
              setNumber(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-gray-600">
            Bank Name <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            required
            className="p-2 rounded-lg text-black font-semibold border-2 md:w-[450px]"
            value={bName}
            onChange={(e) => {
              setBName(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-gray-600">
            Amount <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            required
            className="p-2 rounded-lg text-black font-semibold border-2 md:w-[450px]"
            onChange={(e) => {
              setAmount( amount < myMoney - 50 ? e.target.value :  myMoney - 50);
            }}
            value={amount < myMoney - 50 ? amount : myMoney - 50}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-gray-600">
            Email <span className="text-red-600">*</span>
          </label>
          <input
            type="email"
            required
            className="p-2 rounded-lg text-black font-semibold border-2 md:w-[450px]"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-gray-600">
            Phone Num. <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            required
            className="p-2 rounded-lg text-black font-semibold border-2 md:w-[450px]"
            value={pNumber}
            onChange={(e) => {
              setPNumber(e.target.value);
            }}
          />
        </div>
        <div>
          <button
            className="p-2 rounded-md bg-gray-900 text-white"
            onClick={() => {
              handleWithdrawal();
            }}
          >
            Withdraw
          </button>
        </div>
      </div>
    </div>
  );
}
