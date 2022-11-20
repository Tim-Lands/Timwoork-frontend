import { LanguagesThunkFunctions } from "./thunkFunctions";
import { dashboardLanguagesSlice } from "./languagesSlice";
export const LanguagestActions = {
  ...dashboardLanguagesSlice.actions,
  ...LanguagesThunkFunctions,
};
