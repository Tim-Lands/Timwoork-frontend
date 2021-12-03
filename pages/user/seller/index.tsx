import React, { ReactElement } from "react";
import Layout from '@/components/Layout/HomeLayout'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loadUser } from "@/store/auth/authActions";
import Link from 'next/link'
import Cookies from 'js-cookie'
import { Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import API from "../../../config";
import { motion } from "framer-motion";
import withAuth from '../../../services/withAuth'
import { message } from "antd";
import "antd/dist/antd.min.css";
import useSWR from 'swr'


const personalInformations = (): ReactElement => {
    const { data: userInfo, error }: any = useSWR('api/me')
    // Redirect to user home route if user is authenticated.
    const SignupSchema = Yup.object().shape({
        first_name: Yup.string().required('هذا الحقل إجباري'),
        last_name: Yup.string().required('هذا الحقل إجباري'),
        date_of_birth: Yup.string().required('هذا الحقل إجباري'),
        gender: Yup.number().required('هذا الحقل إجباري'),
        username: Yup.string().required('هذا الحقل إجباري'),
        country_id: Yup.number().required('هذا الحقل إجباري'),
    });
    // Return statement.
    return (
        <>
            {userInfo && userInfo.profile && 
                <Formik
                    isInitialValid={true}
                    initialValues={{
                        first_name: userInfo.profile.first_name || '',
                        last_name: userInfo.profile.last_name || '',
                        username: userInfo.username || '',
                        date_of_birth: userInfo.profile.date_of_birth || '',
                        gender: parseInt(userInfo.profile.gender) || 1,
                        country_id: parseInt(userInfo.profile.country_id) || 1,
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={async values => {
                        try {
                            const token = Cookies.get('token')
                            const res = await API.post("api/profiles/step_one", values, {
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
                                                <div className="col-md-6">
                                                    <div className="timlands-form">
                                                        <label className="label-block" htmlFor="first_name">الاسم الأول</label>
                                                        <Field
                                                            id="first_name"
                                                            name="first_name"
                                                            placeholder="الاسم الأول..."
                                                            className="timlands-inputs"
                                                            autoComplete="off"
                                                        />
                                                        {errors.first_name && touched.first_name ?
                                                            <div style={{ overflow: 'hidden' }}>
                                                                <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                                                    <p className="text">{errors.first_name}</p>
                                                                </motion.div>
                                                            </div>
                                                            :
                                                            null}
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="timlands-form">
                                                        <label className="label-block" htmlFor="last_name">الاسم الأخير</label>
                                                        <Field
                                                            id="last_name"
                                                            name="last_name"
                                                            placeholder="الاسم الأخير..."
                                                            className="timlands-inputs"
                                                            autoComplete="off"
                                                        />
                                                        {errors.last_name && touched.last_name ?
                                                            <div style={{ overflow: 'hidden' }}>
                                                                <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                                                    <p className="text">{errors.last_name}</p>
                                                                </motion.div>
                                                            </div>
                                                            :
                                                            null}
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="timlands-form">
                                                        <label className="label-block" htmlFor="username">اسم المستخدم</label>
                                                        <Field
                                                            id="username"
                                                            name="username"
                                                            placeholder="اسم المستخدم..."
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
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="timlands-form">
                                                        <label className="label-block" htmlFor="date_of_birth">تاريخ الميلاد</label>
                                                        <Field
                                                            type="date"
                                                            id="date_of_birth"
                                                            name="date_of_birth"
                                                            placeholder="تاريخ الميلاد..."
                                                            className="timlands-inputs"
                                                            autoComplete="off"
                                                        />
                                                        {errors.date_of_birth && touched.date_of_birth ?
                                                            <div style={{ overflow: 'hidden' }}>
                                                                <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                                                    <p className="text">{errors.date_of_birth}</p>
                                                                </motion.div>
                                                            </div>
                                                            :
                                                            null}
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="timlands-form">
                                                        <label className="label-block" htmlFor="gender">اختر الجنس</label>
                                                        <Field
                                                            as="select"
                                                            id="gender"
                                                            name="gender"
                                                            className="timlands-inputs"
                                                        >
                                                            <option value={1}>ذكر</option>
                                                            <option value={0}>أنثى</option>
                                                        </Field>
                                                        {errors.gender && touched.gender ?
                                                            <div style={{ overflow: 'hidden' }}>
                                                                <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                                                    <p className="text">{errors.gender}</p>
                                                                </motion.div>
                                                            </div>
                                                            :
                                                            null}
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="timlands-form">
                                                        <label className="label-block" htmlFor="country_id">اختر البلد</label>
                                                        <Field
                                                            as="select"
                                                            id="country_id"
                                                            name="country_id"
                                                            className="timlands-inputs"
                                                        >
                                                            <option value={1}>الجزائر</option>
                                                            <option value={2}>فلسطين</option>
                                                            <option value={3}>الكويت</option>
                                                            <option value={4}>الأردن</option>
                                                            <option value={5}>تركيا</option>
                                                        </Field>
                                                        {errors.country_id && touched.country_id ?
                                                            <div style={{ overflow: 'hidden' }}>
                                                                <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                                                    <p className="text">{errors.country_id}</p>
                                                                </motion.div>
                                                            </div>
                                                            :
                                                            null}
                                                    </div>
                                                </div>
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
                                                    <button type="submit" disabled={isSubmitting} className="btn me-auto butt-primary butt-md">تحديث المعلومات</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </Form>
                    )}
                </Formik>
            }
        </>
    );
};

// Map redux states to local component props.
const mapStateToProps = (state: any) => ({
    isAuthenticated: state.auth.isAuthenticated,
    userInfo: state.auth.user,
});

// Define PropTypes.
personalInformations.propTypes = {
    props: PropTypes.object,
};

export default connect(mapStateToProps, { loadUser })(withAuth(personalInformations));
personalInformations.getLayout = function getLayout(page: any): ReactElement {
    return (
      <Layout>
        {page}
      </Layout>
    )
  }