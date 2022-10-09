import { CartThunkFunctions } from "./thunkFunctions";
import { cartSlice } from "./cartSlice";
export const SalesActions = {
  ...CartThunkFunctions,
  ...cartSlice.actions,
};
