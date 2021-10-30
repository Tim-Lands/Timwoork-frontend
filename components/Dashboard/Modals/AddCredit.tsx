import axios from "axios"
import { motion } from "framer-motion"
import { ReactElement } from "react"
import PropTypes from "prop-types";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
    priceAmount: Yup.number().required('هذا الحقل إجباري'),
    priceEmail: Yup.string().required('هذا الحقل إجباري'),
});
export default function AddCredit({ setIsModalHiddenHandle }: any): ReactElement {
    return (
        <>
            <div className="panel-modal-overlay"></div>
            <div className="panel-modal modal-add-new">
                <div className="panel-modal-header">
                    <h2 className="title"><span className="material-icons material-icons-outlined">add_box</span>إضافة رصيد</h2>
                    <div className="panel-modal-left-tools">
                        <button onClick={setIsModalHiddenHandle} className="close-modal">
                            <span className="material-icons material-icons-outlined">close</span>
                        </button>
                    </div>
                </div>

                <Formik
                    initialValues={{
                        priceAmount: '',
                        priceEmail: ''
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
                                    <div className="col-sm-7">
                                        <div className="timlands-form">
                                            <label className="label-block" htmlFor="input-fname">المبلغ</label>
                                            <Field
                                                id="input-fname"
                                                name="priceAmount"
                                                placeholder="أدخل المبلغ..."
                                                className={"timlands-input" + ((errors.priceAmount && touched.priceAmount) ? ' has-error' : '')}
                                                autoComplete="off"
                                            />
                                            {errors.priceAmount && touched.priceAmount ?
                                                <div style={{ overflow: 'hidden' }}>
                                                    <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                                        <p className="text">{errors.priceAmount}</p>
                                                    </motion.div>
                                                </div>
                                                :
                                                null}
                                        </div>
                                        <div className="timlands-form">
                                            <label className="label-block" htmlFor="input-fname">المبلغ</label>
                                            <Field
                                                id="input-fname"
                                                name="priceEmail"
                                                placeholder="أدخل المبلغ..."
                                                className={"timlands-input" + ((errors.priceEmail && touched.priceEmail) ? ' has-error' : '')}
                                                autoComplete="off"
                                            />
                                            {errors.priceEmail && touched.priceEmail ?
                                                <div style={{ overflow: 'hidden' }}>
                                                    <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                                        <p className="text">{errors.priceEmail}</p>
                                                    </motion.div>
                                                </div>
                                                :
                                                null}
                                        </div>
                                    </div>
                                    <div className="col-sm-5">
                                        <div className="forms-methods">
                                            <div className="forms-methods-header">
                                                <h3 className="title">اختر طريقة الدفع</h3>
                                            </div>

                                            <fieldset>
                                                <div className="toggle">
                                                    <input type="radio" name="sizeBy" value="weight" id="sizeWeight" />
                                                    <label htmlFor="sizeWeight">عن طريق البايبال Paypal <img src="/a2.png" alt="" /></label>

                                                    <input type="radio" name="sizeBy" value="dimensions" id="sizeDimensions" />
                                                    <label htmlFor="sizeDimensions">بواسطة American Express <img src="/a1.png" alt="" /></label>

                                                    <input type="radio" name="sizeBy" value="dimensions2" id="sizeDimensions2" />
                                                    <label htmlFor="sizeDimensions2">بواسطة Visa Card <img src="/a3.png" alt="" /></label>

                                                    <input type="radio" name="sizeBy" value="dimensions4" id="sizeDimensions3" />
                                                    <label htmlFor="sizeDimensions3">بواسطة MasterCard <img src="/a4.png" alt="" /></label>
                                                </div>
                                            </fieldset>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="panel-modal-footer">
                                <button onClick={setIsModalHiddenHandle} type="button" className="btn butt-red butt-sm">إغلاق</button>
                                <button type="submit" disabled={isSubmitting} className="btn butt-primary butt-sm">المتابعة</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    )
}
AddCredit.propTypes = {
    setIsModalHiddenHandle: PropTypes.func,
};