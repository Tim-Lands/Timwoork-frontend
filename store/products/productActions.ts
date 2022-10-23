import { ProductsThunkFunctions } from "./thunkFunctions";
import { productsSlice } from "./productsSlice";
export const ProductsActions = {
  ...ProductsThunkFunctions,
  ...productsSlice.actions,
};
