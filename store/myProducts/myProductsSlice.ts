import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { MyProductsThunkFunctions } from "./thunkFunctions";
import { OneMatchers, ProductMatchers } from "./matchers";
const { getMyProducts, getProduct, deleteProduct } = MyProductsThunkFunctions;
const { isMyProductsFulfilled, isMyProductsPending, isMyProductsRejected } =
  ProductMatchers;
const { isMyProductFulfilled, isMyProductRejected, isMyProductPending } =
  OneMatchers;

export interface myProductsState {
  product: {
    id: number;
    title: string;
    price: number;
    duration: number;
    full_path_thumbnail: any;
    current_step: number;
    ratings_avg_rating: number;
    is_active: number;
    ratings_count: number;
    content: string;
    count_buying: number;
    is_completed: number;
    slug: string;
    status: number;
    buyer_instruct: string;
    ratings: Array<{
      user: {
        profile: {
          avatar_path: string;
          first_name: string;
          last_name: string;
        };
      };
      rating: number;
      reply: any;
      created_at: Date;
      comment: string;
    }>;
    developments: Array<{
      duration: number;
      id: number;
      price: number;
      product_id: number;
      title: string;
    }>;
    subcategory: {
      id: number;
      name: string;
      category: { id: number; name: string };
    };
    galleries: any;
    product_tag: Array<{
      id: number;
      name: string;
      label: string;
      value: string;
    }>;
    profile_seller: {
      profile: { full_name: string; user: { username: string } };
      level: { name: string };
    };
    loaded: boolean;
    loading: boolean;
  };
  products: {
    data: Array<{
      id: number;
      is_completed: number;
      title: string;
      count_buying: number;
      is_active: number;
      slug: string;
      status: number;
    }>;
    loaded: boolean;
    loading: boolean;
  };
}
export const initialState: myProductsState = {
  product: {
    id: null,
    title: "",
    price: 0,
    duration: 0,
    full_path_thumbnail: "",
    current_step: null,
    ratings_avg_rating: null,
    is_active: null,
    ratings_count: null,
    content: "",
    count_buying: null,
    is_completed: null,
    slug: "",
    ratings: [],
    status: null,
    buyer_instruct: "",
    developments: [],
    subcategory: { id: null, name: "", category: { id: null, name: "" } },
    galleries: [],
    product_tag: [],
    profile_seller: {
      profile: { full_name: "", user: { username: "" } },
      level: { name: "" },
    },
    loaded: false,
    loading: true,
  },
  products: { data: [], loaded: false, loading: false },
};
export const myProductsSlice = createSlice({
  name: "myProducts",
  initialState,
  reducers: {
    changeSubCategory: (state: myProductsState, action) => {
      state.product.subcategory
        ? (state.product.subcategory.category.id = action.payload)
        : (state.product.subcategory = {
            id: null,
            name: "",
            category: { id: action.payload, name: "" },
          });
    },
    setPrice: (state: myProductsState, action) => {
      state.product.price = action.payload;
    },
    setDuration: (state: myProductsState, action) => {
      state.product.duration = action.payload;
    },
    setThumbnail: (state: myProductsState, action) => {
      state.product.full_path_thumbnail = action.payload;
    },
    setGalleries: (state: myProductsState, action) => {
      state.product.galleries = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(
      getMyProducts.fulfilled,
      (
        state: myProductsState,
        action: {
          payload: Array<{
            id: number;
            is_completed: number;
            title: string;
            count_buying: number;
            is_active: number;
            slug: string;
            status: number;
          }>;
        }
      ) => {
        state.products.data = action.payload;
        state.products.loaded = true;
      }
    );
    builder.addCase(
      getProduct.fulfilled,
      (state: myProductsState, action: { payload: any }) => {
        state.product = {
          ...action.payload,
          galleries: action.payload.galaries,
        };
      }
    );
    builder.addCase(deleteProduct.fulfilled, (state: myProductsState) => {
      state.product = initialState.product;
    });
    builder.addMatcher(isMyProductsPending, (state: myProductsState) => {
      state.products.loading = true;
    });
    builder.addMatcher(
      isAnyOf(isMyProductsFulfilled, isMyProductsRejected),
      (state: myProductsState) => {
        state.products.loading = false;
      }
    );
    builder.addMatcher(isMyProductPending, (state: myProductsState, action) => {
      if (action.type.split("/")[0] == "myProducts") return;

      state.product.loading = true;
    });
    builder.addMatcher(
      isAnyOf(isMyProductFulfilled, isMyProductRejected),
      (state: myProductsState) => {
        state.product.loading = false;
      }
    );
  },
});
export default myProductsSlice.reducer;
