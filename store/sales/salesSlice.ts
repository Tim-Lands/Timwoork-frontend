import { createSlice } from "@reduxjs/toolkit";
export interface salesState {}
export const initialState: salesState = {};
export const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {},
  extraReducers() {},
});
export default salesSlice.reducer;
