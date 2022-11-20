import { ICategory } from "@/services/tw-admin/categoriesService";
import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { CategoriesThunkFunctions } from "./thunkFunctions";
//import { CustomMatchers } from "./matchers";

const { getAll, getOne } =
CategoriesThunkFunctions;

export interface CategoriesState {
    page: number,
    to: number,
    total: number,
    per_page: number,
    loading: boolean,
    current_category: {
        loading: boolean,
        data?: CategoryState,
        error?: string,

    },
    data: CategoryState[],
    error?: string,

}

export type CategoryState = ICategory & {
    id: number,
    name:string,
    subcategories:ICategory&{id:number, name:string}[]
}

const initialState: CategoriesState = {
    page: 1,
    to: 1,
    total: 0,
    per_page: 0,
    loading: true,
    current_category: {
        loading: true,
        data: null
    },
    data: [],

};

export const dashboardCategoriesSlice = createSlice({
    name: "dashboard_categories",
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
            state.current_category.data = action.payload
        })

        builder.addMatcher(isAnyOf(getOne.fulfilled, getOne.rejected), (state) => {
            state.current_category.loading = false
        })

        builder.addMatcher(isAnyOf(getOne.pending), (state) => {
            state.current_category.loading = true
        })

    },
});
export default dashboardCategoriesSlice.reducer;
