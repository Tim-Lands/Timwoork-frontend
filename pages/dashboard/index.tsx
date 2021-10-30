import Link from "next/link";
import axios from 'axios';
import { ReactElement, useEffect, useState } from "react";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import { useRouter } from "next/router";
export interface User {
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    avatar: string,
}
function TestPage(): ReactElement {
    const router = useRouter()
    useEffect(() => {
        (
            async () => {
                try {
                    const { data } = await axios.get('https://api.wazzfny.com/dashboard/me', { withCredentials: true });
                    console.log(data)
                } catch (e) {
                    console.log(e)
                }

            }
        )()
    }, [])

    const logout = async () => {
        await axios.post('https://api.wazzfny.com/dashboard/logout', {}, { withCredentials: true })
    }
    // Return statement.
    return (
        <>
            <div className="timlands-panel">
                <div className="timlands-panel-header">
                    <h2 className="title"><span className="material-icons material-icons-outlined">dashboard</span>الرئيسية</h2>
                </div>
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
                                                <p className="text">1</p>
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
                                                <p className="text">1</p>
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
                                                <p className="text">المسودات</p>
                                            </div>
                                            <div className="det-val">
                                                <p className="text">0</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="d-flex">
                                            <div className="det-prop">
                                                <p className="text">في انتظار التفعيل</p>
                                            </div>
                                            <div className="det-val">
                                                <p className="text">0</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="d-flex">
                                            <div className="det-prop">
                                                <p className="text">المرفوضة</p>
                                            </div>
                                            <div className="det-val">
                                                <p className="text">0</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="d-flex">
                                            <div className="det-prop">
                                                <p className="text">النشطة</p>
                                            </div>
                                            <div className="det-val">
                                                <p className="text">0</p>
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
                                                <p className="text">0</p>
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
{ /*              <div className="row mt-4">
                    <div className="col-md-6">
                        <div className="timlands-panel-header">
                            <h2 className="title"><span className="material-icons material-icons-outlined">view_list</span>آخر النشاطات</h2>
                        </div>
                        <div className="timlands-table">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>التاريخ</th>
                                        <th>رقم الهاتف</th>
                                        <th>المبلغ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>منذ 6 أيام</td>
                                        <td>0558873988</td>
                                        <td>100.00</td>
                                    </tr>
                                    <tr>
                                        <td>منذ 6 أيام</td>
                                        <td>0558873988</td>
                                        <td>100.00</td>
                                    </tr>
                                    <tr>
                                        <td>منذ 6 أيام</td>
                                        <td>0558873988</td>
                                        <td>100.00</td>
                                    </tr>
                                    <tr>
                                        <td>منذ 6 أيام</td>
                                        <td>0558873988</td>
                                        <td>100.00</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>*/}
            </div>
        </>
    );
}
TestPage.getLayout = function getLayout(page: any): ReactElement {
    return (
        <DashboardLayout>
            {page}
        </DashboardLayout>
    )
}
export default TestPage;
