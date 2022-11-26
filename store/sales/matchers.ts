import {
  isAllOf,
  isAsyncThunkAction,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import { SalesThunkFunctions } from "./thunkFunctions";
const { getData, getOneSale } = SalesThunkFunctions;
const isSalesThunkAction = isAsyncThunkAction(getData);
const isSalesPending = isAllOf(isSalesThunkAction, isPending);
const isSalesFulfilled = isAllOf(isSalesThunkAction, isFulfilled);
const isSalesRejected = isAllOf(isSalesThunkAction, isRejected);

const isSaleThunkAction = isAsyncThunkAction(getOneSale);
const isSalePending = isAllOf(isSaleThunkAction, isPending);
const isSaleFulfilled = isAllOf(isSaleThunkAction, isFulfilled);
const isSaleRejected = isAllOf(isSaleThunkAction, isRejected);

export const SalesMatchers = {
  isSalesPending,
  isSalesFulfilled,
  isSalesRejected,
  isSalePending,
  isSaleFulfilled,
  isSaleRejected,
};
