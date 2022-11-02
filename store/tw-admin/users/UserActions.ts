import { UsersThunkFunctions } from "./thunkFunctions";
import { dashboardUserSlice } from "./userSlice";
export const UserActions = {
  ...dashboardUserSlice.actions,
  ...UsersThunkFunctions,
};
