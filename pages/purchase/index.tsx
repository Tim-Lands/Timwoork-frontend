import React, { ReactElement, useEffect, useState } from 'react'
import Layout from '@/components/Layout/HomeLayout'
import { motion } from 'framer-motion'
import useSWR from 'swr'
import Cookies from 'js-cookie'
import router from 'next/router';
import API from '../../config'
import Loading from '@/components/Loading';
import { Result } from 'antd';
import {
    CardElement,
    Elements,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const token = Cookies.get('token')
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
        }
    };

    return (
        <>
            {isLoading ? <Loading /> :
                <form onSubmit={handleSubmit}>
                    <CardElement />
                    <button type="submit" className='btn butt-md butt-primary mt-2' disabled={!stripe || !elements}>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        <span>شراء الآن</span>
                    </button>
                </form>}
        </>
    );
};
const stripePromise = loadStripe('pk_test_51H7n51E0GSoKvEJxgMpwOphCTCYZ4U1fW7ucqwCwURKvNfrIR846Agf5LU4Gu7xzwJugv5weRpz9E8wT5qewQlCy00eou8x5VM');
function Bill() {
    const token = Cookies.get('token')
    const [billPayment, setBillPayment] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [isBuyer, setIsBuyer] = useState(false)
    const [getLink, setGetLink] = useState('')

    const { data: cartList, error }: any = useSWR('api/cart')
    const { data: userInfo }: any = useSWR('api/me')

    async function getPaypal() {
        setIsLoading(true)
        setIsBuyer(false)
        setIsError(false)
        try {
            const res: any = await API.post(`api/purchase/paypal/approve`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (res.status === 200) {
                setIsBuyer(true)
                setIsLoading(false)
                setIsError(false)
                setGetLink(res.data)
            }
        } catch (error) {
            setIsError(true)
            setIsBuyer(false)
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
    return (
        <>

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
                        {!cartList && !userInfo && <Loading />}
                        {cartList && cartList.data !== null && isBuyer &&
                            <div className="app-bill-content">
                                <ul className="list-group">
                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                        عدد الخدمات
                                        <span className="">{cartList && cartList.data.cart_items_count}</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                        السعر الكلي
                                        <span className="">{cartList && cartList.data.total_price}$</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                        سعر التحويل
                                        <span className="">{cartList && cartList.data.tax}$</span>
                                    </li>
                                    <li className="list-group-item total d-flex justify-content-between align-items-center">
                                        المجموع الكلي
                                        <span className="">{cartList && cartList.data.price_with_tax}$</span>
                                    </li>
                                </ul>
                            </div>
                        }
                    </div>
                </div>
                <div className="col-md-5">
                    <div className="app-bill">
                        <div className="app-bill-header">
                            <h3 className="title">اختيار طريقة الدفع</h3>
                        </div>
                        {cartList && cartList.data !== null &&
                            <div className="app-bill-payment">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        value='0'
                                        name="billPayment"
                                        id="billPayment-strap"
                                        onChange={(e: any) => setBillPayment(e.target.value)}
                                    />
                                    <label className="form-check-label" htmlFor="billPayment-strap">
                                        الدفع عن طريق البطاقات البنكية
                                    </label>
                                </div>
                                <div style={{ overflow: 'hidden' }}>
                                    {billPayment == 0 ?
                                        <motion.div dir='ltr' initial={{ y: -49, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                                            <Elements stripe={stripePromise}>
                                                <CheckoutForm />
                                            </Elements>
                                        </motion.div>
                                        : null}
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        value='1'
                                        name="billPayment"
                                        id="billPayment-paypal"
                                        onChange={(e: any) => setBillPayment(e.target.value)}
                                    />
                                    <label className="form-check-label" htmlFor="billPayment-paypal">
                                        الدفع عن طريق البايبال Paypal
                                    </label>
                                </div>
                                {isLoading && <span className="spinner-border spinner-border-sm" role="status"></span>}
                                <div style={{ overflow: 'hidden' }}>
                                    {billPayment == 1 ?
                                        <motion.div initial={{ y: -49, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                                            <a href={getLink} className='btn butt-primary2 butt-md'>
                                                {!isLoading && <> <i className='fab fa-paypal'></i> | عن طريق Paypal</>}
                                            </a>
                                        </motion.div>
                                        : null}
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
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
