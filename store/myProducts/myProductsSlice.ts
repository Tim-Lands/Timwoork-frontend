import { createSlice } from "@reduxjs/toolkit";
export interface myProductsState {}
export const initialState: myProductsState = {};
export const myProductsSlice = createSlice({
  name: "myProducts",
  initialState,
  reducers: {},
  extraReducers() {},
});
export default myProductsSlice.reducer;
