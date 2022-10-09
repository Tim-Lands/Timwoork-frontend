import { UserThunkFunctions } from "./thunkFunctions";
import { userSlice } from "./userSlice";
export const UserActions = {
  ...userSlice.actions,
  ...UserThunkFunctions,
};
