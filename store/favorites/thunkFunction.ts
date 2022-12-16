import { FavoritesService } from "@/services/favorites";
import { createAsyncThunk } from "@reduxjs/toolkit";
const getFavorites = createAsyncThunk(
  "favorites/data/all",
  async (args, { rejectWithValue }) => {
    try {
      const res = await FavoritesService.getAll();
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const toggleFavBack = createAsyncThunk(
  "favorites/project/fav",
  async (args: { id: number }, { rejectWithValue, dispatch }) => {
    try {
      const res = await FavoritesService.favorite(args.id);
      dispatch(getFavorites());
      return res;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const FavoritesThunkFunctions = { getFavorites, toggleFavBack };
