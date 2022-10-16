import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import API from "../../config";
import translates from "../../translates/all.json";
export interface languagesState {
  language: string;
  getAll: Function;
}
export const initialState: languagesState = {
  language: Cookies.get("lang")
    ? Cookies.get("lang")
    : typeof window === "undefined"
    ? "ar"
    : localStorage.getItem("lang"),
  getAll: (name: string) => {
    if (translates[name]) return translates[name][initialState.language];
    else {
      console.log(name);
      return "error here";
    }
  },
};
export const languagesSlice = createSlice({
  name: "languages",
  initialState,
  reducers: {
    setLanguage: (state: languagesState, action: { payload: string }) => {
      const lang = action.payload;
      typeof window !== "undefined" && localStorage.setItem("lang", lang);
      Cookies.set("lang", lang);
      API.defaults.headers["X-localization"] = lang;
      state.language = lang;
      window.location.reload();
    },
  },
  extraReducers() {},
});
export default languagesSlice.reducer;
