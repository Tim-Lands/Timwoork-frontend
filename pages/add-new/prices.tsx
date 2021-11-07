//import Layout from '../../components/Layout/HomeLayout'
import { ReactElement, useEffect, useState } from "react";
import { Field, FieldArray, Form, Formik } from 'formik';
import * as Yup from 'yup';
import API from '../../config';
//import 'rsuite/dist/rsuite.min.css';
import { motion } from 'framer-motion';
import Layout from "@/components/Layout/HomeLayout";
import router from "next/router";
import SidebarAdvices from "./SidebarAdvices";
//import { useEditor, EditorContent } from '@tiptap/react'
//import StarterKit from '@tiptap/starter-kit'

const SignupSchema = Yup.object().shape({
    title: Yup.string().required('هذا الحقل إجباري'),
    content: Yup.string().required('هذا الحقل إجباري'),
    subcategories: Yup.string(),
    tags: Yup.array(),
});

function Prices() {
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
    const [rateCount, setRateCount] = useState(0)
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-4">
                    <SidebarAdvices />
                </div>
                <div className="col-md-8 pt-3">

                    <Formik
                        initialValues={{
                            price: '',
                            content: '',
                            subcategories: '',
                            category: '',
                            tags: [],
                            friends: []
                        }}
                        //validationSchema={SignupSchema}
                        onSubmit={async (values) => {
                            await new Promise((r) => setTimeout(r, 500));
                            //alert(JSON.stringify(values, null, 2));
                            router.push('/add-new/description')
                        }}
                    >
                        {({ errors, touched, isSubmitting, values, handleChange }) => (
                            <Form>
                                <div className={"timlands-panel " + (isSubmitting ? ' is-loader' : '')}>

                                    <div className="timlands-steps">
                                        <div className="timlands-step-item">
                                            <h3 className="title">المرحلة الأولى</h3>
                                            <h3 className="text">معلومات عامة</h3>
                                        </div>
                                        <div className="timlands-step-item active">
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
                                            <h2 className="title"><span className="material-icons material-icons-outlined">payments</span>إضافة السعر</h2>
                                            <div className={"header-butt" + (isSubmitting ? ' is-loader' : '')}>
                                                <button onClick={() => router.push('/add-new/overview')} type="button" className="btn flex-center butt-green-out mr-auto butt-xs">
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
                                    <div className="timlands-content-form ">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="timlands-form">
                                                    <label className="label-block" htmlFor="input-category">سعر الخدمة</label>
                                                    <Field
                                                        as="select"
                                                        id="input-category"
                                                        name="category"
                                                        className="timlands-inputs select"
                                                        autoComplete="off"
                                                    >
                                                        <option value="">اختر السعر</option>
                                                        <option value="5">5$</option>
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
                                            <div className="col-md-6">
                                                <div className="timlands-form">
                                                    <label className="label-block" htmlFor="input-subcategories">مدة التسليم</label>
                                                    <Field
                                                        as="select"
                                                        id="input-subcategories"
                                                        name="subcategories"
                                                        className="timlands-inputs select"
                                                        autoComplete="off"
                                                    >
                                                        <option>اختر مدة التسليم</option>
                                                        <option value="1">يوم واحد</option>
                                                        <option value="2">يومين</option>
                                                        <option value="3">ثلاثة أيام</option>
                                                        <option value="4">أربعة أيام</option>
                                                        <option value="5">خمسة أيام</option>
                                                        <option value="6">ستة أيام</option>
                                                    </Field>
                                                    <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note">
                                                        <p className="text">حدد مدة تسليم مناسبة لك. يستطيع المشتري إلغاء الخدمة مباشرة في حال التأخر بتسليم الخدمة في الموعد المحدد</p>
                                                    </motion.div>
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
                                            <div className="col-md-12">
                                                <div className="timlands-form">
                                                    <label className="label-block" htmlFor="input-tags">التطويرات</label>
                                                    <FieldArray
                                                        name="friends"
                                                        render={arrayHelpers => (
                                                            <div>
                                                                {values.friends && values.friends.length > 0 ? (
                                                                    values.friends.map((friend, index) => (
                                                                        <motion.div initial={{ y: -7, opacity: 0 }} exit={{ y: -7, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="develop-price" key={index}>
                                                                            <div className="row">
                                                                                <div className="col-sm-12">
                                                                                    <div className="timlands-form">
                                                                                        <label className="label-block" htmlFor={"input-name-" + index}>عنوان التطوير</label>
                                                                                        <Field
                                                                                            id={"input-name-" + index}
                                                                                            placeholder="عنوان التطوير..."
                                                                                            className="timlands-inputs"
                                                                                            name={`friends[${index}].name`}
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-sm-7">
                                                                                    <div className="timlands-form">
                                                                                        <label className="label-block" htmlFor={"input-price-" + index}>سعر التطوير</label>
                                                                                        <Field
                                                                                            id={"input-price-" + index}
                                                                                            placeholder="سعر التطوير..."
                                                                                            className="timlands-inputs"
                                                                                            name={`friends[${index}].price`}
                                                                                        />

                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-sm-5">
                                                                                    <div className="timlands-form">
                                                                                        <label className="label-block" htmlFor={"input-durations-" + index}>مدة التطوير</label>
                                                                                        <Field
                                                                                            as="select"
                                                                                            id="input-durations"
                                                                                            name={`friends[${index}].durations`}
                                                                                            className="timlands-inputs select"
                                                                                            autoComplete="off"
                                                                                        >
                                                                                            <option>اختر مدة التطوير</option>
                                                                                            <option value="1">يوم واحد</option>
                                                                                            <option value="2">يومين</option>
                                                                                            <option value="3">ثلاثة أيام</option>
                                                                                            <option value="4">أربعة أيام</option>
                                                                                            <option value="5">خمسة أيام</option>
                                                                                            <option value="6">ستة أيام</option>
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
                                                                    ))

                                                                ) : ''}
                                                                {values.friends.length < 5 ?
                                                                    <div className="product-devlopes-butt">
                                                                        <p className="product-devlopes-text">
                                                                            تطويرات الخدمة المقدمة اختيارية فقط ولا يمكن أن تجبر المشتري على طلبها. اعرف طريقة استخدامها بشكل صحيح
                                                                        </p>
                                                                        <button type="button" className="btn add-devs-btn flex-center butt-primary butt-lg" onClick={() => arrayHelpers.push('')}>
                                                                            {/* show this when user has removed all friends from the list */}
                                                                            <span className="material-icons-outlined">post_add</span>  أضف تطويرا للخدمة
                                                                        </button>
                                                                    </div>
                                                                    : ''}
                                                            </div>
                                                        )}
                                                    />
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
export default Prices
Prices.getLayout = function getLayout(page): ReactElement {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
