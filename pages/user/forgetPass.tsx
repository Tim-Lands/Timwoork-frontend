import React, { ReactElement } from "react";
import Link from 'next/link'
import Cookies from 'js-cookie'
import { Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import API from "../../config";
import { motion } from "framer-motion";
import { message } from "antd";
import "antd/dist/antd.min.css";

const ForgetPass = (): ReactElement => {
    const SignupSchema = Yup.object().shape({
        email: Yup.string().required('هذا الحقل إجباري'),
    });
    // Return statement.
    return (
        <>
            <Formik
                initialValues={{
                    email: '',
                }}
                validationSchema={SignupSchema}
                onSubmit={async values => {
                    try {
                        const token = Cookies.get('token')
                        const res = await API.post("api/profiles/step_three", values, {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        })
                        // Authentication was successful.
                        if (res.status === 200) {
                            message.success('لقد تم التحديث بنجاح')
                        }
                    } catch (error: any) {
                        if (error.response && error.response.status === 200) {
                            message.success('لقد تم التحديث بنجاح')
                        }
                        if (error.response && error.response.status === 422) {
                            message.error("يرجى تعبئة البيانات")
                        }
                        if (error.response && error.response.status === 419) {
                            message.error("العملية غير ناجحة")
                        }
                        if (error.response && error.response.status === 400) {
                            message.error("حدث خطأ.. يرجى التأكد من البيانات")
                        } else {
                            message.error("حدث خطأ غير متوقع")
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
                                        تحديث المعلومات الشخصية
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
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="timlands-form">
                                                    <label className="label-block" htmlFor="email">أدخل بريدك الإلكتروني</label>
                                                    <Field
                                                        id="email"
                                                        name="email"
                                                        placeholder="البريد الإلكتروني..."
                                                        className="timlands-inputs code"
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
                                            </div>

                                        </div>
                                        <div className="panel-modal-footer">
                                            <div className="d-flex">
                                                <button type="submit" disabled={isSubmitting} className="btn me-auto butt-primary butt-md">استعادة</button>
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

export default ForgetPass;
