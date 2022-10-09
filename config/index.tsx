import Cookies from "js-cookie";
import axios from "axios";
const lang = Cookies.get("lang");
const token = Cookies.get("token");
export default axios.create({
  baseURL: "https://api.timwoork.com/", //api.timwoork.com
  headers: { "X-localization": lang || "ar", Authorization: `Bearer ${token}` },
  withCredentials: true,
});
