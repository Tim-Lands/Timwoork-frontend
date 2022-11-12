import { TagsService } from "@/services/tw-admin/tagsService";
import { createAsyncThunk } from "@reduxjs/toolkit";

const getAll = createAsyncThunk('admin/tags',
    async (args: {page: number, filter:string}, { rejectWithValue }) => {
        try {
            const {page, filter} = args
            const res = await TagsService.getAll({page, filter})
            return res?.data
        }
        catch (err) {
            return rejectWithValue(err)
        }
    })

const getOne = createAsyncThunk('admin/tags/{id}',
    async (args: { id: number }, { rejectWithValue }) => {
        try {
            const {id} = args
            const res = await TagsService.getOne(id)
            return res?.data
        }
        catch (err) {
            return rejectWithValue(err)
        }
    })

const createOne = createAsyncThunk('admin/tags/store',
    async (args: { name: string }, { rejectWithValue }) => {
        try {
            const { name } = args
            const res = await TagsService.createOne(name)
            return res?.data
        }
        catch (err) {
            return rejectWithValue(err)
        }
    })

const updateOne = createAsyncThunk('admin/tags/{id}/update',
    async (args: { id: number, name: string }, { rejectWithValue }) => {
        try {
            const { id, name } = args
            const res = await TagsService.updateOne({ id, name })
            return res?.data
        }
        catch (err) {
            return rejectWithValue(err)
        }
    })

const deleteOne = createAsyncThunk('admin/tags/{id}/delete',
    async (args: { id: number }, { rejectWithValue }) => {
        try {
            const { id } = args
            const res = await TagsService.deleteOne(id)
            return res?.data
        }
        catch (err) {
            return rejectWithValue(err)
        }
    })


export const TagsThunkFunctions = {
    getAll,
    getOne,
    createOne,
    updateOne,
    deleteOne,

}