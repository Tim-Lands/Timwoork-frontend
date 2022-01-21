import { ReactElement, useState } from "react";
import { Field, Form, Formik } from 'formik';
import { message } from 'antd';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout/HomeLayout'
import API from "../config";
import { MetaTags } from '@/components/SEO/MetaTags'
import { Image } from 'antd';

function Overview() {

    const [attachState, setAttachState] = useState(null)

    return (
        <>
            <MetaTags
                title="اتصل بنا - تيموورك"
                metaDescription="اتصل بنا - تيموورك"
                ogDescription="اتصل بنا - تيموورك"
            />
            <div className="row justify-content-md-center">
                <div className="col-md-7 pt-3 mb-3">
                    <Formik
                        isInitialValid={true}
                        initialValues={{
                            title: '',
                            full_name: '',
                            msg_type: 0,
                            email: '',
                            message: '',
                            attach: null,
                        }}
                        enableReinitialize={true}
                        onSubmit={async values => {
                            try {
                                const res = await API.post(`api/product/product-step-one`, values)
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
                                if (error.response && error.response.status === 403) {
                                    message.error("هناك خطأ ما حدث في قاعدة بيانات , يرجى التأكد من ذلك")
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
                        {({ errors, touched, isSubmitting, setFieldValue }) => (
                            <Form>
                                <div className={"timlands-panel" + (isSubmitting ? ' is-loader' : '')}>
                                    <div className="timlands-content-form">
                                        <div className="page-header">
                                            <h2 className="title">اتصل بنا</h2>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="timlands-form">
                                                    <label className="label-block" htmlFor="input-title">عنوان الرسالة</label>
                                                    <Field
                                                        id="input-title"
                                                        name="title"
                                                        placeholder="عنوان الرسالة..."
                                                        className="timlands-inputs"
                                                        autoComplete="off"
                                                    />
                                                    {errors.title && touched.title ?
                                                        <div style={{ overflow: 'hidden' }}>
                                                            <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                                                <p className="text">{errors.title}</p>
                                                            </motion.div>
                                                        </div>
                                                        :
                                                        null}
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="timlands-form">
                                                    <label className="label-block" htmlFor="input-email">البريد الإلكتروني</label>
                                                    <Field
                                                        id="input-email"
                                                        name="email"
                                                        placeholder="البريد الإلكتروني..."
                                                        className="timlands-inputs"
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
                                            <div className="col-md-7">
                                                <div className="timlands-form">
                                                    <label className="label-block" htmlFor="input-full_name">الاسم الكامل</label>
                                                    <Field
                                                        id="input-full_name"
                                                        name="full_name"
                                                        placeholder="الاسم الكامل..."
                                                        className="timlands-inputs"
                                                        autoComplete="off"
                                                    />
                                                    {errors.full_name && touched.full_name ?
                                                        <div style={{ overflow: 'hidden' }}>
                                                            <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                                                <p className="text">{errors.full_name}</p>
                                                            </motion.div>
                                                        </div>
                                                        :
                                                        null}
                                                </div>
                                            </div>
                                            <div className="col-md-5">
                                                <div className="timlands-form">
                                                    <label className="label-block" htmlFor="input-msg_type">اختر نوع الرسالة</label>
                                                    <Field
                                                        as="select"
                                                        id="input-msg_type"
                                                        name="msg_type"
                                                        className="timlands-inputs select"
                                                        autoComplete="off"
                                                    >
                                                        <option value="">اختر نوع الرسالة</option>
                                                        <option value="0">شكوى</option>
                                                        <option value="1">استفسار</option>
                                                    </Field>
                                                    {errors.msg_type && touched.msg_type ?
                                                        <div style={{ overflow: 'hidden' }}>
                                                            <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                                                <p className="text">{errors.msg_type}</p>
                                                            </motion.div>
                                                        </div>
                                                        :
                                                        null}
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="timlands-form">
                                                    <label className="label-block" htmlFor="input-message">نص الرسالة</label>
                                                    <Field
                                                        as="textarea"
                                                        id="input-message"
                                                        name="message"
                                                        placeholder="نص الرسالة..."
                                                        className="timlands-inputs"
                                                        autoComplete="off"
                                                        style={{ height: 200 }}
                                                    ></Field>
                                                    {errors.message && touched.message ?
                                                        <div style={{ overflow: 'hidden' }}>
                                                            <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                                                <p className="text">{errors.message}</p>
                                                            </motion.div>
                                                        </div>
                                                        :
                                                        null}
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="timlands-form">
                                                    <label className="label-block" htmlFor="attachment">يمكنك إضافة مرفق من هنا</label>
                                                    <input id="attachment" name="attach" type="file" onChange={(event) => {
                                                        if (event.currentTarget.files[0].size / 1024 / 1024 > 10) {
                                                            message.error("حجم الملف يجب أن لا يتجاوز 10 MB")
                                                            event.currentTarget.value = null
                                                        } else {
                                                            setFieldValue("attach", event.currentTarget.files[0]);
                                                            setAttachState(URL.createObjectURL(event.target.files[0]))
                                                        }
                                                    }} className="form-control" />
                                                    
                                                    {attachState && 
                                                        <div style={{width: '150px', maxHeight: '150px', border: '1px solid #ccc', borderRadius: '.4rem', marginTop: '1rem', overflow: 'hidden'}}>
                                                            <Image src={attachState} />
                                                        </div>
                                                    }

                                                    {errors.attach && touched.attach ?
                                                        <div style={{ overflow: 'hidden' }}>
                                                            <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                                                <p className="text">{errors.attach}</p>
                                                            </motion.div>
                                                        </div>
                                                        :
                                                        null}
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="py-4 d-flex">
                                                    <button type="submit" disabled={isSubmitting} className="btn flex-center butt-green mr-auto butt-sm">
                                                        <span className="text">إرسال المعلومات</span><span className="material-icons-outlined">chevron_left</span>
                                                    </button>
                                                </div>
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
    )
}
Overview.getLayout = function getLayout(page: any): ReactElement {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
export default Overview