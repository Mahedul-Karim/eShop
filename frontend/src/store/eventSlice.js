import { createSlice } from "@reduxjs/toolkit";

const eventSlice = createSlice({
  name: "event",
  initialState: {
    eventError: null,
    event: [],
    isEventLoading: false,
  },
  reducers: {
    eventRequest(state) {
      state.isEventLoading = true;
    },
    eventRequestSuccess(state, action) {
      state.event.push(action.payload);
      state.isEventLoading = false;
    },
    eventRequestFailed(state, action) {
      state.eventError = action.payload;
      state.isEventLoading = false;
    },
    allevents(state, action) {
      state.event = action.payload;
      state.isEventLoading = false;
    },
    deleteevents(state,action){
      state.event = state.event.filter(e=>e._id !== action.payload);
      state.isEventLoading = false;
    },
    clearError(state) {
      state.eventError = null;
    },
  },
});

export const eventActions = eventSlice.actions;
export default eventSlice;
