import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { PortfolioMatchers } from "./matchers";
import { PortfolioThunkFunctions } from "./thunkFunctions";
const { getUserProjects, getUserProject } = PortfolioThunkFunctions;
const {
  isUserProjectsPending,
  isUserProjectsFulfilled,
  isUserProjectsRejected,
  isUserProjectPending,
  isUserProjectFulfilled,
  isUserProjectRejected,
} = PortfolioMatchers;
export interface PortfolioState {
  user: {
    data: Array<{
      id: number;
      title: string;
      content: string;
      cover_url: string;
      seller: { id: number };
    }>;
    loading: boolean;
    loaded: boolean;
  };
  project: {
    id: number;
    title: string;
    content: string;
    cover_url: string;
    completed_date: string;
    gallery: Array<{ id: number; image_url: string }>;
    url: string;
    seller: {
      id: number;
      bio: string;
      profile: {
        full_name: string;
        avatar_url: string;
        level: { name: string };
      };
    };
    portfolio_item_tags: Array<{ id: number; name: string }>;
    loading: boolean;
    loaded: boolean;
  };
}

const initialState: PortfolioState = {
  user: { data: [], loading: true, loaded: false },
  project: {
    id: null,
    title: "",
    content: "",
    cover_url: "",
    completed_date: "",
    gallery: [],
    url: "",
    seller: {
      id: null,
      bio: "",
      profile: { full_name: "", avatar_url: "", level: { name: "" } },
    },
    portfolio_item_tags: [],
    loading: true,
    loaded: false,
  },
};

export const PortfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    initializeProject: (state) => {
      state.project = initialState.project;
    },
  },
  extraReducers(builder) {
    builder.addCase(
      getUserProjects.fulfilled,
      (state: PortfolioState, action) => {
        state.user.data = action.payload;
        state.user.loaded = true;
      }
    );
    builder.addCase(getUserProject.fulfilled, (state, action) => {
      state.project = action.payload;
      state.project.loaded = true;
    });
    builder.addMatcher(isUserProjectsPending, (state, action) => {
      if (action.type.split("/")[0] !== "portfolio") return;
      state.user.loading = true;
    });
    builder.addMatcher(
      isAnyOf(isUserProjectsFulfilled, isUserProjectsRejected),
      (state) => {
        state.user.loading = false;
      }
    );
    builder.addMatcher(isUserProjectPending, (state, action) => {
      if (action.type.split("/")[0] !== "portfolio") return;
      state.project.loading = true;
    });
    builder.addMatcher(
      isAnyOf(isUserProjectFulfilled, isUserProjectRejected),
      (state) => {
        state.project.loading = false;
      }
    );
  },
});
export default PortfolioSlice.reducer;
