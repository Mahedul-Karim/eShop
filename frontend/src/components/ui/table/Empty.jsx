import React from "react";
import { Link } from "react-router-dom";

const Empty = ({ text }) => {
  return (
    <div className="flex flex-col items-center min-h-[50vh] justify-center">
      <p className="flex items-center justify-center text-[28px] 400px:text-[32px] font-bold text-center mt-8">
        {text}
      </p>
      <Link
        to="/products"
        className="flex items-center justify-center bg-primary cursor-pointer px-3 py-2 rounded-md text-sm 400px:text-base text-white mt-6"
      >
        Add One?
      </Link>
    </div>
  );
};

export default Empty;
