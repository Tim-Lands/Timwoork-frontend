import { PurchasesThunkFunctions } from "./thunkFunctions";
import { Matchers } from "./matchers";
import { createSlice, isAnyOf } from "@reduxjs/toolkit";
const { getPurchasesData, getOnePurchase } = PurchasesThunkFunctions;
const {
  isPurchasesPending,
  isPurchasesFulfilled,
  isPurchasesRejected,
  isPurchasePending,
  isPurchaseFulfilled,
  isPurchaseRejected,
} = Matchers;

export interface purchasesState {
  purchases: {
    data: Array<{
      id: number;
      title: string;
      Total_price: number;
      order: {
        cart: { user: { username: string }; profile: { full_name: string } };
      };
      status: number;
      created_at: Date;
    }>;
    loaded: boolean;
    loading: boolean;
  };
  onePurchase: {
    id: number;
    uuid: number;
    title: string;
    duration: number;
    status: number;
    created_at: Date;
    price_product: number;
    is_rating: number;
    item_rejected: { status: number };
    item_modified: { status: number };
    conversation: { id: number; messages: Array<any> };
    order: {
      cart: {
        user_id: number;
        user: {
          id: number;
          username: string;
          profile: {
            full_name: string;
            level: { title: string };
            avatar_path: string;
          };
        };
      };
    };
    profile_seller: {
      id: number;

      profile: {
        user: { username: string };
        avatar_path: string;
        full_name: string;
      };
      level: { title: string };
      products: Array<any>;
    };
    attachments: Array<{ mime_type: string; id: number }>;
    loading: boolean;
  };
}
export const initialState: purchasesState = {
  purchases: { data: [], loading: true, loaded: false },
  onePurchase: {
    id: null,
    uuid: null,
    title: "",
    duration: null,
    status: null,
    created_at: new Date(),
    price_product: null,
    is_rating: null,
    item_rejected: { status: null },
    item_modified: { status: null },
    conversation: { id: null, messages: [] },
    order: {
      cart: {
        user_id: null,
        user: {
          id: null,
          username: "",
          profile: { full_name: "", level: { title: "" }, avatar_path: "" },
        },
      },
    },
    profile_seller: {
      id: null,
      profile: {
        user: { username: "" },
        avatar_path: "",
        full_name: "",
      },
      level: { title: "" },
      products: [],
    },
    attachments: [],
    loading: false,
  },
};
export const purchasesSlice = createSlice({
  name: "purchases",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getPurchasesData.fulfilled, (state, action) => {
      state.purchases.data = action.payload;
      state.purchases.loaded = true;
    });
    builder.addCase(getOnePurchase.fulfilled, (state, action) => {
      state.onePurchase = action.payload;
    });
    builder.addMatcher(isPurchasesPending, (state, action) => {
      if (action.type.split("/")[0] !== "purchases") return;
      state.purchases.loading = true;
    });
    builder.addMatcher(
      isAnyOf(isPurchasesFulfilled, isPurchasesRejected),
      (state) => {
        state.purchases.loading = false;
      }
    );
    builder.addMatcher(isPurchasePending, (state, action) => {
      if (action.type.split("/")[0] !== "purchases") return;
      state.onePurchase.loading = true;
    });
    builder.addMatcher(
      isAnyOf(isPurchaseFulfilled, isPurchaseRejected),
      (state) => {
        state.onePurchase.loading = false;
      }
    );
  },
});
export default purchasesSlice.reducer;
