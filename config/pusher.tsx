import Pusher from 'pusher-js'
import Cookies from 'js-cookie'

const token = Cookies.get('token')
export const pusher = new Pusher('a00614632e45ad3d49ff', {
    cluster: 'eu',
    authEndpoint: 'https://api.icoursat.com/api/broadcasting/auth',
    auth: token ? {
        headers: {
            // pass the authorization token when using private channels
            Authorization: `Bearer ${token}`,
        },
    } : undefined,

})