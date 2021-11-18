import React, { ReactElement } from "react";
import { useRouter } from "next/router";
import API from '../config';
import Link from 'next/link'
import { Field, Form, Formik } from "formik";
import { motion } from "framer-motion";
import * as Yup from 'yup';

const Login = (): ReactElement => {
    const router = useRouter()
    const SignupSchema = Yup.object().shape({
        username: Yup.string().required('هذا الحقل إجباري'),
        password: Yup.string().required('هذا الحقل إجباري'),
    });
    // Return statement.
    return (
        <Formik
            initialValues={{
                username: '',
                password: '',
            }}
            validationSchema={SignupSchema}
            onSubmit={async values => {
                try {
                    const res = await API.post("login", values, { withCredentials: true });
                    // If Activate Network 
                    // Authentication was successful.
                    if (res.status == 201 || res.status == 200) {
                        alert('تمت الإضافة بنجاح')
                        router.push('/dashboard')
                    } else {
                        alert('Error')
                    }
                } catch (ex) {

                    if (ex.response && ex.response.status === 422) {
                        alert(ex.response.data.errors)
                    }

                    if (ex.response && ex.response.status === 401) {
                        alert(ex.response.data);
                    }
                }
            }}
        >
            {({ errors, touched, isSubmitting }) => (
                <Form>
                    <div className="row">
                        <div className="col-lg-6 p-0">
                            <div className="login-image">
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
                            <div className="login-panel">
                                <div className={"panel-modal-body login-panel-body auto-height" + (isSubmitting ? ' is-loading' : '')}>
                                    {!isSubmitting ? '' :
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
                                            autoComplete="off"
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
                                                <Link href="/">
                                                    <a>نسيت كلمة المرور؟</a>
                                                </Link>
                                            </p>
                                        </div>

                                    </div>
                                    <div className="panel-modal-footer">
                                        <div className="d-flex">
                                            <button type="submit" disabled={isSubmitting} className="btn me-auto butt-primary butt-md">تسجيل الدخول</button>
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
    );
};

export default Login;
