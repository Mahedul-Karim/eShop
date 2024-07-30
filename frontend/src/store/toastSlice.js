import { createSlice } from "@reduxjs/toolkit";

const toastSlice = createSlice({
  name: "toast",
  initialState: {
    toasts: [],
  },
  reducers: {
    createToast(state, action) {
      state.toasts.push(action.payload.toast);
    },
    deleteToast(state, action) {
      state.toasts = state.toasts.filter(
        (elem) => elem.id !== action.payload.id
      );
    },
  },
});

export const { createToast, deleteToast } = toastSlice.actions;
export default toastSlice;
