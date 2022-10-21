import {
  isAllOf,
  isAsyncThunkAction,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import { WalletThunkFunctions } from "./thunkFunctions";
const { getWalletData } = WalletThunkFunctions;
const isWalletActions = isAsyncThunkAction(getWalletData);
const isWalletActionPending = isAllOf(isWalletActions, isPending);
const isWalletActionFulfilled = isAllOf(isWalletActions, isFulfilled);
const isWalletActionRejected = isAllOf(isWalletActions, isRejected);
export const CustomMatchers = {
  isWalletActionPending,
  isWalletActionFulfilled,
  isWalletActionRejected,
};
