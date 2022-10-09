import { createAsyncThunk } from "@reduxjs/toolkit";
const getPurchasesData = createAsyncThunk("purchases/data", async () => {});
export const PurchasesThunkFunctions = {
  getPurchasesData,
};
