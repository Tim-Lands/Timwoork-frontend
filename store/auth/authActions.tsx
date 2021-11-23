/*
|--------------------------------------------------------------------------
| Auth actions.
|--------------------------------------------------------------------------
|
| Here all api calls and business logic concerned with authentication are
| handled. This (potentially among others) includes registration, login,
| logout.
|
*/

import API from "../../config";
import * as types from "../actionTypes";
import Cookies from 'js-cookie'
import router from "next/router";
//import router from "next/router";

/**
 * Load currently logged in user from DB.
 *
 * This usually happens after a successful login
 * or after a page refresh when there is currently
 * an active user.
 */
export const loadUser = () => {
    return async (dispatch: CallableFunction) => {
        try {
            const token = Cookies.get('token')
            const res = await API.get("api/me", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res.status === 200) {
                dispatch({ type: types.USER_LOADED, payload: res.data });                
                return res.data;
            }
        } catch (error) {

        }
    };
};

/**
 * Login functionality.
 *
 * @param {string} username
 *   The username of the user.
 * @param {string} password
 *   The password of the user.
 */
export const login = (username: string, password: string): any => {
    return async (dispatch: CallableFunction) => {
        try {
            // Start loading.
            dispatch({ type: types.START_LOGIN_LOADING });

            const res = await API.post("api/login", {
                username,
                password,
            })            
            // Authentication was successful.
            if (res.status === 200) {
                dispatch({
                    type: types.LOGIN_SUCCESS,
                });
                router.push('/dashboard')
                Cookies.set('token', res.data.data)
                dispatch(loadUser());
            }
        } catch (error: any) {
            if (error.response && error.response.status === 422) {
                return dispatch({
                    type: types.LOGIN_ERROR,
                    payload: "يرجى تعبئة البيانات",
                });
            }
            if (error.response && error.response.status === 419) {
                return dispatch({
                    type: types.LOGIN_ERROR,
                    payload: "العملية غير ناجحة",
                });
            } 
            if (error.response && error.response.status === '401') {
                return dispatch({
                    type: types.LOGIN_ERROR,
                    payload: "حدث خطأ.. يرجى التأكد من البيانات",
                });
            } else {
                return dispatch({
                    type: types.LOGIN_ERROR,
                    payload: "حدث خطأ غير متوقع",
                });
            }
        }
    };
};
/**
 * Log current user out.
 */
export const logout = () => {
    return async (dispatch: CallableFunction) => {
        try {
            const token = Cookies.get('token')
            const res = await API.post("api/logout", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res.status === 200) {
                dispatch({
                    type: types.LOGOUT,
                });
                Cookies.remove('token')
            }
        } catch (error) {
            //console.log(error);
        }
    };
};
