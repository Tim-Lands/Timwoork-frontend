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

export const addNewProduct = () => {
    return async (dispatch: CallableFunction) => {
        try {
            const token = Cookies.get('token')
            dispatch({
                type: types.ADD_PRODUCT_LOADING,
            });
            const res = await API.get("api/product/create", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            // If Activate Network 
            // Authentication was successful.
            if (res.status == 201 || res.status == 200) {
                dispatch({
                    type: types.ADDED_PRODUCT,
                });
                router.push({
                    pathname: `/add-new/overview`,
                    query: {
                        id: res.data.data.id, // pass the id 
                    },
                })
            } else {
                return dispatch({
                    type: types.ADD_NEW_PRODUCT_ERROR,
                    payload: "حدث خطأ غير متوقع",
                });
            }
        } catch (ex) {
            if (ex.response && ex.response.status === 403) {
                return dispatch({
                    type: types.ADD_NEW_PRODUCT_ERROR,
                    payload: "هذا العنصر غير موجود",
                });
            }

            if (ex.response && ex.response.status === 422) {
                return dispatch({
                    type: types.ADD_NEW_PRODUCT_ERROR,
                    payload: "يرجى ملأ البيانات",
                });
            }

            if (ex.response && ex.response.status === 401) {
                return dispatch({
                    type: types.ADD_NEW_PRODUCT_ERROR,
                    payload: "ليس لديك الصلاحية",
                });
            }
        }
    }
}

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
            if (error.response && error.response.status === 401) {
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
 * Register functionality.
 *
 * @param {string} email
 *   The username of the user.
 * @param {string} password
 *   The password of the user.
 */
export const register = (email: string, password: string): any => {
    return async (dispatch: CallableFunction) => {
        try {
            // Start loading.
            dispatch({ type: types.START_REGISTER_LOADING });

            const res = await API.post("api/register", {
                email,
                password,
            })
            // Authentication was successful.
            if (res.status === 200) {
                dispatch({
                    type: types.REGISTER_SUCCESS,
                });
                router.push({
                    pathname: '/emailConfig',
                })
            }
        } catch (error: any) {
            if (error.response && error.response.status === 422) {
                return dispatch({
                    type: types.REGISTER_ERROR,
                    payload: "يرجى تعبئة البيانات",
                });
            }
            if (error.response && error.response.status === 419) {
                return dispatch({
                    type: types.REGISTER_ERROR,
                    payload: "العملية غير ناجحة",
                });
            }
            if (error.response && error.response.status === 400) {
                return dispatch({
                    type: types.REGISTER_ERROR,
                    payload: "حدث خطأ ما لم يتم العثور على رمز التفعيل الخاص بك",
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
 * Verify Code Activation functionality.
 *
 * @param {string} email
 *   The username of the user.
 * @param {string} code
 *   The code of the user.
 */
export const verifyCode = (email: string, code: string): any => {
    return async (dispatch: CallableFunction) => {
        try {
            // Start loading.
            dispatch({ type: types.START_VERIFY_LOADING });

            const res = await API.post("api/email/verify", {
                email,
                code,
            })
            // Authentication was successful.
            if (res.status === 200) {
                dispatch({
                    type: types.VERIFY_SUCCESS,
                });
                router.push('/user/personalInformations')
            }
        } catch (error: any) {
            if (error.response && error.response.status === 422) {
                return dispatch({
                    type: types.VERIFY_ERROR,
                    payload: "يرجى تعبئة البيانات",
                });
            }
            if (error.response && error.response.status === 419) {
                return dispatch({
                    type: types.VERIFY_ERROR,
                    payload: "العملية غير ناجحة",
                });
            }
            if (error.response && error.response.status === 400) {
                return dispatch({
                    type: types.VERIFY_ERROR,
                    payload: "حدث خطأ.. يرجى التأكد من البيانات",
                });
            } else {
                return dispatch({
                    type: types.VERIFY_ERROR,
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
        Cookies.remove('token')
        try {
            const res = await API.post("api/logout");
            if (res.status === 200) {
                dispatch({
                    type: types.LOGOUT,
                });
            }
        } catch (error) {
            //console.log(error);
        }
    };
}