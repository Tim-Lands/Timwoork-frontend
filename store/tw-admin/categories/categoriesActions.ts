import { CategoriesThunkFunctions } from "./thunkFunctions";
import { dashboardCategoriesSlice } from "./categoriesSlice";
export const CategoriesActions = {
  ...dashboardCategoriesSlice.actions,
  ...CategoriesThunkFunctions,
};
