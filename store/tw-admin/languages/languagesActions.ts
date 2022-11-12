import { LanguagesThunkFunctions } from "./thunkFunctions";
import { dashboardLanguagesSlice } from "./languagesSlice";
export const TypesPaymentActions = {
  ...dashboardLanguagesSlice.actions,
  ...LanguagesThunkFunctions,
};
