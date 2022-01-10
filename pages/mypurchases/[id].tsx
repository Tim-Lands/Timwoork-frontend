
import React, { ReactElement, useState } from "react";
import Layout from '@/components/Layout/HomeLayout'
import "antd/dist/antd.min.css";
import { MetaTags } from '@/components/SEO/MetaTags'
import useSWR, { mutate } from 'swr'
import PropTypes from "prop-types";
import Loading from "@/components/Loading";
import API from '../../config'
import Cookies from 'js-cookie'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import LastSeen from "@/components/LastSeen";
import { Result } from "antd";
const User = ({ query }) => {
    const token = Cookies.get('token')
    const { data: ShowItem, errorItem }: any = useSWR(`api/order/items/${query.id}/show_item`)
    const { data: userInfo }: any = useSWR(`api/me`)
    const profily = userInfo && userInfo.user_details.profile
    const [rejectLoading, setrejectLoading] = useState(false)
    const rejectHandle = (id: any) => {
        const MySwal = withReactContent(Swal)
        const swalWithBootstrapButtons = MySwal.mixin({
            customClass: {
                confirmButton: 'btn butt-red butt-sm me-1',
                cancelButton: 'btn butt-green butt-sm'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'هل أنت متأكد؟',
            text: "هل انت متأكد أنك تريد إلغاء هذه الطلبية",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'نعم, أريد الإلغاء',
            cancelButtonText: 'لا',
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                setrejectLoading(true)
                try {
                    const res = await API.post(`api/order/items/${id}/request_cancel_item_by_buyer`, {}, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    if (res.status === 200) {
                        mutate('api/my_purchases')
                        setrejectLoading(false)
                    }
                } catch (error) {
                    setrejectLoading(false)
                }
                swalWithBootstrapButtons.fire(
                    'تم الإلغاء!',
                    'لقد تم إلغاء هذه الطلبية بنجاح',
                    'success'
                )
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                setrejectLoading(false)
                swalWithBootstrapButtons.fire(
                    'ملغى',
                    'تم الإلغاء',
                    'error'
                )
            }
        })
    }

    const statusLabel = (status: any) => {
        switch (status) {
            case 0:
                return <span className='badge bg-secondary'>قيد الانتظار...</span>

            case 1:
                return <span className='badge bg-info text-dark'>قيد التنفيذ...</span>

            case 2:
                return <span className='badge bg-danger'>ملغية من طرف البائع</span>

            case 3:
                return <span className='badge bg-warning'>ملغية من طرفك</span>

            case 4:
                return <span className='badge bg-warning'>ملغية من طرفكما</span>

            case 5:
                return <span className='badge bg-success'>مكتملة</span>

            default:
                return <span className='badge bg-info text-dark'>قيد الانتظار...</span>
        }
    }
    function durationFunc() {
        if (ShowItem.data.duration == 1) {
            return 'يوم واحد'
        }
        if (ShowItem.data.duration == 2) {
            return 'يومين'
        }
        if (ShowItem.data.duration > 2 && ShowItem.data.duration < 11) {
            return ShowItem.data.duration + ' أيام '
        }
        if (ShowItem.data.duration >= 11) {
            return ShowItem.data.duration + ' يوم '
        }
    }
    return (
        <>
            <MetaTags
                title={'عرض الطلبية'}
                metaDescription={"عرض الطلبية"}
                ogDescription={"عرض الطلبية"}
            />
            {errorItem && !ShowItem.data && <Result
                status="warning"
                title="حدث خطأ غير متوقع"
            />}
            {!ShowItem && <Loading />}
            {ShowItem &&
                <div className="row py-4 justify-content-center">
                    <div className="col-md-10">
                        <div className="app-bill">
                            <div className="app-bill-header d-flex">
                                <h3 className="title me-auto">تفاصيل الطلبية</h3>
                                {ShowItem && ShowItem.data.status !== 0 &&
                                    <button
                                        disabled={rejectLoading}
                                        onClick={() => rejectHandle(ShowItem.data.id)}
                                        className="btn butt-sm butt-red"
                                    >إلغاء الشراء</button>
                                }
                            </div>
                            <div className="row">
                                <div className="col-xl-4">
                                    <div className="aside-header">
                                        <h3 className="title">معلومات البائع</h3>
                                    </div>
                                    <div className="order-user-info d-flex">
                                        <div className="order-user-avatar">
                                            <img
                                                src={ShowItem && ShowItem.data.profile_seller.profile.avatar}
                                                width={100}
                                                height={100}
                                            />  
                                        </div>
                                        <div className="order-user-content">
                                            <h2 className="user-title">{ShowItem && ShowItem.data.profile_seller.profile.full_name}</h2>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="aside-header">
                                        <h3 className="title">معلومات المشتري</h3>
                                    </div>
                                    <div className="order-user-info d-flex">
                                        <div className="order-user-avatar">
                                            <img
                                                src={profily && profily.avatar}
                                                width={100}
                                                height={100}
                                            />  
                                        </div>
                                        <div className="order-user-content">
                                            <h2 className="user-title">{profily && profily.full_name}</h2>
                                            <p className="meta">
                                                الشارة: {profily && profily.badge.name_ar} | 
                                                المستوى: {profily && profily.level.name_ar} 
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-8">
                                    <table className="table">
                                        <tbody>
                                            <tr>
                                                <th>رقم العملية</th>
                                                <td>
                                                    {ShowItem.data.uuid}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>عنوان الخدمة</th>
                                                <td>
                                                    {statusLabel(ShowItem.data.status)} {ShowItem.data.title}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>تاريخ العملية</th>
                                                <td>
                                                    <LastSeen date={ShowItem.data.created_at} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>مدة الإنجاز</th>
                                                <td>
                                                    {durationFunc()}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>سعر الخدمة</th>
                                                <td>
                                                    ${ShowItem.data.price_product}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>السعر الكلي للطلبية</th>
                                                <td>
                                                    ${ShowItem.data.order.cart.price_with_tax}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
};

export default User;
User.getLayout = function getLayout(page: any): ReactElement {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
User.getInitialProps = async ({ query }) => {
    return { query }
}
User.propTypes = {
    query: PropTypes.any,
};