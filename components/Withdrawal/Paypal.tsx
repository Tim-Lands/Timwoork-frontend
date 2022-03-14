import Layout from '../../components/Layout/HomeLayout'
import { ReactElement, useState } from "react";
import { useFormik } from 'formik';
import { message } from 'antd';
import { motion } from 'framer-motion';
import API from "../../config";
import PropTypes from "prop-types";
import { Alert } from '../Alert/Alert';

function Paypal({ token }) {
    const [validationsErrors, setValidationsErrors]: any = useState({})
    const [validationsGeneral, setValidationsGeneral]: any = useState({})

    const clearValidationHandle = () => {
        setValidationsGeneral({})
        setValidationsErrors({})
    }
    const formik = useFormik({
        initialValues: {
            amount: '',
            email: '',
        },
        isInitialValid: true,
        enableReinitialize: true,
        onSubmit: async values => {
            setValidationsErrors({})
            try {
                const res = await API.post(`api/withdrawals/paypal`, values, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                // Authentication was successful.
                if (res.status === 200) {
                    message.success('لقد تم ارسال طلب السحب إلى الإدارة')
                }
            } catch (error: any) {
                if (error.response && error.response.data && error.response.data.errors) {
                    setValidationsErrors(error.response.data.errors);
                }
                if (error.response && error.response.data) {
                    setValidationsGeneral(error.response.data);
                }
            }

        }
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <div className={"timlands-panel" + (formik.isSubmitting ? ' is-loader' : '')}>
                <div className="page-header">
                    <h4 className="title">حساب الباييال Paypal</h4>
                </div>
                <div className="timlands-content-form">
                    {validationsGeneral.msg && <Alert type="error">{validationsGeneral.msg}</Alert>}

                    <div className="row">
                        <div className="col-md-12">
                            <div className="timlands-form">
                                <label className="label-block lg" htmlFor="input-amount">المبلغ الذي تريد تحويله ($)</label>
                                <p className="label-note">يجب ان يكون المبلغ الذي تريد تحويل على الأقل 10$</p>
                                <input
                                    id="input-amount"
                                    name="amount"
                                    placeholder="المبلغ الذي تريد تحويله ($)"
                                    className={"timlands-inputs lg " + (validationsErrors && validationsErrors.amount && ' has-error')}
                                    autoComplete="off"
                                    onKeyUp={clearValidationHandle}
                                    onChange={formik.handleChange}
                                    value={formik.values.amount}
                                />
                                {validationsErrors && validationsErrors.amount &&
                                    <div style={{ overflow: 'hidden' }}>
                                        <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                            <p className="text">{validationsErrors.amount[0]}</p>
                                        </motion.div>
                                    </div>}
                            </div>
                            <hr />
                        </div>
                        <div className="col-md-12">
                            <div className="timlands-form">
                                <label className="label-block" htmlFor="input-email">البريد الإلكتروني</label>
                                <input
                                    id="input-email"
                                    name="email"
                                    placeholder="البريد الإلكتروني..."
                                    className={"timlands-inputs " + (validationsErrors && validationsErrors.email && ' has-error')}
                                    autoComplete="off"
                                    onKeyUp={clearValidationHandle}
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                />
                                {validationsErrors && validationsErrors.email &&
                                    <div style={{ overflow: 'hidden' }}>
                                        <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                            <p className="text">{validationsErrors.email[0]}</p>
                                        </motion.div>
                                    </div>}
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="py-4 d-flex">
                                <span className="me-auto">
                                    <button type="submit" disabled={formik.isSubmitting} className="btn flex-center butt-primary ml-auto butt-lg">
                                        <span className="text">حفظ التغييرات</span>
                                    </button>
                                </span>
                                <button type="submit" disabled={formik.isSubmitting} className="btn flex-center butt-green ml-auto butt-lg">
                                    <span className="text">طلب سحب</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}
Paypal.getLayout = function getLayout(page: any): ReactElement {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
export default Paypal
Paypal.propTypes = {
    token: PropTypes.any,
};