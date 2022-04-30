import Layout from '../../components/Layout/HomeLayout'
import { ReactElement, useState } from "react";
import { useFormik } from 'formik';
import { message } from 'antd';
import { motion } from 'framer-motion';
import API from "../../config";
import PropTypes from "prop-types";
import { Alert } from '../Alert/Alert';
import router from 'next/router';

function Paypal({ token, create,userInfo={}, setIsShowBankTransfert }) {
    const [validationsErrors, setValidationsErrors]: any = useState({})
    const [validationsGeneral, setValidationsGeneral]: any = useState({})
    const UpdateMoney = async (values) => {
        try {
            const url = create?`api/withdrawal/store_paypal` :`api/withdrawal/update_paypal`
            const res = await API.post(`${url}`, values, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            // Authentication was successful.
            if (res.status === 200) {
                message.success('لقد تم حفظ البيانات بنجاح')
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
    const clearValidationHandle = () => {
        setValidationsGeneral({})
        setValidationsErrors({})
    }
    const formik = useFormik({
        initialValues: {
            amount: '',
            email: userInfo&&userInfo.email||'',
        },
        isInitialValid: true,
        enableReinitialize: true,
        onSubmit: async values => {
            setValidationsErrors({})
            try {
                const url = create?`api/withdrawals/update_paypal`:`api/withdrawals/store_paypal`

                const res = await API.post(`${url}`, values, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                // Authentication was successful.
                if (res.status === 200) {
                    message.success('لقد تم ارسال طلب السحب إلى الإدارة')
                    router.push('/mywallet')
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
                <div className="page-header d-flex">
                    <h4 className="title">حساب الباييال Paypal</h4>
                    <button type='button' onClick={() => setIsShowBankTransfert(false)} className='btn-close ml-auto'></button>
                </div>
                <div className="timlands-content-form">
                    {validationsGeneral.msg && <Alert type="error">{validationsGeneral.msg}</Alert>}
                    <div className="row">
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
                                <button type="submit" onClick={UpdateMoney} className="btn flex-center butt-green me-auto butt-lg">
                                    <span className="text">حفظ التغييرات</span>
                                </button>
                                <button type="button" onClick={() => setIsShowBankTransfert(false)} className="btn flex-center butt-red ml-auto butt-lg">
                                    <span className="text">إخفاء التعديل</span>
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
    setIsShowBankTransfert: PropTypes.func,
};