import React, { ReactElement, useEffect, useState } from 'react'
import Layout from '@/components/Layout/HomeLayout'
import Cookies from 'js-cookie'
import router from 'next/router'
import PropTypes from "prop-types";
import { Alert } from '@/components/Alert/Alert';
import API from '../../config'
import Loading from '@/components/Loading';

function Paypal({ query }) {
    const token = Cookies.get('token')
    const [isLoading, setIsLoading] = useState(false)
    //const [getBills, setGetBills] = useState([])

    async function getBill() {
        setIsLoading(true)
        try {
            const res: any = await API.post(`api/purchase/paypal/charge`, {token: query.token}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (res.status === 200) {
                setIsLoading(false)
                console.log(res.data)
            }
        } catch (error) {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        if(query.return == 1) {
            getBill()
        }
        if (!token) {
            router.push('/login')
            return
        }
    }, [])
    return (
        <div className="row py-4 justify-content-center">
            <div className="col-md-5">
                <div className="app-bill">
                    <div className="app-bill-header">
                        <h3 className="title">نتيجة عملية الشراء</h3>
                    </div>
                    {isLoading && <Loading />}
                    {query.return == 1 ?
                        <Alert type='success'>لقد تمت عملية الشراء بجاح</Alert> :
                        <Alert type='error'>للأسف لم تتم عملية الشراء يرجى المحاولة مرة أخرى</Alert>
                    }

                </div>
            </div>
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
