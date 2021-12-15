import React, { ReactElement, useEffect } from "react";
import Cookies from 'js-cookie'
import Layout from '@/components/Layout/HomeLayout'
import { Field, FieldArray, Form, Formik } from "formik";
import * as Yup from 'yup';
import API from "../../../config";
import { motion } from "framer-motion";
import { message } from "antd";
import "antd/dist/antd.min.css";
import useSWR from 'swr'
import Loading from "@/components/Loading";
import router from "next/router";

const EditSeller = () => {
    const token = Cookies.get('token')

    const { data: userInfo }: any = useSWR('api/me')
    const { data: Skills }: any = useSWR('dashboard/skills')

    // Redirect to user home route if user is authenticated.
    const SignupSchema = Yup.object().shape({
        bio: Yup.string().required('هذا الحقل إجباري'),
        portfolio: Yup.string().required('هذا الحقل إجباري'),
        //skills: Yup.string().required('هذا الحقل إجباري'),
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
                                    bio: '',
                                    portfolio: '',
                                    skills: [],
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
                                {({ errors, touched, isSubmitting, values }) => (
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
                                                    <div className="col-md-12">
                                                        <FieldArray
                                                            name="skills"
                                                            render={arrayHelpers => (
                                                                <div>
                                                                    {values.skills.map((development, index) => (
                                                                        <motion.div initial={{ y: -7, opacity: 0 }} exit={{ y: -7, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="develop-price" key={index}>
                                                                            <div className="row">
                                                                                <div className="col-sm-12">
                                                                                    <div className="timlands-form">
                                                                                        <label className="label-block" htmlFor={"input-name-" + index}>عنوان التطوير</label>
                                                                                        <Field
                                                                                            as="select"
                                                                                            id="input-duration"
                                                                                            name={`skills[${index}].id`}
                                                                                            className="timlands-inputs select"
                                                                                            autoComplete="off"
                                                                                        >
                                                                                            <option>اختر مستوى المهارة</option>
                                                                                            {!Skills && <option>يرجى الانتظار...</option>}
                                                                                            {Skills && Skills.data.map((e: any) => (
                                                                                               <option key={e.id} value={e.id}>{e.name_ar}</option>
                                                                                            ))}
                                                                                        </Field>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-sm-5">
                                                                                    <div className="timlands-form">
                                                                                        <label className="label-block" htmlFor={"input-duration-" + index}>مدة التطوير</label>
                                                                                        <Field
                                                                                            as="select"
                                                                                            id="input-duration"
                                                                                            name={`skills[${index}].level`}
                                                                                            className="timlands-inputs select"
                                                                                            autoComplete="off"
                                                                                        >
                                                                                            <option>اختر مستوى المهارة</option>
                                                                                            <option value="1">1/10</option>
                                                                                            <option value="2">2/10</option>
                                                                                            <option value="3">3/10</option>
                                                                                            <option value="4">4/10</option>
                                                                                            <option value="5">5/10</option>
                                                                                            <option value="6">6/10</option>
                                                                                            <option value="7">7/10</option>
                                                                                            <option value="8">8/10</option>
                                                                                            <option value="9">9/10</option>
                                                                                            <option value="10">10/10</option>
                                                                                        </Field>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="buttons-tools">
                                                                                <button
                                                                                    type="button"
                                                                                    className="formarray-butt del"
                                                                                    onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                                                                >
                                                                                    -
                                                                                </button>
                                                                            </div>
                                                                        </motion.div>
                                                                    ))}

                                                                    <div className="product-devlopes-butt">
                                                                        <button type="button" className="btn add-devs-btn flex-center butt-primary butt-lg" onClick={() => arrayHelpers.push('')}>
                                                                            <span className="material-icons-outlined">post_add</span>  أضف مهارة
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        />
                                                        {errors.skills && touched.skills ?
                                                            <div style={{ overflow: 'hidden' }}>
                                                                <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                                                    <p className="text">{errors.skills}</p>
                                                                </motion.div>
                                                            </div>
                                                            :
                                                            null}
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
            </div>
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
