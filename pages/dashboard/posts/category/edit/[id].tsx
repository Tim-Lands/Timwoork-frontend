import axios from "axios"
import { motion } from "framer-motion"
import { ReactElement, useEffect, useState } from "react"
import PropTypes from "prop-types";
import DashboardLayout from "@/components/Layout/DashboardLayout";

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useRouter } from "next/router";

const SignupSchema = Yup.object().shape({
    name_ar: Yup.string().required('هذا الحقل إجباري'),
    name_en: Yup.string().required('هذا الحقل إجباري'),
    name_fr: Yup.string().required('هذا الحقل إجباري'),
    description_ar: Yup.string().min(8, 'يجب أن يكون عدد الحروف أكثر من 8').required('هذا الحقل إجباري'),
    description_en: Yup.string().min(8, 'يجب أن يكون عدد الحروف أكثر من 8').required('هذا الحقل إجباري'),
    description_fr: Yup.string().min(8, 'يجب أن يكون عدد الحروف أكثر من 8').required('هذا الحقل إجباري'),
    icon: Yup.string().required('هذا الحقل إجباري'),
});
export default function EditCategory(): ReactElement {
    //const [iconPrev, setIconPrev] = useState('')
    //const iconPreviewHandle = (e) => {
    //    setIconPrev(e.target.value)
    //}
    const router = useRouter()
    const id = router.query.id

    const [isLoading, setIsLoading] = useState(false)
    const refreshData = async () => {
        setIsLoading(true)
        try {
            const res: any = await axios.get(`https://api.wazzfny.com/dashboard/categories/${id}`)
            if (res.data) {
                setIsLoading(false)
                console.log(res.data.data);

            }
        } catch (error) {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        refreshData()
    }, [])
    return (
        <>
            <div className="panel-modal-overlay"></div>
            <div className="panel-modal lg modal-add-new">
                <div className="panel-modal-header">
                    <h2 className="title"><span className="material-icons material-icons-outlined">add_box</span>إضافة جديد</h2>
                    <div className="panel-modal-left-tools">
                        <button onClick={() => router.push('/dashboard/posts/categories')} className="close-modal">
                            <span className="material-icons material-icons-outlined">close</span>
                        </button>
                    </div>
                </div>
                <Formik
                    initialValues={{
                        name_ar: '',
                        name_en: '',
                        name_fr: '',
                        description_ar: '',
                        description_en: '',
                        description_fr: '',
                        icon: '',
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={async values => {
                        try {

                            const res = await axios.post(`https://api.wazzfny.com/dashboard/categories/${id}/update`, values);
                            // If Activate Network 
                            // Authentication was successful.
                            if (res.status == 201 || res.status == 200 || res.status == 202 || res.status == 203) {
                                //alert('تمت الإضافة بنجاح')
                                router.push('/dashboard/posts/categories')
                            } else {
                                alert('Error')
                            }
                        } catch (error) {
                            alert('Error Network')
                        }
                    }}
                >
                    {(formik) => {
                        const {
                            values,
                            handleChange,
                            errors,
                            isSubmitting,
                            touched,
                            handleBlur,
                        } = formik;
                        return (<Form>
                            {isLoading && 'يرجى الإنتظار...'}
                            <div className={"panel-modal-body auto-height" + (isSubmitting ? ' is-loading' : '')}>
                                {!isSubmitting ? '' :
                                    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="is-loading">
                                        <div className="spinner-border" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </motion.div>
                                }
                                <div className="row">
                                    <div className="col-sm-4">
                                        <div className="timlands-form">
                                            <label className="label-block" htmlFor="name_ar">اسم الصنف بالعربي</label>
                                            <Field
                                                id="name_ar"
                                                name="name_ar"
                                                placeholder="اسم الصنف بالعربي..."
                                                className="timlands-inputs"
                                                autoComplete="off"
                                                value={values.name_ar}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.name_ar && touched.name_ar ?
                                                <div style={{ overflow: 'hidden' }}>
                                                    <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                                        <p className="text">{errors.name_ar}</p>
                                                    </motion.div>
                                                </div>
                                                :
                                                null}
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="timlands-form">
                                            <label className="label-block" htmlFor="name_en">اسم الصنف بالانجليزي</label>
                                            <Field
                                                id="name_en"
                                                name="name_en"
                                                placeholder="اسم الصنف بالانجليزي..."
                                                className="timlands-inputs"
                                                autoComplete="off"
                                                value={values.name_en}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.name_en && touched.name_en ?
                                                <div style={{ overflow: 'hidden' }}>
                                                    <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                                        <p className="text">{errors.name_en}</p>
                                                    </motion.div>
                                                </div>
                                                :
                                                null}
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="timlands-form">
                                            <label className="label-block" htmlFor="name_fr">اسم الصنف بالفرنسي</label>
                                            <Field
                                                id="name_fr"
                                                name="name_fr"
                                                placeholder="اسم الصنف بالفرنسي..."
                                                className="timlands-inputs"
                                                autoComplete="off"
                                                value={values.name_fr}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.name_fr && touched.name_fr ?
                                                <div style={{ overflow: 'hidden' }}>
                                                    <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                                        <p className="text">{errors.name_fr}</p>
                                                    </motion.div>
                                                </div>
                                                :
                                                null}
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="timlands-form">
                                            <label className="label-block" htmlFor="description_ar">الوصف بالعربي</label>
                                            <Field
                                                as="textarea"
                                                id="description_ar"
                                                name="description_ar"
                                                placeholder="الوصف بالعربي..."
                                                className="timlands-inputs"
                                                value={values.description_ar}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            ></Field>
                                            {errors.description_ar && touched.description_ar ?
                                                <div style={{ overflow: 'hidden' }}>
                                                    <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                                        <p className="text">{errors.description_ar}</p>
                                                    </motion.div>
                                                </div>
                                                :
                                                null}
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="timlands-form">
                                            <label className="label-block" htmlFor="description_en">الوصف بالإنجليزي</label>
                                            <Field
                                                as="textarea"
                                                id="description_en"
                                                name="description_en"
                                                placeholder="الوصف بالإنجليزي..."
                                                className="timlands-inputs"
                                                value={values.description_en}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            ></Field>
                                            {errors.description_en && touched.description_en ?
                                                <div style={{ overflow: 'hidden' }}>
                                                    <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                                        <p className="text">{errors.description_en}</p>
                                                    </motion.div>
                                                </div>
                                                :
                                                null}
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="timlands-form">
                                            <label className="label-block" htmlFor="description_fr">الوصف بالفرنسي</label>
                                            <Field
                                                as="textarea"
                                                id="description_fr"
                                                name="description_fr"
                                                placeholder="الوصف بالفرنسي..."
                                                className="timlands-inputs"
                                                value={values.description_fr}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            ></Field>
                                            {errors.description_fr && touched.description_fr ?
                                                <div style={{ overflow: 'hidden' }}>
                                                    <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                                        <p className="text">{errors.description_fr}</p>
                                                    </motion.div>
                                                </div>
                                                :
                                                null}
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="timlands-form">
                                            <label className="label-block" htmlFor="icon">أيقونة الصنف</label>
                                            <Field
                                                as="select"
                                                id="icon"
                                                name="icon"
                                                className="timlands-inputs"
                                                value={values.icon}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            >
                                                <option value="bookmark_border">bookmark_border</option>
                                                <option value="description">description</option>
                                                <option value="account_circle">account_circle</option>
                                                <option value="favorite_border">favorite_border</option>
                                                <option value="dashboard">dashboard</option>
                                                <option value="fact_check">fact_check</option>
                                                <option value="question_answer">question_answer</option>
                                                <option value="verified_user">verified_user</option>
                                                <option value="code">code</option>
                                            </Field>
                                            {errors.icon && touched.icon ?
                                                <div style={{ overflow: 'hidden' }}>
                                                    <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                                        <p className="text">{errors.icon}</p>
                                                    </motion.div>
                                                </div>
                                                :
                                                null}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="panel-modal-footer">
                                <button onClick={() => router.push('/dashboard/posts/categories')} type="button" className="btn butt-red butt-sm">إغلاق</button>
                                <button type="submit" disabled={isSubmitting} className="btn butt-primary butt-sm">حفظ التغييرات</button>
                            </div>
                        </Form>)
                    }}
                </Formik>
            </div>
        </>
    )
}
EditCategory.propTypes = {
    setIsModalHiddenHandle: PropTypes.func,
};
EditCategory.getLayout = function getLayout(page): ReactElement {
    return (
        <DashboardLayout>
            {page}
        </DashboardLayout>
    )
}