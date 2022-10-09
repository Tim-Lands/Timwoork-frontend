import { WalletThunkFunctions } from "./thunkFunctions";
import { createSlice } from "@reduxjs/toolkit";
export interface walletState {}
export const initialState: walletState = {};
export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {},
  extraReducers(builder) {},
});
export default walletSlice.reducer;
