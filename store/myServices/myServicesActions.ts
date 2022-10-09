import { MyServicesThunkFunctions } from "./thunkFunctions";
import { myServicesSlice } from "./myServicesSlice";
export const MyServicesActions = {
  ...MyServicesThunkFunctions,
  ...myServicesSlice.actions,
};
