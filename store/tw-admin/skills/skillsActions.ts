import { SkillsThunkFunctions } from "./thunkFunctions";
import { dashboardSkillsSlice } from "./skillsSlice";
export const TypesPaymentActions = {
  ...dashboardSkillsSlice.actions,
  ...SkillsThunkFunctions,
};
