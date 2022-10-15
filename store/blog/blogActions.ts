import { BlogThunkFunctions } from "./thunkFunctions";
import { blogSlice } from "./blogSlice";
export const BlogActions = {
  ...BlogThunkFunctions,
  ...blogSlice.actions,
};
