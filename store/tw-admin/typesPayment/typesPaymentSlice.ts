import { ITypePayment } from "@/services/tw-admin/typesPaymentService";
import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { TypesPaymentThunkActions } from "./thunkFunctions";
//import { CustomMatchers } from "./matchers";

const { getAll, getOne } =
    TypesPaymentThunkActions;
    /* const { isWithdrawalsActionFulfilled, isWithdrawalsActionPending, isWithdrawalsActionRejected } =
    CustomMatchers; */
export interface TypesPaymentState {
    page: number,
    to: number,
    total: number,
    per_page: number,
    loading: boolean,
    current_type:{
        loading:boolean,
        data?:TypePaymentState,
        error?:string,
        
    },
    data: TypePaymentState[],
    error?: string,

}

export type TypePaymentState = ITypePayment& {
    id: number,
    

}
const initialState: TypesPaymentState = {
    page: 1,
    to: 1,
    total: 0,
    per_page: 0,
    loading: true,
    current_type:{
        loading:true,
        data:null
    },
    data: [],

};

export const dashboardTypespaymentSlice = createSlice({
    name: "dashboard_typespayment",
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
            state.current_type.data = action.payload
        })

        builder.addMatcher(isAnyOf(getOne.fulfilled, getOne.rejected),(state)=>{
            state.current_type.loading = false
        })

        builder.addMatcher(isAnyOf(getOne.pending), (state)=>{
            state.current_type.loading = true
        })
        
    },
});
export default dashboardTypespaymentSlice.reducer;
