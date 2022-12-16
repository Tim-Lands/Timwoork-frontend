import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { FavoritesThunkFunctions } from "./thunkFunction";
import { matchers } from "./matchers";
const { getFavorites } = FavoritesThunkFunctions;
const { isFavoritesFulfilled, isFavoritesPending, isFavoritesRejected } =
  matchers;
export interface favoritesState {
  data: Array<{
    id: number;
    profile_id: number;
    fans_count: number;
    content: string;
    title: string;
    cover_url: string;
    url: string;
    is_liked: boolean;
    seller: {
      profile: {
        avatar_url: string;
        full_name: string;
        level: { name: string };
        user: { username: string };
      };
    };
  }>;
  loading: boolean;
  loaded: boolean;
}
export const initialState: favoritesState = {
  data: [],
  loading: true,
  loaded: false,
};
export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleLike: (state, action) => {
      const id = action.payload;
      state.data = state.data.map((element) => {
        if (element.id === id) {
          return {
            ...element,
            is_liked: !element.is_liked,
          };
        } else return element;
      });
    },
  },
  extraReducers(builder) {
    builder.addCase(getFavorites.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loaded = true;
    });
    builder.addMatcher(isFavoritesPending, (state: favoritesState, action) => {
      if (action.type.split("/")[0] !== "favorites") return;

      state.loading = true;
    });
    builder.addMatcher(
      isAnyOf(isFavoritesFulfilled, isFavoritesRejected),
      (state: favoritesState) => {
        state.loading = false;
      }
    );
  },
});
export default favoritesSlice.reducer;
