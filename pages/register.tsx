import React, { ReactElement, useEffect } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Link from 'next/link'
import { Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import { motion } from "framer-motion";
import { register } from "@/store/auth/authActions";
import Cookies from 'js-cookie'
import { Alert } from "@/components/Alert/Alert";
import { MetaTags } from '@/components/SEO/MetaTags'

const thumbnailUrl = `url(/colorful-abstract-textured-background.jpg)`

const Register = (props: any): ReactElement => {
    // Redirect to user home route if user is authenticated.
    const token = Cookies.get('token')
    useEffect(() => {
        if (token) {
            router.push('/');
        }
    }, []);
    const router = useRouter()
    const SignupSchema = Yup.object().shape({
        email: Yup.string().required('هذا الحقل إجباري'),
        password: Yup.string().required('هذا الحقل إجباري'),
    });
    // Return statement.
    return (
        <>
            <MetaTags
                title={"التسجيل"}
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
                    props.register(values.email, values.password);
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
                                        التسجيل
                                    </h1>
                                    <h3 className="login-text">
                                        هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة
                                    </h3>
                                </div>
                            </div>
                            <div className="col-lg-6 p-0">
                                {props.registerError && (
                                    <Alert type="danger">{props.registerError}</Alert>
                                )}
                                <div className="login-panel">
                                    <div className={"panel-modal-body login-panel-body auto-height" + (props.registerLoading ? ' is-loading' : '')}>
                                        {!props.registerLoading ? '' :
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
                                                name="email"
                                                placeholder="البريد الإلكتروني..."
                                                className="timlands-inputs"
                                                autoComplete="off"
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
                                        <div className="timlands-form">
                                            <div style={{ overflow: 'hidden' }}>
                                                <div className="timlands-form-note">
                                                    <p className="text">بمجرد قمت بالضغط على زر التسجيل فأنت توافق على <Link href="/"><a>شروط الاستخدام</a></Link> و <Link href="/"><a>سياسة الخصوصية</a></Link></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="panel-modal-footer">
                                            <div className="d-flex">
                                                <button type="submit" disabled={props.registerLoading} className="btn me-auto butt-primary butt-md">إنشاء حساب</button>
                                                <div className="footer-text">
                                                    <p className="text"> لديك حساب؟
                                                        <Link href="/login">
                                                            <a>تسجيل الدخول</a>
                                                        </Link>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="panel-login-external">
                                            <div className="login-external-header">
                                                <h4 className="title">أو التسجيل بواسطة</h4>
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
    registerError: state.auth.registerError,
    registerLoading: state.auth.registerLoading,
});

// Define PropTypes.
Register.propTypes = {
    props: PropTypes.object,
    register: PropTypes.func,
};

export default connect(mapStateToProps, { register })(Register);
