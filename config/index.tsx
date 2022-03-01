import axios from "axios";
export default axios.create({
    baseURL: 'https://api.icoursat.com/',
    withCredentials: true,
});