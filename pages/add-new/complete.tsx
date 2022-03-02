import Layout from '../../components/Layout/HomeLayout'
import { ReactElement, useEffect } from "react";
import { message } from 'antd';
import router from 'next/router';
import SidebarAdvices from './SidebarAdvices';
import Cookies from 'js-cookie'
import useSWR from 'swr'
import PropTypes from "prop-types";
import { MetaTags } from '@/components/SEO/MetaTags'
import Unauthorized from '@/components/Unauthorized';
import API from '../../config'

function Complete({ query }) {
    const token = Cookies.get('token')
    const { data: getProduct }: any = useSWR(`api/my_products/product/${query.id}`)

    if (!query) return message.error('حدث خطأ')
    if (!token) return <Unauthorized />
    async function getProductId() {
        try {
            const res: any = await API.get(`api/my_products/product/${query.id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (res.status === 200) {
                console.log(true)
            }
        } catch (error) {
            if (error.response && error.response.status === 422) {
                router.push("/add-new")
            }
            if (error.response && error.response.status === 404) {
                router.push("/add-new")
            }
        }
    }
    useEffect(() => {
        if (!token) {
            router.push('/login')
            return
        }
        getProductId()

    }, [])
    async function stepFive() {
        try {
            const res = await API.post(`api/product/${query.id}/product-step-five`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            // Authentication was successful.
            if (res.status === 200) {
                message.success('لقد تم التحديث بنجاح')
                router.push({
                    pathname: '/myproducts',
                    query: {
                        id: query.id, // pass the id 
                    },
                })
            }
        } catch (error: any) {
            message.error('حدث خطأ غير متوقع');
        }
    }
    return (
        <>
            <MetaTags
                title="إضافة خدمة جديدة - نشر الخدمة"
                metaDescription="إضافة خدمة جديدة - نشر الخدمة "
                ogDescription="إضافة خدمة جديدة - نشر الخدمة"
            />
            <div className="container-fluid">
                {(!getProduct) && <div>يرجى الانتظار...</div>}
                <div className="row">
                    <div className="col-md-4">
                        <SidebarAdvices />
                    </div>
                    <div className="col-md-8 pt-3">
                        <div className={"timlands-panel"}>
                            <div className="timlands-steps">
                                <div className="timlands-step-item">
                                    <h4 className="text">
                                        <span className="icon-circular">
                                            <span className="material-icons material-icons-outlined">collections_bookmark</span>
                                        </span>
                                        معلومات عامة
                                    </h4>
                                </div>
                                <div className="timlands-step-item">
                                    <h4 className="text">
                                        <span className="icon-circular">
                                            <span className="material-icons material-icons-outlined">payments</span>
                                        </span>
                                        السعر والتطويرات
                                    </h4>
                                </div>
                                <div className="timlands-step-item">
                                    <h4 className="text">
                                        <span className="icon-circular">
                                            <span className="material-icons material-icons-outlined">description</span>
                                        </span>
                                        الوصف وتعليمات المشتري
                                    </h4>
                                </div>
                                <div className="timlands-step-item">
                                    <h4 className="text">
                                        <span className="icon-circular">
                                            <span className="material-icons material-icons-outlined">mms</span>
                                        </span>
                                        مكتبة الصور والملفات
                                    </h4>
                                </div>
                                <div className="timlands-step-item active">
                                    <h4 className="text">
                                        <span className="icon-circular">
                                            <span className="material-icons material-icons-outlined">publish</span>
                                        </span>
                                        نشر الخدمة
                                    </h4>
                                </div>
                            </div>
                            <div className="timlands-add-new">
                                <div className="timlands-add-new-icon">
                                    <span className="material-icons material-icons-outlined">check_circle</span>
                                </div>
                                <div className="timlands-add-new-body">
                                    <h4 className="title">تمت إضافة الخدمة بنجاح</h4>
                                    <p className="text">
                                        تهانينا, يمكنك الآن نشر خدمتك ومشاركتها عبر مواقع التواصل الاجتماعي بعد الموافقة عليها من طرف الإدارة
                                    </p>
                                    <div className="add-butts">
                                        <button onClick={stepFive} className="btn butt-md butt-primary2">
                                            نشر الخدمة
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
Complete.getLayout = function getLayout(page: any): ReactElement {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
export default Complete

Complete.getInitialProps = ({ query }) => {
    return { query }
}
Complete.propTypes = {
    query: PropTypes.any,
};