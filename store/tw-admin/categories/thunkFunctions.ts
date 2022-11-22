import { CategoriesService, ICategory } from "@/services/tw-admin/categoriesService";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { CategoriesState } from "./categoriesSlice";

const getAll = createAsyncThunk('admin/categories',
    async (args: {}, { rejectWithValue }) => {
        try{
        const res = await CategoriesService.getAll()
        return res?.data
    
        }
        catch(err){
            console.log(err)
            return rejectWithValue(err.data)
        }
    })

const getOne = createAsyncThunk('admin/categories/{id}',
async (args:{id:number}, {rejectWithValue})=>{
    try{
    const {id} = args
    const res = await CategoriesService.getOne(id)
    return res?.data
    }
    catch(err){
        return rejectWithValue(err.data)
    }
})


const createOne = createAsyncThunk('admin/categories/create',
async (args:{category:ICategory}, {rejectWithValue, dispatch})=>{
    try{
    const {category} = args
    const res = await CategoriesService.createOne(category)
    dispatch(revalidate({}))
    return res?.data
    }
    catch(err){
        return rejectWithValue(err.data)
    }
})

const updateOne = createAsyncThunk('admin/categories/{id}/edit',
async(args:{id:number, category:ICategory}, {rejectWithValue})=>{
  try{
    const {id, category} = args
    const res = await CategoriesService.updateOne({id, category})
    return res?.data
  }
  catch(err){
    return rejectWithValue(err.data)
  }
})

const deleteOne = createAsyncThunk('admin/categories/{id}/delete',
async(args:{id:number}, {rejectWithValue, dispatch})=>{
  try{
    const {id} = args
    const res = await CategoriesService.deleteOne(id)
    dispatch(revalidate({}))
    return res?.data
  }
  catch(err){
    return rejectWithValue(err.data)
  }
})

const revalidate  = createAsyncThunk('admin/categories/revalidate',
  async(args:{}, {dispatch, getState})=>{
    const state:any = getState()
    const categoriesState:CategoriesState = state.dashboardCategoriesSlice
    const page = categoriesState.page
    dispatch(getAll({page}))
  })

export const CategoriesThunkFunctions = {
    getAll,
    getOne,
    createOne,
    updateOne,
    deleteOne
}