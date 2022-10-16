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
export const ProfileThunkFunctions = {
  getProfileData,
};
