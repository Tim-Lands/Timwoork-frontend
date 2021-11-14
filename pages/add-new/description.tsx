import Layout from '../../components/Layout/HomeLayout'
import { ReactElement } from "react";
import { Field, Form, Formik } from 'formik';
//import 'rsuite/dist/rsuite.min.css';
import { motion } from 'framer-motion';
import router from 'next/router';
import SidebarAdvices from './SidebarAdvices';
//import { useEditor, EditorContent } from '@tiptap/react'
//import StarterKit from '@tiptap/starter-kit'

function Description() {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-4">
                    <SidebarAdvices />
                </div>
                <div className="col-md-8 pt-3">
                    <Formik
                        initialValues={{
                            title: '',
                            content: '',
                            subcategories: '',
                            category: '',
                            tags: [],
                        }}
                        enableReinitialize={true}

                        //validationSchema={SignupSchema}
                        onSubmit={async () => {
                            await new Promise((r) => setTimeout(r, 500));
                            router.push('/add-new/medias')
                            //alert(JSON.stringify(values, null, 2));
                        }}
                    >
                        {({ errors, touched, isSubmitting }) => (
                            <Form>
                                <div className={"timlands-panel" + (isSubmitting ? ' is-loader' : '')}>
                                    <div className="timlands-steps">
                                        <div className="timlands-step-item">
                                            <h3 className="text">
                                                <span className="icon-circular">
                                                    <span className="material-icons material-icons-outlined">collections_bookmark</span>
                                                </span>
                                                معلومات عامة
                                            </h3>
                                        </div>
                                        <div className="timlands-step-item">
                                            <h3 className="text">

                                                <span className="icon-circular">
                                                    <span className="material-icons material-icons-outlined">payments</span>
                                                </span>
                                                السعر والتطويرات
                                            </h3>
                                        </div>
                                        <div className="timlands-step-item active">
                                            <h3 className="text">

                                                <span className="icon-circular">
                                                    <span className="material-icons material-icons-outlined">description</span>
                                                </span>
                                                الوصف وتعليمات المشتري
                                            </h3>
                                        </div>
                                        <div className="timlands-step-item">
                                            <h3 className="text">
                                                <span className="icon-circular">
                                                    <span className="material-icons material-icons-outlined">mms</span>
                                                </span>
                                                مكتبة الصور والملفات
                                            </h3>
                                        </div>
                                        <div className="timlands-step-item">
                                            <h3 className="text">
                                                <span className="icon-circular">
                                                    <span className="material-icons material-icons-outlined">publish</span>
                                                </span>
                                                نشر الخدمة
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="timlands-panel-header mt-3">
                                        <div className="flex-center">
                                            <h2 className="title"><span className="material-icons material-icons-outlined">description</span>الوصف وتعليمات المشتري</h2>
                                            <div className={"header-butt" + (isSubmitting ? ' is-loader' : '')}>
                                                <button onClick={() => router.push('/add-new/prices')} type="button" className="btn flex-center butt-green-out mr-auto butt-xs">
                                                    <span className="material-icons-outlined">chevron_right</span><span className="text">المرحلة السابقة</span>
                                                    <div className="spinner-border spinner-border-sm text-white" role="status"></div>
                                                </button>
                                                <button type="submit" disabled={isSubmitting} className="btn flex-center butt-green mr-auto butt-xs">
                                                    <span className="text">المرحلة التالية</span><span className="material-icons-outlined">chevron_left</span>
                                                    <div className="spinner-border spinner-border-sm text-white" role="status"></div>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="timlands-content-form">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="timlands-form">
                                                    <label className="label-block" htmlFor="input-description">وصف الخدمة</label>
                                                    <Field
                                                        as="textarea"
                                                        id="input-description"
                                                        name="description"
                                                        placeholder="وصف الخدمة..."
                                                        className="timlands-inputs"
                                                        autoComplete="off"
                                                        style={{ minHeight: 170 }}
                                                    ></Field>
                                                    <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note">
                                                        <p className="text">أدخل وصف الخدمة بدقة يتضمن جميع المعلومات والشروط . يمنع وضع البريد الالكتروني، رقم الهاتف أو أي معلومات اتصال أخرى.</p>
                                                    </motion.div>
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
                                                    <label className="label-block" htmlFor="input-description">تعليمات المشتري</label>
                                                    <Field
                                                        as="textarea"
                                                        id="input-description"
                                                        name="description"
                                                        placeholder="تعليمات المشتري..."
                                                        className="timlands-inputs"
                                                        autoComplete="off"
                                                        style={{ minHeight: 170 }}
                                                    ></Field>
                                                    <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note">
                                                        <p className="text">المعلومات التي تحتاجها من المشتري لتنفيذ الخدمة. تظهر هذه المعلومات بعد شراء الخدمة فقط</p>
                                                    </motion.div>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="py-4 d-flex">
                                                    <button type="button" className="btn butt-red me-auto butt-sm">
                                                        إلغاء الأمر
                                                    </button>
                                                    <button type="submit" disabled={isSubmitting} className="btn flex-center butt-green mr-auto butt-sm">
                                                        <span className="text">المرحلة التالية</span><span className="material-icons-outlined">chevron_left</span>
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
        </div>
    )
}
Description.getLayout = function getLayout(page): ReactElement {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
export default Description
