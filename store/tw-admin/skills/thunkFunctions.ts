import { ISkill, SkillsService } from "@/services/tw-admin/skillsService";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { SkillsState } from "./skillsSlice";

const getAll = createAsyncThunk('admin/skills',
    async (args: {page: number}, { rejectWithValue }) => {
        try {
            const {page} = args
            const res = await SkillsService.getAll(page)
            return res?.data
        }
        catch (err) {
            return rejectWithValue(err)
        }
    })

const getOne = createAsyncThunk('admin/skills/{id}',
    async (args: { id: number }, { rejectWithValue }) => {
        try {
            const {id} = args
            const res = await SkillsService.getOne(id)
            return res?.data
        }
        catch (err) {
            return rejectWithValue(err)
        }
    })

const createOne = createAsyncThunk('admin/skills/store',
    async (args: {skill: ISkill }, { rejectWithValue, dispatch }) => {
        try {
            const { skill } = args
            const res = await SkillsService.createOne(skill)
            dispatch(revalidate({}))
            return res?.data
        }
        catch (err) {
            return rejectWithValue(err)
        }
    })

const updateOne = createAsyncThunk('admin/skills/{id}/update',
    async (args: { id: number, skill: ISkill }, { rejectWithValue }) => {
        try {
            const { id, skill } = args
            const res = await SkillsService.updateOne({ id, skill })
            return res?.data
        }
        catch (err) {
            return rejectWithValue(err)
        }
    })

const deleteOne = createAsyncThunk('admin/skills/{id}/delete',
    async (args: { id: number }, { rejectWithValue, dispatch }) => {
        try {
            const { id } = args
            const res = await SkillsService.deleteOne(id)
            dispatch(revalidate({}))
            return res?.data
        }
        catch (err) {
            return rejectWithValue(err)
        }
    })

const revalidate = createAsyncThunk('admin/skills/revalidate', 
    async(args:{},{dispatch, getState})=>{
        const state:any = getState()
        const skillsState:SkillsState = state.dashboardSkillsSlice
        const page = skillsState.page
        dispatch(getAll({page}))
    })


export const SkillsThunkFunctions = {
    getAll,
    getOne,
    createOne,
    updateOne,
    deleteOne,

}