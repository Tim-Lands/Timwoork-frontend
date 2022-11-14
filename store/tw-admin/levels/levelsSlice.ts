import { ILevel } from "@/services/tw-admin/levelsService";
import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { LevelsThunkFunctions } from "./thunkFunctions";
//import { CustomMatchers } from "./matchers";

const { getAll, getOne } =
LevelsThunkFunctions;

export interface LevelsState {
    page: number,
    to: number,
    total: number,
    per_page: number,
    loading: boolean,
    current_level: {
        loading: boolean,
        data?: LevelState,
        error?: string,

    },
    data: LevelState[],
    error?: string,

}

export type LevelState = ILevel & {
    id: number,


}
const initialState: LevelsState = {
    page: 1,
    to: 1,
    total: 0,
    per_page: 0,
    loading: true,
    current_level: {
        loading: true,
        data: null
    },
    data: [],

};

export const dashboardLevelsSlice = createSlice({
    name: "dashboard_levels",
    initialState,
    reducers: {
    },
    extraReducers(builder) {
        builder.addCase(getAll.fulfilled, (state, action: any) => {
            const payload: any = action.payload
            state.data = payload
            state.loading = false
        })

        builder.addCase(getAll.pending, (state) => {
            state.loading = true
        })

        builder.addCase(getAll.rejected, (state) => {
            state.loading = false
        })

        builder.addCase(getOne.fulfilled, (state, action: any) => {
            state.current_level.data = action.payload
        })

        builder.addMatcher(isAnyOf(getOne.fulfilled, getOne.rejected), (state) => {
            state.current_level.loading = false
        })

        builder.addMatcher(isAnyOf(getOne.pending), (state) => {
            state.current_level.loading = true
        })

    },
});
export default dashboardLevelsSlice.reducer;
