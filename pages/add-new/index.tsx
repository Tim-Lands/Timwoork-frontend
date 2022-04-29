import Layout from '@/components/Layout/HomeLayout'
import { MetaTags } from '@/components/SEO/MetaTags'
import { ReactElement, useEffect } from "react";
import { connect } from "react-redux";
import { logout, addNewProduct } from "./../../store/auth/authActions";
//import withAuth from '../../services/withAuth'
import { Spin } from "antd";
import { Alert } from '@/components/Alert/Alert';
import useSWR from 'swr'
import NotSeller from '@/components/NotSeller';
import Cookies from 'js-cookie'
import Unauthorized from '@/components/Unauthorized';
import router from 'next/router';

function index(props: any) {
    let token = Cookies.get('token')
    if (!token && typeof window !== "undefined")
        token = localStorage.getItem('token');
    const { data: userInfo }: any = useSWR('api/me')
    const veriedEmail = userInfo && userInfo.user_details.email_verified_at
    useEffect(() => {
        if (!token) {
            router.push('/login')
            return
        }

    }, [])
    if (!token) return <Unauthorized />
    const { data: userData }: any = useSWR(`api/me`)
    if (userData && userData.user_details.profile.is_seller == 0) return <NotSeller />
    return (
        <>
            <MetaTags
                title="إضافة خدمة جديدة"
                metaDescription="إضافة خدمة جديدة"
                ogDescription="إضافة خدمة جديدة"
            />
            <div className="container">
                {token && veriedEmail &&
                    <div className="row justify-content-center my-3">
                        <div className="col-md-8">
                            <Spin spinning={props.addNewProductLoading}>
                                {props.addNewProductError && (
                                    <Alert type="danger">{props.addNewProductError}</Alert>
                                )}
                                <div className="timlands-add-new">
                                    <div className="timlands-add-new-icon">
                                        <span className="material-icons material-icons-outlined">add_circle_outline</span>
                                    </div>
                                    <div className="timlands-add-new-body">
                                        <h3 className="title">إضافة خدمة جديدة</h3>
                                        <p className="text">
                                            رائع ! وصلت الى خطوتك الأخيرة لتنظم الى فريق بائعي تيموورك
                                        </p>
                                        {!userData &&
                                            <div className="add-butts">
                                                <button type="button" disabled={true} className="btn butt-md butt-white" onClick={props.addNewProduct}>
                                                    يرجى الإنتظار...
                                                </button>
                                            </div>
                                        }
                                        {userData && userData.user_details.profile.is_seller == 1 &&
                                            <div className="add-butts">
                                                <button type="button" className="btn butt-md butt-primary2" onClick={props.addNewProduct}>
                                                    إضافة خدمة
                                                </button>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </Spin>
                        </div>
                    </div>
                }
            </div>
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

const mapStateToProps = (state: any) => ({
    isAuthenticated: state.auth.isAuthenticated,
    addNewProductLoading: state.auth.addNewProductLoading,
    addNewProductError: state.auth.addNewProductError,
});

export default connect(mapStateToProps, { logout, addNewProduct })(index);