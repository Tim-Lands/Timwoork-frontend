import { createSlice } from "@reduxjs/toolkit";
export interface languagesState {}
export const initialState: languagesState = {};
export const languagesSlice = createSlice({
  name: "languages",
  initialState,
  reducers: {},
  extraReducers() {},
});
export default languagesSlice.reducer;
