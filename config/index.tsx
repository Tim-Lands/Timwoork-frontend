import axios from "axios";
export default axios.create({
    baseURL: 'https://8cd2-105-235-130-168.ngrok.io/', //api.timwoork.com
    withCredentials: true,
});
