import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { ProfileThunkFunctions } from "./thunkFunctions";
import { CustomMatchers } from "./matchers";

const { getProfileData } = ProfileThunkFunctions;
const {
  isProfileActionFulfilled,
  isProfileActionPending,
  isProfileActionRejected,
} = CustomMatchers;
export interface profileState {
  user_id: number;
  first_name: string;
  last_name: string;
  avatar_url: string;
  gender: number;
  date_of_birth: string;
  credit: number;
  steps: number;
  is_seller: number;
  precent_rating: number;
  country_id: number;
  badge_id: number;
  created_at: string;
  full_name: string;
  is_completed: number;
  currency_id: number;
  withdrawable_amount: number;
  pending_amount: number;
  avatar_path: string;
  loading: boolean;
  level: { id: number; name: string };
  badge: { id: number; name: string };
  country: { id: number; name: string };
}
interface payloadState {
  user_id: number;
  first_name: string;
  last_name: string;
  avatar_url: string;
  gender: number;
  date_of_birth: string;
  credit: number;
  steps: number;
  is_seller: number;
  precent_rating: number;
  country_id: number;
  badge_id: number;
  created_at: string;
  full_name: string;
  is_completed: number;
  currency_id: number;
  avatar_path: string;
  withdrawable_amount: number;
  pending_amount: number;
  level: { id: number; name: string };
  badge: { id: number; name: string };
  country: { id: number; name: string };
}
const initialState: profileState = {
  user_id: null,
  first_name: "",
  last_name: "",
  avatar_url: "",
  gender: null,
  date_of_birth: "",
  credit: null,
  steps: null,
  is_seller: null,
  precent_rating: null,
  country_id: null,
  badge_id: null,
  created_at: "",
  full_name: "",
  is_completed: null,
  currency_id: null,
  withdrawable_amount: null,
  pending_amount: null,
  avatar_path: "/avatar.png",
  level: { id: null, name: "" },
  badge: { id: null, name: "" },
  country: { id: null, name: "" },
  loading: false,
};
const assignState = (state: profileState, payload: payloadState) => {
  state.user_id = payload.user_id;
  state.first_name = payload.first_name;
  state.last_name = payload.last_name;
  state.avatar_url = payload.avatar_url;
  state.gender = payload.gender;
  state.date_of_birth = payload.date_of_birth;
  state.credit = payload.credit;
  state.is_seller = payload.is_seller;
  state.precent_rating = payload.precent_rating;
  state.country_id = payload.country_id;
  state.badge_id = payload.badge_id;
  state.created_at = payload.created_at;
  state.full_name = payload.full_name;
  state.is_completed = payload.is_completed;
  state.currency_id = payload.currency_id;
  state.avatar_path = payload.avatar_path;
  state.steps = payload.steps;
  state.withdrawable_amount = payload.withdrawable_amount;
  state.pending_amount = payload.pending_amount;
  state.level.id = payload.level.id;
  state.level.name = payload.level.name;
  state.badge.id = payload.badge.id;
  state.badge.name = payload.badge.name;
  state.country.id = payload.country.id;
  state.country.name = payload.country.name;
};
export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      getProfileData.fulfilled,
      (
        state,
        action: {
          payload: payloadState;
        }
      ) => {
        assignState(state, action.payload);
      }
    );
    builder.addMatcher(isProfileActionPending, (state) => {
      state.loading = true;
    });
    builder.addMatcher(
      isAnyOf(isProfileActionFulfilled, isProfileActionRejected),
      (state) => {
        state.loading = false;
      }
    );
  },
});
export default profileSlice.reducer;
