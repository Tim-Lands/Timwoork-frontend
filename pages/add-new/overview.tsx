import Layout from '../../components/Layout/HomeLayout'
import { ReactElement, useEffect, useState } from "react";
import { Field, Form, Formik, FieldArray } from 'formik';
import { message } from 'antd';
import { motion } from 'framer-motion';
import router from 'next/router';
import SidebarAdvices from './SidebarAdvices';
import Cookies from 'js-cookie'
import API from "../../config";
import useSWR from 'swr'
import PropTypes from "prop-types";
import { MetaTags } from '@/components/SEO/MetaTags'

function Overview({ query }) {

    //const [productTags, setProductTags] = useState([])
    const id = query.id
    const token = Cookies.get('token')
    const { data: getProduct }: any = useSWR(`api/my_products/product/${query.id}`)
    const [mainCat, setmainCat] = useState(getProduct && getProduct.data.subcategory && getProduct.data.subcategory.category.id || 1)
    const { data: getUser }: any = useSWR('api/me')
    const { data: categories, categoriesError }: any = useSWR('api/get_categories')
    const { data: subCategories, subCategoriesError }: any = useSWR(`dashboard/categories/${mainCat}`)
    const [validationsErrors, setValidationsErrors]: any = useState({})

    if (!query) return message.error('حدث خطأ')
    async function getProductId() {
        try {
            const res: any = await API.get(`api/my_products/product/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (res.status === 422) {
                router.push("/add-new")
            }
        } catch (error) {
            if (error.response && error.response.status === 422) {
                router.push("/add-new")
            }
        }
    }
    useEffect(() => {
        if (!token) {
            router.push('/login')
            return
        }
        getProductId()
        if (getProduct) {
            if (getProduct.profile_seller_id !== getUser.id) {
                router.push('/add-new')
            }
        }
    }, [])
    /* const setTagsStateHandle = (e) => {
         setTagsState(e)
     }
    const deleteProduct = async () => {
        try {
            const res: any = API.post(`api/product/${query.id}/deleteProduct`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (res.status == 200) {
                message.success('لقد تم الحذف بنجاح')
                router.push("/add-new")
            }
        } catch (error) {
            message.error('للأسف لم يتم الحذف ')
        }
    }*/
    return (
        <>
            <MetaTags
                title="إضافة خدمة جديدة - معلومات عامة"
                metaDescription="إضافة خدمة جديدة - معلومات عامة "
                ogDescription="إضافة خدمة جديدة - معلومات عامة"
            />
            {token &&
                <div className="container-fluid">
                    {(!getProduct) && <div>يرجى الانتظار...</div>}
                    <div className="row">
                        <div className="col-md-4">
                            <SidebarAdvices />
                        </div>
                        <div className="col-md-8 pt-3">
                            <Formik
                                isInitialValid={true}
                                initialValues={{
                                    title: getProduct && getProduct.data.title,
                                    subcategory: getProduct && getProduct.data.subcategory && getProduct.data.subcategory.id,
                                    tags: getProduct && getProduct.data.product_tag.map((e: any) => e.name),
                                }}
                                enableReinitialize={true}
                                //validationSchema={SignupSchema}
                                onSubmit={async values => {
                                    try {
                                        setValidationsErrors({})
                                        const res = await API.post(`api/product/${id}/product-step-one`, values, {
                                            headers: {
                                                'Authorization': `Bearer ${token}`
                                            }
                                        })
                                        // Authentication was successful.
                                        if (res.status === 200) {
                                            message.success('لقد تم التحديث بنجاح')
                                            router.push({
                                                pathname: '/add-new/prices',
                                                query: {
                                                    id: id, // pass the id 
                                                },
                                            })
                                        }
                                    } catch (error: any) {
                                        if (error.response && error.response.data && error.response.data.errors) {
                                            setValidationsErrors(error.response.data.errors);
                                        }
                                    }

                                }}
                            >
                                {({ errors, touched, isSubmitting, values }) => (
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

                                            <div className="timlands-content-form">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="timlands-form">
                                                            <label className="label-block" htmlFor="input-title">العنوان</label>
                                                            <Field
                                                                id="input-title"
                                                                name="title"
                                                                placeholder="العنوان..."
                                                                className={"timlands-inputs " + (validationsErrors && validationsErrors.title && ' has-error')}
                                                                autoComplete="off"
                                                            />
                                                            {validationsErrors && validationsErrors.title &&
                                                                <div style={{ overflow: 'hidden' }}>
                                                                    <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                                                        <p className="text">{validationsErrors.title[0]}</p>
                                                                    </motion.div>
                                                                </div>}
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
                                                                onChange={(e: any) => setmainCat(e.target.value)}
                                                            >
                                                                <option value="">اختر التصنيف الرئيسي</option>
                                                                {!categories && <option value="">يرجى الانتظار...</option>}
                                                                {categories && categories.data.map((e: any) => (
                                                                    <option value={e.id} key={e.id}>{e.name_ar}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-7">
                                                        <div className="timlands-form">
                                                            <label className="label-block" htmlFor="input-subcategory">اختر التصنيف الفرعي</label>
                                                            <Field
                                                                as="select"
                                                                id="input-subcategory"
                                                                name="subcategory"
                                                                className={"timlands-inputs select " + (validationsErrors && validationsErrors.subcategory && ' has-error')}
                                                                autoComplete="off"
                                                            >
                                                                <option value={0}>اختر التصنيف الفرعي</option>
                                                                {subCategoriesError && <option value="">حدث خطأ</option>}
                                                                {!subCategories && <option value="">يرجى الانتظار...</option>}
                                                                {subCategories && subCategories.data.subcategories.map((e: any) => (
                                                                    <option value={e.id} key={e.id}>{e.name_ar}</option>
                                                                ))
                                                                }
                                                            </Field>
                                                            {validationsErrors && validationsErrors.subcategory &&
                                                                <div style={{ overflow: 'hidden' }}>
                                                                    <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                                                        <p className="text">{validationsErrors.subcategory[0]}</p>
                                                                    </motion.div>
                                                                </div>}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="timlands-form">
                                                            <label className="label-block" htmlFor="input-tags">الوسوم</label>
                                                            <FieldArray
                                                                name="tags"
                                                                render={arrayHelpers => (
                                                                    <div className='row'>
                                                                        <p className="meta-note">الوسوم/التاغ تساعد ظهور خدمتك في محركات البحث</p>
                                                                        <button className='btn butt-md butt-primary2 flex-center-just mb-3' type="button" onClick={() => arrayHelpers.push('')}>
                                                                            <span className="material-icons material-icons-outlined">local_offer</span> إضافة وسوم/تاغ لهذه الخدمة
                                                                        </button>
                                                                        {values.tags && values.tags.length > 0 && (
                                                                            values.tags.map((friend, index) => (
                                                                                <div className='col-sm-3' key={index}>
                                                                                    <div className="tags-item" style={{
                                                                                        position: 'relative',
                                                                                        paddingInline: 3,
                                                                                    }}>
                                                                                        <Field name={`tags.[${index}]`} style={{
                                                                                            borderRadius: 4,
                                                                                            borderWidth: 1,
                                                                                            borderColor: '#f5f6f5',
                                                                                            borderStyle: 'solid',
                                                                                            paddingInline: 8,
                                                                                            paddingBlock: 5,
                                                                                            width: '100%'
                                                                                        }} />
                                                                                        <button
                                                                                            type="button"
                                                                                            className='minse'
                                                                                            onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                                                                        >
                                                                                            -
                                                                                        </button>
                                                                                        <button
                                                                                            type="button"
                                                                                            onClick={() => arrayHelpers.insert(index, '')} // insert an empty string at a position
                                                                                        >
                                                                                            +
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                            ))
                                                                        )}

                                                                    </div>
                                                                )}
                                                            />
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
                                                            {/*<Popconfirm
                                                                title="هل تريد حقا إلغاء هذه الخدمة"
                                                                onConfirm={deleteProduct}
                                                                okText="نعم"
                                                                cancelText="لا"
                                                            >
                                                                <button type="button" className="btn butt-red me-auto butt-sm">
                                                                    إلغاء الأمر
                                                                </button>
                                                            </Popconfirm>*/}
                                                            <span className="me-auto"></span>
                                                            <button type="submit" disabled={isSubmitting} className="btn flex-center butt-green ml-auto butt-sm">
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
            }
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

Overview.getInitialProps = ({ query }) => {
    return { query }
}
Overview.propTypes = {
    query: PropTypes.any,
};