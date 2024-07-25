import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { BsCartPlus } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { wishlistAction } from "../../store/wishlistSlice";
import { cartAction } from "../../store/cartSlice";
import toast from "react-hot-toast";
import TableGrid from "../ui/table/Grid";
import { CiShoppingCart } from "react-icons/ci";
import TableDetails from "../ui/table/TableDetails";
import TableMobilePricing, { TablePricing } from "../ui/table/TablePricing";
import TableStock from "../ui/table/TableStock";
import TableActions from "../ui/table/TableActions";

const WishListItems = ({ data }) => {
  

  const dispatch = useDispatch();

  const handleCardAdd = function (product) {
    dispatch(cartAction.addToCart({ ...product, quantity: 1 }));
    toast.success("Product added to cart");
    dispatch(wishlistAction.removewishlistItem(product._id));
  };

  const removeFromWishlist = function (id) {
    dispatch(wishlistAction.removewishlistItem(id));
  };

  return (
    <TableGrid
      extraClass={
        "border-t md:border-t-0 border-b border-solid py-5 items-center"
      }
    >
      <TableDetails
        src={data?.images?.[0].url}
        onClick={() => removeFromWishlist(data._id)}
      >
        {data.name}
      </TableDetails>

      <TableMobilePricing
        price={data?.price}
        stock={data?.stock}
        onClick={() => handleCardAdd(data)}
      />
      <TablePricing price={data?.price} />

      <TableStock stock={data?.stock} />
      <TableActions onClick1={() => handleCardAdd(data)} onClick2={() => removeFromWishlist(data._id)}/>
    </TableGrid>
    
  );
};
export default WishListItems;
