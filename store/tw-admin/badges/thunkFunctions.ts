import { BadgesService, IBadge } from "@/services/tw-admin/badgesService";
import { createAsyncThunk } from "@reduxjs/toolkit";

const getAll = createAsyncThunk('admin/badges',
    async (args: {}, { rejectWithValue }) => {
        try {
            const res = await BadgesService.getAll()
            return res?.data
        }
        catch (err) {
            return rejectWithValue(err)
        }
    })

const getOne = createAsyncThunk('admin/badges/{id}',
    async (args: { id: number }, { rejectWithValue }) => {
        try {
            const {id} = args
            const res = await BadgesService.getOne(id)
            return res?.data
        }
        catch (err) {
            return rejectWithValue(err)
        }
    })

const createOne = createAsyncThunk('admin/badges/store',
    async (args: { badge: IBadge }, { rejectWithValue, dispatch }) => {
        try {
            const { badge } = args
            const res = await BadgesService.createOne(badge)
            dispatch(getAll({}))
            return res?.data
        }
        catch (err) {
            return rejectWithValue(err)
        }
    })

const updateOne = createAsyncThunk('admin/badges/{id}/update',
    async (args: { id: number, badge: IBadge }, { rejectWithValue }) => {
        try {
            const { id, badge } = args
            const res = await BadgesService.updateOne({ id, badge })
            return res?.data
        }
        catch (err) {
            return rejectWithValue(err)
        }
    })

const deleteOne = createAsyncThunk('admin/badges/{id}/delete',
    async (args: { id: number }, { rejectWithValue, dispatch }) => {
        try {
            const { id } = args
            const res = await BadgesService.deleteOne(id)
            dispatch(getAll({}))
            return res?.data
        }
        catch (err) {
            return rejectWithValue(err)
        }
    })


export const BadgesThunkFunctions = {
    getAll,
    getOne,
    createOne,
    updateOne,
    deleteOne,

}