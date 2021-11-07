import Layout from '../../components/Layout/HomeLayout'
import { ReactElement, useEffect, useState } from "react";
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import API from '../../config';
//import 'rsuite/dist/rsuite.min.css';
import { motion } from 'framer-motion';
import router from 'next/router';
import SidebarAdvices from './SidebarAdvices';
//import { useEditor, EditorContent } from '@tiptap/react'
//import StarterKit from '@tiptap/starter-kit'

const SignupSchema = Yup.object().shape({
    title: Yup.string().required('هذا الحقل إجباري'),
    content: Yup.string().required('هذا الحقل إجباري'),
    subcategories: Yup.string(),
    tags: Yup.array(),
});

function Overview() {
    const [GetMainCategories, setMainCategories] = useState([])
    const [isError, setIsError] = useState(false)
    const getCategories = async () => {
        try {
            const res: any = await API.get('dashboard/categories')
            if (res) {
                setMainCategories(res.data.data)
                setIsError(false)
                console.log(res.data.data);
            }
        } catch (error) {
            setIsError(true)
        }
    }
    useEffect(() => {
        getCategories()
    }, [])
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
                        onSubmit={async (values) => {
                            await new Promise((r) => setTimeout(r, 500));
                            router.push('/add-new/prices')
                            //alert(JSON.stringify(values, null, 2));
                        }}
                    >
                        {({ errors, touched, isSubmitting }) => (
                            <Form>
                                <div className={"timlands-panel" + (isSubmitting ? ' is-loader' : '')}>
                                    <div className="timlands-steps">
                                        <div className="timlands-step-item active">
                                            <h3 className="title">المرحلة الأولى</h3>
                                            <h3 className="text">معلومات عامة</h3>
                                        </div>
                                        <div className="timlands-step-item">
                                            <h3 className="title">المرحلة الثانية</h3>
                                            <h3 className="text">السعر والتطويرات</h3>
                                        </div>
                                        <div className="timlands-step-item">
                                            <h3 className="title">المرحلة الثالثة</h3>
                                            <h3 className="text">الوصف وتعليمات المشتري</h3>
                                        </div>
                                        <div className="timlands-step-item">
                                            <h3 className="title">المرحلة الرابعة</h3>
                                            <h3 className="text">مكتبة الصور والملفات</h3>
                                        </div>
                                        <div className="timlands-step-item">
                                            <h3 className="title">المرحلة الخامسة</h3>
                                            <h3 className="text">نشر الخدمة</h3>
                                        </div>
                                    </div>
                                    <div className="timlands-panel-header mt-3">
                                        <div className="flex-center">
                                            <h2 className="title"><span className="material-icons material-icons-outlined">collections_bookmark</span>إضافة خدمة جديدة</h2>
                                            <div className={"header-butt" + (isSubmitting ? ' is-loader' : '')}>
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
                                                    <label className="label-block" htmlFor="input-title">العنوان</label>
                                                    <Field
                                                        id="input-title"
                                                        name="title"
                                                        placeholder="العنوان..."
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
                                            <div className="col-md-5">
                                                <div className="timlands-form">
                                                    <label className="label-block" htmlFor="input-subcategories">اختر التصنيف الرئيسي</label>
                                                    <Field
                                                        as="select"
                                                        id="input-subcategories"
                                                        name="subcategories"
                                                        className="timlands-inputs select"
                                                        autoComplete="off"
                                                    >
                                                        {GetMainCategories.map((e, i) => (
                                                            <option key={i} value={e.id}>{e.name_ar}</option>
                                                        ))}
                                                    </Field>
                                                    {errors.subcategories && touched.subcategories ?
                                                        <div style={{ overflow: 'hidden' }}>
                                                            <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                                                <p className="text">{errors.subcategories}</p>
                                                            </motion.div>
                                                        </div>
                                                        :
                                                        null}
                                                </div>
                                            </div>
                                            <div className="col-md-7">
                                                <div className="timlands-form">
                                                    <label className="label-block" htmlFor="input-category">اختر التصنيف الرئيسي</label>
                                                    <Field
                                                        as="select"
                                                        id="input-category"
                                                        name="category"
                                                        className="timlands-inputs select"
                                                        autoComplete="off"
                                                    >
                                                        <option value="">dfsfsdf</option>
                                                    </Field>
                                                    {errors.category && touched.category ?
                                                        <div style={{ overflow: 'hidden' }}>
                                                            <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                                                <p className="text">{errors.category}</p>
                                                            </motion.div>
                                                        </div>
                                                        :
                                                        null}
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="timlands-form">
                                                    <label className="label-block" htmlFor="input-tags">الوسوم</label>
                                                    <div className="content-editor">
                                                        <div className="normal-editor">
                                                            <Field
                                                                id="input-tags"
                                                                name="tags"
                                                                placeholder="الوسوم..."
                                                                className="timlands-inputs"
                                                                autoComplete="off"
                                                            />
                                                        </div>
                                                    </div>
                                                    {errors.content && touched.content ?
                                                        <div style={{ overflow: 'hidden' }}>
                                                            <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                                                <p className="text">{errors.content}</p>
                                                            </motion.div>
                                                        </div>
                                                        :
                                                        null}
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
Overview.getLayout = function getLayout(page): ReactElement {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
export default Overview
