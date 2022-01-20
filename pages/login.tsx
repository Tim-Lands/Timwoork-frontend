import React, { ReactElement, useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Link from 'next/link'
import API from '../config'
import { login } from "@/store/auth/authActions";
import { Field, Form, Formik } from "formik";
import { motion } from "framer-motion";
import * as Yup from 'yup';
import { useRouter } from "next/router";
import { Alert } from "@/components/Alert/Alert";
import Cookies from 'js-cookie'
import { MetaTags } from '@/components/SEO/MetaTags'
import { GoogleLogin } from 'react-google-login';
import { message } from "antd";

const clientId = "1055095089511-f7lip5othejakennssbrlfbjbo2t9dp0.apps.googleusercontent.com";

const Login = (props: any): ReactElement => {
    const [passVisibled, setPassVisibled] = useState(false)

    // Login with Google
    const onLoginSuccess = async (res) => {
        //أرسل هذا الريسبونس الى الباكند
        try {
            const response = await API.post("api/login/google", {
                email: res.profileObj.email,
                first_name: res.profileObj.givenName,
                last_name: res.profileObj.familyName,
                full_name: res.profileObj.name,
                avatar: res.profileObj.imageUrl,
                provider_id: res.profileObj.googleId
            })
            // Authentication was successful.
            if (response.status === 200) {
                Cookies.set('token', response.data.data.token)
                // Cookies.set('username', );
                // Cookies.set('userID', )

                message.success('تم تسجيل الدخول بنجاح')
                switch (response.data.data.step) {
                    case 0:
                        router.push('/user/personalInformations')
                        break;
                    case 1:
                        router.push('/user/personalInformations')
                        break;
                    case 2:
                        router.push('/')
                        break;
                    default:
                        router.push('/')
                }
            }
        } catch (error: any) {
            message.error('حدث خطأ غير متوقع')
        }
    };
    
    const onLoginFailure = (res) => {
        console.log('Login Failed:', res);
    };

    // The router object used for redirecting after login.
    const router = useRouter();
    // Redirect to user home route if user is authenticated.
    const token = Cookies.get('token')
    useEffect(() => {
        if (token) {
            router.push('/');
            return;
        }
    }, [token]);
    // Yup Validations
    const SignupSchema = Yup.object().shape({
        username: Yup.string().required('هذا الحقل إجباري'),
        password: Yup.string().required('هذا الحقل إجباري'),
    });

    // Return statement.
    return (
        <>
            <MetaTags
                title={"تسجيل الدخول"}
                metaDescription={"الصفحة الرئيسية"}
                ogDescription={"الصفحة الرئيسية"}
            />
            <Formik
                initialValues={{
                    username: '',
                    password: '',
                }}
                validationSchema={SignupSchema}
                onSubmit={async values => {
                    props.login(values.username, values.password);
                }}
            >
                {({ errors, touched }) => (
                    <Form>
                        <div className="row justify-content-md-center">
                            <div className="col-lg-5 p-0">
                                {props.loginError && (
                                    <Alert type="danger">{props.loginError}</Alert>
                                )}
                                <div className="login-panel">
                                    <div className={"panel-modal-body login-panel-body auto-height" + (props.loading ? ' is-loading' : '')}>
                                        {!props.loading ? '' :
                                            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="is-loading">
                                                <div className="spinner-border" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>
                                            </motion.div>
                                        }
                                        <div className="timwoork-logo">
                                            <Link href="/">
                                                <a>
                                                    <img src="/logo6.png" alt="" />
                                                </a>
                                            </Link>
                                        </div>
                                        <div className="page-header">
                                            <h1 className="title">
                                                تسجيل الدخول
                                            </h1>
                                        </div>
                                        <div className="timlands-form">
                                            <label className="label-block" htmlFor="email">البريد الإلكتروني</label>
                                            <Field
                                                id="email"
                                                name="username"
                                                placeholder="البريد الإلكتروني..."
                                                className="timlands-inputs"
                                            />
                                            {errors.username && touched.username ?
                                                <div style={{ overflow: 'hidden' }}>
                                                    <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                                        <p className="text">{errors.username}</p>
                                                    </motion.div>
                                                </div>
                                                :
                                                null}
                                        </div>
                                        <div className="timlands-form">
                                            <label className="label-block" htmlFor="password">كلمة المرور</label>
                                            <Field
                                                type={passVisibled ? "text" : 'password'}
                                                id="password"
                                                name="password"
                                                placeholder="كلمة المرور..."
                                                className="timlands-inputs"
                                                autoComplete="off"
                                            />
                                            <button type="button" className={"timlands-form-btn" + (passVisibled ? ' active' : '')} onClick={() => setPassVisibled(!passVisibled)}>
                                                {
                                                    passVisibled ? <span className="material-icons material-icons-outlined">visibility_off</span> : <span className="material-icons material-icons-outlined">visibility</span>
                                                }
                                            </button>
                                            {errors.password && touched.password ?
                                                <div style={{ overflow: 'hidden' }}>
                                                    <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                                        <p className="text">{errors.password}</p>
                                                    </motion.div>
                                                </div>
                                                :
                                                null}
                                        </div>
                                        <div className="timlands-form">
                                            <div className="flex-center remember-text">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                                    <label className="form-check-label" htmlFor="defaultCheck1">
                                                        تذكرني
                                                    </label>
                                                </div>
                                                <p className="text">
                                                    <Link href="/user/forgetPass">
                                                        <a>نسيت كلمة المرور؟</a>
                                                    </Link>
                                                </p>
                                            </div>

                                        </div>
                                        <div className="panel-modal-footer">
                                            <div className="d-flex">
                                                <button type="submit" disabled={props.loading} className="btn me-auto butt-primary butt-md">تسجيل الدخول</button>
                                                <div className="footer-text">
                                                    <p className="text">ليس لديك حساب؟
                                                        <Link href="/register">
                                                            <a>انضم إلينا!</a>
                                                        </Link>
                                                    </p>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="panel-login-external">
                                            <div className="login-external-header">
                                                <h4 className="title">أو تسجيل الدخول بواسطة</h4>
                                            </div>
                                            <ul className="login-external-links nav justify-content-center">
                                                <li>
                                                    <button className="ext-butt">
                                                        <i className="fab fa-facebook"></i> | فيسبووك
                                                    </button>
                                                </li>
                                                <li>
                                                    <GoogleLogin
                                                        clientId={clientId}
                                                        buttonText="غوغل"
                                                        onSuccess={onLoginSuccess}
                                                        onFailure={onLoginFailure}
                                                        cookiePolicy={'single_host_origin'}
                                                        //isSignedIn={true}
                                                        className="ext-butt"
                                                    />
                                                </li>
                                                <li>
                                                    <button className="ext-butt">
                                                        <i className="fab fa-twitter"></i> | تويتر
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
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
