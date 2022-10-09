import { createSlice } from "@reduxjs/toolkit";
export interface profileState {
  completed: boolean;
}
const initialState: profileState = {
  completed: false,
};
export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers(builder) {},
});
export default profileSlice.reducer;
