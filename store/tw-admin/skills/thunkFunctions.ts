import { ISkill, SkillsService } from "@/services/tw-admin/skillsService";
import { createAsyncThunk } from "@reduxjs/toolkit";

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
    async (args: {skill: ISkill }, { rejectWithValue }) => {
        try {
            const { skill } = args
            const res = await SkillsService.createOne(skill)
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
    async (args: { id: number }, { rejectWithValue }) => {
        try {
            const { id } = args
            const res = await SkillsService.deleteOne(id)
            return res?.data
        }
        catch (err) {
            return rejectWithValue(err)
        }
    })


export const SkillsThunkFunctions = {
    getAll,
    getOne,
    createOne,
    updateOne,
    deleteOne,

}