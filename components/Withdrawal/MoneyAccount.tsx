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

function MoneyAccount({ token }) {
    const { data: Countries }: any = useSWR('api/withdrawals/countries')
    const { data: userInfo }: any = useSWR('api/me')
    const [validationsErrors, setValidationsErrors]: any = useState({})
    const [validationsGeneral, setValidationsGeneral]: any = useState({})
    const UpdateMoney = async (values) => {
        try {
            const res = await API.post(`api/withdrawals/update/bank`, values, {
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
            full_name: userInfo && userInfo.user_details.profile.bank_account && userInfo.user_details.profile.bank_account.full_name,
            amount: '',
            wise_country_id: userInfo && userInfo.user_details.profile.bank_account && userInfo.user_details.profile.bank_account.wise_country_id,
            bank_swift: userInfo && userInfo.user_details.profile.bank_account && userInfo.user_details.profile.bank_account.bank_swift,
            bank_iban: userInfo && userInfo.user_details.profile.bank_account && userInfo.user_details.profile.bank_account.wise_country_id,
            bank_adress_line_one: userInfo && userInfo.user_details.profile.bank_account && userInfo.user_details.profile.bank_account.bank_adress_line_one,
            city: userInfo && userInfo.user_details.profile.bank_account && userInfo.user_details.profile.bank_account.city,
            state: userInfo && userInfo.user_details.profile.bank_account && userInfo.user_details.profile.bank_account.state,
            bank_name: userInfo && userInfo.user_details.profile.bank_account && userInfo.user_details.profile.bank_account.bank_name,
            phone_number_without_code: userInfo && userInfo.user_details.profile.bank_account && userInfo.user_details.profile.bank_account.wise_country_id,
            address_line_one: userInfo && userInfo.user_details.profile.bank_account && userInfo.user_details.profile.bank_account.address_line_one,
            code_postal: userInfo && userInfo.user_details.profile.bank_account && userInfo.user_details.profile.bank_account.code_postal,
            bank_number_account: userInfo && userInfo.user_details.profile.bank_account && userInfo.user_details.profile.bank_account.bank_number_account,
            bank_branch: userInfo && userInfo.user_details.profile.bank_account && userInfo.user_details.profile.bank_account.bank_branch,
        },
        isInitialValid: true,
        enableReinitialize: true,
        onSubmit: async values => {
            try {
                setValidationsErrors({})
                const res = await API.post(`api/withdrawals/bank`, values, {
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
    // const noteContent = (
    //     <div>
    //         <ul>
    //             <li>من 5 دولار - 100 دولار مسموح له شراء الخدمة حتى 10 مرات</li>
    //             <li>من 101 دولار - 500 دولار مسموح له شراء الخدمة حتى 2 مره فقط للخدمة </li>
    //             <li>من 501 دولار - 1000 دولار مسموح له شراء الخدمة حتى 1 مره فقط</li>
    //         </ul>
    //     </div>
    // );
    const [quantutyCount, setQuantutyCount] = useState(null)
    const allowOnlyNumericsOrDigits = (evt) => {
        const financialGoal = (evt.target.validity.valid) ? evt.target.value : quantutyCount;
        setQuantutyCount(financialGoal);
    }
    return (
        <form onSubmit={formik.handleSubmit}>
            <div className={"timlands-panel" + (formik.isSubmitting ? ' is-loader' : '')}>
                <div className="page-header">
                    <h4 className="title">
                        الحساب البنكي
                    </h4>
                </div>
                <div className="timlands-content-form">
                    {validationsGeneral.msg && <Alert type="error">{validationsGeneral.msg}</Alert>}
                    <div className="row">
                        <div className="col-md-12">
                            <div className="timlands-form">
                                <label className="label-block" htmlFor="input-full_name">الاسم الكامل</label>
                                <input
                                    id="input-full_name"
                                    name="full_name"
                                    placeholder="الاسم الكامل..."
                                    className={"timlands-inputs " + (validationsErrors && validationsErrors.full_name && ' has-error')}
                                    autoComplete="off"
                                    onKeyUp={clearValidationHandle}
                                    onChange={formik.handleChange}
                                    value={formik.values.full_name}
                                />
                                {validationsErrors && validationsErrors.full_name &&
                                    <div style={{ overflow: 'hidden' }}>
                                        <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                            <p className="text">{validationsErrors.full_name[0]}</p>
                                        </motion.div>
                                    </div>}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="timlands-form">
                                <label className="label-block" htmlFor="input-bank_name">اسم البنك</label>
                                <input
                                    id="input-bank_name"
                                    name="bank_name"
                                    placeholder="اسم البنك..."
                                    className={"timlands-inputs " + (validationsErrors && validationsErrors.bank_name && ' has-error')}
                                    autoComplete="off"
                                    onKeyUp={clearValidationHandle}
                                    onChange={formik.handleChange}
                                    value={formik.values.bank_name}
                                />
                                {validationsErrors && validationsErrors.bank_name &&
                                    <div style={{ overflow: 'hidden' }}>
                                        <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                            <p className="text">{validationsErrors.bank_name[0]}</p>
                                        </motion.div>
                                    </div>}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="timlands-form">
                                <label className="label-block" htmlFor="input-bank_swift">كود SWIFT</label>
                                <input
                                    id="input-bank_swift"
                                    name="bank_swift"
                                    placeholder="كود SWIFT..."
                                    className={"timlands-inputs " + (validationsErrors && validationsErrors.bank_swift && ' has-error')}
                                    autoComplete="off"
                                    onKeyUp={clearValidationHandle}
                                    onChange={formik.handleChange}
                                    value={formik.values.bank_swift}
                                />
                                {validationsErrors && validationsErrors.bank_swift &&
                                    <div style={{ overflow: 'hidden' }}>
                                        <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                            <p className="text">{validationsErrors.bank_swift[0]}</p>
                                        </motion.div>
                                    </div>}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="timlands-form">
                                <label className="label-block" htmlFor="input-bank_iban">رقم الإيبان IBAN</label>
                                <input
                                    id="input-bank_iban"
                                    name="bank_iban"
                                    placeholder="رقم الإيبان IBAN..."
                                    className={"timlands-inputs " + (validationsErrors && validationsErrors.bank_iban && ' has-error')}
                                    autoComplete="off"
                                    onKeyUp={clearValidationHandle}
                                    onChange={formik.handleChange}
                                    value={formik.values.bank_iban}
                                />
                                {validationsErrors && validationsErrors.bank_iban &&
                                    <div style={{ overflow: 'hidden' }}>
                                        <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                            <p className="text">{validationsErrors.bank_iban[0]}</p>
                                        </motion.div>
                                    </div>}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="timlands-form">
                                <label className="label-block" htmlFor="input-bank_number_account">الحساب البنكي</label>
                                <input
                                    id="input-bank_number_account"
                                    name="bank_number_account"
                                    placeholder="الحساب البنكي..."
                                    className={"timlands-inputs " + (validationsErrors && validationsErrors.bank_number_account && ' has-error')}
                                    autoComplete="off"
                                    onKeyUp={clearValidationHandle}
                                    onChange={formik.handleChange}
                                    value={formik.values.bank_number_account}
                                />
                                {validationsErrors && validationsErrors.bank_number_account &&
                                    <div style={{ overflow: 'hidden' }}>
                                        <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                            <p className="text">{validationsErrors.bank_number_account[0]}</p>
                                        </motion.div>
                                    </div>}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="timlands-form">
                                <label className="label-block" htmlFor="input-bank_branch">الفرع البنكي</label>
                                <input
                                    id="input-bank_branch"
                                    name="bank_branch"
                                    placeholder="الفرع البنكي..."
                                    className={"timlands-inputs " + (validationsErrors && validationsErrors.bank_branch && ' has-error')}
                                    autoComplete="off"
                                    onKeyUp={clearValidationHandle}
                                    onChange={formik.handleChange}
                                    value={formik.values.bank_branch}
                                />
                                {validationsErrors && validationsErrors.bank_branch &&
                                    <div style={{ overflow: 'hidden' }}>
                                        <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                            <p className="text">{validationsErrors.bank_branch[0]}</p>
                                        </motion.div>
                                    </div>}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="timlands-form">
                                <label className="label-block" htmlFor="input-wise_country_id">اختر البلد</label>
                                <select
                                    id="input-wise_country_id"
                                    name="wise_country_id"
                                    className={"timlands-inputs select " + (validationsErrors && validationsErrors.wise_country_id && ' has-error')}
                                    autoComplete="off"
                                    onChange={formik.handleChange}
                                    value={formik.values.wise_country_id}
                                >
                                    <option value="">اختر البلد</option>
                                    {!Countries && <option value="">يرجى الانتظار...</option>}
                                    {Countries && Countries.data.map((e: any) => (
                                        <option value={e.id} key={e.id}>{e.ar_name}</option>
                                    ))}
                                </select>
                                {validationsErrors && validationsErrors.wise_country_id &&
                                    <div style={{ overflow: 'hidden' }}>
                                        <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                            <p className="text">{validationsErrors.wise_country_id[0]}</p>
                                        </motion.div>
                                    </div>}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="timlands-form">
                                <label className="label-block" htmlFor="input-state">المحافظة/الولاية</label>
                                <input
                                    id="input-state"
                                    name="state"
                                    placeholder="المحافظة/الولاية"
                                    className={"timlands-inputs " + (validationsErrors && validationsErrors.state && ' has-error')}
                                    autoComplete="off"
                                    onKeyUp={clearValidationHandle}
                                    onChange={formik.handleChange}
                                    value={formik.values.state}
                                />
                                {validationsErrors && validationsErrors.state &&
                                    <div style={{ overflow: 'hidden' }}>
                                        <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                            <p className="text">{validationsErrors.state[0]}</p>
                                        </motion.div>
                                    </div>}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="timlands-form">
                                <label className="label-block" htmlFor="input-city">المدينة/البلدية</label>
                                <input
                                    id="input-city"
                                    name="city"
                                    placeholder="المدينة/البلدية"
                                    className={"timlands-inputs " + (validationsErrors && validationsErrors.city && ' has-error')}
                                    autoComplete="off"
                                    onKeyUp={clearValidationHandle}
                                    onChange={formik.handleChange}
                                    value={formik.values.city}
                                />
                                {validationsErrors && validationsErrors.city &&
                                    <div style={{ overflow: 'hidden' }}>
                                        <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                            <p className="text">{validationsErrors.city[0]}</p>
                                        </motion.div>
                                    </div>}
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="timlands-form">
                                <label className="label-block" htmlFor="input-bank_adress_line_one">العنوان البنكي</label>
                                <input
                                    id="input-bank_adress_line_one"
                                    name="bank_adress_line_one"
                                    placeholder="العنوان البنكي"
                                    className={"timlands-inputs " + (validationsErrors && validationsErrors.bank_adress_line_one && ' has-error')}
                                    autoComplete="off"
                                    onKeyUp={clearValidationHandle}
                                    onChange={formik.handleChange}
                                    value={formik.values.bank_adress_line_one}
                                />
                                {validationsErrors && validationsErrors.bank_adress_line_one &&
                                    <div style={{ overflow: 'hidden' }}>
                                        <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                            <p className="text">{validationsErrors.bank_adress_line_one[0]}</p>
                                        </motion.div>
                                    </div>}
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="timlands-form">
                                <label className="label-block" htmlFor="input-address_line_one">العنوان الشخصي</label>
                                <input
                                    id="input-address_line_one"
                                    name="address_line_one"
                                    placeholder="العنوان الشخصي"
                                    className={"timlands-inputs " + (validationsErrors && validationsErrors.address_line_one && ' has-error')}
                                    autoComplete="off"
                                    onKeyUp={clearValidationHandle}
                                    onChange={formik.handleChange}
                                    value={formik.values.address_line_one}
                                />
                                {validationsErrors && validationsErrors.address_line_one &&
                                    <div style={{ overflow: 'hidden' }}>
                                        <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                            <p className="text">{validationsErrors.address_line_one[0]}</p>
                                        </motion.div>
                                    </div>}
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="timlands-form">
                                <label className="label-block" htmlFor="input-code_postal">الرمز البريدي</label>
                                <input
                                    id="input-code_postal"
                                    name="code_postal"
                                    placeholder="الرمز البريدي"
                                    className={"timlands-inputs " + (validationsErrors && validationsErrors.code_postal && ' has-error')}
                                    autoComplete="off"
                                    onKeyUp={clearValidationHandle}
                                    onChange={formik.handleChange}
                                    value={formik.values.code_postal}
                                />
                                {validationsErrors && validationsErrors.code_postal &&
                                    <div style={{ overflow: 'hidden' }}>
                                        <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                            <p className="text">{validationsErrors.code_postal[0]}</p>
                                        </motion.div>
                                    </div>}
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className="timlands-form">
                                <label className="label-block" htmlFor="input-phone_number_without_code">رقم هاتف المستلم</label>
                                <input
                                    id="input-phone_number_without_code"
                                    name="phone_number_without_code"
                                    placeholder="رقم هاتف المستلم"
                                    className={"timlands-inputs " + (validationsErrors && validationsErrors.phone_number_without_code && ' has-error')}
                                    autoComplete="off"
                                    onKeyUp={clearValidationHandle}
                                    onChange={formik.handleChange}
                                    value={formik.values.phone_number_without_code}
                                />
                                {validationsErrors && validationsErrors.phone_number_without_code &&
                                    <div style={{ overflow: 'hidden' }}>
                                        <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                            <p className="text">{validationsErrors.phone_number_without_code[0]}</p>
                                        </motion.div>
                                    </div>}
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="timlands-form">
                                <label className="label-block lg" htmlFor="input-amount">المبلغ الذي تريد تحويله ($)</label>
                                <p className="label-note">يجب ان يكون المبلغ الذي تريد تحويل على الأقل 50$</p>
                                <input
                                    id="input-amount"
                                    name="amount"
                                    type='number'
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
MoneyAccount.getLayout = function getLayout(page: any): ReactElement {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
export default MoneyAccount
MoneyAccount.propTypes = {
    token: PropTypes.any,
};