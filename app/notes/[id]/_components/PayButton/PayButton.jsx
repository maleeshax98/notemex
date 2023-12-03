"use client";
import React, { useState, useMemo } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";

import { generateHash } from "./libs/generateHash";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { Alert, Input, Dialog } from "@/Context/ThemeContext/ThemeContext";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function PayButton({ noteId }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const { data: session } = useSession();
  const [country, setCountry] = useState("Sri Lanka");

  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (value) => {
    setCountry(value);
  };

  const hanldePayment = async () => {
    setLoading(true);
    if (
      !first_name.trim() ||
      !last_name.trim() ||
      !city.trim() ||
      !address.trim()
    ) {
      setLoading(false);
      // setOpen(false);
      toast.error("Please fill every field");
      return;
    }

    const data = await generateHash(noteId);

    if (data.hash) {
      var payment = {
        sandbox: true,
        merchant_id: `${process.env.NEXT_PUBLIC_MID}`, // Replace your Merchant ID
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/`, // Important
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/`, // Important
        notify_url: `https://caac-2402-4000-2200-d619-6445-cb89-4eb3-610a.ngrok-free.app/api/pay/notify`,
        // notify_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/pay/notify`,
        order_id: data.order_id,
        items: data.title,
        amount: data.payhere_amount,
        currency: "LKR",
        hash: data.hash,
        first_name: first_name,
        last_name: last_name,
        email: session?.user?.email,
        address: address,
        city: city,
        country: country,
      };

      payhere.startPayment(payment);

      payhere.onCompleted = async function onCompleted(orderId) {
        console.log("Payment completed. OrderID:" + orderId);
        toast.success("Payment successed - " + orderId);
        setLoading(false);
        setOpen(false);
        window.location.reload()
      };

      payhere.onError = function onError(error) {
        toast.error("Payment faild");
        setLoading(false);
        setOpen(false);
        console.log("Error:" + error);
      };
    } else {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <div>
      <Dialog open={open} size="xl" className="min-h-[80vh] overflow-auto p-4">
        <Toaster />

        {loading ? (
          <div>
            <center>
              <div className="mt-[50px]">
                <button
                  className="bg-red-600 p-2 rounded-full text-white font-semibold text-sm"
                  onClick={() => {
                    toast.error("Closed without saving");
                    setOpen((prev) => !prev);
                  }}
                >
                  Close
                </button>
                <div>
                  <p className="font-bold text-red-600 text-xl">
                    Don&apos;t close the window
                  </p>
                  <Image
                    src={"/icons/new/loadingnew.svg"}
                    width={40}
                    height={40}
                    alt="loading"
                    className=" animate-spin"
                  />
                  <p className="font-semibold text-gray-500 text-base text-center">
                    Processing...
                  </p>
                </div>
              </div>
            </center>
          </div>
        ) : (
          <div>
            <div className="m-2">
              <button
                className="bg-red-600 p-2 rounded-full text-white font-semibold text-sm"
                onClick={() => {
                  toast.error("Closed without saving");
                  setOpen((prev) => !prev);
                }}
              >
                Close
              </button>
            </div>
            <div className="flex gap-[15px] flex-wrap flex-col mt-[20px]">
              <div className="flex flex-wrap gap-[10px] justify-start items-center">
                <div className="flex flex-col gap-[2px]">
                  <label>First Name</label>
                  <input
                    type="text"
                    className="border-2 p-1 rounded-md"
                    value={first_name}
                    onChange={(e) => {
                      setFirst_name(e.target.value);
                    }}
                  />
                </div>
                <div className="flex flex-col gap-[2px]">
                  <label>Last Name</label>
                  <input
                    type="text"
                    className="border-2 p-1 rounded-md"
                    value={last_name}
                    onChange={(e) => {
                      setLast_name(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-[10px] justify-start items-center">
                <div className="flex flex-col gap-[2px]">
                  <label>City</label>
                  <input
                    type="text"
                    className="border-2 p-1 rounded-md"
                    value={city}
                    onChange={(e) => {
                      setCity(e.target.value);
                    }}
                  />
                </div>
                <div className="flex flex-col gap-[2px] ">
                  <label>Country</label>

                  <Select
                    options={options}
                    value={country}
                    onChange={changeHandler}
                    className="outline-none  border-2 rounded-md sm:w-[30vw]"
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-[10px] justify-start items-center">
                <div className="flex flex-col gap-[2px] ">
                  <label>Address</label>
                  <input
                    type="text"
                    className="border-2 p-1 rounded-md sm:w-[80vw] md:w-[40vw]"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
            <button
              className="p-2 text-white font-semibold rounded-md mt-[20px] bg-blue-600"
              onClick={() => {
                hanldePayment();
              }}
            >
              Countinue to pay
            </button>
          </div>
        )}
      </Dialog>
      <button
        className="p-2 text-white font-semibold rounded-md bg-blue-600"
        onClick={() => {
          setOpen((prev) => !prev);
        }}
      >
        Buy Now
      </button>
    </div>
  );
}
