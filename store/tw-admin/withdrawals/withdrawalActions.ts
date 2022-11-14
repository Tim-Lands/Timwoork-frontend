import { WithdrawalsThunkFunctions } from "./thunkFunctions";
import { dashboardWithdrawalsSlice } from "./withdrawalsSlice";
export const WithdrawalActions = {
  ...dashboardWithdrawalsSlice.actions,
  ...WithdrawalsThunkFunctions,
};
