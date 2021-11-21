import { combineReducers } from 'redux'

function CounterReducer(state = 0, action) {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1
        case 'DECREMENT':
            return state - 1
        default:
            return state
    }
}

function loggedReducer(state = false, action) {
    switch (action.type) {
        case 'SIGN_IN':
            return !state
        default:
            return state
    }
}
function isDarken(state = false, action) {
    switch (action.type) {
        case 'DARKEN_MODE':
            return !state
        default:
            return state
    }
}
async function getUser(state = null, action) {
    switch (action.type) {
        case 'GET_USER':
            return {
                ...state,
                userData: action.payload
            }
        default:
            return state
    }
}
const allReducer = combineReducers({
    counter: CounterReducer,
    isLogged: loggedReducer,
    isDarken: isDarken,
    getUser: getUser
})

export default allReducer
