import { profileThunkFunctions } from "./thunkFunctions";
import { profileSlice } from "./profileSlice";
export const ProfileActions = {
  ...profileSlice.actions,
  ...profileThunkFunctions,
};
