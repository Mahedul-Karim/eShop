import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import styles from "../../util/style";
import { Link } from "react-router-dom";


import CartItems from "./CartItems";
import { useSelector } from "react-redux";

const Cart = ({ setOpenCart, openCart }) => {
  const { cart } = useSelector((state) => state.cart);

  const total = cart.reduce(
    (a, c) =>
      a +
      (c.originalPrice
        ? c.originalPrice * c.quantity
        : c.discountPrice * c.quantity),
    0
  );
  return (
    <div
      className={`fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10 ${
        openCart ? "visible" : "invisible"
      }`}
    >
      <div
        className={`fixed top-0 right-0 h-screen overflow-hidden w-[80%] 800px:w-[40%] bg-white flex flex-col justify-between shadow-sm ${
          openCart ? "translate-x-0" : "translate-x-[100%]"
        } transition-all duration-800`}
      >
        <>
          <div>
            <div className="flex w-full justify-end pt-5 pr-5">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenCart(false)}
              />
            </div>
            <div className={`${styles.noramlFlex} p-4`}>
              <IoBagHandleOutline size={25} />
              <h5 className="pl-2 text-[20px] font-[500]">
                {cart && cart.length} items
              </h5>
            </div>

            <br />
            <div className="w-full border-t">
              {cart &&
                cart.map((i, index) => <CartItems key={index} data={i} />)}
            </div>
          </div>
          {cart?.length !== 0 && (
            <div className="px-5 mb-3">
              <Link to="/checkout">
                <div
                  className={`h-[45px] flex items-center justify-center w-[100%] bg-primary rounded-[5px]`}
                >
                  <h1 className="text-[#fff] text-[18px] font-[600]">
                    Checkout Now (USD${total})
                  </h1>
                </div>
              </Link>
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export default Cart;
