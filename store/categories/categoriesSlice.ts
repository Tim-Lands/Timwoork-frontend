import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { CategoriesThunkFunctions } from "./thunkFunctions";
import { CustomMatchers } from "./matchers";
const {
  getAllCategories,
  getTopCategories,
  getProductCategories,
  getTopMainCategories,
} = CategoriesThunkFunctions;
const { isCategoriesPending, isCategoriesFulfilled, isCategoriesRejected } =
  CustomMatchers;
export interface categoriesState {
  all: Array<{
    id: number;
    name: string;
    image: string;
    subcategories: Array<{ id: number; parent_id: number; name: string }>;
  }>;
  main: Array<{ id: number; name: string; parent_id: string }>;
  top: Array<{ id: number; name: string; parent_id: string }>;
  product: Array<{ id: number; name: string }>;
  loading: boolean;
}
export const initialState: categoriesState = {
  all: [],
  main: [],
  top: [],
  product: [],
  loading: true,
};
export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      getAllCategories.fulfilled,
      (state: categoriesState, action) => {
        state.all = action.payload.sort((a, b) => {
          if (a.subcategories.length < b.subcategories.length) {
            return -1;
          }
        });
      }
    );
    builder.addCase(
      getTopCategories.fulfilled,
      (state: categoriesState, action) => {
        state.top = action.payload;
      }
    );
    builder.addCase(
      getProductCategories.fulfilled,
      (state: categoriesState, action) => {
        state.product = action.payload;
      }
    );
    builder.addCase(
      getTopMainCategories.fulfilled,
      (state: categoriesState, action) => {
        state.main = action.payload;
      }
    );
    builder.addMatcher(
      isCategoriesPending,
      (state: categoriesState, action) => {
        if (action.type.split("/")[0] !== "categories") return;
        state.loading = true;
      }
    );
    builder.addMatcher(
      isAnyOf(isCategoriesFulfilled, isCategoriesRejected),
      (state: categoriesState, action) => {
        state.loading = false;
      }
    );
  },
});
export default categoriesSlice.reducer;
