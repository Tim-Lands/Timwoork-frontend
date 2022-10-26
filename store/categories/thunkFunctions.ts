import { CategoriesService } from "services/categoriesServices";
import { createAsyncThunk } from "@reduxjs/toolkit";
const getCategoriesData = createAsyncThunk("Categories/data", async () => {});
export const CategoriesThunkFunctions = {
  getCategoriesData,
};
