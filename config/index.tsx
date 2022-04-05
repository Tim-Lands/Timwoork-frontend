import axios from "axios";
export default axios.create({
    baseURL: 'https://api.forum-wazzfny.com/',
    withCredentials: true,
});
