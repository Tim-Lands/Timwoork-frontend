import { CategoriesService, ICategory } from "@/services/tw-admin/categoriesService";
import { createAsyncThunk } from "@reduxjs/toolkit";

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
async (args:{category:ICategory}, {rejectWithValue})=>{
    try{
    const {category} = args
    const res = await CategoriesService.createOne(category)
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
async(args:{id:number}, {rejectWithValue})=>{
  try{
    const {id} = args
    const res = await CategoriesService.deleteOne(id)
    return res?.data
  }
  catch(err){
    return rejectWithValue(err.data)
  }
})

export const CategoriesThunkFunctions = {
    getAll,
    getOne,
    createOne,
    updateOne,
    deleteOne
}