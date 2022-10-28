import {
  isAllOf,
  isAsyncThunkAction,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import { CategoriesThunkFunctions } from "./thunkFunctions";
const {
  getAllCategories,
  getTopCategories,
  getProductCategories,
  getTopMainCategories,
} = CategoriesThunkFunctions;
const isCategoriesActions = isAsyncThunkAction(
  getAllCategories,
  getTopCategories,
  getProductCategories,
  getTopMainCategories
);
const isCategoriesPending = isAllOf(isCategoriesActions, isPending);
const isCategoriesFulfilled = isAllOf(isCategoriesActions, isFulfilled);
const isCategoriesRejected = isAllOf(isCategoriesActions, isRejected);
export const CustomMatchers = {
  isCategoriesPending,
  isCategoriesFulfilled,
  isCategoriesRejected,
};
