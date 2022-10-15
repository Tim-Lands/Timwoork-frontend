import { CartService } from "../../services/cartService";
import { createAsyncThunk } from "@reduxjs/toolkit";
const getCartData = createAsyncThunk(
  "cart/data",
  async (args, { rejectWithValue }) => {
    try {
      const res = await CartService.getAll();
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
const addProduct = createAsyncThunk(
  "cart/product/add",
  async (
    args: { product_id: number; quantity: number; developments: Array<string> },
    { rejectWithValue, dispatch }
  ) => {
    const { product_id, quantity, developments } = args;
    try {
      const res = await CartService.addOne(product_id, developments, quantity);
      dispatch(getCartData());
      return res;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
const deleteProduct = createAsyncThunk(
  "cart/product/delete",
  async (args: { id: number }, { rejectWithValue, dispatch }) => {
    const { id } = args;
    try {
      const res = await CartService.deleteOne(id);
      dispatch(getCartData());
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const CartThunkFunctions = {
  getCartData,
  addProduct,
  deleteProduct,
};
