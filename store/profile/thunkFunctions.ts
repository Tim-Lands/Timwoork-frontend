import { ProfileService } from "services/profileService";
import { createAsyncThunk } from "@reduxjs/toolkit";
const getProfileData = createAsyncThunk(
  "profile/data",
  async (args, { rejectWithValue }) => {
    try {
      const res = await ProfileService.getData();
      return res;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
const getProfileSellerData = createAsyncThunk(
  "profile/seller/data",
  async (args, { rejectWithValue }) => {
    try {
      const res = await ProfileService.getSeller();
      return res;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const ProfileThunkFunctions = {
  getProfileData,
  getProfileSellerData,
};
