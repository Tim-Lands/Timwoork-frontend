import { createAsyncThunk } from "@reduxjs/toolkit";
const getData = createAsyncThunk("currency/get", async () => {});
export const CurrencyThunkFunctions = { getData };
