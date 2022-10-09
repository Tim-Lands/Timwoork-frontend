import { createAsyncThunk } from "@reduxjs/toolkit";
const getProductsData = createAsyncThunk("products/data", async () => {});
export const ProductsThunkFunctions = {
  getProductsData,
};
