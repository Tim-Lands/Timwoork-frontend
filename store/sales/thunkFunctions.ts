import { SalesService } from "@/services/sales";
import { createAsyncThunk } from "@reduxjs/toolkit";
const getData = createAsyncThunk(
  "sales/get",
  async (args, { rejectWithValue }) => {
    try {
      const res = await SalesService.getAll();
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const getOneSale = createAsyncThunk(
  "sales/get/one",
  async (args: { id: number }, { rejectWithValue }) => {
    const { id } = args;
    try {
      const res = await SalesService.getOne(id);

      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const updateSale = createAsyncThunk(
  "sales/update/one",
  async (
    args: { id: number; query: string; headers?: any; body?: any },
    { rejectWithValue, dispatch }
  ) => {
    const { id, query, headers, body } = args;
    try {
      const res = await SalesService.updateOne(query, body, headers);
      dispatch(getOneSale({ id }));
      dispatch(getData());
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const SalesThunkFunctions = { getData, getOneSale, updateSale };
