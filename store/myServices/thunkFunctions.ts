import { createAsyncThunk } from "@reduxjs/toolkit";
const getData = createAsyncThunk("myServices/get", async () => {});
export const MyServicesThunkFunctions = { getData };
