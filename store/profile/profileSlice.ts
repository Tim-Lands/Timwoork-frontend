import { createSlice } from "@reduxjs/toolkit";
export interface profileState {
  user_id: number;
  first_name: string;
  last_name: string;
  avatar_url: string;
  gender: number;
  date_of_birth: string;
  credit: number;
  is_seller: number;
  precent_rating: number;
  country_id: number;
  badge_id: number;
  created_at: string;
  full_name: string;
  is_completed: number;
  currency_id: number;
  avatar_path: string;
}
const initialState: profileState = {
  user_id: null,
  first_name: "",
  last_name: "",
  avatar_url: "",
  gender: null,
  date_of_birth: "",
  credit: null,
  is_seller: null,
  precent_rating: null,
  country_id: null,
  badge_id: null,
  created_at: "",
  full_name: "",
  is_completed: null,
  currency_id: null,
  avatar_path: "",
};
export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers(builder) {},
});
export default profileSlice.reducer;
