import { BadgesThunkFunctions } from "./thunkFunctions";
import { dashboardBadgesSlice } from "./badgesSlice";
export const BadgesActions = {
  ...dashboardBadgesSlice.actions,
  ...BadgesThunkFunctions,
};
