import { isAnyOf } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { BlogThunkFunctions } from "./thunkFunctions";
export interface blogState {
  blogs: {
    data: Array<{
      title: { rendered: string };
      excerpt: { rendered: string };
      slug: string;
    }>;
    dataImages: Array<any>;
    isLoading: boolean;
    loaded: boolean;
  };
  blog: {
    id: number;
    data: {
      featured_media: number;
      jetpack_featured_media_url: string;
      slug: string;
      modified: string;
      categories: Array<string>;
      title: { rendered: string };
      excerpt: { rendered: string };
      content: { rendered: string };
    };
    dataImages: Array<any>;
    isLoading: boolean;
    loaded: boolean;
    relatedBlogs: {
      data: Array<{
        title: { rendered: string };
        excerpt: { rendered: string };
        slug: string;
      }>;
      dataImages: Array<any>;
      isLoading: boolean;
      loaded: boolean;
    };
  };
  footer: {
    data: Array<{ id: number; title: { rendered: string }; slug: string }>;
    isLoading: boolean;
    loaded: boolean;
  };
  categories: {
    data: Array<{ id: number; name: string }>;
    isLoading: boolean;
    loaded: boolean;
  };
  ads: {
    data: Array<{ id: number; guid: { rendered: string } }>;
    loaded: boolean;
    isLoading: boolean;
  };
}
export const initialState: blogState = {
  blogs: { data: [], dataImages: [], isLoading: false, loaded: false },
  blog: {
    id: null,
    data: {
      featured_media: null,
      jetpack_featured_media_url: "",
      slug: "",
      modified: "",
      categories: [],
      title: { rendered: "" },
      excerpt: { rendered: "" },
      content: { rendered: "" },
    },
    dataImages: [],
    isLoading: false,
    loaded: false,
    relatedBlogs: { data: [], dataImages: [], isLoading: false, loaded: false },
  },
  footer: {
    data: [],
    isLoading: false,
    loaded: false,
  },
  categories: { data: [], isLoading: false, loaded: false },
  ads: { data: [], loaded: false, isLoading: false },
};
export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    loadBlog: (state: blogState) => {
      state.blog.isLoading = true;
    },
  },
  extraReducers(builder) {
    builder.addCase(
      BlogThunkFunctions.getBlogsData.fulfilled,
      (
        state: blogState,
        action: {
          payload: Array<{
            title: { rendered: string };
            excerpt: { rendered: string };
            slug: string;
          }>;
        }
      ) => {
        state.blogs.data = action.payload;
        state.blogs.loaded = true;
      }
    );
    builder.addCase(
      BlogThunkFunctions.getBlogData.fulfilled,
      (state: blogState, action: { payload: any }) => {
        state.blog.data = action.payload;
        state.blog.id = action.payload.id_slug;
        state.blog.loaded = true;
      }
    );
    builder.addCase(
      BlogThunkFunctions.getSimilarBlogs.fulfilled,
      (state: blogState, action: { payload: any }) => {
        state.blog.relatedBlogs.data = action.payload;
        state.blog.relatedBlogs.loaded = true;
      }
    );
    builder.addCase(
      BlogThunkFunctions.getImages.fulfilled,
      (
        state: blogState,
        action: { payload: { type: string; data: Array<any> } }
      ) => {
        const { data, type } = action.payload;
        switch (type) {
          case "blogs": {
            state.blogs.dataImages = data;
            return;
          }
          case "blog": {
            state.blog.relatedBlogs.dataImages = data;
            return;
          }
        }
      }
    );
    builder.addCase(
      BlogThunkFunctions.getCategories.fulfilled,
      (
        state: blogState,
        action: {
          payload: Array<{ id: number; name: string }>;
        }
      ) => {
        state.categories.data = action.payload;
        state.categories.loaded = true;
      }
    );
    builder.addCase(
      BlogThunkFunctions.getFooterData.fulfilled,
      (
        state: blogState,
        action: {
          payload: Array<{
            id: number;
            title: { rendered: string };
            slug: string;
          }>;
        }
      ) => {
        state.footer.data = action.payload;
        state.footer.loaded = true;
      }
    );
    builder.addCase(
      BlogThunkFunctions.getAds.fulfilled,
      (
        state: blogState,
        action: { payload: Array<{ id: number; guid: { rendered: string } }> }
      ) => {
        state.ads.data = action.payload;
        state.ads.loaded = true;
      }
    );
    builder.addMatcher(
      isAnyOf(
        BlogThunkFunctions.getBlogsData.fulfilled,
        BlogThunkFunctions.getBlogsData.rejected
      ),
      (state: blogState) => {
        state.blogs.isLoading = false;
      }
    );
    builder.addMatcher(
      isAnyOf(BlogThunkFunctions.getBlogsData.pending),
      (state: blogState) => {
        state.blogs.isLoading = true;
      }
    );
    builder.addMatcher(
      isAnyOf(BlogThunkFunctions.getFooterData.pending),
      (state: blogState) => {
        state.footer.isLoading = true;
      }
    );
    builder.addMatcher(
      isAnyOf(
        BlogThunkFunctions.getFooterData.fulfilled,
        BlogThunkFunctions.getFooterData.rejected
      ),
      (state: blogState) => {
        state.footer.isLoading = false;
      }
    );
    builder.addMatcher(
      isAnyOf(BlogThunkFunctions.getCategories.pending),
      (state: blogState) => {
        state.categories.isLoading = true;
      }
    );
    builder.addMatcher(
      isAnyOf(
        BlogThunkFunctions.getCategories.fulfilled,
        BlogThunkFunctions.getCategories.rejected
      ),
      (state: blogState) => {
        state.categories.isLoading = false;
      }
    );
    builder.addMatcher(
      isAnyOf(BlogThunkFunctions.getBlogData.pending),
      (state: blogState) => {
        state.blog.isLoading = true;
      }
    );
    builder.addMatcher(
      isAnyOf(
        BlogThunkFunctions.getBlogData.fulfilled,
        BlogThunkFunctions.getBlogData.rejected
      ),
      (state: blogState) => {
        state.blog.isLoading = false;
      }
    );
    builder.addMatcher(
      isAnyOf(BlogThunkFunctions.getSimilarBlogs.pending),
      (state: blogState) => {
        state.blog.relatedBlogs.isLoading = true;
      }
    );
    builder.addMatcher(
      isAnyOf(
        BlogThunkFunctions.getSimilarBlogs.fulfilled,
        BlogThunkFunctions.getSimilarBlogs.rejected
      ),
      (state: blogState) => {
        state.blog.relatedBlogs.isLoading = false;
      }
    );
    builder.addMatcher(
      isAnyOf(BlogThunkFunctions.getAds.pending),
      (state: blogState) => {
        state.ads.isLoading = true;
      }
    );
    builder.addMatcher(
      isAnyOf(
        BlogThunkFunctions.getAds.fulfilled,
        BlogThunkFunctions.getAds.rejected
      ),
      (state: blogState) => {
        state.ads.isLoading = false;
      }
    );
  },
});
export default blogSlice.reducer;
