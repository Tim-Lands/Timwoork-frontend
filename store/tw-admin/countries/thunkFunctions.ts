import { CountriesService, ICountry } from "@/services/tw-admin/countriesService";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { CountriesState } from "./countriesSlice";

const getAll = createAsyncThunk('admin/countries',
    async (args: {page: number}, { rejectWithValue }) => {
        try {
            const {page} = args
            const res = await CountriesService.getAll(page)
            return res?.data
        }
        catch (err) {
            return rejectWithValue(err)
        }
    })

const getOne = createAsyncThunk('admin/countries/{id}',
    async (args: { id: number }, { rejectWithValue }) => {
        try {
            const {id} = args
            const res = await CountriesService.getOne(id)
            return res?.data
        }
        catch (err) {
            return rejectWithValue(err)
        }
    })

const createOne = createAsyncThunk('admin/countries/store',
    async (args: { country: ICountry }, { rejectWithValue, dispatch }) => {
        try {
            const { country } = args
            const res = await CountriesService.createOne(country)
            dispatch(revalidate({}))
            return res?.data
        }
        catch (err) {
            return rejectWithValue(err)
        }
    })

const updateOne = createAsyncThunk('admin/countries/{id}/update',
    async (args: { id: number, country: ICountry }, { rejectWithValue }) => {
        try {
            const { id, country } = args
            const res = await CountriesService.updateOne({ id, country })
            return res?.data
        }
        catch (err) {
            return rejectWithValue(err)
        }
    })

const deleteOne = createAsyncThunk('admin/countries/{id}/delete',
    async (args: { id: number }, { rejectWithValue, dispatch }) => {
        try {
            const { id } = args
            const res = await CountriesService.deleteOne(id)
            dispatch(revalidate({}))
            return res?.data
        }
        catch (err) {
            return rejectWithValue(err)
        }
    })

const revalidate = createAsyncThunk('admin/countries/revalidate',
    async(args:{},{getState, dispatch})=>{
        const state: any = getState()
        const countriesState: CountriesState = state.dashboardCountriesSlice
        const page = countriesState.page
        dispatch(getAll({page}))
    })
export const CountriesThunkFunctions = {
    getAll,
    getOne,
    createOne,
    updateOne,
    deleteOne,

}