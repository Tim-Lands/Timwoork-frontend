import {
  isAllOf,
  isAsyncThunkAction,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import { ChatThunkFunctions } from "./thunkFunctions";
const { getChatsData, getSingleChat } = ChatThunkFunctions;
const isChatsActions = isAsyncThunkAction(getChatsData);
const isChatsActionPending = isAllOf(isChatsActions, isPending);
const isChatsActionFulfilled = isAllOf(isChatsActions, isFulfilled);
const isChatsActionRejected = isAllOf(isChatsActions, isRejected);

export const AllMatchers = {
  isChatsActionPending,
  isChatsActionFulfilled,
  isChatsActionRejected,
};

const isSingleActions = isAsyncThunkAction(getSingleChat);
const isSingleActionPending = isAllOf(isSingleActions, isPending);
const isSingleActionFulfilled = isAllOf(isSingleActions, isFulfilled);
const isSingleActionRejected = isAllOf(isSingleActions, isRejected);

export const SingleMatchers = {
  isSingleActionPending,
  isSingleActionFulfilled,
  isSingleActionRejected,
};
