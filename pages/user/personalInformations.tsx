import React, { ReactElement, useEffect, useState } from "react";
import Cookies from 'js-cookie'
import Layout from '@/components/Layout/HomeLayout'
import { Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import API from "../../config";
import { motion } from "framer-motion";
import { message } from "antd";
import "antd/dist/antd.min.css";
import useSWR from 'swr'
import Loading from "@/components/Loading";
import ImageLogo from "next/image";
import router from "next/router";
import NumberPhone from "./numberPhone";

const personalInformations = () => {
    const token = Cookies.get('token')

    const { data: userInfo }: any = useSWR('api/me')
    const { data: Countries }: any = useSWR('dashboard/countries')

    const APIURL = 'https://www.api.timwoork.com/avatars/'
    const myLoader = () => {
        return `${APIURL}${userInfo.user_details.profile.avatar}`;
    }
    const [avatarState, setavatarState] = useState(null)
    // Redirect to user home route if user is authenticated.
    const SignupSchema = Yup.object().shape({
        first_name: Yup.string().required('هذا الحقل إجباري'),
        last_name: Yup.string().required('هذا الحقل إجباري'),
        date_of_birth: Yup.string().required('هذا الحقل إجباري'),
        gender: Yup.number().required('هذا الحقل إجباري'),
        username: Yup.string().required('هذا الحقل إجباري'),
        country_id: Yup.number().required('هذا الحقل إجباري'),
    });
    useEffect(() => {
        if (!token) {
            router.push('/login')
        }
    }, [token])
    // Return statement.
    return (
        <>
            {!userInfo && <Loading />}
            <div className="container py-4">
                {userInfo && userInfo.user_details.profile && <>
                    <div className="row">
                        <div className="col-lg-7">
                            <Formik
                                isInitialValid={true}
                                initialValues={{
                                    first_name: userInfo.user_details.profile.first_name || '',
                                    last_name: userInfo.user_details.profile.last_name || '',
                                    username: userInfo.user_details.username || '',
                                    date_of_birth: userInfo.user_details.profile.date_of_birth || '',
                                    gender: parseInt(userInfo.user_details.profile.gender) || 1,
                                    country_id: parseInt(userInfo.user_details.profile.country_id) || 1,
                                }}
                                validationSchema={SignupSchema}
                                onSubmit={async values => {
                                    try {
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
                                                        تعديل المعلومات الشخصية
                                                    </h1>
                                                </div>
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
                                                    <div className="col-md-12">
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
                                                    <div className="col-md-12">
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
                                                    <div className="col-md-5">
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
                                                    <div className="col-md-7">
                                                        <div className="timlands-form">
                                                            <label className="label-block" htmlFor="country_id">اختر البلد</label>
                                                            <Field
                                                                as="select"
                                                                id="country_id"
                                                                name="country_id"
                                                                className="timlands-inputs"
                                                            >
                                                                {Countries && Countries.data.map((e: any) => (
                                                                    <option key={e.id} value={e.id}>{e.name_ar}</option>
                                                                ))}
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
                        <div className="col-lg-5">
                            <Formik
                                isInitialValid={true}
                                initialValues={{ avatar: ('https://api.timwoork.com/avatars/' + userInfo.user_details.profile.avatar) || null }}
                                onSubmit={async values => {
                                    try {
                                        const dataform = new FormData()
                                        dataform.append('avatar', values.avatar)
                                        const res = await API.post("api/profiles/step_two", dataform, {
                                            headers: {
                                                'Authorization': `Bearer ${token}`
                                            }
                                        })
                                        // Authentication was successful.
                                        if (res.status === 200) {
                                            message.success('لقد تم التحديث بنجاح')
                                            router.reload()
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
                                {({ errors, touched, isSubmitting, handleSubmit, setFieldValue }) => (
                                    <form onSubmit={handleSubmit}>
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
                                                        تعديل الصورة الشخصية
                                                    </h1>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12 align-center">
                                                        {userInfo.user_details.profile.avatar == 'avatar.png' ?
                                                            <img src={avatarState} width={100} height={100} /> :
                                                            <ImageLogo
                                                                loader={myLoader}
                                                                src={APIURL + userInfo.user_details.profile.avatar}
                                                                quality={60}
                                                                width={100}
                                                                height={100}
                                                                placeholder='blur'
                                                                blurDataURL='/avatar2.jpg'
                                                            />
                                                        }
                                                        <div className="timlands-form">
                                                            <label className="label-block" htmlFor="avatar">اختر الصورة الشخصية</label>
                                                            <input id="avatar" name="avatar" type="file" onChange={(event) => {
                                                                setFieldValue("avatar", event.currentTarget.files[0]);
                                                                setavatarState(URL.createObjectURL(event.target.files[0]))
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
                                    </form>
                                )}
                            </Formik>
                            <NumberPhone />
                        </div>
                    </div>
                </>

                }
            </div>
        </>
    );
}
export default personalInformations
personalInformations.getLayout = function getLayout(page: any): ReactElement {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
