import { CurrencyService } from "@/services/currency";
import { createAsyncThunk } from "@reduxjs/toolkit";

const getData = createAsyncThunk(
  "currency/get",
  async (args, { rejectWithValue }) => {
    try {
      const res = await CurrencyService.getData();
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const getAllCurrencies = createAsyncThunk(
  "currency/get/all",
  async (args, { rejectWithValue }) => {
    try {
      const res = await CurrencyService.getAll();
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const getAllCurrenciesValues = createAsyncThunk(
  "currency/get/all/values",
  async (args, { rejectWithValue }) => {
    try {
      const res = await CurrencyService.getAllValues();
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const CurrencyThunkFunctions = {
  getData,
  getAllCurrencies,
  getAllCurrenciesValues,
};
