import React, { ReactElement } from 'react'
import Layout from '@/components/Layout/HomeLayout'
import { useCart } from "react-use-cart";
import { Form, Formik } from 'formik';
import withAuth from '../../services/withAuth'

function Bill() {
    const {
        isEmpty,
        totalUniqueItems,
        items,
        cartTotal,
    } = useCart();
    function pricesTax() {
        let tax = 0
        if (cartTotal <= 20) {
            tax = cartTotal + 1
        } else if (cartTotal > 20 || cartTotal <= 200) {
            tax = (cartTotal * 0.05) + cartTotal
        } else if (cartTotal > 200 || cartTotal <= 1000) {
            tax = (cartTotal * 0.07) + cartTotal
        } else if (cartTotal > 1000) {
            tax = (cartTotal * 0.1) + cartTotal
        }
        return tax
    }
    function isTax() {
        let tax: any = 0
        if (cartTotal <= 20) {
            tax = 1
        } else if (cartTotal > 20 || cartTotal <= 200) {
            tax = cartTotal * 0.05
        } else if (cartTotal > 200 || cartTotal <= 1000) {
            tax = cartTotal * 0.07
        } else if (cartTotal > 1000) {
            tax = cartTotal * 0.1
        }
        return tax
    }
    //if (isEmpty) return <div>السلة فارغة</div>
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
                                <span className="">{totalUniqueItems}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                مجموع عدد مرات الشراء
                                <span className="">12</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                سعر التحويل
                                <span className="">{isTax().toPrecision(3)}$</span>
                            </li>
                            <li className="list-group-item total d-flex justify-content-between align-items-center">
                                المجموع الكلي
                                <span className="">{pricesTax().toLocaleString()}$</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="col-md-5">
                <Formik
                    initialValues={{
                        productCount: totalUniqueItems,
                        priceTotal: pricesTax(),
                        tax: isTax(),
                        products: items,
                    }}
                    enableReinitialize={true}
                    //validationSchema={SignupSchema}
                    onSubmit={async (values) => {
                        console.log(values);
                    }}
                >
                    <Form>
                        <div className="app-bill">
                            <div className="app-bill-header">
                                <h3 className="title">اختيار طريقة الدفع</h3>
                            </div>
                            {!isEmpty &&
                                <>
                                    <div className="app-bill-payment">
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="billPayment" id="billPayment-strap" />
                                            <label className="form-check-label" htmlFor="billPayment-strap">
                                                الدفع عن طريق البطاقات البنكية
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="billPayment" id="billPayment-paypal" checked />
                                            <label className="form-check-label" htmlFor="billPayment-paypal">
                                                الدفع عن طريق البايبال Paypal
                                            </label>
                                        </div>
                                    </div>
                                    <div className="app-bill-footer">
                                        <button type="submit" style={{ width: '50%' }} className="btn butt-primary butt-lg butt-sm">متابعة الشراء ({cartTotal}) </button>
                                    </div>
                                </>
                            }
                        </div>
                    </Form>
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
export default withAuth(Bill)
