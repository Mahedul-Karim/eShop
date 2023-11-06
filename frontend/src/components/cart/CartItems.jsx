import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import styles from "../../util/style";
import { cartAction } from "../../store/cartSlice";
import { useDispatch } from "react-redux";

const CartItems = ({ data }) => {
  const [value, setValue] = useState(1);
  const totalPrice = data.originalPrice
    ? data.originalPrice * data.quantity
    : data.discountPrice * data.quantity;

  const dispatch = useDispatch();

  const handleCartRemove = function (id) {
    dispatch(cartAction.removeCartItem(id));
  };

  const handleQuantityIncrease = function (product) {
    dispatch(
      cartAction.addToCart({
        ...product,
        quantity: data.stock > data.quantity ? 1 : 0,
      })
    );
  };
  const handleQuantityDecrese = function (product) {
    dispatch(
      cartAction.removeCartQuantity({
        ...product,
        quantity: data.quantity > 1 ? 1 : 0,
      })
    );
  };

  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
        <div>
          <div
            className={`bg-primary border rounded-full w-[25px] h-[25px] ${
              styles.noramlFlex
            } justify-center ${
              data.stock > data.quantity
                ? "cursor-pointer"
                : "cursor-not-allowed"
            }`}
            onClick={() => handleQuantityIncrease(data)}
          >
            <HiPlus size={18} color="#fff" />
          </div>
          <span className="pl-[10px]">{data.quantity}</span>
          <div
            className={`bg-[#a7abb14f] rounded-full w-[25px] h-[25px] flex items-center justify-center ${
              data.quantity > 1 ? "cursor-pointer" : "cursor-not-allowed"
            }`}
            onClick={() => handleQuantityDecrese(data)}
          >
            <HiOutlineMinus size={16} color="#7d879c" />
          </div>
        </div>
        <img
          src={data.images[0].url}
          alt=""
          className="w-[100px] h-min ml-2 mr-2 rounded-[5px]"
        />
        <div className="pl-[5px]">
          <h1>{data.name}</h1>
          <h4 className="font-[400] text-[15px] text-[#00000082]">
            ${data.originalPrice ? data.originalPrice : data.discountPrice}*
            {data.quantity}
          </h4>
          <h4 className="font-[600] text-[17px] pt-[3px] text-secondary font-Roboto">
            US${totalPrice}
          </h4>
        </div>
        <div className=" w-[25px] h-[25px] flex items-center justify-center cursor-pointer">
          <RxCross1
            className="cursor-pointer"
            onClick={() => handleCartRemove(data._id)}
          />
        </div>
      </div>
    </div>
  );
};
export default CartItems;
