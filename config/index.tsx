import axios from "axios";
export default axios.create({
    baseURL: 'https://d165-105-235-129-152.ngrok.io/', //api.timwoork.com
    withCredentials: true,
});
