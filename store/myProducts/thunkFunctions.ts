import { createAsyncThunk } from "@reduxjs/toolkit";
const getData = createAsyncThunk("myProducts/get", async () => {});
export const MyProductsThunkFunctions = { getData };
