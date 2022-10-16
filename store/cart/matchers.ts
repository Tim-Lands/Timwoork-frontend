import {
  isAllOf,
  isAsyncThunkAction,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import { CartThunkFunctions } from "./thunkFunctions";
const { addProduct, deleteProduct, getCartData } = CartThunkFunctions;
const isCartActions = isAsyncThunkAction(
  addProduct,
  deleteProduct,
  getCartData
);
const isCartActionPending = isAllOf(isCartActions, isPending);
const isCartActionFulfilled = isAllOf(isCartActions, isFulfilled);
const isCartActionRejected = isAllOf(isCartActions, isRejected);
export const CustomMatchers = {
  isCartActionPending,
  isCartActionFulfilled,
  isCartActionRejected,
};
