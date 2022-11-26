import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { notificationsThunkFunctions } from "./thunkFunctions";
import { CustomMatchers } from "./matchers";
const { getNotificationsData, getNotificationsCount } =
  notificationsThunkFunctions;
const {
  isNotificationActionFulfilled,
  isNotificationActionPending,
  isNotificationActionRejected,
} = CustomMatchers;
export interface notificationsState {
  all: {
    data: Array<{
      id: number;
      created_at: Date;
      data: {
        title_ar: string;
        title_en: string;
        title_fr: string;
        to: string;
        user_sender: { avatar_path: string; avatar_url: string };
        content: {
          item_id: number;
          title_ar: string;
          title_en: string;
          title_fr: string;
          slug: string;
        };
      };
    }>;
    loading: boolean;
    current_page: number;
    per_page: number;
    total: number;
    pageNumber: number;
    unread: number;
  };
}
export const initialState: notificationsState = {
  all: {
    data: [],
    loading: true,
    current_page: 0,
    total: 0,
    pageNumber: 1,
    per_page: 0,
    unread: 0,
  },
};
export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setPage: (state, action: { payload: number }) => {
      state.all.pageNumber = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(
      getNotificationsData.fulfilled,
      (
        state: notificationsState,
        action: {
          payload: {
            data: Array<any>;
            loading: boolean;
            current_page: number;
            per_page: number;
            total: number;
            pageNumber: number;
          };
        }
      ) => {
        const { data, per_page, total, current_page } = action.payload;
        state.all.data = data;
        state.all.per_page = per_page;
        state.all.total = total;
        state.all.current_page = current_page;
      }
    );
    builder.addCase(getNotificationsCount.fulfilled, (state, action) => {
      state.all.unread = action.payload;
    });
    builder.addMatcher(isNotificationActionPending, (state, action) => {
      if (
        action.type.split("/")[0] !== "notifications" ||
        state.all.data.length === 0
      )
        return;
      state.all.loading = true;
    });
    builder.addMatcher(
      isAnyOf(isNotificationActionFulfilled, isNotificationActionRejected),
      (state) => {
        state.all.loading = false;
      }
    );
  },
});
export default notificationsSlice.reducer;
