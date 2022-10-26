import { SalesService } from "services/salesService";
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
export const SalesThunkFunctions = { getData };
