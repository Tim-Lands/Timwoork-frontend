import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { ChatThunkFunctions } from "./thunkFunctions";
import { AllMatchers, SingleMatchers } from "./matchers";
const { getChatsData, getSingleChat, sendMessage, unreadMessagesCount } =
  ChatThunkFunctions;
const { isChatsActionFulfilled, isChatsActionPending, isChatsActionRejected } =
  AllMatchers;
const {
  isSingleActionFulfilled,
  isSingleActionPending,
  isSingleActionRejected,
} = SingleMatchers;
export interface chatState {
  all: {
    data: Array<{
      id: number;
      title_ar: string;
      title_en: string;
      title_fr: string;
      members: Array<any>;
      latest_message: { message: string; updated_at: Date };
      messages_count: number;
    }>;
    last_page: number;
    loading: boolean;
    page_number: number;
  };
  one: {
    title: string;
    id: number;
    data: Array<{
      id: number;
      message: string;
      type: number;
      read_at: Date;
      created_at: Date;
      user: { id: number; profile: { avatar_path: string; full_name: string } };
      attachments: Array<{ id: number; full_path: string; mime_type: string }>;
    }>;
    loading: boolean;
  };
  unReadConversation: {
    data: Array<{
      id: number;
      messages_count: number;
    }>;
    count: number;
  };
}
export const initialState: chatState = {
  all: { data: [], last_page: 0, loading: true, page_number: 1 },
  one: { id: null, title: "", data: [], loading: false },
  unReadConversation: { data: [], count: 0 },
};
export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setPage: (state, action: { payload: number }) => {
      state.all.page_number = action.payload;
    },
    setId: (state, action: { payload: number }) => {
      state.one.id = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(
      getChatsData.fulfilled,
      (
        state: chatState,
        action: {
          payload: {
            data: Array<{
              id: number;
              title_ar: string;
              title_en: string;
              title_fr: string;
              members: Array<any>;
              latest_message: { message: string; updated_at: Date };
              messages_count: number;
            }>;
            last_page: number;
          };
        }
      ) => {
        state.all.data = action.payload.data;
        state.all.last_page = action.payload.last_page;
      }
    );
    builder.addCase(
      getSingleChat.fulfilled,
      (
        state,
        action: {
          payload: {
            title: string;
            messages: Array<{
              id: number;
              message: string;
              type: number;
              read_at: Date;
              created_at: Date;
              user: {
                id: number;
                profile: { avatar_path: string; full_name: string };
              };
              attachments: Array<{
                id: number;
                full_path: string;
                mime_type: string;
              }>;
            }>;
          };
        }
      ) => {
        state.one.data = action.payload.messages;
        state.one.title = action.payload.title;
      }
    );
    builder.addCase(
      sendMessage.fulfilled,
      (state, action: { payload: any }) => {
        const newAll = state.all.data.map((item) => {
          if (item.id == action.payload.conversation_id) {
            return {
              ...item,
              latest_message: {
                message: action.payload.message,
                updated_at: new Date(),
              },
            };
          } else {
            return item;
          }
        });
        state.all.data = newAll;
        if (action.payload.conversation_id != state.one.id) return;
        state.one.data = [...state.one.data, action.payload];
      }
    );
    builder.addCase(unreadMessagesCount.fulfilled, (state, action) => {
      console.log(action.payload);

      state.unReadConversation = action.payload;
    });
    builder.addMatcher(isChatsActionPending, (state, action) => {
      if (action.type.split("/")[0] !== "chat" || state.all.data.length === 0)
        return;
      state.all.loading = true;
    });
    builder.addMatcher(
      isAnyOf(isChatsActionFulfilled, isChatsActionRejected),
      (state) => {
        state.all.loading = false;
      }
    );
    builder.addMatcher(isSingleActionPending, (state, action) => {
      if (action.type.split("/")[0] !== "chat" || state.one.data.length === 0)
        return;
      state.one.loading = true;
    });
    builder.addMatcher(
      isAnyOf(isSingleActionFulfilled, isSingleActionRejected),
      (state) => {
        state.one.loading = false;
      }
    );
  },
});
export default chatSlice.reducer;
