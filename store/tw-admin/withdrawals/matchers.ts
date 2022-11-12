import {
    isAllOf,
    isAsyncThunkAction,
    isFulfilled,
    isPending,
    isRejected,
} from "@reduxjs/toolkit";
import { WithdrawalsThunkFunctions } from "./thunkFunctions";
const {getOne, accept, cancel} =
WithdrawalsThunkFunctions;
const isWithdrawalActions = isAsyncThunkAction(
    getOne, accept, cancel
);
const isWithdrawalsActionPending = isAllOf(isWithdrawalActions, isPending);
const isWithdrawalsActionFulfilled = isAllOf(isWithdrawalActions, isFulfilled);
const isWithdrawalsActionRejected = isAllOf(isWithdrawalActions, isRejected);
export const CustomMatchers = {
    isWithdrawalsActionPending,
    isWithdrawalsActionFulfilled,
    isWithdrawalsActionRejected,
};
