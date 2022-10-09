import { ProfileService } from "services/profileService";
import { createAsyncThunk } from "@reduxjs/toolkit";
const getProfileData = createAsyncThunk("profile/data", async () => {});
export const profileThunkFunctions = {
  getProfileData,
};
