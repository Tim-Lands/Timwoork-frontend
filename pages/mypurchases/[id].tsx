import React, { ReactElement, useEffect, useRef, useState } from "react";
import Layout from '@/components/Layout/HomeLayout'
import { MetaTags } from '@/components/SEO/MetaTags'
import useSWR from 'swr'
import PropTypes from "prop-types";
import useFileUpload from 'react-use-file-upload';
import Loading from "@/components/Loading";
import API from '../../config'
import Cookies from 'js-cookie'
import LastSeen from "@/components/LastSeen";
import { Progress, Result, Timeline } from "antd";
import router from "next/router";
import Pusher from 'pusher-js'
import { motion } from "framer-motion";

const Order = ({ query }) => {
    const token = Cookies.get('token')
    const { data: ShowItem, errorItem }: any = useSWR(`api/order/items/${query.id}/show_item`)
    const inputRefMsg: any = useRef();
    const myRef = useRef(null)

    const [messageProgress, setMessageProgress] = useState(0);
    const [messageErrors, setMessageErrors]: any = useState({});

    const [cancelledBuyerLoading, setCancelledBuyerLoading] = useState(false)
    const [requestCancelItemBuyerLoading, setRequestCancelItemBuyerLoading] = useState(false)
    const [acceptedDeliveryBuyerLoading, setAcceptedDeliveryBuyerLoading] = useState(false)
    const [requestModifiedBuyerLoading, setRequestModifiedBuyerLoading] = useState(false)

    const [createConversationLoading, setCreateConversationLoading] = useState(false)
    const [sendMessageLoading, setSendMessageLoading] = useState(false)

    const [message, setMessage] = useState('')
    const [messageType, setMessageType] = useState(0)

    function switchTypeMessage(type: any) {
        switch (type) {
            case 0:
                return ''
            case 1:
                return 'instruct'
            case 2:
                return 'cause'
            default:
                return ''
        }
    }

    const {
        files: filesMsg,
        fileNames: fileNamesMsg,
        totalSize: totalSizeMsg,
        setFiles: setFilesMsg,
        removeFile: removeFileMsg,
    } = useFileUpload();

    const pusher = new Pusher('510f53f8ccb3058a96fc', {
        cluster: 'eu',
        authEndpoint: 'https://api.icoursat.com/api/broadcasting/auth',
        auth: token ? {
            headers: {
                // pass the authorization token when using private channels
                Authorization: `Bearer ${token}`,
            },
        } : undefined,

    })
    useEffect(() => {
        //myRef.current.scrollTo(0, myRef.current.scrollHeight + 80)
        const mounted = true
        if (mounted) {
            const channel = pusher.subscribe(`presence-conversations.${ShowItem && ShowItem.data.conversation.id}`)
            channel.bind('message.sent', (e) => {
                const audio = new Audio('/effect.mp3');
                audio.play();
                console.log(e);
                ShowItem && ShowItem.data.conversation.messages.push(e.data.data)
                myRef.current.scrollTo(0, myRef.current.scrollHeight + 80)
            })
        }
    }, [])

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
                router.reload()
            }
        } catch (error) {
            setRequestModifiedBuyerLoading(false)
        }
    }
    // إنشاء محادثة جديدة بين البائع والمشتري

    const createConversation = async (id: any) => {
        setCreateConversationLoading(true)
        try {
            const res = await API.post(`api/order/items/${id}/create/conversation`, {
                initial_message: message,
                receiver_id: ShowItem && ShowItem.data.order.cart.user.id,
                title: ShowItem && ShowItem.data.title,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (res.status === 200) {
                router.reload();
            }
        } catch (error) {
            setCreateConversationLoading(false)
        }
    }
    // دالة إرسال الرسالة
    //const scrollToRef = (ref) => window.scrollTo(5764, ref.current.offsetTop)
    // console.log(ref.current.scrollTop + ' ', ref.current.scrollHeight)

    const messageRef: any = useRef()

    const sendMessageHandle = async (e: any) => {
        e.preventDefault()
        setSendMessageLoading(true)
        setMessageErrors({})
        try {
            const id = ShowItem && ShowItem.data.conversation.id
            const conversation: any = new FormData()
            filesMsg.map((file: any) =>
                conversation.append('attachments', file)
            )
            conversation.append('type', messageType)
            conversation.append('message', message)
            const res = await API.post(`api/conversations/${id}/sendMessage`, conversation, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                onUploadProgress: uploadEvent => {
                    if (filesMsg.length !== 0) setMessageProgress(Math.round(uploadEvent.loaded / uploadEvent.total * 100))
                }
            })
            if (res.status === 200) {
                ShowItem.data.conversation.messages.push(res.data.data)
                setSendMessageLoading(false)
                myRef.current.scrollTo(0, myRef.current.scrollHeight + 80)
                setMessage('')
                messageRef.current.focus()
            }
        } catch (error) {
            setSendMessageLoading(false)
            if (error && error.response) {
                setMessageErrors(error.response.data.errors);
            }
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
                                    {ShowItem && ShowItem.data.conversation && <>
                                        <div className="aside-header">
                                            <h3 className="title">المحادثة</h3>
                                        </div>
                                        <div className="conversations-list">
                                            <ul
                                                ref={myRef}
                                                className="conversations-items"
                                                style={{
                                                    margin: 0,
                                                    padding: 0,
                                                    listStyle: 'none',
                                                    height: 350,
                                                    overflow: 'hidden',
                                                    overflowY: 'scroll'
                                                }}
                                            >
                                                {ShowItem.data.conversation.messages.map((item: any) => (
                                                    <motion.li initial={{ y: -4, opacity: 0 }} animate={{ y: 0, opacity: 1 }} key={item.id} className={(item.user.id == ShowItem.data.order.cart.user_id ? 'recieved ' : '') + "d-flex message-item " + switchTypeMessage(item.type)} style={{ padding: 10, marginBlock: 6, borderRadius: 6, boxShadow: '2px 1px 12px #f1f1f1' }}>
                                                        <div className="item-avatar" style={{ marginInline: 6 }}>
                                                            <img src={item.user.profile.avatar_url} width={45} height={45} className="rounded-pill" alt="" />
                                                        </div>
                                                        <div className="item-content">
                                                            <p className="text" style={{ margin: 0 }}>{item.message}</p>
                                                            <p className="meta" style={{ marginBlock: 4, fontSize: 12, fontWeight: 200 }}><LastSeen date={item.created_at} /></p>
                                                        </div>
                                                    </motion.li>
                                                ))}

                                            </ul>
                                        </div>
                                        <div className="conversations-form" style={{ backgroundColor: '#fff', padding: 9 }}>
                                            <form onSubmit={sendMessageHandle}>
                                                <div className="timlands-form">
                                                    <input
                                                        id="input-buyer_instruct"
                                                        name="buyer_instruct"
                                                        onKeyUp={() => { setMessageErrors({}) }}
                                                        placeholder="نص الرسالة..."
                                                        className={"timlands-inputs " + (messageErrors && messageErrors.message && ' has-error')}
                                                        disabled={sendMessageLoading}
                                                        autoComplete="off"
                                                        value={message}
                                                        ref={messageRef}
                                                        onChange={(e: any) => setMessage(e.target.value)}
                                                        style={{ minHeight: 60 }}
                                                    />
                                                    <button
                                                        style={{
                                                            width: 90,
                                                            height: 60,
                                                            position: 'absolute',
                                                            top: 11,
                                                            left: 0,
                                                            borderRadius: '5px 0 0 5px'
                                                        }}
                                                        disabled={sendMessageLoading}
                                                        className="btn butt-sm butt-primary flex-center-just"
                                                        type="submit"
                                                    >
                                                        <span className="material-icons material-icons-outlined">send</span>
                                                        إرسال
                                                    </button>
                                                    {messageErrors && messageErrors.message &&
                                                        <motion.div initial={{ y: -6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                                            <p className="text">{messageErrors.message[0]}</p>
                                                        </motion.div>
                                                    }
                                                    <div className="send-attachments">
                                                        {messageProgress !== 0 && <Progress percent={messageProgress} />}
                                                        <div className="form-conainer">
                                                            <ul
                                                                className="attachment-list-items"
                                                                style={{
                                                                    listStyle: 'none',
                                                                    paddingInline: 0,
                                                                    paddingTop: 6,
                                                                    overflow: 'hidden',
                                                                }}>
                                                                {fileNamesMsg.map((name) => (
                                                                    <motion.li style={{ overflow: 'hidden', position: 'relative', paddingBlock: 3, paddingInline: 9, fontSize: 13 }} initial={{ y: -5, opacity: 0 }} animate={{ y: 0, opacity: 1 }} key={name}>
                                                                        <span className="name-file">{name}</span>
                                                                        <span className="remove-icon d-flex" style={{ position: 'absolute', left: 0, fontSize: 13 }} onClick={() => removeFileMsg(name)}>
                                                                            <i className="fa fa-times"></i>
                                                                        </span>
                                                                    </motion.li>
                                                                ))}
                                                            </ul>
                                                            {filesMsg.length > 0 && (
                                                                <ul className="files-proprieties" style={{ listStyle: 'none', padding: 0, overflow: 'hidden', }}>
                                                                    <li><strong>الحجم الكلي: </strong>{totalSizeMsg}</li>
                                                                </ul>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <input ref={inputRefMsg} type="file" multiple style={{ display: 'none' }} onChange={(e: any) => setFilesMsg(e)} />

                                                </div>
                                                <div className="py-1 d-flex">

                                                    <button
                                                        type="button"
                                                        style={{ width: '65%' }}
                                                        disabled={sendMessageLoading}
                                                        className="btn butt-sm butt-primary2 mx-1 flex-center-just"
                                                        onClick={() => inputRefMsg.current.click()}
                                                    >
                                                        <span className="material-icons material-icons-outlined">attach_file</span> إرفاق ملفات
                                                    </button>
                                                    <select className={"timlands-inputs me-auto"} disabled={sendMessageLoading} name="message_type" onChange={(e: any) => setMessageType(e.target.value)}>
                                                        <option value="0">نص عادي</option>
                                                        <option value="1">تعليمة</option>
                                                        <option value="2">سبب إلغاء</option>
                                                    </select>
                                                </div>
                                            </form>
                                        </div>
                                    </>}
                                    {ShowItem && ShowItem.data.conversation == null && <>
                                        <div className="conversation-start">
                                            <div className="icon">
                                                <span className="material-icons material-icons-outlined">
                                                    forum
                                                </span>
                                            </div>
                                            <h3 className="title">تواصل مع المشتري</h3>
                                            <p className="text">حاول ان تتفق مع المشتري قبل البدء في تنفيذ العملية</p>
                                            <textarea
                                                id="input-initial_message"
                                                name="initial_message"
                                                placeholder="نص الرسالة..."
                                                className={"timlands-inputs mt-2"}
                                                autoComplete="off"
                                                style={{ minHeight: 80 }}
                                                onChange={(e: any) => setMessage(e.target.value)}
                                            ></textarea>
                                            <div className="mt-3 conversion-btn">
                                                <button type="button" disabled={createConversationLoading} onClick={() => createConversation(ShowItem && ShowItem.data.id)} className="btn butt-lg butt-primary">إنشاء المحادثة</button>
                                            </div>
                                        </div>
                                    </>}
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