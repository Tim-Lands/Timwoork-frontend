import { createAsyncThunk } from "@reduxjs/toolkit";
import { UsersService } from "@/services/tw-admin/usersService";

const getAllUsers = createAsyncThunk('admin/users/',
    async (args: {
        page?: number,
        search?:string,
        is_banned?:boolean
    }, { rejectWithValue }) => {
        try {
            console.log('get one thunk')
            let page = 1, is_banned = undefined, search = '' ;
           ({page, search, is_banned} = {page, search, is_banned,...args})
            const res = await UsersService.getAll({
                page,
                search,
                is_banned
            });
            return res.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    })

const getOneUser = createAsyncThunk('admin/users/{id}',
    async (args: {
        id: number
    }, { rejectWithValue }) => {
        try {
            console.log('get one thunk')
            const { id } = args
            const res = await UsersService.getOne(id);
            return res.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }) 

    const banUser = createAsyncThunk('users/{id}/ban',
    async (args: {
        id: number,
        comment: string,
        expired_at: string
    }, { rejectWithValue }) => {
        try {
            const { id, comment, expired_at } = args
            const res = await UsersService.ban({
                id, comment, expired_at
            });
            return res.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    })

    const unbanUser = createAsyncThunk('users/{id}/unban',
    async (args: {
        id: number
    }, { rejectWithValue }) => {
        try {
            const { id } = args
            const res = await UsersService.unban(id);
            return res.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    })

export const UsersThunkFunctions = {
    getAllUsers,
    getOneUser,
    banUser,
    unbanUser
}