import { createAsyncThunk } from "@reduxjs/toolkit";
import { NotificationsService } from "services/notificationsService";
const getNotificationsData = createAsyncThunk(
  "notifications/get/all",
  async (args: { pageNumber: number }, { rejectWithValue }) => {
    const { pageNumber } = args;
    try {
      const res = await NotificationsService.getAll(pageNumber);
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const notificationsThunkFunctions = { getNotificationsData };
