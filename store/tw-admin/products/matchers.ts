import {
    isAllOf,
    isAsyncThunkAction,
    isFulfilled,
    isPending,
    isRejected,
} from "@reduxjs/toolkit";
import { ProductsThunkFunctions } from "./thunkFunctions";
const { getAll, getAllActive, getAllArchieved, getAllPending, getAllReject} =
ProductsThunkFunctions;
const isProductActions = isAsyncThunkAction(
    getAll, getAllActive, getAllArchieved, getAllPending, getAllReject
);
const isProductsActionPending = isAllOf(isProductActions, isPending);
const isProductsActionFulfilled = isAllOf(isProductActions, isFulfilled);
const isProductsActionRejected = isAllOf(isProductActions, isRejected);
export const CustomMatchers = {
    isProductsActionPending,
    isProductsActionFulfilled,
    isProductsActionRejected,
};
