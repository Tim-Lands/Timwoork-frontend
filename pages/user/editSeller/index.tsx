import React, { ReactElement, useEffect } from "react";
import Cookies from 'js-cookie'
import Layout from '@/components/Layout/HomeLayout'
import { Field, Form, Formik } from "formik";
import API from "../../../config";
import { motion } from "framer-motion";
import { message } from "antd";
import "antd/dist/antd.min.css";
import useSWR from 'swr'
import Loading from "@/components/Loading";
import router from "next/router";
import { MetaTags } from "@/components/SEO/MetaTags";

const EditSeller = () => {
    const token = Cookies.get('token')

    const { data: userInfo }: any = useSWR('api/me')
    useEffect(() => {
        if (!token) {
            router.push('/login')
        }
    }, [token])
    // Return statement.
    return (
        <>
            <MetaTags
                title="تعديل الملف الشخصي للبائع"
                metaDescription="تعديل الملف الشخصي للبائع"
                ogDescription="تعديل الملف الشخصي للبائع"
            />
            {!userInfo && <Loading />}
            {userInfo && userInfo.user_details.profile && userInfo.user_details.profile.profile_seller !== null && <>
                <div className="row justify-content-md-center">
                    <div className="col-lg-7">
                        <Formik
                            isInitialValid={true}
                            initialValues={{
                                bio: userInfo && userInfo.user_details.profile.profile_seller.bio,
                                portfolio: userInfo && userInfo.user_details.profile.profile_seller.portfolio,
                                skills: (userInfo && userInfo.user_details.profile.profile_seller.skills) || [],
                            }}
                            onSubmit={async values => {
                                try {
                                    const res = await API.post("api/sellers/detailsStore", values, {
                                        headers: {
                                            'Authorization': `Bearer ${token}`
                                        }
                                    })
                                    // Authentication was successful.
                                    if (res.status === 200) {
                                        message.success('لقد تم التحديث بنجاح')
                                        router.push('/user/profile')
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

                                    <div className="login-panel update-form">
                                        <div className={"panel-modal-body login-panel-body auto-height" + (isSubmitting ? ' is-loading' : '')}>
                                            {!isSubmitting ? '' :
                                                <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="is-loading">
                                                    <div className="spinner-border" role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </div>
                                                </motion.div>
                                            }
                                            <div className="update-form-header">
                                                <h1 className="title">
                                                    تعديل المعلومات البائع
                                                </h1>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="timlands-form">
                                                        <label className="label-block" htmlFor="portfolio">رابط أعمالك</label>
                                                        <Field
                                                            id="portfolio"
                                                            name="portfolio"
                                                            placeholder="رابط أعمالك..."
                                                            className="timlands-inputs"
                                                            autoComplete="off"
                                                        />
                                                        {errors.portfolio && touched.portfolio ?
                                                            <div style={{ overflow: 'hidden' }}>
                                                                <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                                                    <p className="text">{errors.portfolio}</p>
                                                                </motion.div>
                                                            </div>
                                                            :
                                                            null}
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="timlands-form">
                                                        <label className="label-block" htmlFor="bio">نبذة عنك</label>
                                                        <Field
                                                            as="textarea"
                                                            id="bio"
                                                            name="bio"
                                                            placeholder="نبذة عنك..."
                                                            className="timlands-inputs"
                                                            autoComplete="off"
                                                            style={{ height: 200 }}
                                                        >
                                                        </Field>
                                                        {errors.bio && touched.bio ?
                                                            <div style={{ overflow: 'hidden' }}>
                                                                <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                                                    <p className="text">{errors.bio}</p>
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

                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </>
            }
        </>
    );
}
export default EditSeller
EditSeller.getLayout = function getLayout(page: any): ReactElement {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
