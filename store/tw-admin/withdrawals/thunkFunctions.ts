import { EWithdrawalsStatus, EWithdrawalsType, WithdrawalsService } from "@/services/tw-admin/withdrawalsService";
import { createAsyncThunk } from "@reduxjs/toolkit";

const getAll = createAsyncThunk('admin/withdrawals',
    async (args: { page?: number, type?: EWithdrawalsType, status?: EWithdrawalsStatus }, { rejectWithValue }) => {
        try {
            let page = 1, type=undefined, status = EWithdrawalsStatus.PENDING;
            ({ page, type, status } = { page, type, status, ...args })
            const res = await WithdrawalsService.getAll({ page, type, status });
            return res?.data
        }
        catch (err) {
            return rejectWithValue(err)
        }
    })

const getOne = createAsyncThunk('admin/withdrawals/{id}',
    async (args: { id: number }, { rejectWithValue }) => {
        try {
            const { id } = args
            console.log(id)
            const res = await WithdrawalsService.getOne(id);
            return res?.data
        }
        catch (err) {
            return rejectWithValue(err)
        }
    })

const accept = createAsyncThunk('admin/withdrawals/{id}/accept',
    async (args: { id: number }, { rejectWithValue }) => {
        try {
            const { id } = args
            const res = await WithdrawalsService.accept(id);
            return res?.data
        }
        catch (err) {
            return rejectWithValue(err)
        }
    })

const cancel = createAsyncThunk('admin/withdrawals/{id}/cancel',
    async (args: { id: number }, { rejectWithValue }) => {
        try {
            const { id } = args
            const res = await WithdrawalsService.cancel(id);
            return res?.data
        }
        catch (err) {
            return rejectWithValue(err)
        }
    })

export const WithdrawalsThunkFunctions = {
    getAll,
    getOne,
    accept,
    cancel
}