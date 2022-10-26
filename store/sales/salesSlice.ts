import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { SalesThunkFunctions } from "./thunkFunctions";
import { SalesMatchers } from "./matchers";
const { isSalesPending, isSalesFulfilled, isSalesRejected } = SalesMatchers;
const { getData } = SalesThunkFunctions;
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
    builder.addMatcher(isSalesPending, (state, action) => {
      if (action.type.split("/")[0] == "sales") return;
      state.sales.loading = true;
    });
    builder.addMatcher(isAnyOf(isSalesFulfilled, isSalesRejected), (state) => {
      state.sales.loading = false;
    });
  },
});
export default salesSlice.reducer;
