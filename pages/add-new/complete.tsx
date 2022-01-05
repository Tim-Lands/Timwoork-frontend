import Layout from '../../components/Layout/HomeLayout'
import { ReactElement, useEffect } from "react";
import { message } from 'antd';
import router from 'next/router';
import SidebarAdvices from './SidebarAdvices';
import Cookies from 'js-cookie'
import Link from 'next/link'
import useSWR from 'swr'
import PropTypes from "prop-types";
import { MetaTags } from '@/components/SEO/MetaTags'
import Unauthorized from '@/components/Unauthorized';

function Complete({ query }) {
    const token = Cookies.get('token')
    const { data: getUser }: any = useSWR('api/me')
    const { data: getProduct }: any = useSWR(`api/product/${query.id}`)
    if (!query) return message.error('حدث خطأ')
    if (!token) return <Unauthorized />
    useEffect(() => {
        if (!token) {
            router.push('/login')
            return
        }
        if (getProduct && getUser) {
            if (getProduct.profile_seller_id !== getUser.id) {
                router.push('/add-new')
            }
        }
    }, [])
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
                                    <h3 className="text">
                                        <span className="icon-circular">
                                            <span className="material-icons material-icons-outlined">collections_bookmark</span>
                                        </span>
                                        معلومات عامة
                                    </h3>
                                </div>
                                <div className="timlands-step-item">
                                    <h3 className="text">
                                        <span className="icon-circular">
                                            <span className="material-icons material-icons-outlined">payments</span>
                                        </span>
                                        السعر والتطويرات
                                    </h3>
                                </div>
                                <div className="timlands-step-item">
                                    <h3 className="text">
                                        <span className="icon-circular">
                                            <span className="material-icons material-icons-outlined">description</span>
                                        </span>
                                        الوصف وتعليمات المشتري
                                    </h3>
                                </div>
                                <div className="timlands-step-item">
                                    <h3 className="text">
                                        <span className="icon-circular">
                                            <span className="material-icons material-icons-outlined">mms</span>
                                        </span>
                                        مكتبة الصور والملفات
                                    </h3>
                                </div>
                                <div className="timlands-step-item active">
                                    <h3 className="text">
                                        <span className="icon-circular">
                                            <span className="material-icons material-icons-outlined">publish</span>
                                        </span>
                                        نشر الخدمة
                                    </h3>
                                </div>
                            </div>
                            <div className="timlands-add-new">
                                <div className="timlands-add-new-icon">
                                    <span className="material-icons material-icons-outlined">check_circle</span>
                                </div>
                                <div className="timlands-add-new-body">
                                    <h3 className="title">تمت إضافة الخدمة بنجاح</h3>
                                    <p className="text">
                                        هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا
                                    </p>
                                    <div className="add-butts">
                                        <Link href="/myproducts">
                                            <a className="btn butt-md butt-primary2">
                                              الانتقال إلى خدماتي
                                            </a>
                                        </Link>
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