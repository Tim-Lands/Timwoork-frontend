import {
  createSlice,
  isPending,
  isAnyOf,
  isFulfilled,
  isRejected,
} from "@reduxjs/toolkit";
import { CartThunkFunctions } from "./thunkFunctions";
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
}
export const initialState: cartState = {
  id: null,
  itemsLength: null,
  itemsTotal: null,
  tax: null,
  priceWithTax: null,
  isLoading: false,
  loaded: false,
  data: [],
};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      CartThunkFunctions.getCartData.fulfilled,
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
        } = action.payload;
        state.data = cart_items;
        state.id = id;
        state.itemsLength = cart_items_count;
        state.itemsTotal = total_price;
        state.priceWithTax = price_with_tax;
        state.tax = tax;
        state.loaded = true;
      }
    );
    builder.addMatcher(isAnyOf(isFulfilled, isRejected), (state: cartState) => {
      state.isLoading = false;
    });
    builder.addMatcher(isPending, (state: cartState) => {
      state.isLoading = true;
    });
  },
});
export default cartSlice.reducer;
