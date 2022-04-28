import React, { ReactElement, useEffect, useState } from 'react'
import Layout from '@/components/Layout/HomeLayout'
import { motion } from 'framer-motion'
import useSWR from 'swr'
import Cookies from 'js-cookie'
import router from 'next/router';
import API from '../../config'
import Loading from '@/components/Loading';
import { Badge, Result, Tooltip } from 'antd';
import {
    CardElement,
    Elements,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { MetaTags } from '@/components/SEO/MetaTags'
import { Alert } from '@/components/Alert/Alert'

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const token = Cookies.get('token')
    const [validationsGeneral, setValidationsGeneral]: any = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (elements == null) {
            return;
        }
        const { paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });
        setIsLoading(true)
        try {
            const res: any = await API.post(`api/purchase/stripe/charge`, { payment_method_id: paymentMethod.id }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (res.status === 200) {
                
                router.push('/mypurchases')
            }
        } catch (error) {
            setIsLoading(false)

            if (error.response && error.response.data) {
                setValidationsGeneral(error.response.data);
            }
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                {validationsGeneral.msg && <Alert type="error">{validationsGeneral.msg}</Alert>}
                <CardElement />
                <button type="submit" onClick={() => setIsLoading(true)} className='btn butt-md purchace-by-stripe-btn butt-primary mt-2' disabled={!stripe || !elements}>
                    <span>شراء الآن</span>
                    {isLoading && <span className="spinner-border spinner-border-sm mx-1" role="status" aria-hidden="true"></span>}
                </button>
            </form>
        </>
    );
};
const stripePromise = loadStripe('pk_live_51KVxMmKZiLP53MTnsIhnnYjdjWwCynAoNT2IJS0D0TllKvdK07C0XO3nFAPe2kjOOAVXd3WSSebR71Qd0KSb8SIF00TQc1n8ca')

