import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { CustomMatchers } from "./matchers";
import { ActivitiesThunkFunctions } from "./thunkFunctions";

const { getOneConversation } = ActivitiesThunkFunctions
const { isActivitiesActionFulfilled, isActivitiesActionPending, isActivitiesActionRejected } =
    CustomMatchers;
export interface ActivitiesState {
    notifications: {
        page: number,
        to: number,
        total: number,
        per_page: number,
        loading: boolean,
        filter: {
            search?: string
        }
        error?: string,
        data: NotificationState[]
    }
    conversations: {
        page: number,
        to: number,
        total: number,
        per_page: number,
        loading: boolean,
        filter: {
            search?: string
        }
        error?: string,
        data: ConversationState[]
    }
    transactions: {
        page: number,
        to: number,
        total: number,
        per_page: number,
        loading: boolean,
        filter: {
            search?: string
        }
        error?: string,
        data: TransationState[]
    },
    current_conversation: { data: SingleConversationState, loading: boolean }
}

export interface SingleConversationState {
    conversation: {
        id: number,
        conversation_id: number,
        message: string,
        user: any,
        user_id: number,
        created_at: string,
        read_at: string
    }[],
    members: any
}

export interface NotificationState {

    id: number,
    notifiable_id: number,
    notifiable_type: string,
    read_at: string
    type: string,
    data: any,
    created_at: string,
    updated_at: string

}

export interface ConversationState {
    id: number,
    title: string,
    conversationable_id: number,
    conversationable_type: string,
    latest_message: any,
    members: any,
    messages_count: number,
    pivot: any,
    updated_at: string,
    created_at: string,

}

export interface TransationState {
    id: number,
    amount: number,
    status: number,
    wallet_id: number,
    wallet: any,
    type: string,
    payload: {
        amount: number,
        title: string,
        total_price?: number,
        tax?: number,
        price_with_tax?: number,
        payment_method?: string
    },
    created_at: string,
    updated_at: string

}
const initialState: ActivitiesState = {
    notifications: {
        page: 1,
        to: 1,
        total: 0,
        per_page: 0,
        loading: true,
        data: null,
        filter: {
            search: null
        }
    },
    conversations: {
        page: 1,
        to: 1,
        total: 0,
        per_page: 0,
        loading: true,
        data: null,
        filter: {
            search: null
        }
    },
    transactions: {
        page: 1,
        to: 1,
        total: 0,
        per_page: 0,
        loading: true,
        data: null,
        filter: {
            search: null
        }
    },
    current_conversation: {
        loading: true,
        data: null
    }

};

export const dashboardActivitiesSlice = createSlice({
    name: "dashboard_activities",
    initialState,
    reducers: {
    },
    extraReducers(builder) {
        builder.addCase(getOneConversation.fulfilled, (state, action: any) => {
            const payload: any = action.payload
            state.current_conversation.data = payload
        })

        builder.addCase(getOneConversation.pending, (state) => {
            state.current_conversation.loading = true
        })

        builder.addMatcher(isAnyOf(getOneConversation.fulfilled, getOneConversation.rejected), (state) => {
            state.current_conversation.loading = false
        })



        builder.addMatcher(isActivitiesActionFulfilled, (state, action: any) => {
            const payload: any = action.payload
            const state_name = action.type.split('/').at(-2)
            state[state_name].page = payload.current_page,
                state[state_name].per_page = payload.per_page
            state[state_name].to = payload.to
            state[state_name].total = payload.total
            state[state_name].data = payload.data
        })


        builder.addMatcher(isActivitiesActionPending, (state, action: any) => {
            const state_name = action.type.split('/').at(-2)
            state[state_name].loading = true
        })

        builder.addMatcher(isAnyOf(isActivitiesActionFulfilled, isActivitiesActionRejected), (state, action: any) => {
            const state_name = action.type.split('/').at(-2)
            state[state_name].loading = false
        })

    },
});
export default dashboardActivitiesSlice.reducer;
