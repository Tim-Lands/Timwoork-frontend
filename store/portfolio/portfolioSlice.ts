import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { PortfolioMatchers } from "./matchers";
import { PortfolioThunkFunctions } from "./thunkFunctions";
const { getUserProjects } = PortfolioThunkFunctions;
const {
  isUserProjectsPending,
  isUserProjectsFulfilled,
  isUserProjectsRejected,
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
}

const initialState: PortfolioState = {
  user: { data: [], loading: true, loaded: false },
};

export const PortfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      getUserProjects.fulfilled,
      (state: PortfolioState, action) => {
        state.user.data = action.payload;
        state.user.loaded = true;
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
  },
});
export default PortfolioSlice.reducer;
