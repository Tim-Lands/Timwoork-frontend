import { TagsThunkFunctions } from "./thunkFunctions";
import { dashboardTagsSlice } from "./tagsSlice";
export const TypesPaymentActions = {
  ...dashboardTagsSlice.actions,
  ...TagsThunkFunctions,
};
