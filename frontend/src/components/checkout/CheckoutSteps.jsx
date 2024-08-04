import React from "react";
import { FaChevronRight } from "react-icons/fa6";

const CheckoutSteps = ({ active }) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <div className="flex flex-col relative items-center justify-center">
        <div
          className={`w-8 h-8 border border-solid  rounded-full flex items-center justify-center ${
            active >= 1
              ? "border-primary text-white bg-primary font-semibold"
              : "bg-none text-black border-black font-normal"
          }`}
        >
          1
        </div>
        <p
          className={`absolute -bottom-5 text-xs ${
            active >= 1 ? "text-primary" : "text-black"
          }`}
        >
          Checkout
        </p>
      </div>

      <div
        className={`basis-[30%] border border-dashed ${
          active === 2 ? "border-primary" : "border-black"
        }`}
      ></div>
      <div className="flex flex-col relative items-center justify-center">
        <div
          className={`w-8 h-8 border border-solid  rounded-full flex items-center justify-center ${
            active === 2
              ? "border-primary text-white bg-primary"
              : "bg-none text-black border-black"
          }`}
        >
          2
        </div>
        <p
          className={`absolute -bottom-5 text-xs ${
            active === 2 ? "text-primary" : "text-black"
          }`}
        >
          Payment
        </p>
      </div>
      
    </div>
  );
};

export default CheckoutSteps;
