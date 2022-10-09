import { createSlice } from "@reduxjs/toolkit";
export interface currencyState {}
export const initialState: currencyState = {};
export const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {},
  extraReducers() {},
});
export default currencySlice.reducer;
