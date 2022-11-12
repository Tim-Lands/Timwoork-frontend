import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { TagsThunkFunctions } from "./thunkFunctions";
//import { CustomMatchers } from "./matchers";

const { getAll, getOne } =
TagsThunkFunctions;

export interface TagsState {
    page: number,
    to: number,
    total: number,
    per_page: number,
    loading: boolean,
    current_tag: {
        loading: boolean,
        data?: TagState,
        error?: string,

    },
    data: TagState[],
    error?: string,

}

export interface TagState {
    id: number,
    name:string


}
const initialState: TagsState = {
    page: 1,
    to: 1,
    total: 0,
    per_page: 0,
    loading: true,
    current_tag: {
        loading: true,
        data: null
    },
    data: [],

};

export const dashboardTagsSlice = createSlice({
    name: "dashboard_tags",
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
            state.current_tag.data = action.payload
        })

        builder.addMatcher(isAnyOf(getOne.fulfilled, getOne.rejected), (state) => {
            state.current_tag.loading = false
        })

        builder.addMatcher(isAnyOf(getOne.pending), (state) => {
            state.current_tag.loading = true
        })

    },
});
export default dashboardTagsSlice.reducer;
