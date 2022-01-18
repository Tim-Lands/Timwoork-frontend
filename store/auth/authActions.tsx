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
import useSWR from 'swr'
import { userInfo } from "os";
import { message } from "antd";

export const addNewProduct = () => {
    return async (dispatch: CallableFunction) => {
        try {
            const token = Cookies.get('token')
            dispatch({
                type: types.ADD_PRODUCT_LOADING,
            });
            const res = await API.get("api/product/store", {
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
            const { data: user, error }: any = useSWR('api/me')
            if (user) {
                dispatch({ type: types.USER_LOADED, payload: user });
                return user;
            }
        } catch (error) {

        }
    };
};

/**
 * Dashboard Login functionality.
 *
 * @param {string} email
 *   The email of the user.
 * @param {string} password
 *   The password of the user.
 */
 export const dashLogin = (email: string, password: string): any => {
    return async (dispatch: CallableFunction) => {
        try {
            // Start loading.
            dispatch({ type: types.START_LOGIN_LOADING });

            const res = await API.post("dashboard/login", {
                email,
                password,
            })
            // Authentication was successful.
            if (res.status === 200) {
                dispatch({
                    type: types.LOGIN_SUCCESS,
                });                
                Cookies.set('token_dash', res.data.data);
                router.push('/tw-admin')
                
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
                    payload: "المعلومات التي أدخلتها خاطئة",
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
                Cookies.set('token', res.data.data.token);
                Cookies.set('username',username);

                if (res.data.data.is_verified) {
                    switch (res.data.data.step) {
                        case 0:
                            router.push('/user/personalInformations')
                            break;
                        case 1:
                            router.push('/user/personalInformations')
                            break;
                        case 2:
                            router.push('/user/numberPhone')
                            break;
                        default:
                            router.push('/')
                    }
                } else {
                    router.push('/emailConfig')
                }
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
export const register = (email: string, password: string, username: string): any => {
    return async (dispatch: CallableFunction) => {
        try {
            // Start loading.
            dispatch({ type: types.START_REGISTER_LOADING });
            const res = await API.post("api/register", {
                email,
                password,
                username,
            })
            // Authentication was successful.
            if (res.status === 200) {
                dispatch({
                    type: types.REGISTER_SUCCESS,
                });
                Cookies.set('token', res.data.data.token)
                if (res.data.data.is_verified) {
                    switch (res.data.data.step) {
                        case 0:
                            router.push('/user/personalInformations')
                            break;
                        case 1:
                            router.push('/user/personalInformations')
                            break;
                        case 2:
                            router.push('/user/personalInformations')
                            break;
                        default:
                            router.push('/')
                    }
                } else {
                    router.push('/email/verification')
                }
            }
        } catch (error: any) {

            if (error.response && error.response.data && error.response.data.errors.email) {
                message.error(error.response.data.errors.email[0]);
            }
            if (error.response && error.response.data && error.response.data.errors.password) {
                message.error(error.response.data.errors.password[0]);
            }
            if (error.response && error.response.data && error.response.data.errors.username) {
                message.error(error.response.data.errors.username[0]);
            }
            return dispatch({
                type: types.REGISTER_ERROR,
                payload: "",
            });
        }
    };
}
/**
 * Log current user out.
 */
export const logout = () => {
    return async (dispatch: CallableFunction) => {
        Cookies.remove('token')
        router.reload()
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