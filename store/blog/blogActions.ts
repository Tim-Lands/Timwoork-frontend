import { BlogThunkFunctions } from "./thunkFunctions";
import { blogSlice } from "./blogSlice";
export const SalesActions = {
  ...BlogThunkFunctions,
  ...blogSlice.actions,
};
