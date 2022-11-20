import { CountriesThunkFunctions } from "./thunkFunctions";
import { dashboardCountriesSlice } from "./countriesSlice";
export const CountriesActions = {
  ...dashboardCountriesSlice.actions,
  ...CountriesThunkFunctions,
};
