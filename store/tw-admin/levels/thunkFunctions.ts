import { ELevelTypes, ILevel, LevelsService } from "@/services/tw-admin/levelsService";
import { createAsyncThunk } from "@reduxjs/toolkit";

const getAll = createAsyncThunk('admin/levels',
    async (args: {type?: ELevelTypes}, { rejectWithValue }) => {
        try {
            const {type} = args
            const res = await LevelsService.getAll({type})
            return res?.data
        }
        catch (err) {
            return rejectWithValue(err)
        }
    })

const getOne = createAsyncThunk('admin/levels/{id}',
    async (args: { id: number }, { rejectWithValue }) => {
        try {
            const {id} = args
            const res = await LevelsService.getOne(id)
            return res?.data
        }
        catch (err) {
            return rejectWithValue(err)
        }
    })

const createOne = createAsyncThunk('admin/levels/store',
    async (args: { level: ILevel }, { rejectWithValue }) => {
        try {
            const { level } = args
            const res = await LevelsService.createOne(level)
            return res?.data
        }
        catch (err) {
            return rejectWithValue(err)
        }
    })

const updateOne = createAsyncThunk('admin/levels/{id}/update',
    async (args: { id: number, level: ILevel }, { rejectWithValue }) => {
        try {
            const { id, level } = args
            const res = await LevelsService.updateOne({ id, level })
            return res?.data
        }
        catch (err) {
            return rejectWithValue(err)
        }
    })

const deleteOne = createAsyncThunk('admin/levels/{id}/delete',
    async (args: { id: number }, { rejectWithValue }) => {
        try {
            const { id } = args
            const res = await LevelsService.deleteOne(id)
            return res?.data
        }
        catch (err) {
            return rejectWithValue(err)
        }
    })


export const LevelsThunkFunctions = {
    getAll,
    getOne,
    createOne,
    updateOne,
    deleteOne,

}