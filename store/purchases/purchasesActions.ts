import { PurchasesThunkFunctions } from "./thunkFunctions";
import { purchasesSlice } from "./purchasesSlice";
export const PurchasesActions = {
  ...PurchasesThunkFunctions,
  ...purchasesSlice.actions,
};
