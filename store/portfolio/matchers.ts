import {
  isAllOf,
  isAsyncThunkAction,
  isPending,
  isRejected,
  isFulfilled,
} from "@reduxjs/toolkit";
import { PortfolioThunkFunctions } from "./thunkFunctions";
const { addProject, deleteProject, getAllProjects, updateProduct } =
  PortfolioThunkFunctions;

// const isMyProductsActions = isAsyncThunkAction(getMyProducts);
// const isMyProductsPending = isAllOf(isMyProductsActions, isPending);
// const isMyProductsFulfilled = isAllOf(isMyProductsActions, isFulfilled);
// const isMyProductsRejected = isAllOf(isMyProductsActions, isRejected);

export const PortfolioMatchers = {};
