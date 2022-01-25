import Pusher from "pusher-js";
import Echo from "laravel-echo";
import Cookies from 'js-cookie'
import API from '../config'
import useSWR from 'swr';

function UserStatus(): any {

const token = Cookies.get('token')
const { data: broadcasting }: any = useSWR(`api/broadcasting/auth`)

const options = {
    broadcaster: "pusher",
    key: "d226ad09f1e4b5652cfc",
    cluster: "eu",
    forceTLS: true,
    encrypted: false,
      //authEndpoint is your apiUrl + /broadcasting/auth
  authEndpoint: broadcasting,   // As I'm using JWT tokens, I need to manually set up the headers.
  auth: {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  },
};
   
const echo = new Echo(options);

return (
echo.private("private-messages." + 1).listen(".chat", data => {
    console.log("rumman");
    console.log(data);
}))}


export default UserStatus;