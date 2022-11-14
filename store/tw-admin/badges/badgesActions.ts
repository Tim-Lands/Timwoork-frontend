import { BadgesThunkFunctions } from "./thunkFunctions";
import { dashboardBadgesSlice } from "./badgesSlice";
export const TypesPaymentActions = {
  ...dashboardBadgesSlice.actions,
  ...BadgesThunkFunctions,
};
