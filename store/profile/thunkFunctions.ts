import { ProfileService } from "@/services/profile";
import { createAsyncThunk } from "@reduxjs/toolkit";
const getProfileData = createAsyncThunk(
  "profile/data",
  async (args, { rejectWithValue }) => {
    try {
      const res = await ProfileService.getMe();
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
const updateProfile = createAsyncThunk(
  "profile/data/update",
  async (
    args: {
      first_name: string;
      last_name: string;
      username: string;
      date_of_birth: string;
      gender: number;
      country_id: number;
      phone: string;
      currency_id: number;
      code_phone: string;
    },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const res = await ProfileService.update(args);
      dispatch(getProfileData());
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const updateProfileSeller = createAsyncThunk(
  "profile/seller/data/update",
  async (
    args: { bio: string; portfolio: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const res = await ProfileService.updateSeller(args);
      dispatch(getProfileSellerData());
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const ProfileThunkFunctions = {
  getProfileData,
  getProfileSellerData,
  updateProfile,
  updateProfileSeller,
};
