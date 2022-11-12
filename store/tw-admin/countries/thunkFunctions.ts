import { CountriesService, ICountry } from "@/services/tw-admin/countriesService";
import { createAsyncThunk } from "@reduxjs/toolkit";

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
    async (args: { country: ICountry }, { rejectWithValue }) => {
        try {
            const { country } = args
            const res = await CountriesService.createOne(country)
            return res?.data
        }
        catch (err) {
            return rejectWithValue(err)
        }
    })

const updateOne = createAsyncThunk('admin/typesPayment/{id}/update',
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

const deleteOne = createAsyncThunk('admin/typesPayment/{id}/delete',
    async (args: { id: number }, { rejectWithValue }) => {
        try {
            const { id } = args
            const res = await CountriesService.deleteOne(id)
            return res?.data
        }
        catch (err) {
            return rejectWithValue(err)
        }
    })


export const CountriesThunkFunctions = {
    getAll,
    getOne,
    createOne,
    updateOne,
    deleteOne,

}