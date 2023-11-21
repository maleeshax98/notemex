import React, { useState } from "react";
const notesCato = ["All", "Free", "Premium", "Note", "PDF"];
import Image from "next/image";

export default function CatoList() {
  const [active, setActive] = useState("All");

  return (
    <div className="flex gap-[10px] m-[10px]">
      {notesCato.map((cato) => (
        <div
          className={` cursor-pointer ${
            active === cato
              ? "p-[5px] rounded-md border-2 border-[#3269ff] text-[#3269ff] bg-[#2d5cdc5a]  text-center"
              : "p-[5px] rounded-md border-2 border-[#d5d5d5] text-[#a4a4a4] bg-[#ededed2f]  text-center"
          }`}
          onClick={(e) => setActive(cato)}
          key={cato}
        >
          {cato === "Premium" ? (
            <div className="flex gap-[5px] items-center">
              <Image src="/icons/pro.svg" width={25} height={25} className="w-[25px]" alt="" />
              <p>{cato}</p>
            </div>
          ) : (
            cato
          )}
        </div>
      ))}
    </div>
  );
}
