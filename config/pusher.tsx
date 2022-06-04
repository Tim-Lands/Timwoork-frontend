import Pusher from "pusher-js";
import Cookies from "js-cookie";

let token = Cookies.get("token");
if (!token && typeof window !== "undefined")
  token = localStorage.getItem("token");
const pusher = new Pusher("a00614632e45ad3d49ff", {
  cluster: "eu",
  authEndpoint: "https://api.timwoork.com/api/broadcasting/auth",
  forceTLS: true,
  auth: token
    ? {
        headers: {
          // pass the authorization token when using private channels
          Authorization: `Bearer ${token}`,
        },
      }
    : undefined,
});
export default pusher;
