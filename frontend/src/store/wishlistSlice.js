import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlist: localStorage.getItem("wishlistItems")
      ? JSON.parse(localStorage.getItem("wishlistItems"))
      : [],
  },
  reducers: {
    addTowishlist(state, action) {
      const item = action.payload;

      const existingItemIndex = state.wishlist.findIndex(
        (c) => c._id === item._id
      );

      const existingItem = state.wishlist[existingItemIndex];

      if (existingItem) {
        toast.error("Product is already in the wishlist");
      } else {
        state.wishlist.push(item);
        localStorage.setItem("wishlistItems", JSON.stringify(state.wishlist));
        toast.success("Product added to the wishlist");
      }
    },
    removewishlistItem(state, action) {
      const itemId = action.payload;

      state.wishlist = state.wishlist.filter((c) => c._id !== itemId);
      localStorage.setItem("wishlistItems", JSON.stringify(state.wishlist));
      
    },
    allwishList(state,action){
      
    }
  },
});

export const wishlistAction = wishlistSlice.actions;
export default wishlistSlice;
