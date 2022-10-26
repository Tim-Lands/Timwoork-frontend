import {
  isAllOf,
  isAsyncThunkAction,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import { SalesThunkFunctions } from "./thunkFunctions";
const { getData } = SalesThunkFunctions;
const isSalesThunkAction = isAsyncThunkAction(getData);
const isSalesPending = isAllOf(isSalesThunkAction, isPending);
const isSalesFulfilled = isAllOf(isSalesThunkAction, isFulfilled);
const isSalesRejected = isAllOf(isSalesThunkAction, isRejected);
export const SalesMatchers = {
  isSalesPending,
  isSalesFulfilled,
  isSalesRejected,
};
