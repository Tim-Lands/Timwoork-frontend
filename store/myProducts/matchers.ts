import {
  isAllOf,
  isAsyncThunkAction,
  isPending,
  isRejected,
  isFulfilled,
} from "@reduxjs/toolkit";
import { MyProductsThunkFunctions } from "./thunkFunctions";
const { getMyProducts, getProduct, deleteProduct } = MyProductsThunkFunctions;

const isMyProductsActions = isAsyncThunkAction(getMyProducts);
const isMyProductsPending = isAllOf(isMyProductsActions, isPending);
const isMyProductsFulfilled = isAllOf(isMyProductsActions, isFulfilled);
const isMyProductsRejected = isAllOf(isMyProductsActions, isRejected);

export const ProductMatchers = {
  isMyProductsPending,
  isMyProductsFulfilled,
  isMyProductsRejected,
};

const isMyProductAction = isAsyncThunkAction(getProduct, deleteProduct);
const isMyProductPending = isAllOf(isMyProductAction, isPending);
const isMyProductFulfilled = isAllOf(isMyProductAction, isFulfilled);
const isMyProductRejected = isAllOf(isMyProductAction, isRejected);
export const OneMatchers = {
  isMyProductFulfilled,
  isMyProductPending,
  isMyProductRejected,
};
