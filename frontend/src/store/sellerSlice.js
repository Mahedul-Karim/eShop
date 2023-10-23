import { createSlice } from "@reduxjs/toolkit";

const sellerSlice = createSlice({
  name: "seller",
  initialState: {
    isSellerLoggedIn: false,
    sellerError: null,
    seller: null,
    sellerToken: null,
    isSellerLoading: false,
    adminSeller:[]
  },
  reducers: {
    sellerRequest(state) {
      state.isSellerLoading = true;
    },
    sellerRequestSuccess(state, action) {
      state.seller = action.payload.seller;
      state.sellerToken = action.payload.sellerToken;
      state.isSellerLoading = false;
      state.isSellerLoggedIn = true;
    },
    sellerRequestFailed(state, action) {
      state.isSellerLoading = false;
    },
    clearError(state) {
      state.sellerError = null;
    },
    sellerLogOut(state){
      state.seller=null;
      state.sellerToken=null;
      state.isSellerLoggedIn=false;
      state.isSellerLoading=false;
    },
    getAllSeller(state,action){
      state.adminSeller=action.payload
    }
  },
});

export const sellerActions=sellerSlice.actions;
export default sellerSlice;