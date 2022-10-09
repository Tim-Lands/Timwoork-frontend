import { WalletThunkFunctions } from "./thunkFunctions";
import { walletSlice } from "./walletSlice";
export const WalletActions = {
  ...WalletThunkFunctions,
  ...walletSlice.actions,
};
