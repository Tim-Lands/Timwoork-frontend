import React, { ReactElement, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Link from 'next/link'
import { login } from "@/store/auth/authActions";
import { Field, Form, Formik } from "formik";
import { motion } from "framer-motion";
import * as Yup from 'yup';
import { useRouter } from "next/router";
import { Alert } from "@/components/Alert/Alert";
import Cookies from 'js-cookie'
import { MetaTags } from '@/components/SEO/MetaTags'

const thumbnailUrl = `url(/5566879.jpg)`
const Login = (props: any): ReactElement => {
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
                        <div className="row">
                            <div className="col-lg-6 p-0">
                                <div className="login-image" style={{ backgroundImage: thumbnailUrl }}>
                                    <div className="timwoork-logo">
                                        <Link href="/">
                                            <a>
                                                <img src="/logo4.png" alt="" />
                                            </a>
                                        </Link>
                                    </div>
                                    <h1 className="login-title">
                                        تسجيل الدخول
                                    </h1>
                                    <h3 className="login-text">
                                        هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة
                                    </h3>
                                </div>
                            </div>
                            <div className="col-lg-6 p-0">
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
                                                type="password"
                                                id="password"
                                                name="password"
                                                placeholder="كلمة المرور..."
                                                className="timlands-inputs"
                                                autoComplete="off"
                                            />
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
                                                    <button className="ext-butt">
                                                        <i className="fab fa-google"></i> | غوغل
                                                    </button>
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
