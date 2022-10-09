import { createSlice } from "@reduxjs/toolkit";
export interface chatState {}
export const initialState: chatState = {};
export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
  extraReducers() {},
});
export default chatSlice.reducer;
