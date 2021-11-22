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
            //const token = localStorage.getItem('token')
            const res = await API.get("me", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            // User was loaded successfully.
            if (res.status === 200) {
                dispatch({ type: types.USER_LOADED, payload: res.data });
                return res.data;
            }
        } catch (error) {
            if (error.response.status === 422) {
                return dispatch({
                    type: types.USER_LOADED_ERROR,
                    payload: "Email or password are incorrect.",
                });
            }
            if (error.response.status === 419) {
                return dispatch({
                    type: types.AUTHENTICATION_ERROR,
                    payload: {
                        errorMsg: "Keinen Serverzugang.",
                    },
                });
            } else {
                return dispatch({
                    type: types.USER_LOADED_ERROR,
                    payload: "Sorry, something went wrong.",
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

            const res = await API.post("login", {
                username,
                password,
            })
            // localStorage.setItem('token', res.data.data);
            
            // Authentication was successful.
            if (res.status === 200) {
                dispatch({
                    type: types.LOGIN_SUCCESS,
                });
                //router.push('/dashboard')
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
            const res = await API.post("logout", {
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

/**
 * Request a password reset link for an account by a given email address.
 *
 * If the request is successfull, the user will get a link by email where
 * he can create a new password.
 *
 * @param {string} email
 *   The email for the account whose password will be reset.
 *
 * @return {object}
 *   Error and success message.
 */
export const forgotPassword = (email: string) => {
    return async (dispatch: CallableFunction) => {
        try {
            const res = await API.post("/password/email", { email });

            // Behaviour on success.
            if (res.status === 200) {
                return {
                    success: res.data.message,
                    error: "",
                };
            }
        } catch (error) {
            // Return an error message if the email was not found in the DB.
            if (error.response.status === 422) {
                dispatch({
                    type: types.AUTH_GENERAL_ERROR,
                });
                return {
                    success: "",
                    error: "Seems like there is no account for that email.",
                };
            }
        }
    };
};

/**
 * Create a new password for a given user.
 *
 * @param {string} email
 *   The email address of the user.
 * @param {string} password
 *   The new password.
 * @param {string} token
 *   The token. It must have been created beforehand by declaring a forgotten password (see forgotPassword()).
 *
 * @return {object}
 */
export const resetPassword = (email, password, token) => {
    return async (dispatch: CallableFunction) => {
        try {
            const res = await API.post("/password/reset", {
                email,
                password,
                token,
            });

            // Behaviour on success.
            if (res.status === 200) {
                return {
                    success: res.data.message,
                    error: "",
                };
                /**
                 * No need to dispatch an action here as
                 * the user will be redirected, which will trigger
                 * the LOAD_USER actions anyways.
                 */
            }
            return {
                success: "",
                error: "The given data was invalid",
            };
        } catch (error) {
            dispatch({
                type: types.AUTH_GENERAL_ERROR,
            });
            return {
                success: "",
                error: "The given data is invalid.",
            };
        }
    };
};

/**
 * Verify the email of a user.
 *
 * @param {string} userID
 *   The id of the user.
 * @param {string} hash
 *   A hash value.
 * @param {string} expires
 *   The expiration date.
 * @param {string} signature
 *   The signature.
 *
 * @return {object}
 *   Includes success and error keys. Their values will be set depending on verification outcome.
 */
export const verifyEmail = (userID, hash, expires, signature) => {
    return async (dispatch: CallableFunction) => {
        try {
            /**
             * Construct the url the api expects.
             * It must be /email/verify/USERID/HASH?expires=EXPIRES&signature=SIGNATURE
             */
            const requestURL = `/email/verify/${userID}/${hash}?expires=${expires}&signature=${signature}`;

            // Send req to api.
            const res = await API.get(requestURL);

            // Success.
            if (res.status === 204) {
                return {
                    success: true,
                    error: "",
                };
            }
            // Error.
            else {
                return {
                    success: false,
                    error: "Something went wrong",
                };
            }
        } catch (error) {
            if (error.response && error.response.data) {
                return {
                    success: false,
                    error: error.response.data.message,
                };
            } else {
                return {
                    success: false,
                    error: "Sorry, something went wrong.",
                };
            }
        }
    };
};
