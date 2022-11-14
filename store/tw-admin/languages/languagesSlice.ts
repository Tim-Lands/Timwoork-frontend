import { ILanguage } from "@/services/tw-admin/languagesService";
import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { LanguagesThunkFunctions } from "./thunkFunctions";
//import { CustomMatchers } from "./matchers";

const { getAll, getOne } =
LanguagesThunkFunctions;

export interface LanguagesState {
    page: number,
    to: number,
    total: number,
    per_page: number,
    loading: boolean,
    current_language: {
        loading: boolean,
        data?: LanguageState,
        error?: string,

    },
    data: LanguageState[],
    error?: string,

}

export type LanguageState = ILanguage & {
    id: number,


}
const initialState: LanguagesState = {
    page: 1,
    to: 1,
    total: 0,
    per_page: 0,
    loading: true,
    current_language: {
        loading: true,
        data: null
    },
    data: [],

};

export const dashboardLanguagesSlice = createSlice({
    name: "dashboard_languages",
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
            state.current_language.data = action.payload
        })

        builder.addMatcher(isAnyOf(getOne.fulfilled, getOne.rejected), (state) => {
            state.current_language.loading = false
        })

        builder.addMatcher(isAnyOf(getOne.pending), (state) => {
            state.current_language.loading = true
        })

    },
});
export default dashboardLanguagesSlice.reducer;
