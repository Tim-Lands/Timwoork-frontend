import Layout from '../../components/Layout/HomeLayout'
import { ReactElement, useEffect, useState } from "react";
import { Field, Form, Formik } from 'formik';
import { message, Select } from 'antd';
import { motion } from 'framer-motion';
import router from 'next/router';
import SidebarAdvices from './SidebarAdvices';
import Cookies from 'js-cookie'
import API from "../../config";
import useSWR from 'swr'

function Overview({ query }) {

    const [tagsState, setTagsState] = useState([])
    const [categoryState, setCategoryState] = useState(1)

    const { data: categories, categoriesError }: any = useSWR('dashboard/categories', () =>
        API
            .get('dashboard/categories')
            .then(res => res.data.data)
            .catch(error => {
                if (error.response.status != 409) throw error
            }),
    )
    const { data: subCategories, subCategoriesError }: any = useSWR(`dashboard/categories/${categoryState}`, () =>
        API
            .get(`dashboard/categories/${categoryState}`)
            .then(res => res.data.data)
            .catch(error => {
                if (error.response.status != 409) throw error
            }),
    )
    const { data: getProduct, getProductError }: any = useSWR(`dashboard/products/${query.id}`, () =>
        API
            .get(`dashboard/products/${query.id}`)
            .then(res => res.data)
            .catch(error => {
                if (error.response.status != 409) throw error
            }),
    )
    useEffect(() => {
        // The counter changed!
        console.log(getProduct);
    }, [])
    //if (!router.query.id) {return};
    const { Option }: any = Select;

    const children = [];
    for (let i = 0; i < 1000; i++) {
        children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-4">
                    <SidebarAdvices />
                </div>
                <div className="col-md-8 pt-3">
                    <Formik
                        isInitialValid={true}
                        initialValues={{
                            title: !getProduct ? '' : getProduct.title,
                            subcategory: !getProduct ? '' : getProduct.subcategory,
                            category: '',
                            tags: !getProduct ? tagsState : getProduct.tags,
                        }}
                        enableReinitialize={true}

                        //validationSchema={SignupSchema}
                        onSubmit={async values => {
                            try {
                                const id = router.query.id
                                const token = Cookies.get('token')
                                const res = await API.post(`api/product/${id}/product-step-one`, values, {
                                    headers: {
                                        'Authorization': `Bearer ${token}`
                                    }
                                })
                                // Authentication was successful.
                                if (res.status === 200) {
                                    message.success('لقد تم التحديث بنجاح')
                                    //router.push('/add-new/prices')
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
                                                    <label className="label-block" htmlFor="input-category">اختر التصنيف الرئيسي</label>
                                                    {categoriesError && "حدث خطأ"}
                                                    <select
                                                        id="input-category"
                                                        name="category"
                                                        className="timlands-inputs select"
                                                        autoComplete="off"
                                                        value={categoryState}
                                                        onChange={(e: any) => setCategoryState(e.target.value)}
                                                    >
                                                        {!categories ? <option value="">يرجى الانتظار...</option> : (
                                                            categories.map((e: any) => (
                                                                <option value={e.id} key={e.id}>{e.name_ar}</option>
                                                            )))}
                                                    </select>
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
                                            <div className="col-md-7">
                                                <div className="timlands-form">
                                                    <label className="label-block" htmlFor="input-subcategory">اختر التصنيف الفرعي</label>
                                                    <Field
                                                        as="select"
                                                        id="input-subcategory"
                                                        name="subcategory"
                                                        className="timlands-inputs select"
                                                        autoComplete="off"
                                                    >
                                                        {subCategoriesError && <option value="">حدث خطأ</option>}
                                                        {!subCategories ? <option value="">يرجى الانتظار...</option> :
                                                            subCategories.subcategories && subCategories.subcategories.map((e: any) => (
                                                                <option value={e.id} key={e.id}>{e.name_ar}</option>
                                                            ))
                                                        }
                                                    </Field>
                                                    {errors.subcategory && touched.subcategory ?
                                                        <div style={{ overflow: 'hidden' }}>
                                                            <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                                                <p className="text">{errors.subcategory}</p>
                                                            </motion.div>
                                                        </div>
                                                        :
                                                        null}
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="timlands-form">
                                                    <label className="label-block" htmlFor="input-tags">الوسوم</label>
                                                    {tagsState}
                                                    <Select
                                                        mode="multiple"
                                                        notFoundContent="No people avaialable"
                                                        style={{ width: "100%" }}
                                                        className="timlands-inputs select"
                                                        placeholder="اختر الوسوم"
                                                        defaultValue={tagsState}
                                                        onChange={(e) => setTagsState(e)}
                                                    >
                                                        <option value={9}>jgvjhgfh</option>
                                                        <option value={1}>jgvjh345gfh</option>
                                                        <option value={3}>jgvj3hg435fh</option>
                                                        <option value={5}>jgvjhgfh</option>
                                                        <option value={7}>jgvjhgfh</option>
                                                    </Select>
                                                    {errors.tags && touched.tags ?
                                                        <div style={{ overflow: 'hidden' }}>
                                                            <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                                                <p className="text">{errors.tags}</p>
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

Overview.getInitialProps = ({ query }) => {
    return { query }
}