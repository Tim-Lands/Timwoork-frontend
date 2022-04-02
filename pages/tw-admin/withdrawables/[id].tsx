import { Alert } from "@/components/Alert/Alert";
import API from '../../../config';
import { ReactElement, useState } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import Cookies from 'js-cookie'
import useSWR from "swr";
import LastSeen from "@/components/LastSeen";
import router from "next/router";
import { message } from "antd";
function Id({ query }) {
    const token = Cookies.get('token_dash')
    const { data: getData }: any = useSWR(`dashboard/withdrawals/${query.id}`)

    const AcceptAmount = async (id: any) => {
        try {
            const res: any = await API.post(`dashboard/withdrawals/${id}/accept`, null, {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (res.status === 200) {
                router.push('/tw-admin/withdrawables')
            }
        } catch (error) {
            message.error('للأسف لم يتم القبول')
        }
    }
    return (
        <>
        {getData && getData.data.type == 2 &&
            <div className="timlands-panel">
                <div className="timlands-panel-header flex-center">
                    <h2 className="title me-auto"><span className="material-icons material-icons-outlined">collections_bookmark</span> عرض طلب السحب الواحد</h2>
                    <div className="buttons ml-auto">

                    <button
                            className="btn butt-xs butt-red mx-1"
                            onClick={() => AcceptAmount(getData && getData.data.id)}
                        >
                            رفض هذا الطلب
                        </button>
                        <button
                            className="btn butt-xs butt-green mx-1"
                            onClick={() => AcceptAmount(getData && getData.data.id)}
                        >
                            قبول هذا الطلب
                        </button>
                    </div>
                </div>
                <table className="table">
                    <tbody>
                        <tr>
                            <th>المبلغ المراد تحويله: </th>
                            <td>{getData && getData.data.amount}$</td>
                        </tr>
                        <tr>
                            <th>نوع السحب: </th>
                            <td>{getData && getData.data.type}</td>
                        </tr>
                        <tr>
                            <th>تاريخ السحب: </th>
                            <td><LastSeen date={getData && getData.data.created_at} /></td>
                        </tr>
                        <tr>
                            <th>العنوان الشخصي: </th>
                            <td>{getData && getData.data.withdrawalable.address_line_one}</td>
                        </tr>
                        <tr>
                            <th>العنوان البنكي: </th>
                            <td>{getData && getData.data.withdrawalable.bank_adress_line_one}</td>
                        </tr>
                        <tr>
                            <th>الفرع البنكي: </th>
                            <td>{getData && getData.data.withdrawalable.bank_branch}</td>
                        </tr>
                        <tr>
                            <th>رقم IBAN</th>
                            <td>{getData && getData.data.withdrawalable.bank_iban}</td>
                        </tr>
                        <tr>
                            <th>اسم البنك: </th>
                            <td>{getData && getData.data.withdrawalable.bank_name}</td>
                        </tr>
                        <tr>
                            <th>الحساب البنكي: </th>
                            <td>{getData && getData.data.withdrawalable.bank_number_account}</td>
                        </tr>
                        <tr>
                            <th>كود السويفت SWIFT: </th>
                            <td>{getData && getData.data.withdrawalable.bank_swift}</td>
                        </tr>
                        <tr>
                            <th>المدينة: </th>
                            <td>{getData && getData.data.withdrawalable.city}</td>
                        </tr>
                        <tr>
                            <th>الرمز البريدي: </th>
                            <td>{getData && getData.data.withdrawalable.code_postal}</td>
                        </tr>
                        <tr>
                            <th>الاسم الكامل: </th>
                            <td>{getData && getData.data.withdrawalable.full_name}</td>
                        </tr>
                        <tr>
                            <th>رقم الهاتف: </th>
                            <td>{getData && getData.data.withdrawalable.phone_number_without_code}</td>
                        </tr>
                        <tr>
                            <th>رقم الهاتف: </th>
                            <td>{getData && getData.data.withdrawalable.phone_number_without_code}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        }
        {getData && getData.data.type == 1 &&
            <div className="timlands-panel">
                <div className="timlands-panel-header flex-center">
                    <h2 className="title me-auto"><span className="material-icons material-icons-outlined">collections_bookmark</span> عرض طلب السحب الواحد</h2>
                    <div className="buttons ml-auto">

                    <button
                            className="btn butt-xs butt-red mx-1"
                            onClick={() => AcceptAmount(getData && getData.data.id)}
                        >
                            رفض هذا الطلب
                        </button>
                        <button
                            className="btn butt-xs butt-green mx-1"
                            onClick={() => AcceptAmount(getData && getData.data.id)}
                        >
                            قبول هذا الطلب
                        </button>
                    </div>
                </div>
                <table className="table">
                    <tbody>
                        <tr>
                            <th>المبلغ المراد تحويله: </th>
                            <td>{getData && getData.data.amount}$</td>
                        </tr>
                        <tr>
                            <th>نوع السحب: </th>
                            <td>{getData && getData.data.type}</td>
                        </tr>
                        <tr>
                            <th>تاريخ السحب: </th>
                            <td><LastSeen date={getData && getData.data.created_at} /></td>
                        </tr>
                        <tr>
                            <th>البريد الإلكتروني: </th>
                            <td>{getData && getData.data.withdrawalable.email}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        }
        </>
    );
}
Id.getLayout = function getLayout(page: any): ReactElement {
    return (
        <DashboardLayout>
            {page}
        </DashboardLayout>
    )
}

export default Id;
export async function getServerSideProps({ query }) {
    return { props: { query } }
}