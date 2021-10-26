import Link from "next/link";
import { ReactElement } from "react";
import DashboardLayout from "../../components/Layout/DashboardLayout";
function TestPage(): ReactElement {
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
                                    <h1 className="price-num"><span className="num-val">1,786$</span></h1>
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
                                    <h1 className="price-num"><span className="num-val">1,786$</span></h1>
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
                                                <p className="text">34</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="d-flex">
                                            <div className="det-prop">
                                                <p className="text">المشترين</p>
                                            </div>
                                            <div className="det-val">
                                                <p className="text">297</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="d-flex">
                                            <div className="det-prop">
                                                <p className="text">البائعين</p>
                                            </div>
                                            <div className="det-val">
                                                <p className="text">98</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="d-flex">
                                            <div className="det-prop">
                                                <p className="text">المجموع</p>
                                            </div>
                                            <div className="det-val">
                                                <p className="text">34,238</p>
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
                                                <p className="text">الأكثر شراء</p>
                                            </div>
                                            <div className="det-val">
                                                <p className="text">34</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="d-flex">
                                            <div className="det-prop">
                                                <p className="text">المضافة حديثا</p>
                                            </div>
                                            <div className="det-val">
                                                <p className="text">227</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="d-flex">
                                            <div className="det-prop">
                                                <p className="text">المعطلة</p>
                                            </div>
                                            <div className="det-val">
                                                <p className="text">227</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="d-flex">
                                            <div className="det-prop">
                                                <p className="text">المجموع</p>
                                            </div>
                                            <div className="det-val">
                                                <p className="text">34,238</p>
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
                    <div className="col-md-7">
                        <div className="timlands-panel-header">
                            <h2 className="title"><span className="material-icons material-icons-outlined">monetization_on</span>حركة الأموال</h2>
                        </div>
                        <div className="timlands-table">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>رصيد جديد</th>
                                        <th>المبلغ</th>
                                        <th>التاريخ</th>
                                        <th>النوع</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1632</td>
                                        <td>36.00</td>
                                        <td>منذ دقيقتين</td>
                                        <td>موبيليس</td>
                                    </tr>
                                    <tr>
                                        <td>1632</td>
                                        <td>36.00</td>
                                        <td>منذ دقيقتين</td>
                                        <td>موبيليس</td>
                                    </tr>
                                    <tr>
                                        <td>1632</td>
                                        <td>36.00</td>
                                        <td>منذ دقيقتين</td>
                                        <td>موبيليس</td>
                                    </tr>
                                    <tr>
                                        <td>1632</td>
                                        <td>36.00</td>
                                        <td>منذ دقيقتين</td>
                                        <td>موبيليس</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-md-6">
                        <div className="timlands-panel-header">
                            <h2 className="title"><span className="material-icons material-icons-outlined">monetization_on</span>حركة الأموال</h2>
                        </div>
                        <div className="timlands-table">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>رصيد جديد</th>
                                        <th>المبلغ</th>
                                        <th>التاريخ</th>
                                        <th>النوع</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1632</td>
                                        <td>36.00</td>
                                        <td>منذ دقيقتين</td>
                                        <td>موبيليس</td>
                                    </tr>
                                    <tr>
                                        <td>1632</td>
                                        <td>36.00</td>
                                        <td>منذ دقيقتين</td>
                                        <td>موبيليس</td>
                                    </tr>
                                    <tr>
                                        <td>1632</td>
                                        <td>36.00</td>
                                        <td>منذ دقيقتين</td>
                                        <td>موبيليس</td>
                                    </tr>
                                    <tr>
                                        <td>1632</td>
                                        <td>36.00</td>
                                        <td>منذ دقيقتين</td>
                                        <td>موبيليس</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
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
                </div>
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
