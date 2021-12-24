import React, { ReactElement, useEffect } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Link from 'next/link'
import API from '../config'
import { Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import { motion } from "framer-motion";
import { register } from "@/store/auth/authActions";
import { GoogleLogin } from 'react-google-login';
import Cookies from 'js-cookie'
import { Alert } from "@/components/Alert/Alert";
import { MetaTags } from '@/components/SEO/MetaTags'
import { message } from "antd";

const clientId = "1055095089511-f7lip5othejakennssbrlfbjbo2t9dp0.apps.googleusercontent.com";
const Register = (props: any): ReactElement => {
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
                console.log(response);
                Cookies.set('token', response.data.data.token)
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
        repassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'كلمتا المرور غير متطابقتين')
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
                    repassword: '',
                }}
                validationSchema={SignupSchema}
                onSubmit={async values => {
                    props.register(values.email, values.password);
                }}
            >
                {({ errors, touched }) => (
                    <Form>
                        <div className="row justify-content-md-center">
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
                                        <div className="timwoork-logo">
                                            <Link href="/">
                                                <a>
                                                    <img src="/logo6.png" alt="" />
                                                </a>
                                            </Link>
                                        </div>
                                        <div className="page-header">
                                            <h1 className="title">
                                                التسجيل
                                            </h1>
                                        </div>
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
                                            <label className="label-block" htmlFor="password">إعادة كلمة المرور</label>
                                            <Field
                                                type="password"
                                                id="password"
                                                name="repassword"
                                                placeholder="إعادة كلمة المرور..."
                                                className="timlands-inputs"
                                                autoComplete="off"
                                            />
                                            {errors.repassword && touched.repassword ?
                                                <div style={{ overflow: 'hidden' }}>
                                                    <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                                        <p className="text">{errors.repassword}</p>
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
    registerError: state.auth.registerError,
    registerLoading: state.auth.registerLoading,
});

// Define PropTypes.
Register.propTypes = {
    props: PropTypes.object,
    register: PropTypes.func,
};

export default connect(mapStateToProps, { register })(Register);
