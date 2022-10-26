import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { ProductsThunkFunctions } from "./thunkFunctions";
import { CustomMatchers } from "./matchers";

const { getPopularProducts, getLatestProducts, getSellingProducts } =
  ProductsThunkFunctions;
const {
  isProductActionPending,
  isProductActionFulfilled,
  isProductActionRejected,
} = CustomMatchers;
interface dataState {
  popular;
  best_seller;
  latest: {
    data;
  };
}
export interface productsState extends dataState {
  popular: {
    data;
    loaded: boolean;
  };
  best_seller: {
    data;
    loaded: boolean;
  };
  latest: {
    data;
    loaded: boolean;
  };
  loading: boolean;
}
export const initialState: productsState = {
  popular: { data: [], loaded: false },
  best_seller: { data: [], loaded: false },
  latest: { data: [], loaded: false },
  loading: false,
};
export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      getPopularProducts.fulfilled,
      (state: productsState, action) => {
        state.popular.data = action.payload;
        state.popular.loaded = true;
      }
    );
    builder.addCase(
      getLatestProducts.fulfilled,
      (state: productsState, action) => {
        state.latest.data = action.payload;
        state.latest.loaded = true;
      }
    );
    builder.addCase(
      getSellingProducts.fulfilled,
      (state: productsState, action) => {
        state.best_seller.data = action.payload;
        state.best_seller.loaded = true;
      }
    );
    builder.addMatcher(isProductActionPending, (state: productsState) => {
      state.loading = true;
    });
    builder.addMatcher(
      isAnyOf(isProductActionFulfilled, isProductActionRejected),
      (state: productsState) => {
        state.loading = false;
      }
    );
  },
});
export default productsSlice.reducer;
