import {
  isAllOf,
  isAsyncThunkAction,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import { UserThunkFunctions } from "./thunkFunctions";
const { getData, login, loginGoogle, logoutAll, logoutUser, register } =
  UserThunkFunctions;
const isUserActions = isAsyncThunkAction(
  getData,
  login,
  loginGoogle,
  logoutAll,
  logoutUser,
  register
);
const isUserActionPending = isAllOf(isUserActions, isPending);
const isUserActionFulfilled = isAllOf(isUserActions, isFulfilled);
const isUserActionRejected = isAllOf(isUserActions, isRejected);
export const CustomMatchers = {
  isUserActionPending,
  isUserActionFulfilled,
  isUserActionRejected,
};
