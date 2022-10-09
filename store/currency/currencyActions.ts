import { CurrencyThunkFunctions } from "./thunkFunctions";
import { currencySlice } from "./currencySlice";
export const CurrencyActions = {
  ...CurrencyThunkFunctions,
  ...currencySlice.actions,
};
