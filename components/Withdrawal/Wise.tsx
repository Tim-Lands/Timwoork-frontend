import Layout from '../../components/Layout/HomeLayout'
import { ReactElement, useState } from "react";
import { useFormik } from 'formik';
import { message } from 'antd';
import { motion } from 'framer-motion';
import API from "../../config";
import PropTypes from "prop-types";
import useSWR from 'swr';
import { Alert } from '../Alert/Alert';
import router from 'next/router';

function Wise({ token }) {
    const { data: userInfo }: any = useSWR('api/me')
    const [validationsErrors, setValidationsErrors]: any = useState({})
    const [validationsGeneral, setValidationsGeneral]: any = useState({})
    const UpdateMoney = async (values) => {
        try {
            const res = await API.post(`api/withdrawals/update/wise`, values, {
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
            email: userInfo && userInfo.user_details.profile.wise_account && userInfo.user_details.profile.wise_account.email,
            amount: '',
        },
        isInitialValid: true,
        enableReinitialize: true,
        onSubmit: async values => {
            setValidationsErrors({})
            try {
                const res = await API.post(`api/withdrawals/wise`, values, {
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
    const [quantutyCount, setQuantutyCount] = useState(null)
    const allowOnlyNumericsOrDigits = (evt) => {
        const financialGoal = (evt.target.validity.valid) ? evt.target.value : quantutyCount;
        setQuantutyCount(financialGoal);
    }
    return (
        <form onSubmit={formik.handleSubmit}>
            <div className={"timlands-panel" + (formik.isSubmitting ? ' is-loader' : '')}>
                <div className="page-header">
                    <h4 className="title">حساب الوايز Wise</h4>
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
                                    onInput={allowOnlyNumericsOrDigits}
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
                                    <button type="submit" disabled={formik.isSubmitting} onClick={() => UpdateMoney(formik.values)} className="btn flex-center butt-primary ml-auto butt-lg">
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
Wise.getLayout = function getLayout(page: any): ReactElement {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
export default Wise
Wise.propTypes = {
    token: PropTypes.any,
};