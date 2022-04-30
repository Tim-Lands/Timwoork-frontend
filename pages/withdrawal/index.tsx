import Layout from '../../components/Layout/HomeLayout'
import { message } from 'antd';
import { ReactElement, useEffect, useState } from "react";
import { useFormik } from 'formik';
import router from 'next/router';
import Cookies from 'js-cookie'
//import useSWR from 'swr'
import { MetaTags } from '@/components/SEO/MetaTags'
import BankAccount from '@/components/Withdrawal/BankAccount'
import MoneyAccount from '@/components/Withdrawal/MoneyAccount';
import Paypal from '@/components/Withdrawal/Paypal';
import Wise from '@/components/Withdrawal/Wise';
import useSWR from 'swr';
import { Alert } from '@/components/Alert/Alert';
import Loading from '@/components/Loading';
import { motion } from 'framer-motion';
import BankAccountCart from '@/components/Withdrawal/BankAccountCart';
import MoneyAccountCart from '@/components/Withdrawal/MoneyAccountCart';
import PaypalCart from '@/components/Withdrawal/PaypalCart';
import WiseCart from '@/components/Withdrawal/WiseCart';
import API from '../../config'
function Withdrawal() {
    let token = Cookies.get('token')
    if (!token && typeof window !== "undefined")
        token = localStorage.getItem('token');
    const { data: userInfo }: any = useSWR('api/me')
    //const veriedEmail = userInfo && userInfo.user_details.email_verified_at
    const [paymentInfo, setPaymentInfo] = useState({ bank_account: {}, bank_transfer_detail: {}, paypal_account: {}, wise_account: {} });
    const [isShowBankTransfert, setIsShowBankTransfert]: any = useState(false)
    const [isShowMoneyTransfert, setIsShowMoneyTransfert]: any = useState(false)
    const [isShowWiseTransfert, setIsShowWiseTransfert]: any = useState(false)
    const [isShowPaypalTransfert, setIsShowPaypalTransfert]: any = useState(false)
    const [validationsErrors, setValidationsErrors]: any = useState({})
    const [validationsGeneral, setValidationsGeneral]: any = useState({})
    const [isPaymentAvailable, setIsPaymentAvailable]: any = useState({})

    const sendMoney = async () => {
        let url = 'api/withdrawals/withdrawal_';
        console.log(formik.values.withdrawal_type)
        switch (formik.values.withdrawal_type) {
            case '1':
                url += 'bank';
                break;
            case '0':
                url += 'bank_transfer';
                break;
            case '2':
                url += 'paypal';
                console.log(url)
                break;
            case '3':
                url += 'wise';
                break;
        }
        try {
            const res = await API.post(url, {amount:formik.values.amount}, {
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

    const formik = useFormik({
        initialValues: {
            withdrawal_type: 1,
            amount: ''
        },
        onSubmit:sendMoney
    });
    useEffect(() => {
        if (!token) {
            router.push('/login')
            return
        }
    }, [])
    useEffect(() => {
        console.log(userInfo)
        if (userInfo && userInfo.user_details) {
            console.log(userInfo)
            const { bank_account, bank_transfer_detail, paypal_account, wise_account } = userInfo.user_details.profile
            console.log(bank_account)
            setPaymentInfo({ bank_account, bank_transfer_detail, paypal_account, wise_account })
            setIsPaymentAvailable({
                bank_account: bank_account ? true : false,
                bank_transfer_detail: bank_transfer_detail ? true : false,
                paypal_account: paypal_account ? true : false
                , wise_account: wise_account ? true : false
            })
        }

    }, [userInfo])
    const [AmountCount, setAmountCount] = useState(null)
    const allowOnlyNumericsOrDigits = (evt) => {
        const financialGoal = (evt.target.validity.valid) ? evt.target.value : AmountCount;
        setAmountCount(financialGoal);
    }
    const clearValidationHandle = () => {
        setValidationsGeneral({})
        setValidationsErrors({})
    }

    const togglePaymentWindow = (withdrawal_type: number) => {
        setIsShowBankTransfert(false);
        setIsShowMoneyTransfert(false);
        setIsShowPaypalTransfert(false);
        setIsShowWiseTransfert(false);
        console.log(withdrawal_type)
        switch (withdrawal_type) {
            case 0:
                setIsShowMoneyTransfert(true);
                break;
            case 1:
                setIsShowBankTransfert(true);
                break;
            case 2:
                setIsShowPaypalTransfert(true)
                break;
            case 3:
                setIsShowWiseTransfert(true)
                break;
        }
        formik.setFieldValue('withdrawal_type', withdrawal_type)
        console.log(formik.values)
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
                                            <input disabled={!isPaymentAvailable['bank_account']} onChange={formik.handleChange} className="list-group-item-check" type="radio" name="withdrawal_type" id="listGroupCheckableRadios1" value="1" />
                                            <label className="list-group-item py-3" htmlFor="listGroupCheckableRadios1">
                                                <img src="/banktransfert.png" alt="" width={35} height={35} style={{ borderRadius: '50%', marginLeft: 6 }} />
                                                تحويل بنكي
                                            </label>
                                        </div>
                                        <button type='button' className='btn-edit' onClick={() => togglePaymentWindow(1)}>
                                            <span className="material-icons material-icons-outlined">{isPaymentAvailable['bank_account'] ? 'edit' : 'add'}</span>
                                        </button>
                                    </div>
                                    <div className="row transfert-box">
                                        <div className="col-12">
                                            <input disabled={!isPaymentAvailable['bank_transfer_detail']} onChange={formik.handleChange} className="list-group-item-check" type="radio" name="withdrawal_type" id="transfert-money" value="0" />
                                            <label className="list-group-item py-3" htmlFor="transfert-money">
                                                <img src="/transfert1.jpg" alt="" width={35} height={35} style={{ borderRadius: '50%', marginLeft: 6 }} />
                                                الحوالة المالية
                                            </label>
                                        </div>
                                        <button type='button' className='btn-edit' onClick={() => togglePaymentWindow(0)}>
                                            <span className="material-icons material-icons-outlined">{isPaymentAvailable['bank_transfer_detail'] ? 'edit' : 'add'}</span>
                                        </button>
                                    </div>
                                    <div className="row transfert-box">
                                        <div className="col-12">
                                            <input disabled={!isPaymentAvailable['wise_account']} onChange={formik.handleChange} className="list-group-item-check" type="radio" name="withdrawal_type" id="transfert-wise" value="3" />
                                            <label className="list-group-item py-3" htmlFor="transfert-wise">
                                                <img src="/wise1.png" alt="" width={35} height={35} style={{ borderRadius: '50%', marginLeft: 6 }} />
                                                تحويل وايز Wise
                                            </label>
                                        </div>
                                        <button type='button' className='btn-edit' onClick={() => togglePaymentWindow(3)}>
                                            <span className="material-icons material-icons-outlined">{isPaymentAvailable['wise_account'] ? 'edit' : 'add'}</span>
                                        </button>
                                    </div>
                                    <div className="row transfert-box">
                                        <div className="col-12">
                                            <input disabled={!isPaymentAvailable['paypal_account']} onChange={formik.handleChange} className="list-group-item-check" type="radio" name="withdrawal_type" id="transfert-paypal" value="2" />
                                            <label className="list-group-item py-3" htmlFor="transfert-paypal">
                                                <img src="/paypal1.webp" alt="" width={35} height={35} style={{ borderRadius: '50%', marginLeft: 6 }} />
                                                تحويل بايبال Paypal
                                            </label>
                                        </div>
                                        <button type='button' className='btn-edit' onClick={() => togglePaymentWindow(2)}>
                                            <span className="material-icons material-icons-outlined">{isPaymentAvailable['paypal_account'] ? 'edit' : 'add'}</span>
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
                            {!isShowMoneyTransfert && isPaymentAvailable['bank_account'] && <BankAccountCart setIsShowBankTransfert={setIsShowMoneyTransfert} userInfo={paymentInfo.bank_transfer_detail} />}
                            {isShowMoneyTransfert && <BankAccount create={isPaymentAvailable['bank_transfer_detail']} token={token} setIsShowBankTransfert={setIsShowMoneyTransfert} />}
                        </>}
                        {formik.values.withdrawal_type == 1 && <>
                            {!isShowBankTransfert && <MoneyAccountCart setIsShowBankTransfert={setIsShowBankTransfert} userInfo={paymentInfo.bank_account} />}
                            {isShowBankTransfert && <MoneyAccount create={isPaymentAvailable['bank_account']} token={token} setIsShowBankTransfert={setIsShowBankTransfert} />}
                        </>}
                        {formik.values.withdrawal_type == 3 && <>
                            {!isShowWiseTransfert && <WiseCart token={token} setIsShowBankTransfert={setIsShowWiseTransfert} userInfo={paymentInfo.wise_account} />}
                            {isShowWiseTransfert && <Wise create={isPaymentAvailable['wise_account']} token={token} setIsShowBankTransfert={setIsShowWiseTransfert} />}
                        </>}
                        {formik.values.withdrawal_type == 2 && <>
                            {!isShowPaypalTransfert && <PaypalCart token={token} setIsShowBankTransfert={setIsShowPaypalTransfert} userInfo={paymentInfo.paypal_account} />}
                            {isShowPaypalTransfert && <Paypal userInfo={paymentInfo.paypal_account} create={isPaymentAvailable['paypal_account']} token={token} setIsShowBankTransfert={setIsShowPaypalTransfert} />}
                        </>}

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