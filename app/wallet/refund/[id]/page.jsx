"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import Image from "next/image";
import useRefund from "@/hooks/useRefund";

export default function Refund({ params }) {
  const { id } = params;

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [bName, setBName] = useState("");
  const [email, setEmail] = useState("");
  const [pNumber, setPNumber] = useState("");

  const { refund } = useRefund();

  const handleRefund = async () => {
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

    await refund(id, name, number, bName, email, pNumber);
  };

  return (
    <div className="p-4 mb-[250px] md:flex justify-center gap-[50px] items-center ">
      <div>
        <p className="text-3xl font-bold text-black">Refund</p>

        <div className="my-[10px]">
          <p className="text-sm text-gray-700">
            After you made a request wait for approval.
          </p>
          <p className="text-sm text-gray-700">
            After refunded we will send you a email.
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
              handleRefund();
            }}
          >
            Refund
          </button>
        </div>
      </div>
    </div>
  );
}
