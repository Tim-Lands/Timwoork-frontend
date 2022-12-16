import {
  isAsyncThunkAction,
  isAllOf,
  isPending,
  isRejected,
  isFulfilled,
} from "@reduxjs/toolkit";

import { FavoritesThunkFunctions } from "./thunkFunction";
const { getFavorites } = FavoritesThunkFunctions;

const isFavoritesThunkAction = isAsyncThunkAction(getFavorites);

const isFavoritesPending = isAllOf(isFavoritesThunkAction, isPending);
const isFavoritesRejected = isAllOf(isFavoritesThunkAction, isRejected);
const isFavoritesFulfilled = isAllOf(isFavoritesThunkAction, isFulfilled);

export const matchers = {
  isFavoritesFulfilled,
  isFavoritesPending,
  isFavoritesRejected,
};
