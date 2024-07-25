import React from "react";

const CartQuantity = ({ extraClass,onClick1,onClick2,count }) => {
  return (
    <div
      className={`${extraClass} items-center w-[30%] md:w-[60%] rounded-md justify-between h-8 400px:h-[40px] border border-solid border-gray-400`}
    >
      <button
        className=" w-[30%] border-r border-solid border-gray-400 400px:text-2xl h-full"
        onClick={onClick1}
      >
        -
      </button>
      <p className="w-[40%] flex items-center justify-center h-full 400px:text-base text-sm">
        {count}
      </p>
      <button
        className="w-[30%] border-l border-solid border-gray-400 400px:text-2xl h-full"
        onClick={onClick2}
      >
        +
      </button>
    </div>
  );
};

export default CartQuantity;
