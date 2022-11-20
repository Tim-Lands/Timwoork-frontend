import { SkillsThunkFunctions } from "./thunkFunctions";
import { dashboardSkillsSlice } from "./skillsSlice";
export const SkillsActions = {
  ...dashboardSkillsSlice.actions,
  ...SkillsThunkFunctions,
};
