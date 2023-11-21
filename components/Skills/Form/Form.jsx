import React from "react";

export default function Form() {
  return (
    <div>
      <center>
        <div className=" flex gap-[10px] flex-col w-[90vw] max-w-[550px] rounded-lg shadow-md justify-center p-2">
          <textarea type="text" className=" p-2 rounded-md bg-gray-200 text-gray-900 text-sm font-semibold outline-none" placeholder="Write a post"/>
            <div className="flex flex-wrap gap-[10px]">
                <div className="p-1 rounded-lg bg-green-200 text-white font-semibold text-sm">   
                    <p className="text-green-600">Image</p>
                </div>
                <div className="p-1 rounded-lg bg-blue-200 text-white font-semibold text-sm">   
                    <p className="text-blue-600">Music</p>
                </div>
                <div className="p-1 rounded-lg bg-yellow-200 text-white font-semibold text-sm">   
                    <p className="text-yellow-600">Video</p>
                </div>
            </div>
        </div>
      </center>
    </div>
  );
}
