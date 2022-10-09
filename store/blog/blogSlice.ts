import { createSlice } from "@reduxjs/toolkit";
export interface blogState {}
export const initialState: blogState = {};
export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers() {},
});
export default blogSlice.reducer;
