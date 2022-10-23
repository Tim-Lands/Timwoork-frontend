import {
  isAllOf,
  isAsyncThunkAction,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import { ProductsThunkFunctions } from "./thunkFunctions";
const { getPopularProducts, getLatestProducts, getSellingProducts } =
  ProductsThunkFunctions;

const isProductActions = isAsyncThunkAction(
  getPopularProducts,
  getLatestProducts,
  getSellingProducts
);
const isProductActionPending = isAllOf(isProductActions, isPending);
const isProductActionFulfilled = isAllOf(isProductActions, isFulfilled);
const isProductActionRejected = isAllOf(isProductActions, isRejected);
export const CustomMatchers = {
  isProductActionPending,
  isProductActionFulfilled,
  isProductActionRejected,
};
