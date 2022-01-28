import React, { ReactElement, useState, useRef } from "react";
import Layout from '@/components/Layout/HomeLayout'
import { Alert } from '@/components/Alert/Alert'
import { MetaTags } from '@/components/SEO/MetaTags'
import useSWR, { mutate } from 'swr'
import PropTypes from "prop-types";
import Loading from "@/components/Loading";
import API from '../../config'
import Cookies from 'js-cookie'
import LastSeen from "@/components/LastSeen";
import { Progress, Result, Timeline } from "antd";
import useFileUpload from 'react-use-file-upload';
import { motion } from "framer-motion";
import router from "next/router";

const User = ({ query }) => {
    const token = Cookies.get('token')
    const { data: ShowItem, errorItem }: any = useSWR(`api/order/items/${query.id}/show_item`)

    const inputRef: any = useRef();
    const [imageProgress, setImageProgress] = useState(0);

    const {
        files,
        fileNames,
        totalSize,
        setFiles,
        removeFile,
    } = useFileUpload();

    const [acceptedBySellerLoadingLoading, setAcceptedBySellerLoading] = useState(false)
    const [rejectedBySellerLoading, setRejectedBySellerLoading] = useState(false)
    const [acceptCancelRequestBySellerLoading, setAcceptCancelRequestBySellerLoading] = useState(false)
    const [rejectCancelRequestBySellerLoading, setRejectCancelRequestBySellerLoading] = useState(false)
    const [resolveConflictBetweenRejectedLoading, setResolveConflictBetweenRejectedLoading] = useState(false)
    const [acceptModifiedSellerLoading, setAcceptModifiedSellerLoading] = useState(false)
    const [rejectModifiedSellerLoading, setRejectModifiedSellerLoading] = useState(false)
    const [dileveredSellerLoading, setDileveredSellerLoading] = useState(false)
    const [resolveConflictBetweenThemModifiedLoading, setResolveConflictBetweenThemModifiedLoading] = useState(false)

    const item_accepted_by_seller = async (id: any) => {
        setAcceptedBySellerLoading(true)
        try {
            const res = await API.post(`api/order/items/${id}/item_accepted_by_seller`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (res.status === 200) {
                mutate('api/my_sales')
                router.reload()
            }
        } catch (error) {
            setAcceptedBySellerLoading(false)
        }
    }
    const item_rejected_by_seller = async (id: any) => {
        setRejectedBySellerLoading(true)
        try {
            const res = await API.post(`api/order/items/${id}/item_rejected_by_seller`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (res.status === 200) {
                mutate('api/my_sales')
                router.reload()
            }
        } catch (error) {
            setRejectedBySellerLoading(false)
        }
    }
    //  رفض طلب الالغاء الخدمة من قبل البائع
    const reject_cancel_request_by_seller = async (id: any) => {
        setRejectCancelRequestBySellerLoading(true)
        try {
            const res = await API.post(`api/order/items/${id}/reject_cancel_request_by_seller`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (res.status === 200) {
                mutate('api/my_sales')
                router.reload()
            }
        } catch (error) {
            setRejectCancelRequestBySellerLoading(false)
        }
    }

    //  تسليم العمل من طرف البائع
    const dilevered_by_seller = async (id: any) => {

        setDileveredSellerLoading(true)
        try {
            const attachments: any = new FormData()
            files.map((file: any) =>
                attachments.append('item_attachments[]', file)
            )
            const res = await API.post(`api/order/items/${id}/dilevered_by_seller`, attachments, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                onUploadProgress: uploadEvent => {
                    setImageProgress(Math.round(uploadEvent.loaded / uploadEvent.total * 100))
                }
            })
            if (res.status === 200) {
                mutate('api/my_sales')
                router.reload()
            }
        } catch (error) {
            setDileveredSellerLoading(false)
        }
    }

    //  قبول طلب الالغاء الخدمة من قبل البائع
    const accept_cancel_request_by_seller = async (id: any) => {
        setAcceptCancelRequestBySellerLoading(true)
        try {
            const res = await API.post(`api/order/items/${id}/accept_cancel_request_by_seller`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (res.status === 200) {
                mutate('api/my_sales')
                router.reload()
            }
        } catch (error) {
            setAcceptCancelRequestBySellerLoading(false)
        }
    }
    // حل النزاع بين الطرفين في حالة الغاء الطلبية

    const resolve_the_conflict_between_them_in_rejected = async (id: any) => {
        setResolveConflictBetweenRejectedLoading(true)
        try {
            const res = await API.post(`api/order/items/${id}/resolve_the_conflict_between_them_in_rejected`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (res.status === 200) {
                mutate('api/my_sales')
                router.reload()
            }
        } catch (error) {
            setResolveConflictBetweenRejectedLoading(false)
        }
    }
    // قبول تعديل الخدمة من قبل المشتري
    const accept_modified_by_seller = async (id: any) => {
        setAcceptModifiedSellerLoading(true)
        try {
            const res = await API.post(`api/order/items/${id}/accept_modified_by_seller`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (res.status === 200) {
                mutate('api/my_sales')
                router.reload()
            }
        } catch (error) {
            setAcceptModifiedSellerLoading(false)
        }
    }

    // رفض تعديل الخدمة من قبل المشتري

    const reject_modified_by_seller = async (id: any) => {
        setRejectModifiedSellerLoading(true)
        try {
            const res = await API.post(`api/order/items/${id}/reject_modified_by_seller`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (res.status === 200) {
                mutate('api/my_sales')
                router.reload()
            }
        } catch (error) {
            setRejectModifiedSellerLoading(false)
        }
    }
    // رفض تعديل الخدمة من قبل المشتري

    const resolve_the_conflict_between_them_in_modified = async (id: any) => {
        setResolveConflictBetweenThemModifiedLoading(true)
        try {
            const res = await API.post(`api/order/items/${id}/resolve_the_conflict_between_them_in_modified`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (res.status === 200) {
                mutate('api/my_sales')
                router.reload()
            }
        } catch (error) {
            setResolveConflictBetweenThemModifiedLoading(false)
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
                return <span className='badge bg-danger text-light'>معلقة</span>

            case 9:
                return <span className='badge bg-light text-dark'>حالة طلب تعديل</span>

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
                                            <h3 className="title">المشتري</h3>
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
                                    {ShowItem && ShowItem.data.status == 4 && <>
                                        {ShowItem && ShowItem.data.item_rejected && ShowItem.data.item_rejected.status == 2 &&
                                            <Alert type="error">
                                                <p className="text">يجب عليكم الوصول إلى اتفاق وإلا ستتدخل الإدارة في ظرف 48 ساعة</p>
                                            </Alert>}
                                    </>
                                    }
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
                                            {ShowItem && ShowItem.data.status == 0 && <>
                                                <button
                                                    disabled={acceptedBySellerLoadingLoading}
                                                    onClick={() => item_accepted_by_seller(ShowItem.data.id)}
                                                    className="btn butt-md butt-green mx-1 flex-center-just"
                                                ><span className="material-icons material-icons-outlined">done_all</span> قبول الطلب</button>
                                                <button
                                                    disabled={rejectedBySellerLoading}
                                                    onClick={() => item_rejected_by_seller(ShowItem.data.id)}
                                                    className="btn butt-md butt-red mx-1 flex-center-just"
                                                ><span className="material-icons material-icons-outlined">highlight_off</span> رفض الطلب</button>
                                            </>}
                                            {ShowItem && ShowItem.data.status == 1 && <>
                                                <div className="box-note red">
                                                    <p className="text">هذه العملية ملغية من طرف المشتري</p>
                                                </div>
                                            </>
                                            }
                                            {ShowItem && ShowItem.data.status == 2 && <div className="box-note warning">
                                                <p className="text">هذه العملية مرفوضة من طرفك</p>
                                            </div>}
                                            {ShowItem && ShowItem.data.status == 3 && <>
                                                <div className="order-uploader-files">
                                                    <div className="uploader-header">
                                                        <h3 className="title">إرفاق ملفات مع تسليم العمل</h3>
                                                    </div>
                                                    {imageProgress !== 0 && <Progress percent={imageProgress} />}
                                                    <div className="form-conainer">
                                                        <ul className="attachment-list-items">
                                                            {fileNames.map((name) => (
                                                                <motion.li initial={{ y: -5, opacity: 0 }} animate={{ y: 0, opacity: 1 }} key={name}>
                                                                    <span className="name-file">{name}</span>
                                                                    <span className="remove-icon" onClick={() => removeFile(name)}>
                                                                        <i className="fa fa-times" />
                                                                    </span>
                                                                </motion.li>
                                                            ))}
                                                        </ul>
                                                        {files.length == 0 && (
                                                            <div className="select-files">
                                                                <p className="text">
                                                                    يمكنك اختيار ملفات من جهازك
                                                                </p>
                                                            </div>
                                                        )}
                                                        {files.length > 0 && (
                                                            <ul className="files-proprieties">
                                                                <li><strong>الحجم الكلي: </strong>{totalSize}</li>
                                                            </ul>
                                                        )}
                                                    </div>
                                                </div>
                                                <button
                                                    className="btn butt-md butt-primary2 mx-1 flex-center-just"
                                                    onClick={() => inputRef.current.click()}
                                                >
                                                    <span className="material-icons material-icons-outlined">file_upload</span> إضافة ملفات
                                                </button>
                                                <input ref={inputRef} type="file" multiple style={{ display: 'none' }} onChange={(e: any) => setFiles(e)} />
                                                <button
                                                    disabled={dileveredSellerLoading}
                                                    onClick={() => dilevered_by_seller(ShowItem.data.id)}
                                                    className="btn butt-md butt-primary mx-1 flex-center-just"
                                                ><span className="material-icons material-icons-outlined">file_upload</span> تسليم الطلب </button>
                                            </>}
                                            {ShowItem && ShowItem.data.status == 4 &&
                                                <>
                                                    {ShowItem.data.item_rejected.status == 0 && <>
                                                        <p className="note-text">
                                                            قام فلان بن فلان بطلب إلغاء الطلبية
                                                        </p>
                                                        <button
                                                            disabled={acceptCancelRequestBySellerLoading}
                                                            onClick={() => accept_cancel_request_by_seller(ShowItem.data.id)}
                                                            className="btn butt-md butt-green mx-1 flex-center-just">
                                                            <span className="material-icons material-icons-outlined">done_all</span>
                                                            قبول طلب الإلغاء
                                                        </button>
                                                        <button
                                                            disabled={rejectCancelRequestBySellerLoading}
                                                            onClick={() => reject_cancel_request_by_seller(ShowItem.data.id)}
                                                            className="btn butt-md butt-red mx-1 flex-center-just">
                                                            <span className="material-icons material-icons-outlined">highlight_off</span>
                                                            رفض طلب الإلغاء
                                                        </button>
                                                    </>}
                                                </>
                                            }
                                            {ShowItem && ShowItem.data.status == 5 && <div className="box-note warning">
                                                <p className="text">هذه العملية ملغية من طرفك</p>
                                            </div>}
                                            {ShowItem && ShowItem.data.status == 6 && <div className="box-note primary">
                                                <p className="text">هذه العملية قيد الإستلام</p>
                                            </div>}
                                            {ShowItem && ShowItem.data.status == 7 && <div className="box-note primary-fill">
                                                <p className="text"><strong>هذه العملية مكتملة</strong></p>
                                            </div>}
                                            {ShowItem && ShowItem.data.status == 8 &&
                                                <button
                                                    disabled={resolveConflictBetweenRejectedLoading}
                                                    onClick={() => resolve_the_conflict_between_them_in_rejected(ShowItem.data.id)}

                                                    className="btn butt-md butt-green mx-1 flex-center-just">
                                                    <span className="material-icons material-icons-outlined">highlight_off</span>
                                                    تم حل النزاع
                                                </button>}

                                            {ShowItem && ShowItem.data.status == 9 && <>
                                                {ShowItem && ShowItem.data.item_modified.status == 0 &&
                                                    <>
                                                        <button
                                                            disabled={acceptModifiedSellerLoading}
                                                            onClick={() => accept_modified_by_seller(ShowItem.data.id)}
                                                            className="btn butt-md butt-green mx-1 flex-center-just"
                                                        ><span className="material-icons material-icons-outlined">done_all</span> قبول طلب التعديل</button>
                                                        <button
                                                            disabled={rejectModifiedSellerLoading}
                                                            onClick={() => reject_modified_by_seller(ShowItem.data.id)}
                                                            className="btn butt-md butt-red mx-1 flex-center-just"
                                                        ><span className="material-icons material-icons-outlined">highlight_off</span> رفض طلب التعديل</button>
                                                    </>
                                                }
                                            </>}

                                            {ShowItem && ShowItem.data.status == 10 && <>
                                                <div className="box-note red">
                                                    <p className="text">إذا تواصلتما إلى حل يمكنك تحويل العملية إلى قيد التنفيد مرة اخرى</p>
                                                </div>
                                                <button
                                                    disabled={resolveConflictBetweenThemModifiedLoading}
                                                    onClick={() => resolve_the_conflict_between_them_in_modified(ShowItem.data.id)}

                                                    className="btn butt-md butt-green mx-1 flex-center-just">
                                                    <span className="material-icons material-icons-outlined">highlight_off</span>
                                                    تم حل النزاع
                                                </button>
                                                
                                            </>
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