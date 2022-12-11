import { createSlice } from "@reduxjs/toolkit";

export interface PortfolioState {}

const initialState: PortfolioState = {};

export const PortfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {},
  extraReducers(builder) {},
});
export default PortfolioSlice.reducer;
