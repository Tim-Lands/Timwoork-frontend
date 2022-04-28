import Layout from '../../components/Layout/HomeLayout'
import { ReactElement, useEffect, useState } from "react";
import { useFormik } from 'formik';
import router from 'next/router';
import Cookies from 'js-cookie'
//import useSWR from 'swr'
import { MetaTags } from '@/components/SEO/MetaTags'
import BankAccount from '@/components/Withdrawal/BankAccount';
import MoneyAccount from '@/components/Withdrawal/MoneyAccount';
import Paypal from '@/components/Withdrawal/Paypal';
import Wise from '@/components/Withdrawal/Wise';
import useSWR from 'swr';
import { Alert } from '@/components/Alert/Alert';
import Loading from '@/components/Loading';
import { motion } from 'framer-motion';

function Withdrawal() {
    const token = Cookies.get('token')
    const { data: userInfo }: any = useSWR('api/me')
    //const veriedEmail = userInfo && userInfo.user_details.email_verified_at
    const [validationsErrors, setValidationsErrors]: any = useState({})
    const [validationsGeneral, setValidationsGeneral]: any = useState({})
    const formik = useFormik({
        initialValues: {
            withdrawal_type: 1,
            amount: ''
        },
        onSubmit: async values => {
            console.log(values);
            return
        }
    });
    useEffect(() => {
        if (!token) {
            router.push('/login')
            return
        }
    }, [])
    const [AmountCount, setAmountCount] = useState(null)
    const allowOnlyNumericsOrDigits = (evt) => {
        const financialGoal = (evt.target.validity.valid) ? evt.target.value : AmountCount;
        setAmountCount(financialGoal);
    }
    const clearValidationHandle = () => {
        setValidationsGeneral({})
        setValidationsErrors({})
    }
    return (
        <>
            <MetaTags
                title="طلب السحب"
                metaDescription="طلب السحب"
                ogDescription="طلب السحب"
            />
            {!userInfo && <Loading />}
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="withdrawable-sidebar">
                            <form onSubmit={formik.handleSubmit}>
                                <div className="list-group list-group-checkable">
                                    {validationsGeneral.msg && <Alert type="error">{validationsGeneral.msg}</Alert>}
                                    <div className="">
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
                                    <div className="row transfert-box">

                                        <div className="col-12">
                                            <input className="list-group-item-check" type="radio" name="listGroupCheckableRadios" id="listGroupCheckableRadios1" value="1" checked />
                                            <label className="list-group-item py-3" htmlFor="listGroupCheckableRadios1">
                                                <img src="/banktransfert.png" alt="" width={35} height={35} style={{ borderRadius: '50%', marginLeft: 6 }} />
                                                تحويل بنكي
                                            </label>
                                        </div>
                                        <button type='button' className='btn-edit'>
                                            <span className="material-icons material-icons-outlined">edit</span>
                                        </button>
                                    </div>
                                    <div className="row transfert-box">
                                        <div className="col-12">
                                            <input className="list-group-item-check" type="radio" name="listGroupCheckableRadios" id="transfert-money" value="0" checked />
                                            <label className="list-group-item py-3" htmlFor="transfert-money">
                                                <img src="/transfert1.jpg" alt="" width={35} height={35} style={{ borderRadius: '50%', marginLeft: 6 }} />
                                                الحوالة المالية
                                            </label>
                                        </div>
                                        <button type='button' className='btn-edit'>
                                            <span className="material-icons material-icons-outlined">edit</span>
                                        </button>
                                    </div>
                                    <div className="row transfert-box">
                                        <div className="col-12">
                                            <input className="list-group-item-check" type="radio" name="listGroupCheckableRadios" id="transfert-wise" value="3" />
                                            <label className="list-group-item py-3" htmlFor="transfert-wise">
                                                <img src="/wise1.png" alt="" width={35} height={35} style={{ borderRadius: '50%', marginLeft: 6 }} />
                                                تحويل وايز Wise
                                            </label>
                                        </div>
                                        <button type='button' className='btn-edit'>
                                            <span className="material-icons material-icons-outlined">edit</span>
                                        </button>
                                    </div>
                                    <div className="row transfert-box">
                                        <div className="col-12">
                                            <input className="list-group-item-check" type="radio" name="listGroupCheckableRadios" id="transfert-paypal" value="2" />
                                            <label className="list-group-item py-3" htmlFor="transfert-paypal">
                                                <img src="/paypal1.webp" alt="" width={35} height={35} style={{ borderRadius: '50%', marginLeft: 6 }} />
                                                تحويل وايز Paypal
                                            </label>
                                        </div>
                                        <button type='button' className='btn-edit'>
                                            <span className="material-icons material-icons-outlined">edit</span>
                                        </button>
                                    </div>
                                    <hr />
                                    <div className="py-2">
                                        <button type='submit' className='btn butt-lg butt-primary' style={{ width: '100%' }}>
                                            طلب السحب
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        {formik.values.withdrawal_type == 0 && <>
                            <BankAccount token={token} />
                        </>}
                        {formik.values.withdrawal_type == 1 && <>
                            <MoneyAccount token={token} />
                        </>}
                        {formik.values.withdrawal_type == 2 && <Paypal token={token} />}
                        {formik.values.withdrawal_type == 3 && <Wise token={token} />}
                    </div>
                </div>
            </div>
        </>
    )
}
Withdrawal.getLayout = function getLayout(page: any): ReactElement {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
export default Withdrawal