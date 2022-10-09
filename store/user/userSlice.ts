import { createSlice } from "@reduxjs/toolkit";
import { UserThunkFunctions } from "./thunkFunctions";
import Cookies from "js-cookie";
import API from "../../config";
export interface UserState {
  token?: string;
  isLogged: boolean;
  username: string;
  id: number;
  avatarUrl: string;
  loading: boolean;
  logInError: { username: string; password: string };
  signInError: {
    email: string;
    password: string;
    password_confirmation: string;
    username: string;
    phone: string;
    code_phone: string;
  };
}
const initialState: UserState = {
  token: undefined,
  isLogged: false,
  id: null,
  username: "",
  avatarUrl: "",
  loading: false,
  logInError: { username: "", password: "" },
  signInError: {
    email: "",
    password: "",
    password_confirmation: "",
    username: "",
    phone: "",
    code_phone: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state: UserState, action: { payload: string }) => {
      const token = action.payload;
      if (token) {
        API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        state.token = token;
        Cookies.set("token", token);
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(UserThunkFunctions.login.fulfilled, (state, action) => {});
    builder.addCase(UserThunkFunctions.login.rejected, (state, action) => {});
  },
});
export default userSlice.reducer;
