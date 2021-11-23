/*
|--------------------------------------------------------------------------
| Auth store.
|--------------------------------------------------------------------------
|
| Here you can find the store for the authentication part of the application
| It manages all authentication data like the current user, auth status and errors.
|
*/

import * as types from "../actionTypes";

// The initial state.
const initState = {
    isAuthenticated: false,
    loading: true,
    loginLoading: false,
    user: {},
    loginError: "",
    authError: "",
    userLoadedError: "",
};

/**
 * The auth store.
 *
 * @param {object} state
 *   The inital state.
 * @param {object} action
 *   The dispatched action.
 */
const auth = (state = initState, action: { type: string; payload: any }) => {
    switch (action.type) {
        case types.AUTH_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                loginError: "",
                user: action.payload,
            };
        case types.USER_LOADED:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                loginError: "",
                user: action.payload,
            };
        case types.USER_LOADED_ERROR:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                userLoadedError: action.payload,
                user: {},
            };
        case types.START_LOGIN_LOADING:
            return {
                ...state,
                loginLoading: true,
            };
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                loginLoading: false,
                user: action.payload,
            };
        case types.LOGIN_ERROR:
            return {
                ...state,
                loginLoading: false,
                isAuthenticated: false,
                user: {},
                loginError: action.payload,
            };
    }
    return state;
};

export default auth;
