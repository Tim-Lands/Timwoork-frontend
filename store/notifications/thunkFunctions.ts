import { createAsyncThunk } from "@reduxjs/toolkit";
const getData = createAsyncThunk("notifications/get", async () => {});
export const notificationsThunkFunctions = { getData };
