import {
  isAllOf,
  isAsyncThunkAction,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import { PurchasesThunkFunctions } from "./thunkFunctions";
const { getPurchasesData, getOnePurchase } = PurchasesThunkFunctions;
const isPurchasesThunkAction = isAsyncThunkAction(getPurchasesData);
const isPurchasesPending = isAllOf(isPurchasesThunkAction, isPending);
const isPurchasesFulfilled = isAllOf(isPurchasesThunkAction, isFulfilled);
const isPurchasesRejected = isAllOf(isPurchasesThunkAction, isRejected);

const isPurchaseThunkAction = isAsyncThunkAction(getOnePurchase);
const isPurchasePending = isAllOf(isPurchaseThunkAction, isPending);
const isPurchaseFulfilled = isAllOf(isPurchaseThunkAction, isFulfilled);
const isPurchaseRejected = isAllOf(isPurchaseThunkAction, isRejected);

export const Matchers = {
  isPurchasesPending,
  isPurchasesFulfilled,
  isPurchasesRejected,
  isPurchasePending,
  isPurchaseFulfilled,
  isPurchaseRejected,
};
