"use client";
import React, { useEffect, useState } from "react";
import Libs from "./libs/libs";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@/Context/ThemeContext/ThemeContext";

export default function Withdraw() {
  const { check, get, data, approve, reject } = Libs();
  const [open, setOpen] = useState(1);
  const [type, setType] = useState("PENDING");
  const [filterdData, setFilteredData] = useState([]);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  useEffect(() => {
    get();
  }, []);

  useEffect(() => {
    const filterdData = data.filter((d) => {
      return d.status === type;
    });
    setFilteredData(filterdData);
  }, [type, data]);

  return (
    <div className="p-4">
      <div className="flex gap-[20px] justify-center items-center my-[15px] cursor-pointer">
        <p
          onClick={() => {
            setType("PENDING");
          }}
          className={type === "PENDING" ? "text-blue-600" : ""}
        >
          {" "}
          Pending
        </p>
        <p
          onClick={() => {
            setType("APPROVED");
          }}
          className={type === "APPROVED" ? "text-blue-600" : ""}
        >
          Approved
        </p>
        <p
          onClick={() => {
            setType("REJECTED");
          }}
          className={type === "REJECTED" ? "text-blue-600" : ""}
        >
          Rejected
        </p>
      </div>
      <div>
        {filterdData.map((d, index) => (
          <div key={d.id}>
            <Accordion open={open === index + 1}>
              <AccordionHeader onClick={() => handleOpen(index + 1)}>
                <div className="flex gap-[25px] text-sm font-semibold text-gray-700">
                  <p>Id: #{d.id}</p>
                  <p>
                    <span className="text-gray-700">
                      createdAt:{d.createdAt}
                    </span>
                  </p>
                  <p>
                    Status:{" "}
                    <span
                      className={`${
                        d.status === "APPROVED"
                          ? "text-green-400"
                          : d.status === "PENDING"
                          ? "text-gray-400"
                          : "text-red-400"
                      }`}
                    >
                      {d.status}
                    </span>
                  </p>
                  <p>
                    Amount: <span className="text-gray-700">Rs.{d.amount}</span>
                  </p>
                </div>
              </AccordionHeader>
              <AccordionBody>
                <div className="flex gap-[25px] items-start justify-center">
                  <div>
                    <div className="flex flex-col gap-[10px] text-sm font-semibold text-gray-700">
                      <p>Id: #{d.id}</p>
                      <p>
                        <span className="text-gray-700">
                          CreatedAt:{d.createdAt}
                        </span>
                      </p>
                      <p>
                        Status:{" "}
                        <span
                          className={`${
                            d.status === "APPROVED"
                              ? "text-green-400"
                              : d.status === "PENDING"
                              ? "text-gray-400"
                              : "text-red-400"
                          }`}
                        >
                          {d.status}
                        </span>
                      </p>
                      <p>
                        Amount:{" "}
                        <span className="text-gray-700">Rs.{d.amount}</span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="flex flex-col gap-[10px] text-sm font-semibold text-gray-700">
                      <p className="text-gray-400">Details</p>
                      <p>
                        acountName:{" "}
                        <span className="text-gray-700">{d.acountName}</span>
                      </p>
                      <p>
                        acountNumber:{" "}
                        <span className="text-gray-700">{d.acountNumber}</span>
                      </p>
                      <p>
                        bankName:{" "}
                        <span className="text-gray-700">{d.bankName}</span>
                      </p>
                      <p>
                        <span className="text-gray-700">email: {d.email}</span>
                      </p>
                      <p>
                        <span className="text-gray-700">
                          Phone Number: {d.phoneNum}
                        </span>
                      </p>
                      {d.status === "PENDING" ? (
                        <div className="flex flex-col gap-[10px] text-sm font-semibold text-gray-700">
                          <button
                            className="p-2 font-semibold border-2 rounded-md"
                            onClick={() => {
                              check(d.id);
                            }}
                          >
                            Check
                          </button>
                          <button
                            className="p-2 font-semibold border-2 rounded-md border-green-500"
                            onClick={() => {
                              approve(d.id);
                            }}
                          >
                            Approve
                          </button>
                          <button
                            className="p-2 font-semibold border-2 rounded-md border-red-500"
                            onClick={() => {
                              reject(d.id);
                            }}
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </AccordionBody>
            </Accordion>
          </div>
        ))}
      </div>
    </div>
  );
}
