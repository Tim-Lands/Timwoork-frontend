import React, { useEffect } from 'react'
import Link from 'next/link'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loadUser, verifyCode } from "./../store/auth/authActions";
import router from 'next/router';
import withAuth from './../services/withAuth'
import { Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import { motion } from "framer-motion";
import { Alert } from '@/components/Alert/Alert';

function EmailConfig(props: any) {
    useEffect(() => {
        props.loadUser()
        if (props.userInfo.email_verified_at) {
            router.push('/dashboard')
        }
        console.log(props.userInfo.email_verified_at);
        

    }, [props.userInfo.email_verified_at])
    const SignupSchema = Yup.object().shape({
        code: Yup.number().required('هذا الحقل إجباري'),
    });
    return (
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
                </div>
            </div>
            <div className="col-lg-6 p-0">
                {props.userInfo &&
                    <Formik
                        isInitialValid={true}
                        initialValues={{
                            email: props.userInfo.email,
                            code: '',
                        }}
                        validationSchema={SignupSchema}
                        onSubmit={async values => {
                            props.verifyCode(values.email, values.code);
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                {props.verifyError && (
                                    <Alert type="danger">{props.verifyError}</Alert>
                                )}
                                <div className="login-panel align-center">
                                    <div className={"panel-modal-body login-panel-body auto-height" + (props.verifyLoading ? ' is-loading' : '')}>
                                        {!props.verifyLoading ? '' :
                                            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="is-loading">
                                                <div className="spinner-border" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>
                                            </motion.div>
                                        }
                                        <h1 className="login-title-form">
                                            التأكد من البريد الإلكتروني
                                        </h1>
                                        <p className="login-text-form">
                                            هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة
                                        </p>
                                        <div className="timlands-form">
                                            <label className="label-block" htmlFor="code">كود التفعيل</label>
                                            <Field
                                                id="code"
                                                name="code"
                                                placeholder="######"
                                                className="timlands-inputs code"
                                                autoComplete="off"
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
                                            <button type="submit" className="btn butt-md butt-primary">إكمال عملية التسجيل</button>
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
    verifyError: state.auth.verifyError,
    verifyLoading: state.auth.verifyLoading,
    userInfo: state.auth.user
});

// Define PropTypes.
EmailConfig.propTypes = {
    verifyCode: PropTypes.func,
};

export default connect(mapStateToProps, { verifyCode, loadUser })(withAuth(EmailConfig));
