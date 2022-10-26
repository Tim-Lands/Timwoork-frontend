import { MyProductsThunkFunctions } from "./thunkFunctions";
import { myProductsSlice } from "./myProductsSlice";
export const MyProductsActions = {
  ...MyProductsThunkFunctions,
  ...myProductsSlice.actions,
};
