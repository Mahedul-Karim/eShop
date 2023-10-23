import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    adminOrders:[]
  },
  reducers: {
    orderRequestSuccess(state, action) {
      state.orders = action.payload;
      state.isorderLoading = false;
    },
    updateOrder(state, action) {
      const order = action.payload;

      const existingOrderIndex = state.orders.findIndex(
        (o) => o._id === order._id
      );

      state.orders[existingOrderIndex] = order;
    },
    getAllOrders(state,action){
      state.adminOrders=action.payload
    }
  },
});

export const orderActions = orderSlice.actions;
export default orderSlice;
