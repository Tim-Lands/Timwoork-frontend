import { notificationsThunkFunctions } from "./thunkFunctions";
import { notificationsSlice } from "./notificationsSlice";
export const NotificationsActions = {
  ...notificationsThunkFunctions,
  ...notificationsSlice.actions,
};
