import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { CartThunkFunctions } from "./thunkFunctions";
import { CustomMatchers } from "./matchers";
const { getCartData } = CartThunkFunctions;
const { isCartActionFulfilled, isCartActionPending, isCartActionRejected } =
  CustomMatchers;
export interface cartState {
  id: number;
  itemsLength: number;
  itemsTotal: number;
  tax: number;
  priceWithTax: number;
  isLoading: boolean;
  loaded: boolean;
  data: Array<{
    id: number;
    quantity: number;
    product_title: string;
    price_product_origine: number;
    price_product: number;
    cart_item_developments: Array<{
      development_id: number;
      title: string;
      duration: string;
      price: number;
    }>;
  }>;
  cart_payments: Array<{
    name: string;
    pivot: {
      cart_id: number;
      tax: number;
      total: number;
      total_with_tax: number;
      type_payment_id: number;
    };
  }>;
}

export const initialState: cartState = {
  id: null,
  itemsLength: null,
  itemsTotal: null,
  tax: null,
  priceWithTax: null,
  isLoading: true,
  loaded: false,
  data: [],
  cart_payments: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      getCartData.fulfilled,
      (
        state: cartState,
        action: {
          payload: {
            cart_items: Array<{
              id: number;
              quantity: number;
              product_title: string;
              price_product_origine: number;
              price_product: number;
              cart_item_developments: Array<{
                development_id: number;
                title: string;
                duration: string;
                price: number;
              }>;
            }>;
            cart_payments: Array<{
              name: string;
              pivot: {
                cart_id: number;
                tax: number;
                total: number;
                total_with_tax: number;
                type_payment_id: number;
              };
            }>;
            id: number;
            cart_items_count: number;
            total_price: number;
            price_with_tax: number;
            tax: number;
          };
        }
      ) => {
        const {
          cart_items,
          id,
          cart_items_count,
          total_price,
          price_with_tax,
          tax,
          cart_payments,
        } = action.payload;
        state.data = cart_items;
        state.id = id;
        state.itemsLength = cart_items_count;
        state.itemsTotal = total_price;
        state.priceWithTax = price_with_tax;
        state.tax = tax;
        state.cart_payments = cart_payments;
        state.loaded = true;
      }
    );
    builder.addMatcher(
      isAnyOf(isCartActionFulfilled, isCartActionRejected),
      (state: cartState) => {
        state.isLoading = false;
      }
    );
    builder.addMatcher(isCartActionPending, (state: cartState, action) => {
      if (action.type.split("/")[0] !== "cart") return;

      state.isLoading = true;
    });
  },
});

export default cartSlice.reducer;
