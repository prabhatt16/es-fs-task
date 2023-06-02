import React, { useEffect, useState } from "react";

function ItemCard({ data }) {
  return (
    <div>
      <div className="flex flex-row justify-start flex-wrap sm:flex-nowrap items-center border-b border-gray-300 py-7 mx-3 pb-3 cursor-pointer">
        <div className=" h-72 w-full sm:w-96 sm:h-44 p-2 object-cover">
          <img
            src={data?.image}
            alt="itemImage"
            className="w-full h-full"
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className="flex flex-col justify-start items-start px-3">
          <div className="flex flex-row justify-start items-center flex-wrap">
            <div className="bg-[#3a3a3a] px-2 rounded-sm w-fit mr-2 mb-2">
              <p className="text-white text-xs">{"item"}</p>
            </div>
          </div>
          <div className=" cursor-pointer">
            <h1 className="font-bold text-xl">
              {data?.title.substring(0, 100) + "..."}
            </h1>
            <p className="text-xs text-gray-500 font-thin">
              {data?.description.substring(0, 230) + "..."}
            </p>
            <div className="flex flex-row justify-between items-center w-full py-2">
              <p className="text-red-400 text-sm">{data?.author}</p>
              <p className="text-black text-sm">{data?.date}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
