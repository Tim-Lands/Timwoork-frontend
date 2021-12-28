import React, { ReactElement } from 'react'
import Layout from '@/components/Layout/HomeLayout'
import { Field, Form, Formik } from 'formik';
import { motion } from 'framer-motion'

function Bill() {
    return (
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
                                <span className="">23</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                مجموع عدد مرات الشراء
                                <span className="">12</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                سعر التحويل
                                <span className="">{19.34}$</span>
                            </li>
                            <li className="list-group-item total d-flex justify-content-between align-items-center">
                                المجموع الكلي
                                <span className="">{2394}$</span>
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
                                            <motion.div initial={{ y: -49, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>Stripe Payment</motion.div>
                                            : null}
                                    </div>
                                    <div className="form-check">
                                        <Field className="form-check-input" type="radio" value='1' name="billPayment" id="billPayment-paypal" />
                                        <label className="form-check-label" htmlFor="billPayment-paypal">
                                            الدفع عن طريق البايبال Paypal
                                        </label>
                                    </div>
                                    <div style={{ overflow: 'hidden' }}>
                                        {values.billPayment == 1 ?
                                            <motion.div initial={{ y: -49, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>Paypal Payment</motion.div>
                                            : null}
                                    </div>
                                </div>
                                <div style={{ overflow: 'hidden' }}>
                                    {values.billPayment == 0 ?
                                        <div className="app-bill-footer">
                                            <motion.button initial={{ x: -49, opacity: 0 }} animate={{ x: 0, opacity: 1 }} type="submit" style={{ width: '50%' }} className="btn butt-primary butt-lg butt-sm">متابعة الشراء (8,764) </motion.button>
                                        </div>
                                        : null}
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
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
