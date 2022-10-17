import {
  isAllOf,
  isAsyncThunkAction,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import { CurrencyThunkFunctions } from "./thunkFunctions";
const { getData, getAllCurrencies, getAllCurrenciesValues } =
  CurrencyThunkFunctions;

//me currency matchers
const isCurrencyActions = isAsyncThunkAction(getData);
const isCurrencyPending = isAllOf(isCurrencyActions, isPending);
const isCurrencyRejected = isAllOf(isCurrencyActions, isRejected);
const isCurrencyFulfilled = isAllOf(isCurrencyActions, isFulfilled);
export const CurrencyMatchers = {
  isCurrencyPending,
  isCurrencyRejected,
  isCurrencyFulfilled,
};

// all currencies matchers
const isCurrenciesActions = isAsyncThunkAction(getAllCurrencies);
const isCurrenciesPending = isAllOf(isCurrenciesActions, isPending);
const isCurrenciesRejected = isAllOf(isCurrenciesActions, isRejected);
const isCurrenciesFulfilled = isAllOf(isCurrenciesActions, isFulfilled);
export const CurrenciesMatchers = {
  isCurrenciesPending,
  isCurrenciesRejected,
  isCurrenciesFulfilled,
};

// all currencies values matchers
const isCurrenciesValuesActions = isAsyncThunkAction(getAllCurrenciesValues);
const isCurrenciesValuesPending = isAllOf(isCurrenciesValuesActions, isPending);
const isCurrenciesValuesRejected = isAllOf(
  isCurrenciesValuesActions,
  isRejected
);
const isCurrenciesValuesFulfilled = isAllOf(
  isCurrenciesValuesActions,
  isFulfilled
);
export const CurrenciesValuesMatchers = {
  isCurrenciesValuesPending,
  isCurrenciesValuesRejected,
  isCurrenciesValuesFulfilled,
};
