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
    verifyLoading: false,
    user: {},
    loginError: "",
    registerError: "",
    verifyError: "",
    authError: "",
    userLoadedError: "",
    addNewProductLoading: false,
    registerLoading: false,
    addNewProductError: '',
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
                verifyError: "",
                user: action.payload,
            };
        case types.VERIFY_SUCCESS:
            return {
                ...state,
                verifyLoading: false,
                isAuthenticated: true,
                verifyError: "",
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
        case types.START_REGISTER_LOADING:
            return {
                ...state,
                registerLoading: true,
            };
        case types.START_VERIFY_LOADING:
            return {
                ...state,
                verifyLoading: true,
            };
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                loginLoading: false,
                user: action.payload,
            };
        case types.REGISTER_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                registerLoading: false,
            };
        case types.REGISTER_ERROR:
            return {
                ...state,
                registerLoading: false,
                isAuthenticated: false,
                registerError: action.payload,
            };
        case types.VERIFY_ERROR:
            return {
                ...state,
                verifyLoading: false,
                isAuthenticated: true,
                verifyError: action.payload,
            };
        case types.LOGIN_ERROR:
            return {
                ...state,
                loginLoading: false,
                isAuthenticated: false,
                user: {},
                loginError: action.payload,
            };

        case types.ADD_PRODUCT_LOADING:
            return {
                ...state,
                addNewProductLoading: true,
            };
        case types.ADDED_PRODUCT:
            return {
                ...state,
                isAuthenticated: true,
                addNewProductLoading: false,
            };
        case types.ADD_NEW_PRODUCT_ERROR:
            return {
                ...state,
                isAuthenticated: true,
                addNewProductLoading: false,
                addNewProductError: action.payload,
            };
    }
    return state;
};

export default auth;
