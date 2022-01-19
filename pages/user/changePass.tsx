import Layout from '@/components/Layout/HomeLayout'
import { Result, message } from 'antd'
import React, { ReactElement } from 'react'
import Link from 'next/link'
import API from '../../config'
import * as Yup from 'yup';
import useSWR from 'swr'
import { MetaTags } from '@/components/SEO/MetaTags'
import Loading from '@/components/Loading'
import Cookies from 'js-cookie'
import Unauthorized from '@/components/Unauthorized';
import { Field, Form, Formik } from 'formik'
import { motion } from 'framer-motion'

function ChangePass() {
    const token = Cookies.get('token')
    const { data: userInfo }: any = useSWR('api/me')
    if (userInfo && userInfo.user_details.profile.steps < 1)
        return (<div className="row justify-content-md-center">
            <div className="col-md-5">
                <Result
                    status="warning"
                    title="حسابك غير كامل يرجى إكمال الصفحة الشخصية الخاصة بك"
                    subTitle="حسابك غير كامل يرجى إكمال الصفحة الشخصية الخاصة بك"
                    extra={
                        <Link href="/user/personalInformations">
                            <a className="btn butt-primary butt-md">
                                الذهاب إلى التعديل
                            </a>
                        </Link>
                    }
                />
            </div>
        </div>)
    
    const SignupSchema = Yup.object().shape({
        old_password: Yup.string().required('هذا الحقل إجباري'),
        password: Yup.string().required('هذا الحقل إجباري'),
        password_confirmation: Yup.string()
            .oneOf([Yup.ref('password'), null], 'كلمتا المرور غير متطابقتين')
    });
    return (
        <div className="py-3">
            {!userInfo && <Loading />}
            {!token && <Unauthorized />}
            {userInfo && userInfo.user_details.profile &&
                <>
                    <MetaTags
                        title={'تغيير كلمة المرور'}
                        metaDescription={"تغيير كلمة المرور'"}
                        ogDescription={"تغيير كلمة المرور'"}
                    />
                    <div className="container">
                        <div className="row justify-content-md-center">
                            <div className="col-lg-8">
                                <div className="timlands-profile-content">
                                    <Formik
                                        initialValues={{
                                            old_password: '',
                                            password: '',
                                            password_confirmation: '',
                                        }}
                                        validationSchema={SignupSchema}
                                        onSubmit={async values => {
                                            try {
                                                const res = await API.post("api/password/change", values, {
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
                                        }}>
                                        {({ errors, touched, isSubmitting }) => (
                                            <Form>
                                                <div className="profile-content-body">
                                                    <div className="content-title">
                                                        <div className="d-flex">
                                                            <h3 className="title flex-center">
                                                                <span className="material-icons material-icons-outlined">account_circle</span>
                                                                تغيير كلمة المرور
                                                            </h3>
                                                        </div>
                                                    </div>
                                                    <div className="timlands-form">
                                                        <label className="label-block" htmlFor="old_password">كلمة المرور القديمة</label>
                                                        <Field
                                                            type="password"
                                                            id="old_password"
                                                            name="old_password"
                                                            disabled={isSubmitting}
                                                            placeholder="كلمة المرور القديمة"
                                                            className="timlands-inputs"
                                                            autoComplete="off"
                                                        />
                                                        {errors.old_password && touched.old_password ?
                                                            <div style={{ overflow: 'hidden' }}>
                                                                <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                                                    <p className="text">{errors.old_password}</p>
                                                                </motion.div>
                                                            </div>
                                                            :
                                                            null}
                                                    </div>
                                                    <div className="timlands-form">
                                                        <label className="label-block" htmlFor="password">كلمة المرور الجديدة</label>
                                                        <Field
                                                            type="password"
                                                            id="password"
                                                            name="password"
                                                            disabled={isSubmitting}
                                                            placeholder="كلمة المرور الجديدة"
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
                                                        <label className="label-block" htmlFor="password_confirmation">إعادة كلمة المرور الجديدة</label>
                                                        <Field
                                                            type="password"
                                                            disabled={isSubmitting}
                                                            id="password_confirmation"
                                                            name="password_confirmation"
                                                            placeholder="إعادة كلمة المرور الجديدة"
                                                            className="timlands-inputs"
                                                            autoComplete="off"
                                                        />
                                                        {errors.password_confirmation && touched.password_confirmation ?
                                                            <div style={{ overflow: 'hidden' }}>
                                                                <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                                                    <p className="text">{errors.password_confirmation}</p>
                                                                </motion.div>
                                                            </div>
                                                            :
                                                            null}
                                                    </div>

                                                    <div className="panel-modal-footer">
                                                        <div className="d-flex">
                                                            <button type="submit" disabled={isSubmitting} className="btn me-auto butt-primary butt-md">تحديث المعلومات</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Form>
                                        )}
                                    </Formik>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

ChangePass.getLayout = function getLayout(page: any): ReactElement {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
export default ChangePass