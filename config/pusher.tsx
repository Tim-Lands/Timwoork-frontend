import Pusher from 'pusher-js'
import Cookies from 'js-cookie'

let token = Cookies.get('token')
if (!token && typeof window !== "undefined")
    token = localStorage.getItem('token');
export const pusher = new Pusher('31365e7905d4a38d6318', {
    cluster: 'eu',
    authEndpoint: 'https://api.timwoork.com/api/broadcasting/auth',
    auth: token ? {
        headers: {
            // pass the authorization token when using private channels
            Authorization: `Bearer ${token}`,
        },
    } : undefined,

})