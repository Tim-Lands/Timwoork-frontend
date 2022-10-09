import { createSlice } from "@reduxjs/toolkit";
export interface cartState {}
export const initialState: cartState = {};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers() {},
});
export default cartSlice.reducer;
