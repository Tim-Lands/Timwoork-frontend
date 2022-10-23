import Cookies from "js-cookie";
import axios from "axios";
const lang =
  Cookies.get("lang") || typeof window !== "undefined"
    ? localStorage.getItem("lang")
    : "ar";
const token =
  Cookies.get("token") || typeof window !== "undefined"
    ? localStorage.getItem("token")
    : "";
export default axios.create({
  baseURL: "https://api.timwoork.com/", //api.timwoork.com
  headers: { "X-localization": lang, Authorization: `Bearer ${token}` },
  withCredentials: true,
});
