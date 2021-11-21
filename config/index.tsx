import axios from "axios";

export default axios.create({
    baseURL: 'https://api.timwoork.com/api/', // https://api.wazzfny.com/
    withCredentials: true
});

export const protectedRoutes: string[] = [
    '/dashboard', // -> from .env.local
    // "/profile",
    // "/acount",
    // ...,
];
