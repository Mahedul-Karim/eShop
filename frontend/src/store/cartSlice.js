import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
  },
  reducers: {
    addToCart(state, action) {
      const item = action.payload;

      const existingItemIndex = state.cart.findIndex((c) => c._id === item._id);

      const existingItem = state.cart[existingItemIndex];
      

      if (existingItem) {
        state.cart[existingItemIndex] = {
          ...existingItem,
          quantity: existingItem.quantity + item.quantity,
        };

        localStorage.setItem("cartItems", JSON.stringify(state.cart));
        
      } else {
        state.cart.push(item);
        localStorage.setItem("cartItems", JSON.stringify(state.cart));
        
      }
    },
    allCart(state, action) {
      state.cart = action.payload;
    },
    removeCartQuantity(state, action) {
      const item = action.payload;

      const existingItemIndex = state.cart.findIndex((c) => c._id === item._id);

      const existingItem = state.cart[existingItemIndex];
      
      if (existingItem) {
        state.cart[existingItemIndex] = {
          ...existingItem,
          quantity: existingItem.quantity - item.quantity,
        };

        localStorage.setItem("cartItems", JSON.stringify(state.cart));

      }
    },
    removeCartItem(state, action) {
      const itemId = action.payload;

      state.cart = state.cart.filter((c) => c._id !== itemId);
      localStorage.setItem("cartItems", JSON.stringify(state.cart));
    },
    emptyCart(state){
      state.cart=[]
    }
  },
});

export const cartAction = cartSlice.actions;
export default cartSlice;
