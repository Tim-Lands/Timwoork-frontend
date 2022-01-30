import Pusher from 'pusher-js'
import Cookies from 'js-cookie'

const token = Cookies.get('token')
export const pusher = new Pusher('510f53f8ccb3058a96fc', {
    cluster: 'eu',
    authEndpoint: 'https://api.icoursat.com/api/broadcasting/auth',
    auth: token ? {
        headers: {
            // pass the authorization token when using private channels
            Authorization: `Bearer ${token}`,
        },
    } : undefined,

})