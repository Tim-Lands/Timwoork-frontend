import {
    isAllOf,
    isAsyncThunkAction,
    isFulfilled,
    isPending,
    isRejected,
} from "@reduxjs/toolkit";
import { ActivitiesThunkFunctions } from "./thunkFunctions";
const {getConversations, getNotifications, getTransactions, getOneConversation, deleteConversation, deleteMessage, editMessage} =
ActivitiesThunkFunctions;
const isActivityActions = isAsyncThunkAction(
    getOneConversation, deleteConversation, deleteMessage, editMessage
);

const isActivitiesActions = isAsyncThunkAction(
    getNotifications, getConversations, getTransactions
)
const isActivityActionPending = isAllOf(isActivityActions, isPending);
const isActivityActionFulfilled = isAllOf(isActivityActions, isFulfilled);
const isActivityActionRejected = isAllOf(isActivityActions, isRejected);

const isActivitiesActionPending = isAllOf(isActivitiesActions, isPending);
const isActivitiesActionFulfilled = isAllOf(isActivitiesActions, isFulfilled);
const isActivitiesActionRejected = isAllOf(isActivitiesActions, isRejected);
export const CustomMatchers = {
    isActivitiesActionPending,
    isActivitiesActionFulfilled,
    isActivitiesActionRejected,
    isActivityActionPending,
    isActivityActionFulfilled,
    isActivityActionRejected

};
