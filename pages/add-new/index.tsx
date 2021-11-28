import Layout from '../../components/Layout/HomeLayout'
import { ReactElement, useEffect } from "react";
import { connect } from "react-redux";
import { logout, loadUser, addNewProduct } from "./../../store/auth/authActions";
import Cookies from 'js-cookie'
import router from 'next/router';
import { Spin } from "antd";
import { Alert } from '@/components/Alert/Alert';

function index(props: any) {
    //props.loadUser()
    const token = Cookies.get('token')
    useEffect(() => {
        if (!token) {
            router.push('/login')
        }
    }, [])
    return (
        <div className="container">
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
                                <div className="add-butts">
                                    <button type="button" className="btn butt-md butt-primary2" onClick={props.addNewProduct}>
                                        إضافة خدمة
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Spin>
                </div>
            </div>
        </div>
    )
}
index.getLayout = function getLayout(page): ReactElement {
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
    userInfo: state.auth.user
});

export default connect(mapStateToProps, { logout, loadUser, addNewProduct })(index);