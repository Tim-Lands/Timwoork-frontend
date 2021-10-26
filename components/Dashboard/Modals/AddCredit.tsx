import axios from "axios"
import { motion } from "framer-motion"
import { ReactElement, useState } from "react"
import PropTypes from "prop-types";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
    priceAmount: Yup.number().required('هذا الحقل إجباري'),
});
export default function AddCredit({ setIsModalHiddenHandle }: any): ReactElement {
    const [isChecked, setIsChecked] = useState(false)
    const checkedHandle = (e) => {
        if (e.target.checked) {
            setIsChecked(true)
        }else {
            setIsChecked(false)
        }
    }
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
                                    </div>
                                    <div className="col-sm-5">
                                        <div className="forms-methods">
                                            <div className="forms-methods-header">
                                                <h3 className="title">اختر طريقة الدفع</h3>
                                            </div>
                                            <div className="checked-items-list">
                                                <div className={"checked-item" + (isChecked ? ' checked' : '')}>
                                                    <img src="/master.png" className="payment-method-icon" alt="" />
                                                    <label htmlFor="ddd">Wise Transfert</label>
                                                    <input className="checked-radio" onChange={checkedHandle} type="radio" name="eee" value="70077" id="ddd" />
                                                </div>
                                                <div className={"checked-item" + (isChecked ? ' checked' : '')}>
                                                    <img src="/master.png" className="payment-method-icon" alt="" />
                                                    <label htmlFor="ddd">Paypal </label>
                                                    <input className="checked-radio" onChange={checkedHandle} type="radio" name="eee" value="7787" id="ddd" />
                                                </div>
                                                <div className={"checked-item" + (isChecked ? ' checked' : '')}>
                                                    <img src="/master.png" className="payment-method-icon" alt="" />
                                                    <label htmlFor="ddd2">Visa Card</label>
                                                    <input className="checked-radio" onChange={checkedHandle} type="radio" name="eee" value="888" id="ddd2" />
                                                </div>
                                                <div className={"checked-item" + (isChecked ? ' checked' : '')}>
                                                    <img src="/master.png" className="payment-method-icon" alt="" />
                                                    <label htmlFor="ddd2">Master Card</label>
                                                    <input className="checked-radio" onChange={checkedHandle} type="radio" name="eee" value="80088" id="ddd2" />
                                                </div>
                                            </div>
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