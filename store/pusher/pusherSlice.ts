import { createSlice } from "@reduxjs/toolkit";
export interface pusherState {}
export const initialState: pusherState = {};
export const pusherSlice = createSlice({
  name: "pusher",
  initialState,
  reducers: {},
});
export default pusherSlice.reducer;
