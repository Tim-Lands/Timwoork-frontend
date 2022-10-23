import { ProductService } from "@/services/productService";
import { createAsyncThunk } from "@reduxjs/toolkit";
const getPopularProducts = createAsyncThunk(
  "products/data/popular",
  async (args, { rejectWithValue }) => {
    try {
      const res = await ProductService.getAll({
        params: { paginate: 9 },
        type: "popular",
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
const getLatestProducts = createAsyncThunk(
  "products/data/latest",
  async (args, { rejectWithValue }) => {
    try {
      const res = await ProductService.getAll({
        params: { paginate: 9, "sort[0]": "created_at,desc" },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
const getSellingProducts = createAsyncThunk(
  "products/data/selling",
  async (args, { rejectWithValue }) => {
    try {
      const res = await ProductService.getAll({
        params: { paginate: 9, sort: "count_buying,desc" },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const ProductsThunkFunctions = {
  getPopularProducts,
  getLatestProducts,
  getSellingProducts,
};
