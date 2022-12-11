import { PusherService } from "@/services/pusher";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserService } from "../../services/user";
const getData = createAsyncThunk(
  "user/data",
  async (args: any, { rejectWithValue }) => {
    try {
      const res = await UserService.checkLogin();
      return res;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
const login = createAsyncThunk(
  "user/doAuth",
  async (args: { username: string; password: string }, { rejectWithValue }) => {
    const { username, password } = args;
    try {
      const res = await UserService.login({ username, password });

      return res?.data?.token;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);
const loginGoogle = createAsyncThunk(
  "user/login/google",
  async (
    args: {
      email: string;
      first_name: string;
      last_name: string;
      full_name: string;
      avatar: string;
      provider_id: number;
      username: string;
    },
    { rejectWithValue }
  ) => {
    const {
      email,
      first_name,
      last_name,
      full_name,
      avatar,
      provider_id,
      username,
    } = args;
    try {
      const res = await UserService.loginWithGoogle({
        email,
        first_name,
        last_name,
        full_name,
        avatar,
        provider_id,
        username,
      });
      return res;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
const register = createAsyncThunk(
  "user/register",
  async (
    args: {
      email: string;
      password: string;
      password_confirmation: string;
      username: string;
      phone: string;
      code_phone: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await UserService.signIn(args);
      return res?.token;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
const logoutUser = createAsyncThunk(
  "user/logout",
  async (args: { id: number }, { rejectWithValue }) => {
    try {
      const res = await UserService.logout();
      const pusher = await PusherService.Initialize(args.id);
      pusher.unsubscribe();
      return res;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
const logoutAll = createAsyncThunk(
  "user/logout/all",
  async (args: { id: number }, { rejectWithValue }) => {
    try {
      const res = await UserService.logoutAll();
      const pusher = await PusherService.Initialize(args.id);
      pusher.unsubscribe();
      return res;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const UserThunkFunctions = {
  login,
  getData,
  loginGoogle,
  register,
  logoutUser,
  logoutAll,
};
