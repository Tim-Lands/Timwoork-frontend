import axios from "axios";

export default axios.create({
    baseURL: 'https://flexyapp.herokuapp.com/api/v1/', // https://api.wazzfny.com/
    withCredentials: true
});