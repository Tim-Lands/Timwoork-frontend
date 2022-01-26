import React, { ReactElement, useState } from "react";
import Layout from '@/components/Layout/HomeLayout'
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
                return <span className='badge bg-danger'>ملغية من طرفك</span>

            case 3:
                return <span className='badge bg-warning'>ملغية من المشتري</span>

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
        <div style={{ backgroundColor: '#f6f6f6' }}>
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
                    <div className="col-md-11">
                        <div className="app-bill" style={{ backgroundColor: '#f6f6f6' }}>
                            <div className="row">
                                <div className="col-md-3">
                                    <div style={{ backgroundColor: '#fff', padding: 9, marginBottom: 7 }}>
                                        <div className="aside-header">
                                            <h3 className="title">الأدوات</h3>
                                        </div>
                                        <div className="d-grid gap-2">
                                            {ShowItem && ShowItem.data.status == 2 && <>
                                                <button
                                                    disabled={acceptLoading}
                                                    onClick={() => acceptHandle(ShowItem.data.id)}
                                                    className="btn butt-sm butt-green mx-1 flex-center-just"
                                                ><span className="material-icons material-icons-outlined">done_all</span> قبول الطلب</button>
                                                <button
                                                    disabled={rejectOrderLoading}
                                                    onClick={() => rejectHandle(ShowItem.data.id)}
                                                    className="btn butt-sm butt-red mx-1 flex-center-just"
                                                ><span className="material-icons material-icons-outlined">done_all</span> رفض الطلب</button>
                                            </>}
                                            {ShowItem && ShowItem.data.status == 1 && <>
                                                <button
                                                    disabled={rejectLoading}
                                                    onClick={() => requestRejectHandle(ShowItem.data.id)}
                                                    className="btn butt-sm butt-red mx-1 flex-center-just"
                                                ><span className="material-icons material-icons-outlined">highlight_off</span> طلب الإلغاء</button>
                                            </>
                                            }
                                        </div>
                                    </div>
                                    <div style={{ backgroundColor: '#fff', padding: 9, marginBottom: 7 }}>
                                        <div className="aside-header">
                                            <h3 className="title">البائع</h3>
                                        </div>
                                        <div className="order-user-info d-flex flex-center">
                                            <div className="order-user-avatar">
                                                <img
                                                    src={ShowItem && ShowItem.data.order.cart.user.profile.avatar_url}
                                                    width={50}
                                                    height={50}
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
                                    <div style={{ backgroundColor: '#fff', padding: 9 }}>
                                        {ShowItem && ShowItem.data.status == 1 && <>
                                            <div className="aside-header">
                                                <h3 className="title">رفع العمل وتسليمه</h3>
                                            </div>
                                            <div className="px-1">
                                                {ShowItem && ShowItem.data.resource !== null && ShowItem.data.resource.status == 0 ? <>
                                                    <button
                                                        disabled={resourcesLoading}
                                                        onClick={() => resourcesHandle(ShowItem.data.id)}
                                                        className="btn butt-lg butt-primary mx-1 flex-center"
                                                    ><span className="material-icons material-icons-outlined">source</span> تسليم المشروع</button>
                                                </> : <>
                                                    {uploading && <p>يرجى الإنتظار...</p>}
                                                    <input
                                                        disabled={uploading}
                                                        type="file"
                                                        className="timlands-inputs"
                                                        onChange={(event) => {
                                                            setResourceFile(event.currentTarget.files[0]);
                                                        }}
                                                    />
                                                    <div className="d-grid gap-2 mt-2">
                                                        <button
                                                            className="btn butt-md butt-primary flex-center-just"
                                                            disabled={uploading}
                                                            onClick={() => uploadProject(ShowItem.data.id)}
                                                        >
                                                            <span className="material-icons material-icons-outlined">file_upload</span>
                                                            رفع</button>
                                                    </div>
                                                </>
                                                }
                                            </div>
                                        </>}
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div className="aside-header">
                                        <h3 className="title">{ShowItem.data.title}</h3>
                                    </div>
                                    <div style={{ backgroundColor: '#fff', padding: 9 }}>
                                        <div className="aside-header">
                                            <h3 className="title">تعليمات المشتري</h3>
                                        </div>
                                    </div>
                                    <div className="aside-header">
                                        <h3 className="title">المحادثة</h3>
                                    </div>
                                    <div className="conversations-list">
                                        <ul className="conversations-items" style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                                            <li className="d-flex" style={{ backgroundColor: '#fff', padding: 10, marginBlock: 6, borderRadius: 6, boxShadow: '2px 1px 12px #f1f1f1' }}>
                                                <div className="item-avatar" style={{ marginInline: 6 }}>
                                                    <img src="/avatar2.jpg" width={45} height={45} className="rounded-pill" alt="" />
                                                </div>
                                                <div className="item-content">
                                                    <p className="text" style={{ color: '#333', margin: 0 }}>يمكنك الآن تحميل الملف لقد تم اكماله بنجاح شكرا لك اخي لبكريم</p>
                                                    <p className="meta" style={{ color: '#666', marginBlock: 4, fontSize: 12, fontWeight: 200 }}>منذ دقيقتين</p>
                                                </div>

                                            </li>
                                        </ul>
                                    </div>
                                    <div className="conversations-form" style={{ backgroundColor: '#fff', padding: 9 }}>
                                        <div className="timlands-form">
                                            <label className="label-block" htmlFor="input-buyer_instruct">نص الرسالة</label>
                                            <textarea
                                                id="input-buyer_instruct"
                                                name="buyer_instruct"
                                                placeholder="نص الرسالة..."
                                                className={"timlands-inputs "}
                                                autoComplete="off"
                                                style={{ minHeight: 80 }}
                                            ></textarea>
                                            <div className="send-attachments">

                                            </div>
                                        </div>
                                        <div className="py-1">
                                            <button className="btn butt-sm butt-primary">إرسال</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div style={{ backgroundColor: '#fff', padding: 9 }}>
                                        <div className="aside-header">
                                            <h3 className="title">تفاصيل العملية</h3>
                                        </div>
                                        <table className="table table-borderless">
                                            <tbody>
                                                <tr>
                                                    <th>رقم العملية</th>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        {ShowItem.data.uuid}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>حالة العملية</th>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        {statusLabel(ShowItem.data.status)}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>تاريخ العملية</th>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <LastSeen date={ShowItem.data.created_at} />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>مدة الإنجاز</th>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        {durationFunc()}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>السعر الكلي للطلبية</th>
                                                </tr>
                                                <tr>
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
                </div>
            }
        </div>
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