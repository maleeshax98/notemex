"use client"
import Image from "next/image";
import React from "react";

export default function page() {
  return (
    <div className="flex h-[50vh] items-center justify-center">
      <div>
        <center>
          <div>
            <Image
              src={"/icons/new/beta.svg"}
              width={100}
              height={100}
              alt="beta"
              className="m-3"
            />
          </div>
          <h1 className="font-bold text-2xl  text-gray-800">
            That feature is not avilabel yet.
          </h1>
          <p>Unleashing a new era of possibilities with an exciting feature!</p>
          <button
            className=" p-4 shadow-md m-10 bg-white rounded-lg"
            onClick={() => {
              window.history.back();
            }}
          >
           Go Back
          </button>
        </center>
      </div>
    </div>
  );
}
