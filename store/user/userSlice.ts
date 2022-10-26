import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { UserThunkFunctions } from "./thunkFunctions";
import { CustomMatchers } from "./matchers";
import Cookies from "js-cookie";
import API from "../../config";

const { getData, login, loginGoogle, logoutAll, logoutUser, register } =
  UserThunkFunctions;
const { isUserActionFulfilled, isUserActionPending, isUserActionRejected } =
  CustomMatchers;
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
  logInError: any;
  signInError: any;
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
  loading: true,
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
        typeof window !== "undefined"
          ? localStorage.setItem("token", token)
          : Cookies.set("token", token);
      }
    },
    clearErrors: (state: UserState) => {
      state.signInError = {};
      state.logInError = {};
      state.errorMsg = "";
    },
    loaded: (state: UserState) => {
      state.loading = false;
    },
  },
  extraReducers(builder) {
    builder.addCase(getData.fulfilled, (state, action) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.phone = action.payload.phone;
      state.code_phone = action.payload.code_phone;
      state.email_verified = action.payload.email_verified;
      state.isLogged = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.token = action.payload;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.token = action.payload;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      API.defaults.headers.Authorization = ``;
      typeof window !== "undefined"
        ? localStorage.setItem("token", "")
        : Cookies.remove("token");
      state.token = "";
      state.isLogged = false;
    });
    builder.addCase(logoutAll.fulfilled, (state) => {
      API.defaults.headers.Authorization = ``;
      typeof window !== "undefined"
        ? localStorage.setItem("token", "")
        : Cookies.remove("token");
      state.token = "";
      state.isLogged = false;
    });
    builder.addCase(
      loginGoogle.fulfilled,
      (state, action: { payload: { token: string; step: number } }) => {
        const { token, step } = action.payload;
        state.token = token;
        state.step = step;
      }
    );
    builder.addCase(getData.rejected, (state, action: { payload: any }) => {
      const { msg, message } = action.payload;
      state.errorMsg = message || msg;
    });
    builder.addCase(login.rejected, (state, action: { payload: any }) => {
      const { msg, message } = action.payload;
      state.errorMsg = message || msg;
    });
    builder.addCase(register.rejected, (state, action: { payload: any }) => {
      const error = action?.payload;
      const errors = {};
      Object.keys(error?.errors || {}).forEach((key) => {
        errors[key] = error.errors[key][0];
      });
      state.signInError = errors;
    });
    builder.addMatcher(isUserActionPending, (state, action) => {
      if (action.type.split("/")[0] == "currency") return;

      state.errorMsg = "";
      state.loading = true;
    });
    builder.addMatcher(
      isAnyOf(isUserActionFulfilled, isUserActionRejected),
      (state) => {
        state.loading = false;
      }
    );
  },
});
export default userSlice.reducer;
