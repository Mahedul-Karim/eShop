import React from "react";
import { CiShoppingCart } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";

const TableActions = ({ isCart=false, onClick1, onClick2 }) => {
  return (
    <>
      {!isCart && (
        <button
          className="hidden md:flex items-center justify-center text-xl"
          onClick={onClick1}
        >
          <CiShoppingCart />
        </button>
      )}
      <button
        className="hidden md:flex items-center justify-center"
        onClick={onClick2}
      >
        <RxCross1 />
      </button>
    </>
  );
};

export default TableActions;
