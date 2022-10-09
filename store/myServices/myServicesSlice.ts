import { createSlice } from "@reduxjs/toolkit";
export interface myServicesState {}
export const initialState: myServicesState = {};
export const myServicesSlice = createSlice({
  name: "myServices",
  initialState,
  reducers: {},
  extraReducers() {},
});
export default myServicesSlice.reducer;
