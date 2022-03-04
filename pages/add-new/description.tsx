import { Field, Form, Formik } from 'formik';
import { motion } from 'framer-motion';
import router from 'next/router';
import SidebarAdvices from './SidebarAdvices';
import { MetaTags } from '@/components/SEO/MetaTags'
import PropTypes from "prop-types";
import { message } from "antd";
import Layout from "@/components/Layout/HomeLayout";
import Cookies from 'js-cookie'
import API from "../../config";
import { ReactElement, useEffect, useState } from 'react';
import useSWR from 'swr';
// import { useEditor, EditorContent } from '@tiptap/react'
// import StarterKit from '@tiptap/starter-kit'

// const Tiptap = (props: any) => {
//     return (
//         <EditorContent
//             value={props.value}
//             editor={props.editor}
//             onChange={props.changeHandle}
//         />
//     )
// }
function Description({ query }) {
    // const editor = useEditor({
    //     extensions: [
    //         StarterKit,
    //     ],
    //     content: '<p>Hello World! 🌎️</p>',
    // })
    const { data: getProduct }: any = useSWR(`api/my_products/product/${query.id}`)
    const token = Cookies.get('token')
    const [validationsErrors, setValidationsErrors]: any = useState({})
    const { data: userInfo }: any = useSWR('api/me')
    const veriedEmail = userInfo && userInfo.user_details.email_verified_at

    async function getProductId() {
        try {
            const res: any = await API.get(`api/my_products/product/${query.id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (res.status === 200) {
                console.log(true)
            }
        } catch (error) {
            if (error.response && error.response.status === 422) {
                router.push("/add-new")
            }
            if (error.response && error.response.status === 404) {
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
    }, [])
    //const contentHtml = editor && editor.commands.setContent('dhcdkhcdg')
    return (
        <>
            <MetaTags
                title="إضافة خدمة جديدة - الوصف وتعليمات المشتري"
                metaDescription="إضافة خدمة جديدة - الوصف وتعليمات المشتري"
                ogDescription="إضافة خدمة جديدة - الوصف وتعليمات المشتري"
            />
            {token &&
                <div className="container-fluid">
                    <div className="row my-3">
                        <div className="col-md-4">
                            <SidebarAdvices />
                        </div>
                        <div className="col-md-8 pt-3">
                            {veriedEmail &&
                                <Formik
                                    isInitialValid={true}
                                    initialValues={{
                                        buyer_instruct: (getProduct && getProduct.data.buyer_instruct),
                                        content: getProduct && getProduct.data.content,
                                    }}
                                    enableReinitialize={true}
                                    onSubmit={async (values) => {
                                        try {
                                            const id = query.id
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
                                            if (error.response && error.response.data && error.response.data.errors) {
                                                setValidationsErrors(error.response.data.errors);
                                            }
                                        }
                                    }}
                                >
                                    {({ isSubmitting }) => (
                                        <Form>
                                            <div className={"timlands-panel" + (isSubmitting ? ' is-loader' : '')}>
                                                <div className="timlands-steps">
                                                    <div className="timlands-step-item">
                                                        <h4 className="text">
                                                            <span className="icon-circular">
                                                                <span className="material-icons material-icons-outlined">collections_bookmark</span>
                                                            </span>
                                                            معلومات عامة
                                                        </h4>
                                                    </div>
                                                    <div className="timlands-step-item">
                                                        <h4 className="text">
                                                            <span className="icon-circular">
                                                                <span className="material-icons material-icons-outlined">payments</span>
                                                            </span>
                                                            السعر والتطويرات
                                                        </h4>
                                                    </div>
                                                    <div className="timlands-step-item active">
                                                        <h4 className="text">

                                                            <span className="icon-circular">
                                                                <span className="material-icons material-icons-outlined">description</span>
                                                            </span>
                                                            الوصف وتعليمات المشتري
                                                        </h4>
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
                                                    {/* <Tiptap value={values.content} changeHandle={() => handleChange('content')} editor={editor} /> */}
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="timlands-form">
                                                                <label className="label-block" htmlFor="input-content">وصف الخدمة</label>
                                                                <Field
                                                                    as="textarea"
                                                                    id="input-content"
                                                                    disabled={(!getProduct ? true : false)}
                                                                    name="content"
                                                                    placeholder="وصف الخدمة..."
                                                                    className={"timlands-inputs " + (validationsErrors && validationsErrors.content && ' has-error')}
                                                                    autoComplete="off"
                                                                    style={{ minHeight: 170 }}
                                                                ></Field>
                                                                <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note">
                                                                    <p className="text">أدخل وصف الخدمة بدقة يتضمن جميع المعلومات والشروط . يمنع وضع البريد الالكتروني، رقم الهاتف أو أي معلومات اتصال أخرى.</p>
                                                                </motion.div>
                                                                {validationsErrors && validationsErrors.content &&
                                                                    <div style={{ overflow: 'hidden' }}>
                                                                        <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                                                            <p className="text">{validationsErrors.content[0]}</p>
                                                                        </motion.div>
                                                                    </div>
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <div className="timlands-form">
                                                                <label className="label-block" htmlFor="input-buyer_instruct">تعليمات المشتري</label>
                                                                <Field
                                                                    as="textarea"
                                                                    id="input-buyer_instruct"
                                                                    disabled={(!getProduct ? true : false)}
                                                                    name="buyer_instruct"
                                                                    placeholder="تعليمات المشتري..."
                                                                    className={"timlands-inputs " + (validationsErrors && validationsErrors.buyer_instruct && ' has-error')}
                                                                    autoComplete="off"
                                                                    style={{ minHeight: 170 }}
                                                                ></Field>
                                                                <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note">
                                                                    <p className="text">المعلومات التي تحتاجها من المشتري لتنفيذ الخدمة. تظهر هذه المعلومات بعد شراء الخدمة فقط</p>
                                                                </motion.div>
                                                                {validationsErrors && validationsErrors.buyer_instruct &&
                                                                    <div style={{ overflow: 'hidden' }}>
                                                                        <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                                                            <p className="text">{validationsErrors.buyer_instruct[0]}</p>
                                                                        </motion.div>
                                                                    </div>
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <div className="py-4 d-flex">
                                                                <button onClick={() => router.back()} type="button" className="btn flex-center butt-green-out me-auto butt-xs">
                                                                    <span className="material-icons-outlined">chevron_right</span><span className="text">المرحلة السابقة</span>
                                                                    <div className="spinner-border spinner-border-sm text-white" role="status"></div>
                                                                </button>
                                                                <button type="submit" disabled={(!getProduct ? true : false) || isSubmitting} className="btn flex-center butt-green ml-auto butt-sm">
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
                            }
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