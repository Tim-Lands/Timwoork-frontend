import { TagsService } from "@/services/tw-admin/tagsService";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { TagsState } from "./tagsSlice";

const getAll = createAsyncThunk('admin/tags',
    async (args: {page?: number, name?:string}, { rejectWithValue }) => {
        try {
            let page = 1, name=undefined;
            ({page, name} = {page, name,...args})
            const res = await TagsService.getAll({page, name})
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
    async (args: { name: string }, { rejectWithValue, dispatch }) => {
        try {
            const { name } = args
            const res = await TagsService.createOne(name)
            dispatch(revalidate({}))
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
    async (args: { id: number }, { rejectWithValue, dispatch }) => {
        try {
            const { id } = args
            const res = await TagsService.deleteOne(id)
            dispatch(revalidate({}))
            return res?.data
        }
        catch (err) {
            return rejectWithValue(err)
        }
    })

    const revalidate = createAsyncThunk('admin/products/{id}/revalidate',
    async (args: { }, { getState, dispatch }) => {
        try {
            const state: any = getState()
            const tagsState:TagsState = state.dashboardTagsSlice
            const filter = tagsState.filter
            let name = "";
            const page = tagsState.page;
            ({ name, } = { name, ...filter })
            dispatch(getAll({page, name}))
        }
        catch (err) {
            console.log(err)
            console.log(args)
        }
    })


export const TagsThunkFunctions = {
    getAll,
    getOne,
    createOne,
    updateOne,
    deleteOne,
    revalidate
}