import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { UsersThunkFunctions } from "./thunkFunctions";
import { CustomMatchers } from "./matchers";

const { getAllUsers, getOneUser, banUser, unbanUser} =
    UsersThunkFunctions; 
const { isUserActionFulfilled, isUserActionPending, isUserActionRejected } =
    CustomMatchers; 
export interface UsersState {
    page: number,
    to: number,
    total: number,
    per_page: number,
    loading: boolean,
    curr_user: UserState,
    users: UserState[]
}

export interface UserState {
    id: number,
    username: string,
    email: string,
    phone: string,
    code_phone: string
    status: number,
    loading:true,
    profile: {
        id: number,
        first_name: string,
        last_name: string,
        avatar_url: URL,
    }
}
const initialState: UsersState = {
   page : 1,
   to: 1,
   total: 0,
   per_page: 0,
   loading: true,
   curr_user:{
    id: null,
    username:"",
    email:"",
    phone:'',
    code_phone:'',
    status:null,
    loading:true,
    profile:{
        id:null,
        first_name:null,
        last_name:null,
        avatar_url:null
    }
   },
   users:[]
};

export const dashboardUserSlice = createSlice({
    name: "dashboard_users",
    initialState,
    reducers: {
    },
    extraReducers(builder) {
       /*  builder.addCase(getAllUsers.pending,(state, action:any)=>{
            const payload:any = action.payload
            state.page = payload.page,
            state.curr_user = payload.current_page
            state.per_page = payload.per_page
            state.to = payload.to
            state.total = payload.total
            state.users = payload.data
            state.loading = false
        console.log(action)
        })
 */
        
    },
});
export default dashboardUserSlice.reducer;
