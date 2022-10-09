import { PurchasesThunkFunctions } from "./thunkFunctions";
import { createSlice } from "@reduxjs/toolkit";
export interface purchasesState {}
export const initialState: purchasesState = {};
export const purchasesSlice = createSlice({
  name: "purchases",
  initialState,
  reducers: {},
  extraReducers(builder) {},
});
export default purchasesSlice.reducer;
