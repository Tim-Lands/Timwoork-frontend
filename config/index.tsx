import Cookies from "js-cookie";
import axios from "axios";
const lang =
  Cookies.get("lang") ||
  (typeof window !== "undefined" && localStorage.getItem("lang")
    ? localStorage.getItem("lang")
    : "ar");

const token =
  typeof window !== "undefined"
    ? localStorage.getItem("token")
    : Cookies.get("token") || "";

const admin_token =
     Cookies.get("token_dash") || "";

export default axios.create({
  baseURL: "https://api.timwoork.com/", //api.timwoork.com
  headers: { "X-localization": lang, Authorization: `Bearer ${token}` },
  withCredentials: true,
});

export const AdminAPI = axios.create({
  baseURL: "https://api.timwoork.com/", //api.timwoork.com
  headers: {
    "X-localization": lang,
    Authorization: `Bearer ${admin_token}`,
  },
  withCredentials: true,
});
