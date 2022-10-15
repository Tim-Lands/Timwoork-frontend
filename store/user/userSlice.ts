import {
  createSlice,
  isAnyOf,
  isPending,
  isRejected,
  isFulfilled,
} from "@reduxjs/toolkit";
import { UserThunkFunctions } from "./thunkFunctions";
import Cookies from "js-cookie";
import API from "../../config";
export interface UserState {
  token?: string;
  id: number;
  username: string;
  email: string;
  phone: string;
  email_verified: string;
  code_phone: string;
  step: number;
  loading: boolean;
  isLogged: boolean;
  errorMsg: string;
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
  token:
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : Cookies.get("token"),
  id: null,
  username: "",
  email: "",
  phone: "",
  email_verified: "",
  code_phone: "",
  step: null,
  loading: false,
  isLogged: false,
  errorMsg: "",
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
        API.defaults.headers.Authorization = `Bearer ${token}`;
        Cookies.set("token", token);
        localStorage.setItem("token", token);
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(UserThunkFunctions.getData.fulfilled, (state, action) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.phone = action.payload.phone;
      state.code_phone = action.payload.code_phone;
      state.email_verified = action.payload.email_verified;
      state.isLogged = true;
    });
    builder.addCase(UserThunkFunctions.login.fulfilled, (state, action) => {
      state.token = action.payload;
    });
    builder.addCase(
      UserThunkFunctions.loginGoogle.fulfilled,
      (state, action: { payload: { token: string; step: number } }) => {
        console.log(action.payload);

        const { token, step } = action.payload;
        state.token = token;
        state.step = step;
      }
    );
    builder.addCase(
      UserThunkFunctions.getData.rejected,
      (state, action: { payload: any }) => {
        const { msg, message } = action.payload;
        state.errorMsg = message || msg;
      }
    );
    builder.addCase(
      UserThunkFunctions.login.rejected,
      (state, action: { payload: any }) => {
        const { msg, message } = action.payload;
        state.errorMsg = message || msg;
      }
    );
    builder.addMatcher(isPending, (state) => {
      state.errorMsg = "";
      state.loading = true;
    });
    builder.addMatcher(isAnyOf(isFulfilled, isRejected), (state) => {
      state.loading = false;
    });
  },
});
export default userSlice.reducer;
