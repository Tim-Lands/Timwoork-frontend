import { createAsyncThunk } from "@reduxjs/toolkit";
import { EProductStatus, ProductsService } from "@/services/tw-admin/productsService";
import { ProductsState } from "./productsSlice";

export enum EProductStateType {
    ALL = <any>'',
    PENDING = <any>'Pending',
    REJECTED = <any>'Rejected',
    ACTIVE = <any>"Active",
    ARCHIEVE = <any>"Archieveed"
}

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

const getAllActive = createAsyncThunk('admin/products/active',
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

const getAllArchieved = createAsyncThunk('admin/products/archieve',
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
    async (args: { id: number | string }, { rejectWithValue }) => {
        try {
            const { id } = args
            const res = await ProductsService.getOne(id)
            return res?.data
        }
        catch (err) {
            console.log(err)
            return rejectWithValue(err)
        }
    })

const activateOne = createAsyncThunk('admin/products/{id}/activate',
    async (args: { id: number, revalidatedType: EProductStateType }, { rejectWithValue, dispatch }) => {
        try {
            const { id, revalidatedType } = args
            const res = await ProductsService.activateProduct(id)
            dispatch(revalidate({ productsType: revalidatedType }))
            return res?.data
        }
        catch (err) {
            console.log(err)
            return rejectWithValue(err)
        }
    })

const disactivateOne = createAsyncThunk('admin/products/{id}/disactive',
    async (args: { id: number, cause: string, revalidatedType: EProductStateType }, { rejectWithValue, dispatch }) => {
        try {
            const { id, cause, revalidatedType } = args
            console.log(revalidatedType)
            const res = await ProductsService.disactiveProduct({ id, cause })
            dispatch(revalidate({ productsType: revalidatedType }))
            return res?.data
        }
        catch (err) {
            console.log(err)
            return rejectWithValue(err)
        }
    })
const rejectOne = createAsyncThunk('admin/products/{id}/reject',
    async (args: { id: number, cause: string, revalidatedType: EProductStateType }, { rejectWithValue, dispatch }) => {
        try {
            const { id, cause, revalidatedType } = args
            const res = await ProductsService.rejectProduct({ id, cause })
            dispatch(revalidate({ productsType: revalidatedType }))
            return res?.data
        }
        catch (err) {
            console.log(err)
            return rejectWithValue(err)
        }
    })

const archieveOne = createAsyncThunk('admin/products/{id}/archieve',
    async (args: { id: number, revalidatedType: EProductStateType }, { rejectWithValue, dispatch }) => {
        try {
            const { id, revalidatedType } = args
            const res = await ProductsService.archieveProduct(id)
            dispatch(revalidate({ productsType: revalidatedType }))
            return res?.data
        }
        catch (err) {
            console.log(err)
            return rejectWithValue(err)
        }
    })

const unarchieveOne = createAsyncThunk('admin/products/{id}/unarchieve',
    async (args: { id: number, revalidatedType: EProductStateType }, { rejectWithValue, dispatch }) => {
        try {
            const { id, revalidatedType } = args
            const res = await ProductsService.unarchieveProduct(id)
            dispatch(revalidate({ productsType: revalidatedType }))
            return res?.data
        }
        catch (err) {
            console.log(err)
            return rejectWithValue(err)
        }
    })

const UpdateStepOne = createAsyncThunk('admin/products/{id}/step-one',
    async (args: {
        id: number,
        title: string,
        subcategory: number,
        tags:string[],
        title_ar?: string,
        title_en?: string,
        title_fr?: string
    }, { rejectWithValue }) => {
        try {
            const { id, title, subcategory, title_ar, title_en, title_fr, tags } = args
            const res = await ProductsService.editProductStepOne({ id, title, tags, subcategory, title_ar, title_en, title_fr })
            return res?.data
        }
        catch (err) {
            console.log(err)
            return rejectWithValue(err)
        }
    })

const updateStepTwo = createAsyncThunk('admin/products/{id}/step_two',
    async (args: {
        id: number,
        price: number,
        duration: number,
        developments: any[]
    }, { rejectWithValue }) => {
        try {
            const { id, price, duration, developments } = args
            const res = await ProductsService.editProductStepTwo({id, price, duration, developments})
            return res?.data
        }
        catch (err) {
            console.log(err)
            return rejectWithValue(err)
        }
    })

const updateStepThree = createAsyncThunk('admin/products/{id}/step_three',
    async (args: { id: number, buyer_instruct, content }, { rejectWithValue}) => {
        try {
            const { id, buyer_instruct, content } = args
            const res = await ProductsService.editProductStepThree({id, buyer_instruct, content})
            return res?.data
        }
        catch (err) {
            console.log(err)
            return rejectWithValue(err)
        }
    })

const updateStepFour = createAsyncThunk('admin/products/{id}/step_four',
    async (args: { id: number, url_video: string}, { rejectWithValue }) => {
        try {
            const { id, url_video } = args
            const res = await ProductsService.editProductStepFour({id, url_video})
            return res?.data
        }
        catch (err) {
            console.log(err)
            return rejectWithValue(err)
        }
    })

    const editGallery = createAsyncThunk('admin/products/{id}/gallery',
    async (args: { id: number, form_data: FormData}, { rejectWithValue }) => {
        try {
            const { id, form_data } = args
            const res = await ProductsService.editGallary({id, form_data})
            return res?.data
        }
        catch (err) {
            console.log(err)
            return rejectWithValue(err)
        }
    })

    const editThumbnail = createAsyncThunk('admin/products/{id}/thumbnail',
    async (args: { id: number, form_data: FormData}, { rejectWithValue }) => {
        try {
            const { id, form_data } = args
            const res = await ProductsService.editThumbnail({id, form_data})
            return res?.data
        }
        catch (err) {
            console.log(err)
            return rejectWithValue(err)
        }
    })

    const deleteGallary = createAsyncThunk('admin/products/{id}/gallery/delete',
    async (args: { id: number, gallery_id: number }, { rejectWithValue }) => {
        try {
            const { id, gallery_id } = args
            const res = await ProductsService.deleteGallary({id, gallery_id})
            return res?.data
        }
        catch (err) {
            console.log(err)
            return rejectWithValue(err)
        }
    })

    const deleteProduct = createAsyncThunk('admin/products/{id}/delete',
    async (args: { id: number}, { rejectWithValue }) => {
        try {
            const { id } = args
            const res = await ProductsService.deleteProduct(id)
            return res?.data
        }
        catch (err) {
            console.log(err)
            return rejectWithValue(err)
        }
    })


const revalidate = createAsyncThunk('admin/products/{id}/revalidate',
    async (args: { productsType: EProductStateType }, { getState, dispatch }) => {
        try {
            const { productsType } = args
            const productsTypeKey = EProductStateType[productsType]
            const state: any = getState()
            const productsState: ProductsState = state.dashboardProducts[productsTypeKey.toLowerCase()]
            const filter = productsState.filter
            let search = "";
            const page = productsState.page;
            ({ search, } = { search, ...filter })
            dispatch(ProductsThunkFunctions[`getAll${productsType}`]({ search, page }))
        }
        catch (err) {
            console.log(err)
            console.log(args)
        }
    })


export const ProductsThunkFunctions = {
    getAll,
    getAllActive,
    getAllReject,
    getAllPending,
    getAllArchieved,
    getOne,
    activateOne,
    rejectOne,
    disactivateOne,
    archieveOne,
    unarchieveOne,
    editGallery,
    editThumbnail,
    updateStepFour,
    updateStepThree,
    updateStepTwo,
    UpdateStepOne,
    deleteProduct,
    deleteGallary
}