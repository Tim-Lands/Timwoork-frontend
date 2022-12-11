import { PortfolioSlice } from "./portfolioSlice";
import { PortfolioThunkFunctions } from "./thunkFunction";

export const PortfolioActions = {
  ...PortfolioSlice.actions,
  ...PortfolioThunkFunctions,
};
