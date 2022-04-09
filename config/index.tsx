import axios from "axios";
export default axios.create({
    baseURL: 'https://api.timwoork.com/',
    withCredentials: true,
});
