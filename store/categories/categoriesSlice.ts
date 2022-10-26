import { createSlice } from "@reduxjs/toolkit";
export interface categoriesState {}
export const initialState: categoriesState = {};
export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers() {},
});
export default categoriesSlice.reducer;
