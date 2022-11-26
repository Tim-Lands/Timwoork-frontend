import { createAsyncThunk } from "@reduxjs/toolkit";
import { PurchasesService } from "services/purchasesService";
const getPurchasesData = createAsyncThunk(
  "purchases/data",
  async (args, { rejectWithValue }) => {
    try {
      const res = await PurchasesService.getAll();
      return res;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
const getOnePurchase = createAsyncThunk(
  "purchases/data/one",
  async (args: { id: number }, { rejectWithValue }) => {
    const { id } = args;
    try {
      const res = await PurchasesService.getOne(id);
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const updatePurchase = createAsyncThunk(
  "purchases/update/one",
  async (
    args: { id: number; query: string; headers?: any; body?: any },
    { rejectWithValue, dispatch }
  ) => {
    const { id, query, headers, body } = args;
    try {
      const res = await PurchasesService.updateOne(query, body, headers);
      dispatch(getOnePurchase({ id }));
      dispatch(getPurchasesData());
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const PurchasesThunkFunctions = {
  getPurchasesData,
  getOnePurchase,
  updatePurchase,
};
