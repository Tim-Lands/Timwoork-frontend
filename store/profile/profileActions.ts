import { ProfileThunkFunctions } from "./thunkFunctions";
import { profileSlice } from "./profileSlice";
export const ProfileActions = {
  ...profileSlice.actions,
  ...ProfileThunkFunctions,
};
