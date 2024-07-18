import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { BsCartPlus } from 'react-icons/bs';
import { useDispatch } from "react-redux";
import { wishlistAction } from '../../store/wishlistSlice';
import { cartAction } from '../../store/cartSlice';
import toast from "react-hot-toast";

const WishListItems = ({ data }) => {
    const [value,setValue]=useState(1);
    const totalPrice=data.originalPrice*value;
    
  const dispatch=useDispatch();

    const handleCardAdd = function (product) {
      dispatch(cartAction.addToCart({ ...product, quantity: 1 }));
      toast.success("Product added to cart");
      dispatch(wishlistAction.removewishlistItem(product._id));
    };
  
    const removeFromWishlist = function (id) {
      dispatch(wishlistAction.removewishlistItem(id));
    };


    return (
        <div className="border-b p-4">
        <div className="w-full 800px:flex items-center">
          <RxCross1 className="cursor-pointer 800px:mb-['unset'] 800px:ml-['unset'] mb-2 ml-2"
          onClick={() => removeFromWishlist(data._id)}
          />
          <img
            src={data.images[0].url}
            alt=""
            className="w-[130px] h-min ml-2 mr-2 rounded-[5px]"
          />
  
          <div className="pl-[5px]">
            <h1>{data.name}</h1>
            <h4 className="font-[600] pt-3 800px:pt-[3px] text-[17px] text-[#d02222] font-Roboto">
              US${totalPrice}
            </h4>
          </div>
          <div>
            <BsCartPlus size={20} className="cursor-pointer" tile="Add to cart"
             onClick={() => handleCardAdd(data)}
            />
          </div>
        </div>
      </div>
    );
  };
  export default WishListItems;