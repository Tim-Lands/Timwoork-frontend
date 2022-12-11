import { BlogService } from "../../services/blog";
import { createAsyncThunk } from "@reduxjs/toolkit";

const getBlogsData = createAsyncThunk(
  "blog/many",
  async (
    args: {
      per_page?: number;
      categories?: string;
      page?: number;
    },
    { rejectWithValue, dispatch }
  ) => {
    const { per_page, categories, page } = args;
    try {
      const res = await BlogService.getMany({ page, per_page, categories });
      dispatch(getImages({ data: res, type: "blogs" }));
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
const getBlogData = createAsyncThunk(
  "blog/one",
  async (args: { slug: number }, { rejectWithValue }) => {
    const { slug } = args;
    try {
      const res = await BlogService.getOne(slug);
      return { ...res, id_slug: slug };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
const getSimilarBlogs = createAsyncThunk(
  "blog/similar",
  async (
    args: {
      per_page?: number;
      categories?: string;
      page?: number;
    },
    { rejectWithValue, dispatch }
  ) => {
    const { per_page, categories, page } = args;
    try {
      const res = await BlogService.getMany({ page, per_page, categories });
      dispatch(getImages({ data: res, type: "blog" }));
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
const getFooterData = createAsyncThunk(
  "blog/footer",
  async (
    args: {
      per_page?: number;
      categories?: string;
      page?: number;
    },
    { rejectWithValue }
  ) => {
    const { per_page, categories, page } = args;
    try {
      const res = await BlogService.getMany({ page, per_page, categories });
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
const getCategories = createAsyncThunk(
  "blog/categories",
  async (args, { rejectWithValue }) => {
    try {
      const res = await BlogService.getCategories({});
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
const getImages = createAsyncThunk(
  "blogs/images",
  async (
    { data, type }: { data: Array<{ featured_media: number }>; type: string },
    { rejectWithValue }
  ) => {
    try {
      const promises = [];
      const tempPostsMediaTable = [];
      data.forEach((post) =>
        promises.push(BlogService.getImages(post.featured_media))
      );
      const media = await Promise.all(promises);

      media.forEach(
        (img) => (tempPostsMediaTable[img.data.id] = img.data.guid.rendered)
      );
      return { data: tempPostsMediaTable, type };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
const getAds = createAsyncThunk(
  "blog/ads",
  async (args, { rejectWithValue }) => {
    try {
      const res = await BlogService.getAds();
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const BlogThunkFunctions = {
  getBlogsData,
  getBlogData,
  getSimilarBlogs,
  getFooterData,
  getCategories,
  getImages,
  getAds,
};
