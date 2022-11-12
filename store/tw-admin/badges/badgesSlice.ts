import { IBadge } from "@/services/tw-admin/badgesService";
import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { BadgesThunkFunctions } from "./thunkFunctions";
//import { CustomMatchers } from "./matchers";

const { getAll, getOne } =
BadgesThunkFunctions;
    /* const { isWithdrawalsActionFulfilled, isWithdrawalsActionPending, isWithdrawalsActionRejected } =
    CustomMatchers; */
export interface BadgesState {
    page: number,
    to: number,
    total: number,
    per_page: number,
    loading: boolean,
    current_badge:{
        loading:boolean,
        data?:BadgeState,
        error?:string,
        
    },
    data: BadgeState[],
    error?: string,

}

export type BadgeState = IBadge& {
    id: number,
    

}
const initialState: BadgesState = {
    page: 1,
    to: 1,
    total: 0,
    per_page: 0,
    loading: true,
    current_badge:{
        loading:true,
        data:null
    },
    data: [],

};

export const dashboardBadgesSlice = createSlice({
    name: "dashboard_badges",
    initialState,
    reducers: {
    },
    extraReducers(builder) {
        builder.addCase(getAll.fulfilled, (state, action: any) => {
            const payload: any = action.payload
            state.data = payload
            state.loading = false
        })

        builder.addCase(getAll.pending, (state)=>{
            state.loading = true
        })

        builder.addCase(getAll.rejected, (state)=>{
            state.loading = false
        })

        builder.addCase(getOne.fulfilled, (state, action:any)=>{
            state.current_badge.data = action.payload
        })

        builder.addMatcher(isAnyOf(getOne.fulfilled, getOne.rejected),(state)=>{
            state.current_badge.loading = false
        })

        builder.addMatcher(isAnyOf(getOne.pending), (state)=>{
            state.current_badge.loading = true
        })
        
    },
});
export default dashboardBadgesSlice.reducer;
