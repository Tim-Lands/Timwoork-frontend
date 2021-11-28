import Link from "next/link";
import API from '../../config';
import { ReactElement } from "react";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import { connect } from "react-redux";
import { logout } from "./../../store/auth/authActions";
import useSWR from 'swr'
import { message } from "antd";

function index(): ReactElement {
    const { data: postsList, categoriesError }: any = useSWR('dashboard', () =>
        API
            .get('dashboard')
            .then(res => res.data.data)
            .catch(error => {
                if (error.response.status != 409) throw error
            }),
    )
    // Return statement.
    return (
        <>
            <div className="timlands-panel">
                <div className="timlands-panel-header">
                    <h2 className="title"><span className="material-icons material-icons-outlined">dashboard</span>الرئيسية</h2>
                </div>
                {categoriesError && message.error('حدث خطأ أثناء جلب البيانات')}
                {!postsList ? message.loading('جاري جلب البيانات...', 2.5) : (
                    <div className="row">
                        <div className="col-md-6">
                            <div className="timlands-panel-item floated green">
                                <div className="panel-item-body">
                                    <div className="image-thumbnail">
                                        <img src="/icons/001-save-money.png" className="mb-3" alt="" />
                                    </div>
                                    <div className="panel-content">
                                        <h1 className="price-text">الرصيد الإجمالي</h1>
                                        <h1 className="price-num"><span className="num-val">0.00$</span></h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="timlands-panel-item floated blue">
                                <div className="panel-item-body">
                                    <div className="image-thumbnail">
                                        <img src="/icons/002-money.png" className="mb-3" alt="" />
                                    </div>
                                    <div className="panel-content">
                                        <h1 className="price-text">الفوائد</h1>
                                        <h1 className="price-num"><span className="num-val">0.00$</span></h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="timlands-panel-item center">
                                <div className="panel-item-header">
                                    <h4 className="title">المستخدمين</h4>
                                </div>
                                <div className="panel-item-body">
                                    <img src="/icons/010-team.png" className="mb-3 panel-img-thumb" alt="" />
                                    <ul className="details-items">
                                        <li>
                                            <div className="d-flex">
                                                <div className="det-prop">
                                                    <p className="text">المشرفين والمدراء</p>
                                                </div>
                                                <div className="det-val">
                                                    <p className="text">{postsList.admins}</p>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="d-flex">
                                                <div className="det-prop">
                                                    <p className="text">المشترين</p>
                                                </div>
                                                <div className="det-val">
                                                    <p className="text">0</p>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="d-flex">
                                                <div className="det-prop">
                                                    <p className="text">البائعين</p>
                                                </div>
                                                <div className="det-val">
                                                    <p className="text">0</p>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="d-flex">
                                                <div className="det-prop">
                                                    <p className="text">المجموع</p>
                                                </div>
                                                <div className="det-val">
                                                    <p className="text">{postsList.users}</p>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="panel-item-footer">
                                    <Link href="/">
                                        <a className="btn butt-dark butt-sm">تفاصيل أكثر...</a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="timlands-panel-item center">
                                <div className="panel-item-header">
                                    <h4 className="title">الخدمات</h4>
                                </div>
                                <div className="panel-item-body">
                                    <img src="/icons/004-writing.png" className="mb-3 panel-img-thumb" alt="" />
                                    <ul className="details-items">
                                        <li>
                                            <div className="d-flex">
                                                <div className="det-prop">
                                                    <p className="text">في انتظار التفعيل</p>
                                                </div>
                                                <div className="det-val">
                                                    <p className="text">{postsList.products_wainting_actived}</p>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="d-flex">
                                                <div className="det-prop">
                                                    <p className="text">المرفوضة</p>
                                                </div>
                                                <div className="det-val">
                                                    <p className="text">{postsList.products_rejected}</p>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="d-flex">
                                                <div className="det-prop">
                                                    <p className="text">النشطة</p>
                                                </div>
                                                <div className="det-val">
                                                    <p className="text">{postsList.products_actived}</p>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="d-flex">
                                                <div className="det-prop">
                                                    <p className="text">المعطلة</p>
                                                </div>
                                                <div className="det-val">
                                                    <p className="text">0</p>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="d-flex">
                                                <div className="det-prop">
                                                    <p className="text">المجموع</p>
                                                </div>
                                                <div className="det-val">
                                                    <p className="text">
                                                        {postsList.products_actived + postsList.products_rejected + postsList.products_wainting_actived}
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="panel-item-footer">
                                    <Link href="/">
                                        <a className="btn butt-dark butt-sm">تفاصيل أكثر...</a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
index.getLayout = function getLayout(page: any): ReactElement {
    return (
        <DashboardLayout>
            {page}
        </DashboardLayout>
    )
}
const mapStateToProps = (state: any) => ({
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.registerLoading,
    userInfo: state.auth.user
});

export default connect(mapStateToProps, { logout })(index)