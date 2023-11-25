"use client";
import React, { useEffect } from "react";
import SingleCard from "../SingleCard/SingleCard";
import Image from "next/image";

export default function CardList({ data }) {
  

  return (
    <div className="mb-[150px]">
      {data &&
        data.map((doc) => (
          <div key={doc.id}>
            <SingleCard key={doc.id} data={doc}  />
          </div>
        ))}
    </div>
  );
}
