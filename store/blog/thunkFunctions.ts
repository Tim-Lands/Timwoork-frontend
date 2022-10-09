import { createAsyncThunk } from "@reduxjs/toolkit";
const getBlogData = createAsyncThunk("blog/data", async () => {});
export const BlogThunkFunctions = {
  getBlogData,
};
