import API from '../../../../config';
import { motion } from "framer-motion"
import { ReactElement } from "react"
import PropTypes from "prop-types";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import useSWR, { mutate } from 'swr'

const SignupSchema = Yup.object().shape({
    name_ar: Yup.string().required('هذا الحقل إجباري'),
    name_en: Yup.string().required('هذا الحقل إجباري'),
    name_fr: Yup.string().required('هذا الحقل إجباري'),
    precent_deducation: Yup.number().lessThan(101, 'النسبة المئوية يجب أن تكون أقل من 100').required('هذا الحقل إجباري'),
});
export default function AddNewUser({ setIsModalHiddenHandle }: any): ReactElement {
    const { data }: any = useSWR(`dashboard/badges`)

    return (
        <>
            <div className="panel-modal-overlay"></div>
            <div className="panel-modal modal-add-new">
                <div className="panel-modal-header">
                    <h2 className="title"><span className="material-icons material-icons-outlined">add_box</span>إضافة جديد</h2>
                    <div className="panel-modal-left-tools">
                        <button onClick={setIsModalHiddenHandle} className="close-modal">
                            <span className="material-icons material-icons-outlined">close</span>
                        </button>
                    </div>
                </div>
                <Formik
                    initialValues={{
                        name_ar: '',
                        name_en: '',
                        name_fr: '',
                        precent_deducation: 1,
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={async values => {
                        mutate('dashboard/badges', [...data, values])
                        await API.post("dashboard/badges/store", values);
                        setIsModalHiddenHandle()
                    }}
                >
                    {({ errors, touched, isSubmitting }) => (
                        <Form>
                            <div className={"panel-modal-body auto-height" + (isSubmitting ? ' is-loading' : '')}>
                                {!isSubmitting ? '' :
                                    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="is-loading">
                                        <div className="spinner-border" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </motion.div>
                                }
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="timlands-form">
                                            <label className="label-block" htmlFor="name_ar">اسم المستوى بالعربي</label>
                                            <Field
                                                id="name_ar"
                                                name="name_ar"
                                                placeholder="اسم المستوى بالعربي..."
                                                className="timlands-inputs"
                                                autoComplete="off"
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
                                    <div className="col-sm-6">
                                        <div className="timlands-form">
                                            <label className="label-block" htmlFor="name_en">اسم المستوى بالانجليزي</label>
                                            <Field
                                                id="name_en"
                                                name="name_en"
                                                placeholder="اسم المستوى بالانجليزي..."
                                                className="timlands-inputs"
                                                autoComplete="off"
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
                                    <div className="col-sm-6">
                                        <div className="timlands-form">
                                            <label className="label-block" htmlFor="name_fr">اسم المستوى بالفرنسي</label>
                                            <Field
                                                id="name_fr"
                                                name="name_fr"
                                                placeholder="اسم المستوى بالفرنسي..."
                                                className="timlands-inputs"
                                                autoComplete="off"
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
                                    <div className="col-sm-6">
                                        <div className="timlands-form">
                                            <label className="label-block" htmlFor="precent_deducation">نسبة العمولة</label>
                                            <Field
                                                id="precent_deducation"
                                                name="precent_deducation"
                                                placeholder="نسبة العمولة..."
                                                className="timlands-inputs"
                                            />
                                            {errors.precent_deducation && touched.precent_deducation ?
                                                <div style={{ overflow: 'hidden' }}>
                                                    <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                                        <p className="text">{errors.precent_deducation}</p>
                                                    </motion.div>
                                                </div>
                                                :
                                                null}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="panel-modal-footer">
                                <button onClick={setIsModalHiddenHandle} type="button" className="btn butt-red butt-sm">إغلاق</button>
                                <button type="submit" disabled={isSubmitting} className="btn butt-primary butt-sm">حفظ التغييرات</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    )
}
AddNewUser.propTypes = {
    setIsModalHiddenHandle: PropTypes.func,
};