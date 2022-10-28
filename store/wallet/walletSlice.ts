import { WalletThunkFunctions } from "./thunkFunctions";
import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { CustomMatchers } from "./matchers";
const { getWalletData } = WalletThunkFunctions;
const {
  isWalletActionFulfilled,
  isWalletActionPending,
  isWalletActionRejected,
} = CustomMatchers;
export interface walletState {
  id: number;
  profile_id: number;
  amounts_total: number;
  amounts_pending: number;
  withdrawable_amount: number;
  activities: Array<{
    payload: { payment_method };
    status: number;
    title: string;
    id: number;
    created_at: Date;
  }>;
  is_withdrawable: boolean;
  loading: boolean;
  loaded: boolean;
}
export const initialState: walletState = {
  id: null,
  profile_id: null,
  amounts_total: null,
  amounts_pending: null,
  withdrawable_amount: null,
  activities: [],
  is_withdrawable: false,
  loading: false,
  loaded: false,
};
export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      getWalletData.fulfilled,
      (
        state: walletState,
        action: {
          payload: {
            id: number;
            profile_id: number;
            amounts_pending: number;
            withdrawable_amount: number;
            amounts_total: number;
            activities: Array<{
              payload: { payment_method };
              status: number;
              title: string;
              id: number;
              created_at: Date;
            }>;
            is_withdrawable: boolean;
          };
        }
      ) => {
        const {
          is_withdrawable,
          withdrawable_amount,
          amounts_total,
          amounts_pending,
          profile_id,
          id,
          activities,
        } = action.payload;
        state.id = id;
        state.amounts_pending = amounts_pending;
        state.amounts_total = amounts_total;
        state.profile_id = profile_id;
        state.withdrawable_amount = withdrawable_amount;
        state.is_withdrawable = is_withdrawable;
        state.activities = activities;
        state.loaded = true;
      }
    );
    builder.addMatcher(isWalletActionPending, (state, action) => {
      if (action.type.split("/")[0] !== "wallet") return;

      state.loading = true;
    });
    builder.addMatcher(
      isAnyOf(isWalletActionFulfilled, isWalletActionRejected),
      (state) => {
        state.loading = false;
      }
    );
  },
});
export default walletSlice.reducer;
