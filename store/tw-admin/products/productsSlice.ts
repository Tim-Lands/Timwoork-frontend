import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { ProductsThunkFunctions } from "./thunkFunctions";
import { CustomMatchers } from "./matchers";

const { getOne} =
ProductsThunkFunctions;
const { isProductsActionPending, isProductsActionFulfilled, isProductsActionRejected } =
    CustomMatchers;

export interface State{
    all:ProductsState,
    active:ProductsState,
    rejected: ProductsState,
    pending: ProductsState,
    archieve: ProductsState,
    currProduct:{
        loading:boolean,
        error?:string,
        data?:ProductState
    }
}

export interface ProductsState {
    page: number,
    to: number,
    total: number,
    per_page: number,
    loading: boolean,
    data: ProductState[],
    filter:{
        search?:string
    }
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
    current_step: number,
    ratings_avg_rating:number,
    ratings_count:number,
    ratings_avg:number,
    full_path_thumbnail:string,
    galaries:any[],
    profile_seller:any,
    category:any,
    category_id:number,
    subcategory_id:number,
    subcategory:any,
    product_tag:any,
    developments:any,
    created_at: string
}

const initialProductState: ProductsState = {
    page: 1,
    to: 1,
    total: 0,
    per_page: 0,
    loading: true,
    filter:{
        search:""
    },
    data: [],
};

const initialState :State = {
    all:initialProductState,
    active:initialProductState,
    pending:initialProductState,
    archieve:initialProductState,
    rejected:initialProductState,
    currProduct:{
        loading:true,
    }
}

export const dashboardProductSlice = createSlice({
    name: "dashboard_products",
    initialState,
    reducers: {
    },
    extraReducers(builder) {
        builder.addCase(getOne.fulfilled,(state, action:any)=>{
            state.currProduct.data = action.payload
            state.currProduct.loading=false
        })

        builder.addMatcher(isAnyOf(getOne.pending, getOne.rejected),(state)=>{
            state.currProduct.loading = true
        })

        builder.addMatcher(isProductsActionFulfilled, (state, action: any) => {
            const payload: any = action.payload
            const state_name = action.type.split('/').at(-2)
            const {search} = action.meta.arg
            state[state_name].page = payload.current_page,
            state[state_name].per_page = payload.per_page
            state[state_name].to = payload.to
            state[state_name].total = payload.total
            state[state_name].data = payload.data
            state[state_name].loading = false
            state[state_name].filter = {search}
            console.log(search)
        })

         builder.addMatcher(isProductsActionPending, (state, action:any) => {
            const state_name = action.type.split('/').at(-2)
            state[state_name].loading = true
        })

        builder.addMatcher(isAnyOf(isProductsActionFulfilled, isProductsActionRejected), (state, action:any) => {
            const state_name = action.type.split('/').at(-2)
            state[state_name].loading = false
        })
        /* builder.addMatcher(isProductActionRejected, (state, action) => {
            const state_name = action.type.split('/').at(-2)
            state[state_name].loading = false
        })  */
    },
});
export default dashboardProductSlice.reducer;
