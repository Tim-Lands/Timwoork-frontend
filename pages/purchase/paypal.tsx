import React, { ReactElement, useEffect, useState } from 'react'
import Layout from '@/components/Layout/HomeLayout'
import Cookies from 'js-cookie'
import router from 'next/router'
import PropTypes from "prop-types";
import { Alert } from '@/components/Alert/Alert';
import API from '../../config'
import Loading from '@/components/Loading';
import useSWR from 'swr';

function Paypal({ query }) {
    const token = Cookies.get('token')
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [getBills, setGetBills]: any = useState({})

    const { data: userInfo }: any = useSWR('api/me')
    const veriedEmail = userInfo && userInfo.user_details.email_verified_at
    async function getBill() {
        setIsLoading(true)
        try {
            const res: any = await API.post(`api/purchase/paypal/charge`, { token: query.token }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (res.status === 200) {
                setIsLoading(false)
                setIsError(false)
                setGetBills(res.data.data)
            }
        } catch (error) {
            setIsLoading(false)
            setIsError(true)
        }
    }
    useEffect(() => {
        if (query.return == 1) {
            getBill()
        }
        if (!token) {
            router.push('/login')
            return
        }
    }, [])
    return (
        <div className="row py-4 justify-content-center">
            {veriedEmail && 
                <div className="col-md-5">
                    <div className="app-bill">
                        <div className="app-bill-header">
                            <h3 className="title">نتيجة عملية الشراء</h3>
                        </div>
                        {isLoading && <Loading />}
                        {console.log(getBills)}
                        {query.return == 1 && !isError ?
                            <Alert type='success'>لقد تمت عملية الشراء بجاح</Alert> :
                            <Alert type='error'>للأسف لم تتم عملية الشراء يرجى المحاولة مرة أخرى</Alert>
                        }
                        <div className="app-bill-content">
                            {!isError && getBills && 
                                <ul className="list-group">
                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                        السعر الكلي
                                        <span className="">{getBills.total_price}$</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                        سعر التحويل
                                        <span className="">{getBills.tax}$</span>
                                    </li>
                                    <li className="list-group-item total d-flex justify-content-between align-items-center">
                                        المجموع الكلي
                                        <span className="">{getBills.price_with_tax}$</span>
                                    </li>
                                </ul>
                            }
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
Paypal.getLayout = function getLayout(page: any): ReactElement {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
Paypal.getInitialProps = async ({ query }) => {
    return { query }
}
Paypal.propTypes = {
    query: PropTypes.any,
};
export default Paypal
