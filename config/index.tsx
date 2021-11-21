import axios from "axios";

export const protectedRoutes: string[] = [
    '/dashboard', // -> from .env.local
    // "/profile",
    // "/acount",
    // ...,
];
export default axios.create({
    baseURL: 'https://api.timwoork.com/api/', // https://api.wazzfny.com/
    withCredentials: true
});