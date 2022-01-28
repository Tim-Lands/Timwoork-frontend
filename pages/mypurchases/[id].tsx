import React, { ReactElement, useState } from "react";
import Layout from '@/components/Layout/HomeLayout'
import { MetaTags } from '@/components/SEO/MetaTags'
import useSWR, { mutate } from 'swr'
import PropTypes from "prop-types";
import Loading from "@/components/Loading";
import API from '../../config'
import Cookies from 'js-cookie'
import LastSeen from "@/components/LastSeen";
import { Result, Timeline } from "antd";
import router from "next/router";

const Order = ({ query }) => {
    const token = Cookies.get('token')
    const { data: ShowItem, errorItem }: any = useSWR(`api/order/items/${query.id}/show_item`)

    const [cancelledBuyerLoading, setCancelledBuyerLoading] = useState(false)
    const [requestCancelItemBuyerLoading, setRequestCancelItemBuyerLoading] = useState(false)
    const [acceptedDeliveryBuyerLoading, setAcceptedDeliveryBuyerLoading] = useState(false)
    const [requestModifiedBuyerLoading, setRequestModifiedBuyerLoading] = useState(false)

    // الغاء الطلبية من قبل المشتري
    const item_cancelled_by_buyer = async (id: any) => {
        setCancelledBuyerLoading(true)
        try {
            const res = await API.post(`api/order/items/${id}/item_cancelled_by_buyer`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (res.status === 200) {
                mutate('api/my_sales')
                router.reload()
            }
        } catch (error) {
            setCancelledBuyerLoading(false)
        }
    }

    // طلب الالغاء الخدمة من قبل المشتري
    const request_cancel_item_by_buyer = async (id: any) => {
        setRequestCancelItemBuyerLoading(true)
        try {
            const res = await API.post(`api/order/items/${id}/request_cancel_item_by_buyer`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (res.status === 200) {
                mutate('api/my_sales')
                router.reload()
            }
        } catch (error) {
            setRequestCancelItemBuyerLoading(false)
        }
    }

    // قبول المشروع من قبل المشتري
    const accepted_delivery_by_buyer = async (id: any) => {
        setAcceptedDeliveryBuyerLoading(true)
        try {
            const res = await API.post(`api/order/items/${id}/accepted_delivery_by_buyer`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (res.status === 200) {
                mutate('api/my_sales')
                router.reload()
            }
        } catch (error) {
            setAcceptedDeliveryBuyerLoading(false)
        }
    }

    // طلب تعديل الخدمة من قبل المشتري
    const request_modified_by_buyer = async (id: any) => {
        setRequestModifiedBuyerLoading(true)
        try {
            const res = await API.post(`api/order/items/${id}/request_modified_by_buyer`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (res.status === 200) {
                mutate('api/my_sales')
                router.reload()
            }
        } catch (error) {
            setRequestModifiedBuyerLoading(false)
        }
    }

    const switchFileTypes = (type: any) => {
        switch (type) {
            case 'png':
                return <span style={{ color: 'orange' }} className="material-icons material-icons-outlined">image</span>

            case 'jpg':
                return <span style={{ color: 'orange' }} className="material-icons material-icons-outlined">image</span>

            case 'gif':
                return <span style={{ color: 'orange' }} className="material-icons material-icons-outlined">image</span>

            case 'psd':
                return <span style={{ color: 'orange' }} className="material-icons material-icons-outlined">image</span>

            case 'zip':
                return <span style={{ color: 'plum' }} className="material-icons material-icons-outlined">folder_zip</span>

            case 'rar':
                return <span style={{ color: 'plum' }} className="material-icons material-icons-outlined">folder_zip</span>

            case 'mp3':
                return <span style={{ color: 'springgreen' }} className="material-icons material-icons-outlined">headphones</span>

            case 'wma':
                return <span style={{ color: 'springgreen' }} className="material-icons material-icons-outlined">headphones</span>

            case 'aac':
                return <span style={{ color: 'springgreen' }} className="material-icons material-icons-outlined">headphones</span>

            case 'ogg':
                return <span style={{ color: 'springgreen' }} className="material-icons material-icons-outlined">headphones</span>

            case 'wav':
                return <span style={{ color: 'springgreen' }} className="material-icons material-icons-outlined">headphones</span>

            case 'mp4':
                return <span style={{ color: 'yellowgreen' }} className="material-icons material-icons-outlined">smart_display</span>

            case 'avi':
                return <span style={{ color: 'yellowgreen' }} className="material-icons material-icons-outlined">smart_display</span>

            case 'mpg':
                return <span style={{ color: 'yellowgreen' }} className="material-icons material-icons-outlined">smart_display</span>

            case 'pdf':
                return <span style={{ color: 'maroon' }} className="material-icons material-icons-outlined">picture_as_pdf</span>

            default:
                return <span className="material-icons material-icons-outlined">description</span>
        }
    }
    const statusLabel = (status: any) => {
        switch (status) {
            case 0:
                return <span className='badge bg-secondary'>قيد الانتظار...</span>

            case 1:
                return <span className='badge bg-warning'>ملغية من طرف المشتري</span>

            case 2:
                return <span className='badge bg-danger'>مرفوضة من طرف البائع</span>

            case 3:
                return <span className='badge bg-info text-dark'>قيد التنفيذ...</span>

            case 4:
                return <span className='badge bg-warning'>طلب إلغاء من طرف المشتري</span>

            case 5:
                return <span className='badge bg-warning'>ملغية من طرف البائع</span>

            case 6:
                return <span className='badge bg-primary'>قيد الإستلام</span>

            case 7:
                return <span className='badge bg-dark text-light'>مكتملة</span>

            case 8:
                return <span className='badge bg-red text-light'>معلقة</span>

            case 9:
                return <span className='badge bg-light text-dark'>حالة تعديل</span>

            case 10:
                return <span className='badge bg-danger text-light'>معلقة بسبب رفض التعديل</span>

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
                                <div className="col-md-4">
                                    <div style={{ backgroundColor: '#fff', padding: 9, marginBottom: 7 }}>
                                        <div className="aside-header">
                                            <h3 className="title">البائع</h3>
                                        </div>
                                        <div className="order-user-info d-flex flex-center">
                                            <div className="order-user-avatar">
                                                <img
                                                    src={ShowItem && ShowItem.data.profile_seller.profile.avatar_url}
                                                    width={50}
                                                    height={50}
                                                />
                                            </div>
                                            <div className="order-user-content">
                                                <h2 className="user-title">{ShowItem && ShowItem.data.profile_seller.profile.full_name}</h2>
                                                <p className="meta">
                                                    الشارة: {/*ShowItem && ShowItem.data.order.cart.user.profile.badge.name_ar*/} |
                                                    المستوى: {/*ShowItem && ShowItem.data.order.cart.user.profile.level.name_ar*/}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {ShowItem && ShowItem.data.attachments && <>
                                        <div style={{ backgroundColor: '#fff', padding: 9 }}>
                                            <div className="aside-header">
                                                <h3 className="title">مرفقات المشروع</h3>
                                            </div>
                                            <div className="aside-attachments">
                                                <Timeline>
                                                    {ShowItem.data.attachments.map((e: any, i) => (
                                                        <Timeline.Item key={i} dot={<>{switchFileTypes(e.mime_type)}</>}>
                                                            <a href={e.full_path} rel="noreferrer" target="_blank">
                                                                تحميل الملف {i + 1}#
                                                            </a>
                                                        </Timeline.Item>
                                                    ))}
                                                </Timeline>
                                            </div>
                                        </div>
                                    </>}
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
                                <div className="col-md-3">

                                    <div style={{ backgroundColor: '#fff', padding: 9, marginBottom: 7 }}>
                                        <div className="aside-header">
                                            <h3 className="title">الأدوات</h3>
                                        </div>
                                        <div className="d-grid gap-2">
                                            {ShowItem && ShowItem.data.status == 0 &&
                                                <button
                                                    disabled={cancelledBuyerLoading}
                                                    onClick={() => item_cancelled_by_buyer(ShowItem.data.id)}
                                                    className="btn butt-md butt-red mx-1 flex-center-just"
                                                ><span className="material-icons material-icons-outlined">highlight_off</span> إلغاء عملية الشراء</button>}
                                            {ShowItem && ShowItem.data.status == 1 && <span className='badge bg-success'>تم الإلغاء من طرفك</span>}
                                            {ShowItem && ShowItem.data.status == 2 && <span className='badge bg-warning'>هذه الطلبية مرفوضة من طرف البائع</span>}
                                            {ShowItem && ShowItem.data.status == 3 &&
                                                <button
                                                    disabled={requestCancelItemBuyerLoading}
                                                    onClick={() => request_cancel_item_by_buyer(ShowItem.data.id)}
                                                    className="btn butt-md butt-red mx-1 flex-center-just"
                                                ><span className="material-icons material-icons-outlined">highlight_off</span> طلب الإلغاء </button>
                                            }
                                            {ShowItem && ShowItem.data.status == 4 &&
                                                <>
                                                    {ShowItem.data.item_rejected.status == 0 && <p className="note-text">
                                                        في انتظار قبول طلبك من طرف البائع
                                                    </p>}
                                                </>

                                            }
                                            {ShowItem && ShowItem.data.status == 5 && <span className='badge bg-warning'>ملغية من طرف البائع</span>}
                                            {ShowItem && ShowItem.data.status == 6 && <>
                                                <button
                                                    disabled={acceptedDeliveryBuyerLoading}
                                                    onClick={() => accepted_delivery_by_buyer(ShowItem.data.id)}
                                                    className="btn butt-md butt-green mx-1 flex-center-just"
                                                ><span className="material-icons material-icons-outlined">check_circle_outline</span> قبول الإستلام </button>
                                                <button
                                                    disabled={requestModifiedBuyerLoading}
                                                    onClick={() => request_modified_by_buyer(ShowItem.data.id)}
                                                    className="btn butt-md butt-primary2 mx-1 flex-center-just"
                                                ><span className="material-icons material-icons-outlined">edit</span> طلب تعديل </button>
                                            </>}
                                            {ShowItem && ShowItem.data.status == 7 && <span className='badge bg-dark text-light'>مكتملة</span>}
                                            {ShowItem && ShowItem.data.status == 8 && <>
                                                <p className="note-text">
                                                    لقد تم رفض طلبك الإلغاء من طرف البائع
                                                </p>
                                                <div className="box-note red">
                                                    <p className="text">في انتظار حل النزاع بينكما</p>
                                                </div>
                                            </>}

                                            {ShowItem && ShowItem.data.status == 9 && <>
                                                {ShowItem && ShowItem.data.item_modified.status == 0 &&
                                                    <>
                                                        <div className="box-note warning">
                                                            <p className="text">في انتظار قبول البائع لطلب التعديل</p>
                                                        </div>
                                                    </>
                                                }
                                            </>}

                                            {ShowItem && ShowItem.data.status == 10 &&
                                                <div className="box-note warning">
                                                    <p className="text">لقد تم رفض التعديل من طرف البائع في انتظار حل النزاع بيك وبين البائع</p>
                                                </div>
                                            }
                                        </div>
                                    </div>
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

export default Order;
Order.getLayout = function getLayout(page: any): ReactElement {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
Order.getInitialProps = async ({ query }) => {
    return { query }
}
Order.propTypes = {
    query: PropTypes.any,
};