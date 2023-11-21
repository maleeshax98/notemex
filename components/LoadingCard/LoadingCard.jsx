import React from "react";
import Styles from "../SingleCard/SingleCard.module.css";

const LoadingCard = () => {
  return (
    <div
      className={`${Styles.container} p-4 m-4 rounded-lg max-w-[1050px]  animate-pulse bg-[#b0b0b0] shadow-lg`}
    >
      <div className={`${Styles.details} flex flex-col gap-[10px]`}>
        <div className="flex gap-[20px] items-center">
          <div className="flex items-center gap-[10px]">
            <p className="text-[#747474] bg-[#747474] animate-pulse font-semibold text-xs">
              3 months ago
            </p>
          </div>
        </div>

        <div>
          <h1 className="text-[#747474] bg-[#747474] animate-pulse font-bold text-2xl">
            Direct and Indirect Speech Easy way
          </h1>
          <p className="text-[#747474] bg-[#747474] animate-pulse font-normal text-xs">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda
            facere dolores esse animi adipisci! Odit mollitia aliquam quidem
            optio vitae, deleniti sunt laboriosam placeat ratione, voluptatem
            dicta similique assumenda laborum.
          </p>
        </div>

        <div className="flex items-center gap-[10px]">
          <div className="rounded-full w-[30px] h-[30px] overflow-hidden relative bg-[#747474] animate-pulse "></div>
          <div>
            <p className="text-[#747474] font-semibold text-xs bg-[#747474] animate-pulse">
              Maleesha Nayanashan
            </p>
            <p className="text-[#747474] font-semibold text-xs bg-[#747474] animate-pulse">
              Followers 13k
            </p>
          </div>
          <button className=" rounded-full bg-[#747474] animate-pulse">
                        
          </button>
        </div>
      </div>

      
    </div>
  );
};

export default LoadingCard;
