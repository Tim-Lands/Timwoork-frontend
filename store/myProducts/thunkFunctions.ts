import { createAsyncThunk } from "@reduxjs/toolkit";
import { MyProductsService } from "@/services/myProducts";
const getMyProducts = createAsyncThunk(
  "myProducts/get",
  async (args: { params?: any }, { rejectWithValue }) => {
    const { params } = args;
    try {
      const res = MyProductsService.getAll(params);
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const getProduct = createAsyncThunk(
  "myProducts/get/one",
  async (args: { id: number }, { rejectWithValue }) => {
    const { id } = args;
    try {
      const res = await MyProductsService.getOne(id);
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const updateProduct = createAsyncThunk(
  "myProducts/update",
  async (
    args: {
      is_active: boolean;
      id: number;
      params?: any;
      updateProduct?: boolean;
    },
    { rejectWithValue, dispatch }
  ) => {
    const { is_active, id, params, updateProduct } = args;
    try {
      const res = await MyProductsService.updateOne(id, is_active);

      dispatch(getMyProducts({ params }));
      updateProduct && dispatch(getProduct({ id }));
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const deleteProduct = createAsyncThunk(
  "myProducts/delete/one",
  async (args: { id: number; params?: any }, { rejectWithValue, dispatch }) => {
    try {
      const res = await MyProductsService.deleteOne(args.id);
      dispatch(getMyProducts(args.params ? { params: args.params } : {}));
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const modifySteps = createAsyncThunk(
  "myProducts/steps/modify",
  async (
    args: {
      url: string;
      body?: any;
      headers?: any;
      id: number;
    },
    { rejectWithValue, dispatch }
  ) => {
    const { url, body, headers, id } = args;
    try {
      const res = await MyProductsService.steps(url, body, headers);
      dispatch(getMyProducts({}));
      dispatch(getProduct({ id }));
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const MyProductsThunkFunctions = {
  getMyProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  modifySteps,
};
