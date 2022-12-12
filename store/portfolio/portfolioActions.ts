import { PortfolioSlice } from "./portfolioSlice";
import { PortfolioThunkFunctions } from "./thunkFunctions";

export const PortfolioActions = {
  ...PortfolioSlice.actions,
  ...PortfolioThunkFunctions,
};
