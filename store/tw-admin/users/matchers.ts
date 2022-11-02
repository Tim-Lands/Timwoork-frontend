import {
    isAllOf,
    isAsyncThunkAction,
    isFulfilled,
    isPending,
    isRejected,
} from "@reduxjs/toolkit";
import { UsersThunkFunctions } from "./thunkFunctions";
const { getAllUsers, getOneUser, banUser, unbanUser } =
    UsersThunkFunctions;
const isUserActions = isAsyncThunkAction(
    getAllUsers, getOneUser, banUser, unbanUser
);
const isUserActionPending = isAllOf(isUserActions, isPending);
const isUserActionFulfilled = isAllOf(isUserActions, isFulfilled);
const isUserActionRejected = isAllOf(isUserActions, isRejected);
export const CustomMatchers = {
    isUserActionPending,
    isUserActionFulfilled,
    isUserActionRejected,
};
