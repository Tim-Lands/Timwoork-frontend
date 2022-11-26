import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { SalesThunkFunctions } from "./thunkFunctions";
import { SalesMatchers } from "./matchers";
const {
  isSalesPending,
  isSalesFulfilled,
  isSalesRejected,
  isSalePending,
  isSaleFulfilled,
  isSaleRejected,
} = SalesMatchers;
const { getData, getOneSale } = SalesThunkFunctions;
export interface salesState {
  sales: {
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
  oneSale: {
    id: number;
    uuid: number;
    title: string;
    duration: number;
    status: number;
    created_at: Date;
    price_product: number;
    item_rejected: { status: number };
    item_modified: { status: number };
    conversation: { id: number; messages: Array<any> };
    order: {
      cart: {
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
export const initialState: salesState = {
  sales: { data: [], loading: true, loaded: false },
  oneSale: {
    id: null,
    uuid: null,
    title: "",
    duration: null,
    status: null,
    created_at: new Date(),
    price_product: null,
    item_rejected: { status: null },
    item_modified: { status: null },
    conversation: { id: null, messages: [] },
    order: {
      cart: {
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
export const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      getData.fulfilled,
      (state: salesState, action: { payload: any }) => {
        state.sales.data = action.payload;
        state.sales.loaded = true;
      }
    );
    builder.addCase(getOneSale.fulfilled, (state, action) => {
      state.oneSale = action.payload;
    });
    builder.addMatcher(isSalesPending, (state, action) => {
      if (action.type.split("/")[0] !== "sales") return;
      state.sales.loading = true;
    });
    builder.addMatcher(isAnyOf(isSalesFulfilled, isSalesRejected), (state) => {
      state.sales.loading = false;
    });
    builder.addMatcher(isSalePending, (state, action) => {
      if (action.type.split("/")[0] !== "sales") return;
      state.oneSale.loading = true;
    });
    builder.addMatcher(isAnyOf(isSaleFulfilled, isSaleRejected), (state) => {
      state.oneSale.loading = false;
    });
  },
});
export default salesSlice.reducer;