function Bill() {
    const token = Cookies.get('token')
    const [billPayment, setBillPayment] = useState(2)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [isWalletLoading, setIsWalletLoading] = useState(false)
    const [validationsGeneral, setValidationsGeneral]: any = useState({})
    const [getLink, setGetLink] = useState('')

    const { data: cartList, error }: any = useSWR('api/cart')
    const { data: userInfo }: any = useSWR('api/me')
    const veriedEmail = userInfo && userInfo.user_details.email_verified_at

    const mybalance = userInfo && userInfo.user_details.profile.withdrawable_amount
    async function getPaypal() {
        setIsLoading(true)
        setIsError(false)
        try {
            const res: any = await API.post(`api/purchase/paypal/approve`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (res.status === 200) {
                setIsLoading(false)
                setIsError(false)
                setGetLink(res.data)
            }
        } catch (error) {
            setIsError(true)
            setIsLoading(false)
        }
    }
    useEffect(() => {
        if (!token) {
            router.push('/login')
            return
        }
        if (cartList && cartList.data == null) {
            router.push('/mypurchases')
            return
        }
        getPaypal()
    }, [])
    async function chargeWallet() {
        setIsWalletLoading(true)
        try {
            const res = await API.post(`api/purchase/wallet/charge`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (res.status === 200) {
                router.push('/mypurchases')
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setValidationsGeneral(error.response.data);
            }
        }
    }
    const onBillPaymentChange=e=>setBillPayment(e.target.value)
    return (
        <>
            <MetaTags
                title="عملية الشراء"
                metaDescription="عملية الشراء"
                ogDescription="عملية الشراء"
            />
            {veriedEmail && <>
                {cartList && cartList.data == null && isError && error && <div className="row py-4 justify-content-center">
                    <div className="col-md-5">
                        <Result
                            status="warning"
                            title="حدث خطأ "
                            subTitle="حدث خطأ أثناء التحضير لعملية الشراء  "
                        />
                    </div>
                </div>}
                <div className="row py-4 justify-content-center">
                    <div className="col-md-3">
                        <div className="app-bill">
                            <div className="app-bill-header">
                                <h3 className="title">الفاتورة النهائية</h3>
                            </div>
                            {!cartList && <Loading />}
                            {cartList && cartList.data.cart_payments.map((e, i) => (
                                <div key={i} className="app-bill-content" style={{ marginBottom: 9 }}>
                                    {(e.pivot.type_payment_id == billPayment) && 
                                        <ul className="list-group">
                                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                                عدد الخدمات
                                                <span className="">{cartList && cartList.data.cart_items_count}</span>
                                            </li>
                                            <li
                                                style={{ fontSize: 12, fontWeight: 300 }}
                                                className="list-group-item total d-flex justify-content-between align-items-center">
                                                رسوم التحويل لـ {e.name_ar} <span className='me-auto'>
                                                    <Tooltip
                                                        title="هذه الرسوم لتغطية تكاليف بوابات الدفع وتساعدنا على تشغيل الموقع وتقديم دعم فني لك."
                                                    >
                                                        <Badge style={{ color: '#52c41a ' }} count={<span style={{ color: '#52c41a', fontSize: 16 }} className='material-icons'>info</span>} />
                                                    </Tooltip>
                                                </span>
                                                <span className="">{e.pivot.tax}</span>
                                            </li>
                                            <li
                                                style={{ fontSize: 12, fontWeight: 300 }}
                                                className="list-group-item total d-flex justify-content-between align-items-center">
                                                المجموع بدون رسوم
                                                <span className="">{e.pivot.total}</span>
                                            </li>
                                            <li
                                                style={{ fontSize: 12, fontWeight: 300 }}
                                                className="list-group-item total d-flex justify-content-between align-items-center">
                                                المجموع مع رسوم
                                                <span className="">{e.pivot.total_with_tax}</span>
                                            </li>
                                        </ul>
                                    }
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div className="app-bill">
                            <div className="app-bill-header">
                                <h3 className="title">اختيار طريقة الدفع</h3>
                            </div>
                            {cartList && cartList.data !== null &&
                                <div className="app-bill-payment">
                                    <div className="form-check" style={{ marginBlock: 9 }}>
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            value='2'
                                            name="billPayment"
                                            id="billPayment-strap"
                                            checked={billPayment==2}
                                            onChange={onBillPaymentChange}
                                        />
                                        <label className="form-check-label" htmlFor="billPayment-strap">
                                            الدفع عن طريق البطاقات البنكية
                                        </label>
                                    </div>
                                    <div style={{ overflow: 'hidden' }}>
                                        {billPayment == 2 ?
                                            <motion.div dir='ltr' initial={{ y: -49, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                                                <Elements stripe={stripePromise}>
                                                    <CheckoutForm />
                                                </Elements>
                                            </motion.div>
                                            : null}
                                    </div>
                                    <div className="form-check" style={{ marginBlock: 9 }}>
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            value='1'
                                            name="billPayment"
                                            id="billPayment-paypal"
                                            checked={billPayment==1}
                                            onChange={onBillPaymentChange}
                                        />
                                        <label className="form-check-label" htmlFor="billPayment-paypal">
                                            الدفع عن طريق البايبال Paypal
                                        </label>
                                    </div>
                                    <div style={{ overflow: 'hidden' }}>
                                        {billPayment == 1 ?
                                            <motion.div initial={{ y: -49, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                                                <a href={getLink} className='btn butt-primary2 butt-lg purchace-by-paypal-btn'>
                                                    {isLoading && <span className="spinner-border spinner-border-md" role="status"></span>}
                                                    {!isLoading && <> <i className='fab fa-paypal'></i> | عن طريق Paypal</>}
                                                </a>
                                            </motion.div>
                                            : null}
                                    </div>
                                    {(Number(mybalance) < Number(cartList && cartList.data.price_with_tax)) ?

                                        <><Alert type='primary'>لا يمكنك الشراء بواسطة المحفظة . المبلغ الإجمالي اكبر من رصيدك</Alert></> :
                                        <>
                                            <div className="form-check" style={{ marginBlock: 9 }}>
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    value='3'
                                                    name="billPayment"
                                                    id="billPayment-wallet"
                                                    checked={billPayment==3}
                                                    onChange={onBillPaymentChange}
                                                    />
                                                <label className="form-check-label" htmlFor="billPayment-wallet">
                                                    الدفع عن طريق المحفظة
                                                </label>
                                            </div>
                                            <div style={{ overflow: 'hidden' }}>
                                                {billPayment == 3 ?
                                                    <motion.div initial={{ y: -49, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                                                        {validationsGeneral.msg && <Alert type="error">{validationsGeneral.msg}</Alert>}
                                                        <div className="purchase-by-wallet">
                                                            <p className='purchase-text'>أو يمكنك الشراء عن طريق المحفظة .. تأكد جيدا من وجود رصيد في محفظتك</p>
                                                            <button onClick={chargeWallet} disabled={isWalletLoading} className='btn butt-lg butt-green flex-center-just'>
                                                                {isWalletLoading && <span className="spinner-border spinner-border-md" role="status"></span>}
                                                                {!isWalletLoading && <><img src={'/logo2.png'} width={15} height={17} /> شراء الآن (<span className="">${cartList && cartList.data.total_price}</span>)</>}
                                                            </button>
                                                        </div>
                                                    </motion.div>
                                                    : null}
                                            </div>
                                        </>
                                    }

                                </div>
                            }
                        </div>
                    </div>
                </div>
            </>
            }
        </>
    )
}
Bill.getLayout = function getLayout(page: any): ReactElement {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
export default Bill
