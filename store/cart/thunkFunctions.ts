import { createAsyncThunk } from "@reduxjs/toolkit";
const getCartData = createAsyncThunk("cart/data", async () => {});
export const CartThunkFunctions = {
  getCartData,
};
