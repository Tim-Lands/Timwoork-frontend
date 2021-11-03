import Link from "next/link";
import API from '../../config';
import { ReactElement, useEffect, useState } from "react";
import DashboardLayout from "../../components/Layout/DashboardLayout";
export interface User {
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    avatar: string,
}
function index(): ReactElement {
    const [postsList, setPostsList] = useState({
        admins: 1,
        badges: 2,
        categories: 9,
        levels: 0,
        products_actived: 0,
        products_rejected: 0,
        products_wainting_actived: 6,
        subcategories: 27,
        tags: 0,
        users: 1,
    })
    //const [isError, setIsError] = useState(false)
    //const [isLoading, setIsLoading] = useState(false)
    const getData = async () => {
        //setIsLoading(true)
        try {
            const res: any = await API.get('dashboard')
            //setIsLoading(false)
            setPostsList(res.data.data)
            console.log(res.data.data);

            //setIsError(false)

        } catch (error) {
            //setIsError(true)
            //setIsLoading(false)
        }
    }
    useEffect(() => {
        getData()
    }, [])

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
index.getLayout = function getLayout(page: any): ReactElement {
    return (
        <DashboardLayout>
            {page}
        </DashboardLayout>
    )
}
export default index;
