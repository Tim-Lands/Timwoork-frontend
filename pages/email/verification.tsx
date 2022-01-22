import React, { ReactElement, useEffect, useState } from 'react'
import Link from 'next/link'
import router from 'next/router';
import API from '../../config'
import { Field, Form, Formik } from "formik";
import { motion } from "framer-motion";
import useSWR from 'swr'
import { message } from 'antd';
import Cookies from 'js-cookie'
import Layout from '@/components/Layout/HomeLayout'

function EmailConfig() {
    const token = Cookies.get('token')
    const { data: userInfo } = useSWR('api/me')
    const [validationsErrors, setValidationsErrors]: any = useState({})

    useEffect(() => {
        if (!token) {
            router.push('/login')
        }
        if (userInfo && userInfo.user_details.email_verified_at !== null) {
            router.push('/')
        }
    }, [])
    return (
        <div className="row justify-content-md-center">
            <div className="col-lg-6 p-0">
                <Formik
                    isInitialValid={true}
                    initialValues={{
                        email: userInfo && userInfo.user_details.email,
                        code: '',
                    }}
                    enableReinitialize={true}

                    onSubmit={async values => {
                        setValidationsErrors({})
                        try {
                            const res = await API.post("api/email/verify", values)
                            // Authentication was successful.
                            if (res.status === 200) {
                                message.success("تم التحقق بنجاح");
                                router.push('/user/personalInformations')
                            }
                        } catch (error: any) {
                            if (error.response && error.response.data) {
                                setValidationsErrors(error.response.data);
                            }
                        }
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className="login-panel email-config mb-3">
                                <div className={"panel-modal-body login-panel-body auto-height" + (isSubmitting ? ' is-loading' : '')}>
                                    {!isSubmitting ? '' :
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
                                        تحقق من بريدك الإلكتروني هل وصلك كود تفعيل يتكون من 6 أرقام
                                    </p>
                                    <div className="timlands-form">
                                        <label className="label-block" htmlFor="code">كود التفعيل</label>
                                        <Field
                                            id="code"
                                            name="code"
                                            placeholder="######"
                                            className={"timlands-inputs code " + (validationsErrors && validationsErrors.msg && validationsErrors.errors && validationsErrors.errors.email && validationsErrors.errors.code && ' has-error')}
                                            autoComplete="off"
                                            disabled={isSubmitting}
                                        />
                                        {validationsErrors && validationsErrors.errors && validationsErrors.errors.code &&
                                            <div style={{ overflow: 'hidden' }}>
                                                <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                                    <p className="text">{validationsErrors.errors.code[0]}</p>
                                                </motion.div>
                                            </div>}
                                        {validationsErrors && validationsErrors.errors && validationsErrors.errors.email && !validationsErrors.errors.code &&
                                            <div style={{ overflow: 'hidden' }}>
                                                <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                                    <p className="text">{validationsErrors.errors.email[0]}</p>
                                                </motion.div>
                                            </div>}
                                        {validationsErrors && validationsErrors.msg &&
                                            <div style={{ overflow: 'hidden' }}>
                                                <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                                    <p className="text">{validationsErrors.msg}</p>
                                                </motion.div>
                                            </div>}
                                            
                                    </div>
                                    <div className="timlands-form d-flex">
                                        <button
                                            type="button"
                                            className="btn butt-md butt-black me-auto"
                                        >إعادة إرسال كود التفعيل
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="btn butt-md butt-primary me-auto"
                                        >إكمال عملية التسجيل
                                        </button>
                                        <Link href="/">
                                            <a
                                                className="btn butt-md ml-auto"
                                            >الرجوع للرئيسية
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>

            </div>
        </div>
    )
}
export default EmailConfig

EmailConfig.getLayout = function getLayout(page: any): ReactElement {
    return (
      <Layout>
        {page}
      </Layout>
    )
  }