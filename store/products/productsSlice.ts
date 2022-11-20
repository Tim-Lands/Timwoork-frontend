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
    data: Array<{
      title: string;
      id: string;
      price: string;
      full_path_thumbnail: string;
      count_buying: number;
      ratings_avg_rating: number;
      profile_seller: {
        level: { name: string };
        profile: {
          avatar_path: string;
          first_name: string;
          last_name: string;
          user: { username: string };
        };
      };
    }>;
  };
}
export interface productsState extends dataState {
  popular: {
    data;
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
  popular: { data: [] },
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
    builder.addMatcher(
      isProductActionPending,
      (state: productsState, action) => {
        if (action.type.split("/")[0] !== "products") return;

        state.loading = true;
      }
    );
    builder.addMatcher(
      isAnyOf(isProductActionFulfilled, isProductActionRejected),
      (state: productsState) => {
        state.loading = false;
      }
    );
  },
});
export default productsSlice.reducer;
