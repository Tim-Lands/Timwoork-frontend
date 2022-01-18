import React, { ReactElement, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Link from 'next/link'
import { dashLogin } from "@/store/auth/authActions";
import { Field, Form, Formik } from "formik";
import { motion } from "framer-motion";
import * as Yup from 'yup';
import { useRouter } from "next/router";
import { Alert } from "@/components/Alert/Alert";
import Cookies from 'js-cookie'
import { MetaTags } from '@/components/SEO/MetaTags'

const Login = (props: any): ReactElement => {
    // The router object used for redirecting after login.
    const router = useRouter();
    // Redirect to user home route if user is authenticated.
    const token = Cookies.get('token_dash')
    useEffect(() => {
        if (token) {
            router.push('/tw-admin');
            return;
        }
    }, [token]);
    // Yup Validations
    const SignupSchema = Yup.object().shape({
        email: Yup.string().required('هذا الحقل إجباري'),
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
                    email: '',
                    password: '',
                }}
                validationSchema={SignupSchema}
                onSubmit={async values => {
                    props.dashLogin(values.email, values.password);
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
                                                name="email"
                                                placeholder="البريد الإلكتروني..."
                                                className="timlands-inputs"
                                            />
                                            {errors.email && touched.email ?
                                                <div style={{ overflow: 'hidden' }}>
                                                    <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                                        <p className="text">{errors.email}</p>
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
                                        <div className="panel-modal-footer">
                                            <div className="d-flex">
                                                <button type="submit" disabled={props.loading} className="btn me-auto butt-primary butt-md">تسجيل الدخول</button>
                                            </div>
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
    dashLogin: PropTypes.func,
};

export default connect(mapStateToProps, { dashLogin })(Login);
