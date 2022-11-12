import { ILanguage, LanguagesService } from "@/services/tw-admin/languagesService";
import { createAsyncThunk } from "@reduxjs/toolkit";

const getAll = createAsyncThunk('admin/languages',
    async (args: {}, { rejectWithValue }) => {
        try {
            const res = await LanguagesService.getAll()
            return res?.data
        }
        catch (err) {
            return rejectWithValue(err)
        }
    })

const getOne = createAsyncThunk('admin/languages/{id}',
    async (args: { id: number }, { rejectWithValue }) => {
        try {
            const {id} = args
            const res = await LanguagesService.getOne(id)
            return res?.data
        }
        catch (err) {
            return rejectWithValue(err)
        }
    })

const createOne = createAsyncThunk('admin/languages/store',
    async (args: { language: ILanguage }, { rejectWithValue }) => {
        try {
            const { language } = args
            const res = await LanguagesService.createOne(language)
            return res?.data
        }
        catch (err) {
            return rejectWithValue(err)
        }
    })

const updateOne = createAsyncThunk('admin/languages/{id}/update',
    async (args: { id: number, language: ILanguage }, { rejectWithValue }) => {
        try {
            const { id, language } = args
            const res = await LanguagesService.updateOne({ id, language })
            return res?.data
        }
        catch (err) {
            return rejectWithValue(err)
        }
    })

const deleteOne = createAsyncThunk('admin/languages/{id}/delete',
    async (args: { id: number }, { rejectWithValue }) => {
        try {
            const { id } = args
            const res = await LanguagesService.deleteOne(id)
            return res?.data
        }
        catch (err) {
            return rejectWithValue(err)
        }
    })


export const LanguagesThunkFunctions = {
    getAll,
    getOne,
    createOne,
    updateOne,
    deleteOne,

}