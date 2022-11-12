import { LevelsThunkFunctions } from "./thunkFunctions";
import { dashboardLevelsSlice } from "./levelsSlice";
export const TypesPaymentActions = {
  ...dashboardLevelsSlice.actions,
  ...LevelsThunkFunctions,
};
