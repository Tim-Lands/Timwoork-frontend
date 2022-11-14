import { EWithdrawalsStatus, EWithdrawalsType } from "@/services/tw-admin/withdrawalsService";
import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { WithdrawalsThunkFunctions } from "./thunkFunctions";
import { CustomMatchers } from "./matchers";

const { getAll, getOne } =
    WithdrawalsThunkFunctions;
    const { isWithdrawalsActionFulfilled, isWithdrawalsActionPending, isWithdrawalsActionRejected } =
    CustomMatchers;
export interface WithdrawalsState {
    page: number,
    to: number,
    total: number,
    per_page: number,
    loading: boolean,
    curr_withdrawal:{
        loading:boolean,
        data?:WithdrawalState,
        error?:string,
        
    },
    data: WithdrawalState[],
    filter: {
        type?: EWithdrawalsStatus
    }
    error?: string,

}

export interface WithdrawalState {
    id: number,
    amount:number,
    type: EWithdrawalsType,
    status: EWithdrawalsStatus
    wallet_id: number,
    withdrawalable: any,
    withdrawalable_id: number,
    withdrawalable_type:string,
    created_at: string,
    updated_at: string

}
const initialState: WithdrawalsState = {
    page: 1,
    to: 1,
    total: 0,
    per_page: 0,
    loading: true,
    curr_withdrawal:{
        loading:true,
        data:null
    },
    data: [],
    filter: {
        type:null
    }
};

export const dashboardWithdrawalsSlice = createSlice({
    name: "dashboard_withdrawals",
    initialState,
    reducers: {
    },
    extraReducers(builder) {
        builder.addCase(getAll.fulfilled, (state, action: any) => {
            const payload: any = action.payload
            state.page = payload.current_page,
                state.per_page = payload.per_page
            state.to = payload.to
            state.total = payload.total
            state.data = payload.data
            state.loading = false
            const { type } = action.meta.arg
            state.filter = { type }
        })

        builder.addCase(getAll.pending, (state)=>{
            state.loading = true
        })

        builder.addCase(getAll.rejected, (state)=>{
            state.loading = false
        })

        builder.addCase(getOne.fulfilled, (state, action:any)=>{
            state.curr_withdrawal.data = action.payload
        })

        builder.addMatcher(isAnyOf(isWithdrawalsActionFulfilled, isWithdrawalsActionRejected),(state)=>{
            state.curr_withdrawal.loading = false
        })

        builder.addMatcher(isWithdrawalsActionPending, (state)=>{
            state.curr_withdrawal.loading = true
        })
        
    },
});
export default dashboardWithdrawalsSlice.reducer;
