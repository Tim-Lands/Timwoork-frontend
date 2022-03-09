import Layout from '../../components/Layout/HomeLayout'
import { ReactElement, useEffect } from "react";
import { useFormik } from 'formik';
import router from 'next/router';
import Cookies from 'js-cookie'
import useSWR from 'swr'
import { MetaTags } from '@/components/SEO/MetaTags'
import BankAccount from '@/components/Withdrawal/BankAccount';
import MoneyAccount from '@/components/Withdrawal/MoneyAccount';
import Paypal from '@/components/Withdrawal/Paypal';
import Wise from '@/components/Withdrawal/Wise';

function index() {
    const token = Cookies.get('token')

    const { data: userInfo }: any = useSWR('api/me')
    const veriedEmail = userInfo && userInfo.user_details.email_verified_at
    const formik = useFormik({
        initialValues: {
            withdrawal_type: 0,
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

    return (
        <>
            <MetaTags
                title="طلب السحب"
                metaDescription="طلب السحب"
                ogDescription="طلب السحب"
            />
            {token && veriedEmail &&
                <>
                    <div className="row my-5 justify-content-md-center">
                        <div className="col-md-7">
                            <div className="withdrawal-select">
                                <h3 className="title">اختر طريقة السحب: </h3>
                                <select
                                    onChange={formik.handleChange}
                                    value={formik.values.withdrawal_type}
                                    name="withdrawal_type"
                                    className='timlands-inputs select'
                                    id="withdrawal_type"
                                >
                                    <option value="0">الحوالات المالية</option>
                                    <option value="1">الحساب البنكي</option>
                                    <option value="2">حساب البايبال Paypal</option>
                                    <option value="3">حساب الوايز Wise</option>
                                </select>
                            </div>
                            {formik.values.withdrawal_type == 0 && <BankAccount token={token} />}
                            {formik.values.withdrawal_type == 1 && <MoneyAccount token={token} />}
                            {formik.values.withdrawal_type == 2 && <Paypal token={token} />}
                            {formik.values.withdrawal_type == 3 && <Wise token={token} />}
                            
                        </div>
                    </div>
                </>
            }
        </>
    )
}
index.getLayout = function getLayout(page: any): ReactElement {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
export default index