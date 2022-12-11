import { WalletService } from "@/services/wallet";
import { createAsyncThunk } from "@reduxjs/toolkit";
const getWalletData = createAsyncThunk(
  "wallet/data",
  async (args, { rejectWithValue }) => {
    try {
      const res = await WalletService.getData();
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const WalletThunkFunctions = {
  getWalletData,
};
