import React, { ReactElement, useEffect, useState } from 'react'
import Layout from '@/components/Layout/HomeLayout'
import { Field, Form, Formik } from 'formik';
import { motion } from 'framer-motion'
import useSWR from 'swr'
import Cookies from 'js-cookie'
import router from 'next/router';
import API from '../../config'
import { Elements, CardElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Loading from '@/components/Loading';
import { Result } from 'antd';

function Bill() {
    const stripePromise = loadStripe('pk_test_51H7n51E0GSoKvEJxgMpwOphCTCYZ4U1fW7ucqwCwURKvNfrIR846Agf5LU4Gu7xzwJugv5weRpz9E8wT5qewQlCy00eou8x5VM');
    const options = {
        // passing the client secret obtained from the server
        clientSecret: 'sk_test_51H7n51E0GSoKvEJxUV6zbHn0MDJA5O2gwx8ZnGHfPZuGG24jgZjrVMsKsBfJ6weBtiVKGdTzmlQkWvhY4HAIREIa00c1skasM4',
    };
    const token = Cookies.get('token')
    const [isLoading, setIsLoading] = useState(false)
    const [isBuyer, setIsBuyer] = useState(false)
    const [getLink, setGetLink] = useState('')

    const { data: cartList }: any = useSWR('api/cart')
    async function getPaypal() {
        setIsLoading(true)
        setIsBuyer(false)
        try {
            const res: any = await API.post(`api/purchase/paypal/approve`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (res.status === 200) {
                setIsBuyer(true)
                setIsLoading(false)
                setGetLink(res.data)
            }
        } catch (error) {
            setIsBuyer(false)
            setIsLoading(false)
        }
    }
    useEffect(() => {
        if (!token) {
            router.push('/login')
            return
        }
        getPaypal()
    }, [])
    return (
        <>
            {!cartList && <Loading />}
            {!isBuyer && <div className="row py-4 justify-content-center">
                <div className="col-md-5">
                    <Result
                        status="warning"
                        title="حدث خطأ "
                        subTitle="حدث خطأ أثناء جلب رابط البايبال"
                    />
                </div>
            </div>}
            {cartList && isBuyer &&
                <div className="row py-4 justify-content-center">
                    <div className="col-md-3">
                        <div className="app-bill">
                            <div className="app-bill-header">
                                <h3 className="title">الفاتورة النهائية</h3>
                            </div>
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
                        </div>
                    </div>
                    <div className="col-md-5">
                        <Formik
                            isInitialValid={true}
                            initialValues={{
                                productCount: 758,
                                priceTotal: 23,
                                billPayment: 0,
                                tax: 45,
                                products: 2,
                            }}
                            enableReinitialize={true}
                            //validationSchema={SignupSchema}
                            onSubmit={async (values) => {
                                console.log(values);
                            }}
                        >
                            {({ values }) => (
                                <Form>
                                    <div className="app-bill">
                                        <div className="app-bill-header">
                                            <h3 className="title">اختيار طريقة الدفع</h3>
                                        </div>
                                        <div className="app-bill-payment">
                                            <div className="form-check">
                                                <Field className="form-check-input" type="radio" value='0' name="billPayment" id="billPayment-strap" />
                                                <label className="form-check-label" htmlFor="billPayment-strap">
                                                    الدفع عن طريق البطاقات البنكية
                                                </label>
                                            </div>
                                            <div style={{ overflow: 'hidden' }}>
                                                {values.billPayment == 0 ?
                                                    <motion.div initial={{ y: -49, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                                                        <Elements stripe={stripePromise} options={options}>
                                                            <CardElement />
                                                        </Elements>
                                                    </motion.div>
                                                    : null}
                                            </div>
                                            <div className="form-check">
                                                <Field className="form-check-input" type="radio" value='1' name="billPayment" id="billPayment-paypal" />
                                                <label className="form-check-label" htmlFor="billPayment-paypal">
                                                    الدفع عن طريق البايبال Paypal
                                                </label>
                                            </div>
                                            {isLoading && <span className="spinner-border spinner-border-sm" role="status"></span>}
                                            <div style={{ overflow: 'hidden' }}>
                                                {values.billPayment == 1 ?
                                                    <motion.div initial={{ y: -49, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                                                        <a href={getLink} className='btn butt-primary2 butt-md'>
                                                            {isLoading && <span className="spinner-border spinner-border-sm" role="status"></span>}
                                                            {!isLoading && <> <i className='fab fa-paypal'></i> | عن طريق Paypal</>}
                                                        </a>
                                                    </motion.div>
                                                    : null}
                                            </div>
                                        </div>
                                        <div style={{ overflow: 'hidden' }}>
                                            {values.billPayment == 0 ?
                                                <div className="app-bill-footer">
                                                    <motion.button
                                                        initial={{ x: -49, opacity: 0 }}
                                                        animate={{ x: 0, opacity: 1 }}
                                                        type="submit"
                                                        style={{ width: '50%' }}
                                                        className="btn butt-primary butt-lg butt-sm">
                                                        متابعة الشراء ({cartList.data.price_with_tax}$)
                                                    </motion.button>
                                                </div>
                                                : null}
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
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
