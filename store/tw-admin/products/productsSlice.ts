import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { ProductsThunkFunctions } from "./thunkFunctions";
import { CustomMatchers } from "./matchers";

const { getAll, getAllActive, getAllArchieved, getAllPending, getAllReject} =
ProductsThunkFunctions;
const { isProductActionPending, isProductActionFulfilled, isProductActionRejected } =
    CustomMatchers;

export interface State{
    all:ProductsState,
    actived:ProductsState,
    rejected: ProductsState,
    pending: ProductsState,
    archieved: ProductsState
}

export interface ProductsState {
    page: number,
    to: number,
    total: number,
    per_page: number,
    loading: boolean,
    data: ProductState[],
    error?: string,

}

export interface ProductState {
    id: number,
    title:string,
    slug: string,
    content: string,
    price: number,
    duration: number,
    count_buying: number,
    buyer_instruct: string,
    status: number,
    is_active: number,
    created_at: string
}

const initialProductState: ProductsState = {
    page: 1,
    to: 1,
    total: 0,
    per_page: 0,
    loading: true,
    data: [],
};

const initialState :State = {
    all:initialProductState,
    actived:initialProductState,
    pending:initialProductState,
    archieved:initialProductState,
    rejected:initialProductState
}

export const dashboardProductSlice = createSlice({
    name: "dashboard_products",
    initialState,
    reducers: {
    },
    extraReducers(builder) {
        builder.addMatcher(isProductActionFulfilled, (state, action: any) => {
            const payload: any = action.payload
            const state_name = action.type.split('/').at(-2)
            state[state_name].page = payload.current_page,
            state[state_name].per_page = payload.per_page
            state[state_name].to = payload.to
            state[state_name].total = payload.total
            state[state_name].data = payload.data
            state[state_name].loading = false

        })

         builder.addMatcher(isProductActionPending, (state, action) => {
            const state_name = action.type.split('/').at(-2)
            state[state_name].loading = true
        })

        builder.addMatcher(isAnyOf(isProductActionFulfilled, isProductActionRejected), (state, action) => {
            const state_name = action.type.split('/').at(-2)
            state[state_name].loading = false
        })
        builder.addMatcher(isProductActionRejected, (state, action) => {
            const state_name = action.type.split('/').at(-2)
            state[state_name].loading = false
        }) 
    },
});
export default dashboardProductSlice.reducer;
