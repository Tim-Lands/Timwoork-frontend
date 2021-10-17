/*
|--------------------------------------------------------------------------
| Login View.
|--------------------------------------------------------------------------
|
| The view where a user can log in. Redux is used to make the api call.
|
*/

import React, { ReactElement, useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "@/store/auth/authActions";
import { UserValidator } from "@/services/UserValidator";
import { TextInput } from "@/components/Form/FormElement";
import { Alert } from "@/components/Alert/Alert";
import { useRouter } from "next/router";
import Link from "next/link";
import { SmallSpinner } from "@/components/Spinner/Spinner";

const Login = (props: any): ReactElement => {
    /**
     * The state.
     */
    const [formData, setFormData] = useState<{
        email: string;
        password: string;
        emailError: string;
        passwordError: string;
    }>({
        email: "",
        password: "",
        emailError: "",
        passwordError: "",
    });

    // The router object used for redirecting after login.
    const router = useRouter();

    // Redirect to user home route if user is authenticated.
    useEffect(() => {
        if (props.isAuthenticated && !props.loading) {
            router.push(process.env.NEXT_PUBLIC_USER_HOME_ROUTE);
        }
    }, [props.isAuthenticated, props.loading]);

    /**
     * Handle input change.
     *
     * @param {object} e
     *   The event object.
     */
    const handleInputChange = (e: React.FormEvent<HTMLInputElement>): void => {
        setFormData({
            ...formData,
            [e.currentTarget.name]: e.currentTarget.value,
            emailError: "",
            passwordError: "",
        });
    };

    /**
     * Submit the form.
     */
    const submit = (): Promise<void> => {
        const userValidator: UserValidator = new UserValidator();
        const { email, password } = formData;

        // Check for valid email address.
        const isEmailValid: boolean = userValidator.validateEmail(email);
        if (!isEmailValid) {
            setFormData({
                ...formData,
                emailError: "Please provide a valid email address",
            });
            return;
        }

        // Check for valid password.
        if (!password) {
            setFormData({
                ...formData,
                passwordError: "Please provide a valid password",
            });
            return;
        }

        // Make API call if everything is fine.
        props.login(email, password);
    };

    // Return statement.
    return (
        <div className="timlands-accounts">
            <div className="row">
                <div className="col-lg-6 p-0">
                    <div className="timlands-accounts-container">
                        <div className="timlands-accounts-forms">
                            {props.loginError && (
                                <Alert type="danger">{props.loginError}</Alert>
                            )}
                            {/* The main Header */}
                            <div className="timlands-accounts-header">
                                <h1 className="title">Login</h1>
                            </div>

                            {/* Email */}
                            <TextInput
                                type="text"
                                value={formData.email}
                                placeholder="Your email address..."
                                title="Email address"
                                onChange={(e) => {
                                    handleInputChange(e);
                                }}
                                name="email"
                                errorMsg={formData.emailError}
                            />

                            {/* Password */}
                            <TextInput
                                type="password"
                                value={formData.password}
                                title="Your password"
                                placeholder="Your password..."
                                onChange={(e) => {
                                    handleInputChange(e);
                                }}
                                name="password"
                                errorMsg={formData.passwordError}
                            />

                            {/* Submit Button */}
                            <div className="account-butt">
                                <button
                                    onClick={() => {
                                        submit();
                                    }}
                                    className="btn butt-primary butt-lg btn-block"
                                >
                                    <SmallSpinner show={props.loading} />
                                    Login
                                </button>
                            </div>

                            {/* Additional links. */}
                            <div className="w-full flex justify-between mt-3 text-blue-500">
                                <Link href="/user/register">
                                    <a className="text-xs underline">
                                        No Account yet?
                                    </a>
                                </Link>
                                <Link href="/user/password/forgot">
                                    <a className="text-xs underline">
                                        Forgot password?
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Map redux states to local component props.
const mapStateToProps = (state: any) => ({
    isAuthenticated: state.auth.isAuthenticated,
    loginError: state.auth.loginError,
    loading: state.auth.loginLoading,
});

// Define PropTypes.
Login.propTypes = {
    props: PropTypes.object,
    login: PropTypes.func,
};

export default connect(mapStateToProps, { login })(Login);
