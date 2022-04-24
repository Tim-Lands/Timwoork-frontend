export const increment = () => {
    return {
        type: 'INCREMENT'
    }
}
export const login = () => {
    return {
        type: 'SIGN_IN'
    }
}
export const setDarken = () => {
    return {
        type: 'DARKEN_MODE'
    }
}
export const getUser = async (token: any) => {
    return {
        type: 'GET_USER',
        payload: token
    }
}