import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "seller",
  initialState: {
    productError: null,
    product: [],
    isProductLoading: false,
  },
  reducers: {
    productRequest(state) {
      state.isProductLoading = true;
    },
    productRequestSuccess(state, action) {
      state.product.push(action.payload);
      state.isProductLoading = false;
    },
    productRequestFailed(state, action) {
      state.isProductLoading = false;
    },
    allProducts(state, action) {
      state.product = action.payload;
      state.isProductLoading = false;
    },
    deleteProducts(state, action) {
      state.product = state.product.filter((p) => p._id !== action.payload);
      state.isProductLoading = false;
    },
    updateProductReview(state, action) {
      const item = action.payload;

      const existingItemIndex = state.product.findIndex(
        (e) => e._id === item._id
      );

      state.product[existingItemIndex] = item;
    },
    clearError(state) {
      state.productError = null;
    },
  },
});

export const productActions = productSlice.actions;
export default productSlice;
