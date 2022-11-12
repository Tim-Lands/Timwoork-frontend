import { CountriesThunkFunctions } from "./thunkFunctions";
import { dashboardCountriesSlice } from "./countriesSlice";
export const TypesPaymentActions = {
  ...dashboardCountriesSlice.actions,
  ...CountriesThunkFunctions,
};
