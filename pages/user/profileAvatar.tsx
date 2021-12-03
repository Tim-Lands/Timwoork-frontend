import React, { ReactElement } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Link from 'next/link'
import Cookies from 'js-cookie'
import { Formik } from "formik";
import * as Yup from 'yup';
import API from "../../config";
import { motion } from "framer-motion";
import withAuth from '../../services/withAuth'
import { message } from "antd";
import "antd/dist/antd.min.css";
import useSWR from 'swr'

const profileAvatar = (): ReactElement => {
    const { data: userInfo }: any = useSWR('api/me')

    // Redirect to user home route if user is authenticated.
    const SignupSchema = Yup.object().shape({
        avatar: Yup.mixed().required(),
    })
    // Return statement.
    return (
        <>
            {userInfo && userInfo.profile &&
                <Formik
                    isInitialValid={true}
                    initialValues={{ avatar: ('https://api.timwoork.com/avatars/' + userInfo.profile.avatar) || null }}
                    validationSchema={SignupSchema}
                    onSubmit={async values => {

                        try {
                            const dataform = new FormData()
                            dataform.append('avatar', values.avatar)
                            console.log(dataform);
                            
                            const token = Cookies.get('token')
                            const res = await API.post("api/profiles/step_two", dataform, {
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
                    {({ errors, touched, isSubmitting, handleSubmit, setFieldValue, values }) => (
                        <form onSubmit={handleSubmit}>
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
                                            تحديث الصورة الشخصية
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
                                                <div className="col-md-12 align-center">
                                                    <img src={values.avatar} className="circular-img huge2-size" alt="" />
                                                    <div className="timlands-form">
                                                        <label className="label-block" htmlFor="avatar">اختر الصورة الشخصية</label>
                                                        <input id="avatar" name="avatar" type="file" onChange={(event) => {
                                                            setFieldValue("avatar", event.currentTarget.files[0]);
                                                        }} className="form-control" />
                                                        {errors.avatar && touched.avatar ?
                                                            <div style={{ overflow: 'hidden' }}>
                                                                <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                                                    <p className="text">{errors.avatar}</p>
                                                                </motion.div>
                                                            </div>
                                                            :
                                                            null}
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
                        </form>
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
profileAvatar.propTypes = {
    props: PropTypes.object,
};

export default connect(mapStateToProps, {})(withAuth(profileAvatar));
