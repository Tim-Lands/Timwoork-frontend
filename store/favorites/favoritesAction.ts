import { FavoritesThunkFunctions } from "./thunkFunction";
import { favoritesSlice } from "./favoritesSlice";

export const FavoritesActions = {
  ...FavoritesThunkFunctions,
  ...favoritesSlice.actions,
};
