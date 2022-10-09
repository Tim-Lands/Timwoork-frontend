import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserService } from "../../services/userService";
// import { UserActions } from "./UserActions";
const login = createAsyncThunk(
  "user/doAuth",
  async (arg: any, { rejectWithValue }) => {
    try {
      const res = await UserService.login(arg.email, arg.password);
      return res;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const UserThunkFunctions = {
  login,
};
