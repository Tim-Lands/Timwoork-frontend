import { createAsyncThunk } from "@reduxjs/toolkit";
import { ActivitiesService } from "@/services/tw-admin/activitiesService";

const getNotifications = createAsyncThunk('admin/activities/notifications',
    async (args: { page: number, search: string }, { rejectWithValue }) => {
        try {
            const { page, search } = args
            console.log(search)
            const res = await ActivitiesService.getAllNotifications({ page, search })
            return res?.data
        }
        catch (error) {
            return rejectWithValue(error)
        }
    })

const getConversations = createAsyncThunk('admin/activities/conversations',
    async (args: { page: number, email: string }, { rejectWithValue }) => {
        try {
            const { page, email } = args
            const res = await ActivitiesService.getAllConversations({page, email})
            return res?.data
        }
        catch (error) {
            return rejectWithValue(error)
        }
    })

const getTransactions = createAsyncThunk('admin/activities/transactions',
    async (args: { page: number, search: string }, { rejectWithValue }) => {
        try {
            const { page, search } = args
            const res = await ActivitiesService.getAllTransactions({page, search})
            return res?.data
        }
        catch (error) {
            return rejectWithValue(error)
        }
    })

const getOneConversation = createAsyncThunk('admin/activities/conversations/{id}',
    async (args: { id: number }, { rejectWithValue }) => {
        try {
            const { id } = args
            const res = await ActivitiesService.getOneConversation(id)
            return res?.data
        }
        catch (error) {
            return rejectWithValue(error)
        }
    })

const deleteConversation = createAsyncThunk('admin/activities/conversations/{id}/delete',
    async (args: { id: number }, { rejectWithValue }) => {
        try {
            const { id } = args
            const res = await ActivitiesService.deleteOneConversation(id)
            return res?.data
        }
        catch (error) {
            return rejectWithValue(error)
        }
    })

const deleteMessage = createAsyncThunk('admin/activities/messages/{id}/delete',
    async (args: { id: number }, { rejectWithValue }) => {
        try {
            const { id } = args
            const res = await ActivitiesService.deleteOneMessage(id)
            return res?.data
        }
        catch (error) {
            return rejectWithValue(error)
        }
    })

const editMessage = createAsyncThunk('admin/activities/messages/{id}/patch',
    async (args: { id: number, cause:string, message:string }, { rejectWithValue }) => {
        try {
            const { id, cause, message } = args
            const res = await ActivitiesService.updateOneMessage({id, cause, message})
            return res?.data
        }
        catch (error) {
            return rejectWithValue(error)
        }
    })

export const ActivitiesThunkFunctions = {
    getConversations,
    getNotifications,
    getTransactions,
    getOneConversation,
    deleteConversation,
    deleteMessage,
    editMessage
}