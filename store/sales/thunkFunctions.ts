import { createAsyncThunk } from "@reduxjs/toolkit";
const getData = createAsyncThunk("sales/get", async () => {});
export const SalesThunkFunctions = { getData };
