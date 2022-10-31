import {
  isAllOf,
  isAsyncThunkAction,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import { notificationsThunkFunctions } from "./thunkFunctions";
const { getNotificationsData } = notificationsThunkFunctions;
const isNotificationActions = isAsyncThunkAction(getNotificationsData);
const isNotificationActionPending = isAllOf(isNotificationActions, isPending);
const isNotificationActionFulfilled = isAllOf(
  isNotificationActions,
  isFulfilled
);
const isNotificationActionRejected = isAllOf(isNotificationActions, isRejected);
export const CustomMatchers = {
  isNotificationActionPending,
  isNotificationActionFulfilled,
  isNotificationActionRejected,
};
