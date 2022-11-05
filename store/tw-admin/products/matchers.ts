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
const isProductActionPending = isAllOf(isProductActions, isPending);
const isProductActionFulfilled = isAllOf(isProductActions, isFulfilled);
const isProductActionRejected = isAllOf(isProductActions, isRejected);
export const CustomMatchers = {
    isProductActionPending,
    isProductActionFulfilled,
    isProductActionRejected,
};
