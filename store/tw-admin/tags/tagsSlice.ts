import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { TagsThunkFunctions } from "./thunkFunctions";
//import { CustomMatchers } from "./matchers";

const { getAll, getOne, updateOne } =
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
    filter:{
        name:string
    },
    data: TagState[],
    error?: string,

}

export interface TagState {
    id: number,
    name_ar:string,
    name_en:string,
    name_fr:string

}
const initialState: TagsState = {
    page: 1,
    to: 1,
    total: 0,
    per_page: 0,
    loading: false,
    current_tag: {
        loading: true,
        data: null
    },
    filter:{
        name:''
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
            console.log('get all is fulfilleding')
            const payload: any = action.payload
            const {name} = action.meta.arg
            state.page = payload.current_page,
            state.per_page = payload.per_page
            state.to = payload.to
            state.total = payload.total
            state.data = payload.data
            state.loading = false
            state.filter = {name}
            console.log('getAll fulfilled')

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

        builder.addMatcher(isAnyOf(getOne.fulfilled, getOne.rejected, updateOne.fulfilled, updateOne.rejected), (state) => {
            state.current_tag.loading = false
        })

        builder.addMatcher(isAnyOf(getOne.pending, updateOne.pending), (state) => {
            state.current_tag.loading = true
        })

    },
});
export default dashboardTagsSlice.reducer;
