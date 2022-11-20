import { TagsThunkFunctions } from "./thunkFunctions";
import { dashboardTagsSlice } from "./tagsSlice";
export const TagsActions = {
  ...dashboardTagsSlice.actions,
  ...TagsThunkFunctions,
};
