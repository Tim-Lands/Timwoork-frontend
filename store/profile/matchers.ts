import {
  isAllOf,
  isAsyncThunkAction,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import { ProfileThunkFunctions } from "./thunkFunctions";
const { getProfileData, getProfileSellerData } = ProfileThunkFunctions;
const isProfileActions = isAsyncThunkAction(
  getProfileData,
  getProfileSellerData
);
const isProfileActionPending = isAllOf(isProfileActions, isPending);
const isProfileActionFulfilled = isAllOf(isProfileActions, isFulfilled);
const isProfileActionRejected = isAllOf(isProfileActions, isRejected);
export const CustomMatchers = {
  isProfileActionPending,
  isProfileActionFulfilled,
  isProfileActionRejected,
};
