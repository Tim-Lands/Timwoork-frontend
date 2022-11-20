import { createAsyncThunk } from "@reduxjs/toolkit";
import { UsersService } from "@/services/tw-admin/usersService";
import { UsersState } from "./userSlice";

const getAllUsers = createAsyncThunk('admin/users/',
    async (args: {
        page?: number,
        search?: string,
        is_banned?: boolean,
        is_banned_temporrary?: boolean,
        is_banned_permanent?: boolean
    }, { rejectWithValue }) => {
        try {
            let page = 1, is_banned = undefined, is_banned_temporrary = undefined, is_banned_permanent = undefined ,search = '';
            ({ page, search, is_banned, is_banned_temporrary, is_banned_permanent } = { page, search, is_banned, is_banned_temporrary, is_banned_permanent, ...args })
            const res = await UsersService.getAll({
                page,
                search,
                is_banned,
                is_banned_temporrary,
                is_banned_permanent
            });
            return res.data;
        } catch (error) {
            console.log(error)
            return rejectWithValue(error?.response?.data);
        }
    })

const getOneUser = createAsyncThunk('admin/users/{id}',
    async (args: {
        id: number
    }, { rejectWithValue }) => {
        try {
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
        expired_at?: string
    }, { rejectWithValue, dispatch}) => {
        try {
            const { id, comment, expired_at } = args
            const res = await UsersService.ban({
                id, comment, expired_at
            });
            dispatch(revalidate({}))
            return res.data;
        } catch (error) {
            console.log(error)
            return rejectWithValue(error?.response?.data);
        }
    })

const unbanUser = createAsyncThunk('users/{id}/unban',
    async (args: {
        id: number
    }, { rejectWithValue, dispatch }) => {
        try {
            const { id } = args
            const res = await UsersService.unban(id);
            dispatch(revalidate({}))
            return res.data;
        } catch (error) {
            console.log(error)
            return rejectWithValue(error?.response?.data);
        }
    })

/* const notifyUser = createAsyncThunk('admin/users/{id}/notify',
async(args:{id:number, cause:string}, {rejectWithValue})=>{
    try{
    const {id, cause} = args
    const res = UsersService.sendNotification({id, cause})
    return res?.data
    }
    catch(error){
        return rejectWithValue(error.data)
    }
})
 */
const revalidate = createAsyncThunk('admin/users/revaldidate',
    async (args: {}, { getState, dispatch }) => {
        try{
        const state: any = getState()
        const usersState: UsersState = state.dashboardUsers
        const filter = usersState.filter
        let search = "", is_banned = undefined, is_banned_temporrary = undefined
        const page = usersState.page;
        ({ search, is_banned, is_banned_temporrary } = { search, is_banned, ...filter })
        dispatch(getAllUsers({ search, page, is_banned, is_banned_temporrary}))
        }
        catch(err){
            console.log(err)
        }
    })


export const UsersThunkFunctions = {
    getAllUsers,
    getOneUser,
    banUser,
    unbanUser
}