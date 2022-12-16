import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { PortfolioMatchers } from "./matchers";
import { PortfolioThunkFunctions } from "./thunkFunctions";
const { getUserProjects, getUserProject, getUsersProjects } =
  PortfolioThunkFunctions;
const {
  isUsersProjectsPending,
  isUsersProjectsFulfilled,
  isUsersProjectsRejected,
  isUserProjectsPending,
  isUserProjectsFulfilled,
  isUserProjectsRejected,
  isUserProjectPending,
  isUserProjectFulfilled,
  isUserProjectRejected,
} = PortfolioMatchers;
export interface PortfolioState {
  all: {
    data: Array<{
      id: number;
      title: string;
      content: string;
      cover_url: string;
      fans_count: number;
      seller: {
        profile_id: number;
        id: number;
        profile: {
          full_name: string;
          avatar_url: string;
          level: { name: string };
        };
      };
    }>;
    loaded: boolean;
    loading: boolean;
    per_page: number;
    current_page: number;
    total: number;
  };
  user: {
    data: Array<{
      id: number;
      title: string;
      content: string;
      cover_url: string;
      fans_count: number;
      is_liked: boolean;
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
    likers_count: number;
    gallery: Array<{ id: number; image_url: string }>;
    url: string;
    is_liked: boolean;
    is_favourite: boolean;

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
  };
}

const initialState: PortfolioState = {
  all: {
    data: [],
    loading: true,
    current_page: null,
    total: null,
    per_page: null,
    loaded: false,
  },
  user: { data: [], loading: true, loaded: false },
  project: {
    id: null,
    title: "",
    content: "",
    cover_url: "",
    completed_date: "",
    likers_count: null,
    gallery: [],
    url: "",
    is_liked: false,
    is_favourite: false,
    seller: {
      id: null,
      bio: "",
      profile: { full_name: "", avatar_url: "", level: { name: "" } },
    },
    portfolio_item_tags: [],
    loading: true,
  },
};

export const PortfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    initializeProject: (state) => {
      state.project = initialState.project;
    },
    toggleLike: (state) => {
      state.project.is_liked = !state.project.is_liked;
    },
    toggleFav: (state) => {
      state.project.is_favourite = !state.project.is_favourite;
    },
  },
  extraReducers(builder) {
    builder.addCase(getUsersProjects.fulfilled, (state, action) => {
      state.all = action.payload;
      state.all.loaded = true;
    });
    builder.addCase(
      getUserProjects.fulfilled,
      (state: PortfolioState, action) => {
        state.user.data = action.payload;
        state.user.loaded = true;
      }
    );
    builder.addCase(getUserProject.fulfilled, (state, action) => {
      state.project = action.payload;
    });
    builder.addMatcher(isUsersProjectsPending, (state, action) => {
      if (action.type.split("/")[0] !== "portfolio") return;
      state.all.loading = true;
    });
    builder.addMatcher(
      isAnyOf(isUsersProjectsFulfilled, isUsersProjectsRejected),
      (state) => {
        state.all.loading = false;
      }
    );
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
