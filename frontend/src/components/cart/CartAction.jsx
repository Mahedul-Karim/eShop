import React from "react";
import { Link } from "react-router-dom";

const CartAction = ({ total }) => {
  return (
    <div className="w-full 400px:w-[350px] border border-solid rounded-md p-3 flex flex-col gap-2">
      <p className="font-semibold text-lg">Cart Total</p>
      <div className="flex items-center justify-between">
        <p>Subtotal</p>
        <p>${total?.toFixed(2)}</p>
      </div>
      <div className="flex items-center justify-between">
        <p>Shipping</p>
        <p>${Number(0).toFixed(2)}</p>
      </div>
      <div className="border-b border-solid" />
      <div className="flex items-center justify-between">
        <p>Total</p>
        <p>${total?.toFixed(2)}</p>
      </div>
      <Link
        to={"/checkout"}
        className="w-full bg-primary text-center text-white py-2 rounded-md font-semibold"
      >
        Process to Chekout
      </Link>
    </div>
  );
};

export default CartAction;
