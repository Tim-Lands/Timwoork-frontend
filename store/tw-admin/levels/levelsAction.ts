import { LevelsThunkFunctions } from "./thunkFunctions";
import { dashboardLevelsSlice } from "./levelsSlice";
export const LevelsActions = {
  ...dashboardLevelsSlice.actions,
  ...LevelsThunkFunctions,
};
