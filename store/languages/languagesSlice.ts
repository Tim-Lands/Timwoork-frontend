import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import API from "../../config";
import translates from "../../translates/all.json";
export interface languagesState {
  language: string;
  getAll: Function;
}
export const initialState: languagesState = {
  language: undefined,
  getAll: (name: string) => {
    if (translates[name]) return translates[name][initialState.language];
    else {
      return "error here";
    }
  },
};
export const languagesSlice = createSlice({
  name: "languages",
  initialState,
  reducers: {
    setLanguage: (state, action: { payload: string }) => {
      const lang = action.payload;
      Cookies.set("lang", lang);
      typeof window !== "undefined" && localStorage.setItem("lang", lang);
      window.location.reload();
    },
    setLanguageManually: (
      state: languagesState,
      action: { payload: string }
    ) => {
      const lang = action.payload;
      state.language = lang;
      !Cookies.get("lang") && Cookies.set("lang", lang);
      state.getAll = (name: string) => {
        if (translates[name]) return translates[name][lang];
        else {
          return "error here";
        }
      };
    },
  },
  extraReducers() {},
});
export default languagesSlice.reducer;
