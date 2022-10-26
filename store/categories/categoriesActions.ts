import { CategoriesThunkFunctions } from "./thunkFunctions";
import { categoriesSlice } from "./categoriesSlice";
export const CategoriesActions = {
  ...CategoriesThunkFunctions,
  ...categoriesSlice.actions,
};
