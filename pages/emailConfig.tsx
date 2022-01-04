import React, { useEffect } from 'react'
import Link from 'next/link'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import router from 'next/router';
import API from '../config'
import withAuth from './../services/withAuth'
import { Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import { motion } from "framer-motion";
import { Alert } from '@/components/Alert/Alert';
import useSWR from 'swr'
import { message } from 'antd';

function EmailConfig(props: any) {
    const { data: userInfo }: any = useSWR('api/me')
    //if (!userInfo) return console.log(userInfo)
    const email_verified = userInfo && userInfo.user_details.email_verified_at
    
    useEffect(() => {
        if (email_verified) {
            
            router.push('/')
        }
    }, [email_verified])
    const SignupSchema = Yup.object().shape({
        code: Yup.number().required('هذا الحقل إجباري'),
    });
    return (
        <div className="row justify-content-md-center">
            <div className="col-lg-6 p-0">
                {userInfo &&
                    <Formik
                        isInitialValid={true}
                        initialValues={{
                            email: userInfo.user_details.email,
                            code: '',
                        }}
                        validationSchema={SignupSchema}
                        onSubmit={async values => {
                            try {
                                const res = await API.post("api/email/verify", values)
                                // Authentication was successful.
                                if (res.status === 200) {
                                    message.success("تم التحقق بنجاح");
                                    router.push('/user/personalInformations')
                                }
                            } catch (error: any) {
                                if (error.response && error.response.status === 422) {
                                    message.error("يرجى تعبئة البيانات");
                                }
                                if (error.response && error.response.status === 419) {
                                    message.error("العملية غير ناجحة");
                                }
                                if (error.response && error.response.status === 400) {
                                    message.error("حدث خطأ.. يرجى التأكد من البيانات");
                                } else {
                                    message.error("حدث خطأ غير متوقع")
                                }
                            }
                        }}
                    >
                        {({ errors, touched, isSubmitting }) => (
                            <Form>
                                {props.verifyError && (
                                    <Alert type="danger">{props.verifyError}</Alert>
                                )}
                                <div className="login-panel email-config">
                                    <div className={"panel-modal-body login-panel-body auto-height" + (isSubmitting ? ' is-loading' : '')}>
                                        {!props.verifyLoading ? '' :
                                            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="is-loading">
                                                <div className="spinner-border" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>
                                            </motion.div>
                                        }
                                        <div className="timwoork-logo mb-4">
                                            <Link href="/">
                                                <a>
                                                    <img src="/logo6.png" alt="" />
                                                </a>
                                            </Link>
                                        </div>
                                        <h1 className="login-title-form">
                                            التأكد من البريد الإلكتروني
                                        </h1>
                                        <p className="login-text-form">
                                            تحقق من بريدك الإلكتروني انها وصلك كود تفعيل يتكون من 6 أرقام
                                        </p>
                                        <div className="timlands-form">
                                            <label className="label-block" htmlFor="code">كود التفعيل</label>
                                            <Field
                                                id="code"
                                                name="code"
                                                placeholder="######"
                                                className="timlands-inputs code"
                                                autoComplete="off"
                                                disabled={isSubmitting}
                                            />
                                            {errors.code && touched.code ?
                                                <div style={{ overflow: 'hidden' }}>
                                                    <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                                        <p className="text">{errors.code}</p>
                                                    </motion.div>
                                                </div>
                                                :
                                                null}
                                        </div>
                                        <div className="timlands-form">
                                            <button type="button" className="btn butt-md butt-black">إعادة إرسال كود التفعيل</button>
                                            <button type="submit" disabled={isSubmitting} className="btn butt-md butt-primary">إكمال عملية التسجيل</button>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                }
            </div>
        </div>
    )
}
// Map redux states to local component props.
const mapStateToProps = (state: any) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

// Define PropTypes.
EmailConfig.propTypes = {   
    verifyCode: PropTypes.func,
};

export default connect(mapStateToProps)(withAuth(EmailConfig));
