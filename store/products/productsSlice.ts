import { createSlice } from "@reduxjs/toolkit";
export interface productsState {}
export const initialState: productsState = {};
export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers() {},
});
export default productsSlice.reducer;
