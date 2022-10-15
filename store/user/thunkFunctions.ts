import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserService } from "../../services/userService";
const getData = createAsyncThunk(
  "user/data",
  async (args: any, { rejectWithValue }) => {
    try {
      const res = await UserService.checkLogin();
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
const login = createAsyncThunk(
  "user/doAuth",
  async (args: { username: string; password: string }, { rejectWithValue }) => {
    const { username, password } = args;
    try {
      const res = await UserService.login({ username, password });

      return res.data.token;
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
      return rejectWithValue(error);
    }
  }
);
export const UserThunkFunctions = {
  login,
  getData,
  loginGoogle,
};
