import Layout from '../../components/Layout/HomeLayout'
import { ReactElement } from "react";
import { Field, Form, Formik } from 'formik';
import { Select } from 'antd';

import "antd/dist/antd.css";
import { motion } from 'framer-motion';
import router from 'next/router';
import SidebarAdvices from './SidebarAdvices';
function Overview() {
    const { Option }: any = Select;

    const children = [];
    for (let i = 0; i < 1000; i++) {
        children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }

    function handleChange(value) {
        console.log(`selected ${value}`);
    }
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
                            router.push('/add-new/prices')
                            //alert(JSON.stringify(values, null, 2));
                        }}
                    >
                        {({ errors, touched, isSubmitting }) => (
                            <Form>
                                <div className={"timlands-panel" + (isSubmitting ? ' is-loader' : '')}>
                                    <div className="timlands-steps">
                                        <div className="timlands-step-item active">
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
                                        <div className="timlands-step-item">
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
                                            <h2 className="title"><span className="material-icons material-icons-outlined">collections_bookmark</span>معلومات عامة</h2>
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
                                                        <option>gfhgfhf</option>
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
                                                    <Select
                                                        mode="multiple"
                                                        notFoundContent="No people avaialable"
                                                        style={{ width: "100%" }}
                                                        className="timlands-inputs select"
                                                        placeholder="اختر الوسوم"
                                                        defaultValue={["a10", "c12"]}
                                                        onChange={handleChange}
                                                    >
                                                        <option value="hghg">jgvjhgfh</option>
                                                        <option value="hg66hg">jgvjh345gfh</option>
                                                        <option value="hgh443g">jgvj3hg435fh</option>
                                                        <option value="hgh568g">jgvjhgfh</option>
                                                        <option value="hgh33g">jgvjhgfh</option>
                                                    </Select>
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
