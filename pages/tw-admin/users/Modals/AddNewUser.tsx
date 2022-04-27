import axios from "axios"
import { motion } from "framer-motion"
import { ReactElement } from "react"
import PropTypes from "prop-types";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const SignupSchema = Yup.object().shape({
    password: Yup.string().required('هذا الحقل إجباري'),
    repassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'كلمتا المرور المرور غير متطابقتين').required('هذا الحقل إجباري'),
    username: Yup.string()
        .min(4, 'هذا الحقل قصير جدا')
        .max(30, 'هذا الحقل كبير جدا')
        .required('هذا الحقل إجباري'),
    name: Yup.string()
        .min(4, 'هذا الحقل قصير جدا')
        .max(35, 'هذا الحقل كبير جدا')
        .required('هذا الحقل إجباري'),
    email: Yup.string()
        .email('من فضلك أدخل الإيميل صحيح')
        .max(60, 'هذا الحقل كبير جدا').required('هذا الحقل إجباري'),
    phone: Yup.string().matches(phoneRegExp, 'هذا ليس رقم هاتف'),
});
export default function AddNewUser({ setIsModalHiddenHandle }: any): ReactElement {
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
                        username: '',
                        email: '',
                        repassword: '',
                        phone: '',
                        name: '',
                        password: '',
                        address: {
                            street: '',
                            state: ''
                        },
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={async values => {
                        try {
                            const res = await axios.post("https://flexyapp.herokuapp.com/api/v1/users", values);
                            // If Activate Network 
                            // Authentication was successful.
                            if (res.status == 201 || res.status == 200) {
                                alert('تمت الإضافة بنجاح')
                                setIsModalHiddenHandle()
                            } else {
                                alert('Error')
                            }
                        } catch (error) {
                            alert('Error Network')

                        }
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
                                            <label className="label-block" htmlFor="input-fname">الاسم</label>
                                            <Field
                                                id="input-fname"
                                                name="name"
                                                placeholder="الاسم..."
                                                className="timlands-inputs"
                                                autoComplete="off"
                                            />
                                            {errors.name && touched.name ?
                                                <div style={{ overflow: 'hidden' }}>
                                                    <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                                        <p className="text">{errors.name}</p>
                                                    </motion.div>
                                                </div>
                                                :
                                                null}
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="timlands-form">
                                            <label className="label-block" htmlFor="input-username">اسم المستخدم</label>
                                            <Field
                                                id="input-username"
                                                name="username"
                                                placeholder="اسم المستخدم..."
                                                className="timlands-inputs"
                                                autoComplete="off"
                                            />
                                            {errors.username && touched.username ?
                                                <div style={{ overflow: 'hidden' }}>
                                                    <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                                        <p className="text">{errors.username}</p>
                                                    </motion.div>
                                                </div>
                                                :
                                                null}
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="timlands-form">
                                            <label className="label-block" htmlFor="input-email">البريد الإلكتروني</label>
                                            <Field
                                                id="input-email"
                                                name="email"
                                                placeholder="البريد الإلكتروني..."
                                                className="timlands-inputs"
                                                autoComplete="off"
                                            />
                                            {errors.email && touched.email ?
                                                <div style={{ overflow: 'hidden' }}>
                                                    <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                                        <p className="text">{errors.email}</p>
                                                    </motion.div>
                                                </div>
                                                :
                                                null}
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="timlands-form">
                                            <label className="label-block" htmlFor="input-state">اختر الولاية</label>
                                            <Field
                                                as="select"
                                                id="input-state"
                                                name="address.state"
                                                className="timlands-inputs select"
                                            >
                                                <option value="">اختر الولاية</option>
                                                <option value="الجلفة">الجلفة</option>
                                            </Field>
                                            {errors.address?.state && touched.address?.state ?
                                                <div style={{ overflow: 'hidden' }}>
                                                    <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                                        <p className="text">{errors.address.street}</p>
                                                    </motion.div>
                                                </div>
                                                :
                                                null}
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="timlands-form">
                                            <label className="label-block" htmlFor="input-street">العنوان</label>
                                            <Field
                                                id="input-street"
                                                name="address.street"
                                                placeholder="العنوان..."
                                                className="timlands-inputs"
                                                autoComplete="off"
                                            />
                                            {errors.address?.street && touched.address?.street ?
                                                <div style={{ overflow: 'hidden' }}>
                                                    <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                                        <p className="text">{errors.address.street}</p>
                                                    </motion.div>
                                                </div>
                                                :
                                                null}
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="timlands-form">
                                            <label className="label-block" htmlFor="input-phone">رقم الهاتف</label>
                                            <Field
                                                id="input-phone"
                                                name="phone"
                                                placeholder="رقم الهاتف..."
                                                className="timlands-inputs"
                                            />
                                            {errors.phone && touched.phone ?
                                                <div style={{ overflow: 'hidden' }}>
                                                    <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                                        <p className="text">{errors.phone}</p>
                                                    </motion.div>
                                                </div>
                                                :
                                                null}
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="timlands-form">
                                            <label className="label-block" htmlFor="input-password">كلمة المرور</label>
                                            <Field
                                                id="input-password"
                                                type="password"
                                                name="password"
                                                placeholder="كلمة المرور..."
                                                className="timlands-inputs"
                                            />
                                            {errors.password && touched.password ?
                                                <div style={{ overflow: 'hidden' }}>
                                                    <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                                        <p className="text">{errors.password}</p>
                                                    </motion.div>
                                                </div>
                                                :
                                                null}
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="timlands-form">
                                            <label className="label-block" htmlFor="input-repassword">إعادة كلمة المرور</label>
                                            <Field
                                                type="password"
                                                id="input-repassword"
                                                name="repassword"
                                                placeholder="إعادة كلمة المرور..."
                                                className="timlands-inputs"
                                            />
                                            {errors.repassword && touched.repassword ?
                                                <div style={{ overflow: 'hidden' }}>
                                                    <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                                        <p className="text">{errors.repassword}</p>
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