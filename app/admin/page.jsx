import Link from "next/link";
import React from "react";

export default function Admin() {
  return (
    <div className="mb-[150px]">
      <div className="">
        <p className="text-sm text-gray-500">Welcome to</p>
        <p className="font-bold text-gray-800 text-2xl">Admin Panel</p>
      </div>
      <div className="p-4 flex  items-center gap-[25px] flex-wrap">
        <div className="text-white font-semibold p-10 rounded-md  bg-gradient-to-r from-cyan-500 to-blue-500">
          <p>Post Approvals</p>
        </div>
        <Link href={"/admin/withdraw"}>
          <div className="bg-blue-600 cursor-pointer text-white font-semibold p-10 rounded-md  bg-gradient-to-r from-cyan-500 to-blue-500">
            <p>Withdrawal Requests</p>
          </div>
        </Link>
        <Link href={"/admin/refunds"}>
          <div className="bg-blue-600 text-white font-semibold p-10 rounded-md bg-gradient-to-r from-cyan-500 to-blue-500">
            <p>Refund Requests</p>
          </div>
        </Link>
        <div className="bg-blue-600 text-white font-semibold p-10 rounded-md  bg-gradient-to-r from-cyan-500 to-blue-500    ">
          <p>Removable Requests</p>
        </div>
      </div>
    </div>
  );
}
