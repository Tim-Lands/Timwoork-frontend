import React, { ReactElement, useState } from "react";
import Layout from '@/components/Layout/HomeLayout'
import "antd/dist/antd.min.css";
import { MetaTags } from '@/components/SEO/MetaTags'
import useSWR, { mutate } from 'swr'
import PropTypes from "prop-types";
import Loading from "@/components/Loading";
import API from '../../config'
import Cookies from 'js-cookie'
import LastSeen from "@/components/LastSeen";
import { Result } from "antd";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const User = ({ query }) => {
    const token = Cookies.get('token')
    const { data: ShowItem, errorItem }: any = useSWR(`api/order/items/${query.id}/show_item`)
    const [acceptLoading, setacceptLoading] = useState(false)
    const [resourcesLoading, setresourcesLoading] = useState(false)
    const [rejectLoading, setrejectLoading] = useState(false)
    const [rejectOrderLoading, setrejectOrderLoading] = useState(false)

    const requestRejectHandle = (id: any) => {
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
                    const res = await API.post(`api/order/items/${id}/accept_cancel_request_by_seller`, {}, {
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
                setrejectOrderLoading(true)
                try {
                    const res = await API.post(`api/order/items/${id}/reject_item_seller`, {}, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    if (res.status === 200) {
                        mutate('api/my_sales')
                        setrejectOrderLoading(false)
                    }
                } catch (error) {
                    setrejectOrderLoading(false)
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

    const acceptHandle = async (id: any) => {
        setacceptLoading(true)
        try {
            const res = await API.post(`api/order/items/${id}/accept_item_seller`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (res.status === 200) {
                mutate('api/my_sales')
                setacceptLoading(false)
            }
        } catch (error) {
            setacceptLoading(false)
        }
    }
    const resourcesHandle = async (id: any) => {
        setresourcesLoading(true)
        try {
            const res = await API.post(`api/order/items/${id}/dilevery_resources`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (res.status === 200) {
                mutate('api/my_sales')
                setresourcesLoading(false)
            }
        } catch (error) {
            setresourcesLoading(false)
        }
    }
    const [resourceFile, setResourceFile] = useState(null)
    const [uploading, setuploading] = useState(false)
    const uploadProject = async (id: any) => {
        const dataform = new FormData()
        dataform.append('file_resource', resourceFile)
        setuploading(true)
        try {
            const res = await API.post(`api/order/items/${id}/upload_resources`, dataform, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (res.status === 200) {
                setuploading(false)
            }
        } catch (error) {
            setuploading(false)
        }
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

            case 6:
                return <span className='badge bg-success'>قيد تسليم</span>

            case 7:
                return <span className='badge bg-success'>تم الإستلام</span>

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
                                {ShowItem && ShowItem.data.status == 0 && <>
                                    <button
                                        disabled={acceptLoading}
                                        onClick={() => acceptHandle(ShowItem.data.id)}
                                        className="btn butt-xs butt-green mx-1 flex-center"
                                    ><span className="material-icons material-icons-outlined">done_all</span> قبول الطلب</button>
                                    <button
                                        disabled={rejectOrderLoading}
                                        onClick={() => rejectHandle(ShowItem.data.id)}
                                        className="btn butt-xs butt-red mx-1 flex-center"
                                    ><span className="material-icons material-icons-outlined">done_all</span> رفض الطلب</button>
                                </>}
                                {ShowItem && ShowItem.data.status == 1 && <>
                                    <button
                                        disabled={rejectLoading}
                                        onClick={() => requestRejectHandle(ShowItem.data.id)}
                                        className="btn butt-xs butt-primary2 mx-1 flex-center"
                                    ><span className="material-icons material-icons-outlined">highlight_off</span> طلب الإلغاء</button>
                                </>
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
                                                src={ShowItem && ShowItem.data.order.cart.user.profile.avatar}
                                                width={100}
                                                height={100}
                                            />
                                        </div>
                                        <div className="order-user-content">
                                            <h2 className="user-title">{ShowItem && ShowItem.data.order.cart.user.profile.full_name}</h2>
                                            <p className="meta">
                                                الشارة: {/*ShowItem && ShowItem.data.order.cart.user.profile.badge.name_ar*/} |
                                                المستوى: {/*ShowItem && ShowItem.data.order.cart.user.profile.level.name_ar*/}
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
                                    {ShowItem && ShowItem.data.status == 1 && <>
                                        <div className="aside-header">
                                            <h3 className="title">رفع العمل وتسليمه</h3>
                                        </div>
                                        <div className="p-3">
                                            {ShowItem && ShowItem.data.resource !== null && ShowItem.data.resource.status == 0 ? <>
                                                <button
                                                    disabled={resourcesLoading}
                                                    onClick={() => resourcesHandle(ShowItem.data.id)}
                                                    className="btn butt-lg butt-primary mx-1 flex-center"
                                                ><span className="material-icons material-icons-outlined">source</span> تسليم المشروع</button>
                                            </> : <>
                                                {uploading && <p>يرجى الإنتظار...</p>}
                                                <input type="file" className="timlands-inputs" onChange={(event) => {
                                                    setResourceFile(event.currentTarget.files[0]);
                                                }} />
                                                <button className="btn butt-xs butt-primary" onClick={() => uploadProject(ShowItem.data.id)}>رفع</button>
                                            </>
                                            }
                                        </div>
                                    </>}
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