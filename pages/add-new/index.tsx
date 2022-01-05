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
    const token = Cookies.get('token')
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
            {token &&
                <div className="row justify-content-center">
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
                                        هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا
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