import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import styles from "../../util/style";

import WishListItems from "./WishListItems";
import { useSelector } from "react-redux";

const Wishlist = ({ setOpenWishlist, openWishlist }) => {
  const { wishlist } = useSelector((state) => state.wishlist);

  return (
    <div
      className={`fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10 ${
        openWishlist ? "visible" : "invisible"
      }`}
    >
      <div
        className={`fixed top-0 right-0 h-screen w-[80%] 800px:w-[40%] bg-white flex flex-col overflow-hidden justify-between shadow-sm ${
          openWishlist ? "translate-x-0" : "translate-x-[100%]"
        } transition-all duration-800`}
      >
        <>
          <div>
            <div className="flex w-full justify-end pt-5 pr-5">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenWishlist(false)}
              />
            </div>
            <div className={`${styles.noramlFlex} p-4`}>
              <IoBagHandleOutline size={25} />
              <h5 className="pl-2 text-[20px] font-[500]">
                {wishlist && wishlist.length} items
              </h5>
            </div>

            <br />
            <div className="w-full border-t">
              {wishlist &&
                wishlist.map((i, index) => (
                  <WishListItems key={index} data={i} />
                ))}
            </div>
          </div>
        </>
      </div>
    </div>
  );
};

export default Wishlist;
