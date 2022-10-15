import { CartThunkFunctions } from "./thunkFunctions";
import { cartSlice } from "./cartSlice";
export const CartActions = {
  ...CartThunkFunctions,
  ...cartSlice.actions,
};
