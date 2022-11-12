import { createAsyncThunk } from "@reduxjs/toolkit";
import { ITypePayment, TypesPaymentService } from "@/services/tw-admin/typesPaymentService";

const getAll = createAsyncThunk('admin/typesPayment',
    async (args: {}, { rejectWithValue }) => {
        try {
            const res = await TypesPaymentService.getAll()
            return res?.data
        }
        catch (err) {
            return rejectWithValue(err)
        }
    })

const getOne = createAsyncThunk('admin/typesPayment/{id}',
    async (args: { id: number }, { rejectWithValue }) => {
        try {
            const {id} = args
            const res = await TypesPaymentService.getOne(id)
            return res?.data
        }
        catch (err) {
            return rejectWithValue(err)
        }
    })

const createOne = createAsyncThunk('admin/typesPayment/store',
    async (args: { typePayment: ITypePayment }, { rejectWithValue }) => {
        try {
            const { typePayment } = args
            const res = await TypesPaymentService.createOne(typePayment)
            return res?.data
        }
        catch (err) {
            return rejectWithValue(err)
        }
    })

const updateOne = createAsyncThunk('admin/typesPayment/{id}/update',
    async (args: { id: number, typePayment: ITypePayment }, { rejectWithValue }) => {
        try {
            const { id, typePayment } = args
            const res = await TypesPaymentService.updateOne({ id, typePayment })
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
            const res = await TypesPaymentService.deleteOne(id)
            return res?.data
        }
        catch (err) {
            return rejectWithValue(err)
        }
    })

const activateOne = createAsyncThunk('admin/typesPayment/{id}/activate',
    async (args: { id: number }, { rejectWithValue }) => {
        try {
            const { id } = args
            const res = await TypesPaymentService.activateOne(id)
            return res?.data
        }
        catch (err) {
            return rejectWithValue(err)
        }
    })

const disactiveOne = createAsyncThunk('admin/typesPayment/{id}/disactive',
    async (args: { id: number }, { rejectWithValue }) => {
        try {
            const { id } = args
            const res = await TypesPaymentService.disactiveOne(id)
            return res?.data
        }
        catch (err) {
            return rejectWithValue(err)
        }
    })

export const TypesPaymentThunkActions = {
    getAll,
    getOne,
    createOne,
    updateOne,
    deleteOne,
    activateOne,
    disactiveOne
}