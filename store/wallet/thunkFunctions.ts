import { WalletService } from "services/walletService";
import { createAsyncThunk } from "@reduxjs/toolkit";
const getWalletData = createAsyncThunk("wallet/data", async () => {});
export const WalletThunkFunctions = {
  getWalletData,
};
