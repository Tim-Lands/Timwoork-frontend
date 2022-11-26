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
const getNotificationsCount = createAsyncThunk(
  "notification/count",
  async (args, { rejectWithValue }) => {
    try {
      const res = await NotificationsService.getCount();
      return res;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
const notificationsReaded = createAsyncThunk(
  "notifications/read",
  async (args, { rejectWithValue, dispatch }) => {
    try {
      const res = await NotificationsService.readAll();
      dispatch(getNotificationsCount());
      return res;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const notificationsThunkFunctions = {
  getNotificationsData,
  getNotificationsCount,
  notificationsReaded,
};
