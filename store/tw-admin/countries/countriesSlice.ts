import { ICountry } from "@/services/tw-admin/countriesService";
import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { CountriesThunkFunctions } from "./thunkFunctions";
//import { CustomMatchers } from "./matchers";

const { getAll, getOne } =
CountriesThunkFunctions;

export interface CountriesState {
    page: number,
    to: number,
    total: number,
    per_page: number,
    loading: boolean,
    current_country: {
        loading: boolean,
        data?: CountryState,
        error?: string,

    },
    data: CountryState[],
    error?: string,

}

export type CountryState = ICountry & {
    id: number,


}
const initialState: CountriesState = {
    page: 1,
    to: 1,
    total: 0,
    per_page: 0,
    loading: true,
    current_country: {
        loading: true,
        data: null
    },
    data: [],

};

export const dashboardCountriesSlice = createSlice({
    name: "dashboard_countries",
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
            state.current_country.data = action.payload
        })

        builder.addMatcher(isAnyOf(getOne.fulfilled, getOne.rejected), (state) => {
            state.current_country.loading = false
        })

        builder.addMatcher(isAnyOf(getOne.pending), (state) => {
            state.current_country.loading = true
        })

    },
});
export default dashboardCountriesSlice.reducer;
