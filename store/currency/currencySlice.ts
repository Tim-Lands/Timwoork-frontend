import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { CurrencyThunkFunctions } from "./thunkFunctions";
const { getData, getAllCurrencies, getAllCurrenciesValues } =
  CurrencyThunkFunctions;
import {
  CurrencyMatchers,
  CurrenciesMatchers,
  CurrenciesValuesMatchers,
} from "./matchers";
const { isCurrencyFulfilled, isCurrencyPending, isCurrencyRejected } =
  CurrencyMatchers;
const { isCurrenciesFulfilled, isCurrenciesPending, isCurrenciesRejected } =
  CurrenciesMatchers;
const {
  isCurrenciesValuesFulfilled,
  isCurrenciesValuesPending,
  isCurrenciesValuesRejected,
} = CurrenciesValuesMatchers;
export interface currencyState {
  my: {
    id: number;
    code: string;
    name: string;
    symbol: string;
    symbol_native: string;
    loading: boolean;
    value: number;
  };
  currencies: {
    data: Array<{
      id: number;
      code: string;
      name: string;
      symbol: string;
      symbol_native: string;
    }>;
    loaded: boolean;
    loading: boolean;
  };
  values: {
    data: Array<{
      id: number;
      code: string;
      value: number;
    }>;
    loaded: boolean;
    loading: boolean;
  };
}
export const initialState: currencyState = {
  my: {
    id: null,
    code: "",
    name: "",
    symbol: "",
    symbol_native: "$",
    loading: false,
    value: 1,
  },
  currencies: { data: [], loaded: false, loading: false },
  values: { data: [], loading: false, loaded: false },
};
export const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setValue: (state: currencyState, action: { payload: number }) => {
      state.my.value = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(
      getData.fulfilled,
      (
        state: currencyState,
        action: {
          payload: {
            id: number;
            name: string;
            code: string;
            symbol: string;
            symbol_native: string;
          };
        }
      ) => {
        const { id, code, name, symbol, symbol_native } = action.payload;
        state.my.code = code;
        state.my.id = id;
        state.my.name = name;
        state.my.symbol = symbol;
        state.my.symbol_native = symbol_native;
      }
    );
    builder.addCase(
      getAllCurrencies.fulfilled,
      (
        state: currencyState,
        action: {
          payload: Array<{
            id: number;
            code: string;
            name: string;
            symbol: string;
            symbol_native: string;
          }>;
        }
      ) => {
        state.currencies.data = action.payload;
        state.currencies.loaded = true;
      }
    );
    builder.addCase(
      getAllCurrenciesValues.fulfilled,
      (
        state: currencyState,
        action: {
          payload: Array<{
            id: number;
            code: string;
            value: number;
          }>;
        }
      ) => {
        state.values.data = action.payload;
        state.values.loaded = true;
      }
    );
    builder.addMatcher(isCurrencyPending, (state: currencyState, action) => {
      if (action.type.split("/")[0] == "currency") return;

      state.my.loading = true;
    });
    builder.addMatcher(
      isAnyOf(isCurrencyRejected, isCurrencyFulfilled),
      (state: currencyState) => {
        state.my.loading = false;
      }
    );
    builder.addMatcher(isCurrenciesPending, (state: currencyState, action) => {
      if (action.type.split("/")[0] == "currency") return;

      state.currencies.loading = true;
    });
    builder.addMatcher(
      isAnyOf(isCurrenciesFulfilled, isCurrenciesRejected),
      (state: currencyState, action) => {
        state.currencies.loaded = false;
      }
    );
    builder.addMatcher(
      isCurrenciesValuesPending,
      (state: currencyState, action) => {
        if (action.type.split("/")[0] == "currency") return;
        state.values.loading = true;
      }
    );
    builder.addMatcher(
      isAnyOf(isCurrenciesValuesFulfilled, isCurrenciesValuesRejected),
      (state: currencyState) => {
        state.values.loading = false;
      }
    );
  },
});
export default currencySlice.reducer;
