import axios from "axios";

export default axios.create({
    baseURL: 'https://api.wazzfny.com/', // https://api.wazzfny.com/
    withCredentials: true
});