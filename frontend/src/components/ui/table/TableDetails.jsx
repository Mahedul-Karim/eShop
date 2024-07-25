import React from "react";
import { RxCross1 } from "react-icons/rx";

const TableDetails = ({ src, children,onClick }) => {
  return (
    <div className="flex items-center justify-between md:justify-normal">
      <img
        src={src}
        alt=""
        className="w-16 400px:w-24 md:w-28 object-contain aspect-video"
      />
      <p className="max-w-full w-[60%] line-clamp-2 text-sm 400px:text-base leading-6 400px:leading-8">
        {children}
      </p>
      <button className="flex md:hidden items-center justify-center" onClick={onClick}>
        <RxCross1 />
      </button>
    </div>
  );
};

export default TableDetails;
