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

function Description() {
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
                            router.push('/add-new/medias')
                            //alert(JSON.stringify(values, null, 2));
                        }}
                    >
                        {({ errors, touched, isSubmitting }) => (
                            <Form>
                                <div className={"timlands-panel" + (isSubmitting ? ' is-loader' : '')}>
                                    <div className="timlands-steps">
                                        <div className="timlands-step-item">
                                            <h3 className="title">المرحلة الأولى</h3>
                                            <h3 className="text">معلومات عامة</h3>
                                        </div>
                                        <div className="timlands-step-item">
                                            <h3 className="title">المرحلة الثانية</h3>
                                            <h3 className="text">السعر والتطويرات</h3>
                                        </div>
                                        <div className="timlands-step-item active">
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
