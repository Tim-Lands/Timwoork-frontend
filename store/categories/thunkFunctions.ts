import { CategoriesService } from "@/services/categories";
import { createAsyncThunk } from "@reduxjs/toolkit";
const getAllCategories = createAsyncThunk(
  "Categories/all/data",
  async (args:{}, { rejectWithValue }) => {
    try {
      const res = await CategoriesService.getAll();
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const getTopMainCategories = createAsyncThunk(
  "Categories/top/main/data",
  async (args, { rejectWithValue }) => {
    try {
      const res = await CategoriesService.getMainTop();
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const getTopCategories = createAsyncThunk(
  "Categories/top/data",
  async (args, { rejectWithValue }) => {
    try {
      const res = await CategoriesService.getTop();
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const getProductCategories = createAsyncThunk(
  "Categories/product/data",
  async (args, { rejectWithValue }) => {
    try {
      const res = await CategoriesService.getProductsCategories();
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const CategoriesThunkFunctions = {
  getAllCategories,
  getTopCategories,
  getProductCategories,
  getTopMainCategories,
};
