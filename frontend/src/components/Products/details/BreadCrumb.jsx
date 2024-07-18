import React from "react";
import { IoMdHome } from "react-icons/io";

const BreadCrumb = ({ category, name }) => {
  return (
    <div className="flex items-center gap-1 md:gap-3 text-gray-400">
      <button className="-mt-[4px]">
        <IoMdHome className="text-[16px] 400px:text-[18px] sm:text-[20px]" />
      </button>
      <span className="text-[12px] sm:text-[14px]">/</span>
      <button className="text-[10px] 400px:text-[12px] sm:text-[14px] whitespace-nowrap 400px:-mt-[4px] mt-0">
        {category}
      </button>
      <span className="text-[12px] sm:text-[14px]">/</span>
      <button className="text-[10px] 400px:text-[12px] sm:text-[14px] text-left 400px:-mt-[4px] mt-0 text-black">
        {name}
      </button>
    </div>
  );
};

export default BreadCrumb;
