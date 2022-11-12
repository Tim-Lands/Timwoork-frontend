import { ActivitiesThunkFunctions } from "./thunkFunctions";
import { dashboardActivitiesSlice } from "./activitiesSlice";
export const ActivitiesActions = {
  ...dashboardActivitiesSlice.actions,
  ...ActivitiesThunkFunctions,
};
