import { ProductsThunkFunctions } from "./thunkFunctions";
import { dashboardProductSlice } from "./productsSlice";
export const ProductsActions = {
  ...dashboardProductSlice.actions,
  ...ProductsThunkFunctions,
};
