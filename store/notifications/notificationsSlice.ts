import { createSlice } from "@reduxjs/toolkit";
export interface notificationsState {}
export const initialState: notificationsState = {};
export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers(builder) {},
});
export default notificationsSlice.reducer;
