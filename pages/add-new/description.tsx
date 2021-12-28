import { Field, Form, Formik } from 'formik';
import { motion } from 'framer-motion';
import router from 'next/router';
import SidebarAdvices from './SidebarAdvices';
import { MetaTags } from '@/components/SEO/MetaTags'
import PropTypes from "prop-types";
import { message, Popconfirm } from "antd";
import Layout from "@/components/Layout/HomeLayout";
import Cookies from 'js-cookie'
import API from "../../config";
import { ReactElement } from 'react';

function Description({ query }) {
    const token = Cookies.get('token')
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
    }
    return (
        <>
            <MetaTags
                title="إضافة خدمة جديدة - الوصف وتعليمات المشتري"
                metaDescription="إضافة خدمة جديدة - الوصف وتعليمات المشتري"
                ogDescription="إضافة خدمة جديدة - الوصف وتعليمات المشتري"
            />
            {token &&
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-4">
                            <SidebarAdvices />
                        </div>
                        <div className="col-md-8 pt-3">
                            <Formik
                                initialValues={{
                                    buyer_instruct: '',
                                    content: '',
                                }}
                                enableReinitialize={true}

                                //validationSchema={SignupSchema}
                                onSubmit={async (values) => {
                                    try {
                                        const id = query.id
                                        const token = Cookies.get('token')
                                        const res = await API.post(`api/product/${id}/product-step-three`, values, {
                                            headers: {
                                                'Authorization': `Bearer ${token}`
                                            }
                                        })
                                        // Authentication was successful.
                                        if (res.status === 200) {
                                            message.success('لقد تم التحديث بنجاح')
                                            router.push({
                                                pathname: '/add-new/medias',
                                                query: {
                                                    id: id, // pass the id 
                                                },
                                            })
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
                                                        <button onClick={() => router.back()} type="button" className="btn flex-center butt-green-out mr-auto butt-xs">
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
                                                            <label className="label-block" htmlFor="input-content">وصف الخدمة</label>
                                                            <Field
                                                                as="textarea"
                                                                id="input-content"
                                                                name="content"
                                                                placeholder="وصف الخدمة..."
                                                                className="timlands-inputs"
                                                                autoComplete="off"
                                                                style={{ minHeight: 170 }}
                                                            ></Field>
                                                            <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note">
                                                                <p className="text">أدخل وصف الخدمة بدقة يتضمن جميع المعلومات والشروط . يمنع وضع البريد الالكتروني، رقم الهاتف أو أي معلومات اتصال أخرى.</p>
                                                            </motion.div>
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
                                                        <div className="timlands-form">
                                                            <label className="label-block" htmlFor="input-buyer_instruct">تعليمات المشتري</label>
                                                            <Field
                                                                as="textarea"
                                                                id="input-buyer_instruct"
                                                                name="buyer_instruct"
                                                                placeholder="تعليمات المشتري..."
                                                                className="timlands-inputs"
                                                                autoComplete="off"
                                                                style={{ minHeight: 170 }}
                                                            ></Field>
                                                            <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note">
                                                                <p className="text">المعلومات التي تحتاجها من المشتري لتنفيذ الخدمة. تظهر هذه المعلومات بعد شراء الخدمة فقط</p>
                                                            </motion.div>
                                                            {errors.buyer_instruct && touched.buyer_instruct ?
                                                                <div style={{ overflow: 'hidden' }}>
                                                                    <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                                                        <p className="text">{errors.buyer_instruct}</p>
                                                                    </motion.div>
                                                                </div>
                                                                :
                                                                null}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="py-4 d-flex">
                                                            <Popconfirm
                                                                title="هل تريد حقا إلغاء هذه الخدمة"
                                                                onConfirm={deleteProduct}
                                                                okText="نعم"
                                                                cancelText="لا"
                                                            >
                                                                <button type="button" className="btn butt-red me-auto butt-sm">
                                                                    إلغاء الأمر
                                                                </button>
                                                            </Popconfirm>
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
            }
        </>
    )
}
export default Description
Description.getLayout = function getLayout(page): ReactElement {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
Description.getInitialProps = ({ query }) => {
    return { query }
}
Description.propTypes = {
    query: PropTypes.any,
};