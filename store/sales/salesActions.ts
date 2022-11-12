import { SalesThunkFunctions } from "./thunkFunctions";
import { salesSlice } from "./salesSlice";
export const SalesActions = {
  ...salesSlice.actions,
  ...SalesThunkFunctions,
};
