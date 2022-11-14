import { TypesPaymentThunkActions } from "./thunkFunctions";
import { dashboardTypespaymentSlice } from "./typesPaymentSlice";
export const TypesPaymentActions = {
  ...dashboardTypespaymentSlice.actions,
  ...TypesPaymentThunkActions,
};
