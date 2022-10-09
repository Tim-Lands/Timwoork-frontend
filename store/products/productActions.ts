import { ProductsThunkFunctions } from "./thunkFunctions";
import { productsSlice } from "./productsSlice";
export const SalesActions = {
  ...ProductsThunkFunctions,
  ...productsSlice.actions,
};
