import { createAsyncThunk } from "@reduxjs/toolkit";
import { EProductStatus, ProductsService } from "@/services/tw-admin/productsService";

const getAll = createAsyncThunk('admin/products/all',
    async (args: { search?: string, page?: number }, { rejectWithValue }) => {
        try {
            console.log('get thunk all products')
            let page = 1, search = '';
            ({ page, search } = { page, search, ...args })

            const res = await ProductsService.getAll({
                page,
                search
            })
            return res?.data
        }
        catch (err) {
            console.log(err)
            return rejectWithValue(err)
        }
    })

const getAllActive = createAsyncThunk('admin/products/actived',
    async (args: { search: string, page: number }, { rejectWithValue }) => {
        try {
            const { search, page } = args
            const res = await ProductsService.getAll({
                page,
                search,
                status: EProductStatus.ACTIVE
            })
            return res?.data
        }
        catch (err) {
            return rejectWithValue(err)
        }
    })

const getAllReject = createAsyncThunk('admin/products/rejected',
    async (args: { search: string, page: number }, { rejectWithValue }) => {
        try {
            const { search, page } = args
            const res = await ProductsService.getAll({
                page,
                search,
                status: EProductStatus.REJECTED
            })
            return res?.data
        }
        catch (err) {
            return rejectWithValue(err)
        }
    })

const getAllPending = createAsyncThunk('admin/products/pending',
    async (args: { search: string, page: number }, { rejectWithValue }) => {
        try {
            const { search, page } = args
            const res = await ProductsService.getAll({
                page,
                search,
                status: EProductStatus.PENDING
            })
            return res?.data
        }
        catch (err) {
            return rejectWithValue(err)
        }
    })

const getAllArchieved = createAsyncThunk('admin/products/archieved',
    async (args: { search: string, page: number }, { rejectWithValue }) => {
        try {
            const { search, page } = args
            const res = await ProductsService.getArchieved({ page, search })
            return res?.data
        }
        catch (err) {
            return rejectWithValue(err)
        }
    })

const getOne = createAsyncThunk('admin/products/{id}',
    async (args: { id: number|string }, { rejectWithValue }) => {
        try {
            console.log('get one thunk')
            const { id } = args
            const res = await ProductsService.getOne(id)
            return res?.data
        }
        catch (err) {
            console.log(err)
            return rejectWithValue(err)
        }
    })

export const ProductsThunkFunctions = {
    getAll,
    getAllActive,
    getAllReject,
    getAllPending,
    getAllArchieved,
    getOne
}