import Layout from '@/components/Layout/HomeLayout'
import React, { ReactElement, useEffect, useRef, useState } from 'react'
import { MetaTags } from '@/components/SEO/MetaTags';
import PropTypes from "prop-types";
import LastSeen from '@/components/LastSeen';
import API from '../../config'
import Cookies from 'js-cookie'
import useFileUpload from 'react-use-file-upload';
import useSWR from 'swr'
import Sidebar from '@/components/Conversations/Sidebar';
import { Progress } from 'antd';
import { motion } from 'framer-motion';
import router from 'next/router';
import Loading from '@/components/Loading';

function Conversation({ query }) {
    const token = Cookies.get('token')
    const inputRefMsg: any = useRef();
    const { data: conversationsSingle }: any = useSWR(`api/conversations/${query.id}`)
    const { data: profileInfo }: any = useSWR(`api/me`)
    const [messageProgress, setMessageProgress] = useState(0);
    const [messageErrors, setMessageErrors]: any = useState({});
    const [sendMessageLoading, setSendMessageLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [messageType, setMessageType] = useState(0)
    useEffect(() => {
        if (!token) {
            router.push('/login')
        }
    }, [])
    const {
        files: filesMsg,
        fileNames: fileNamesMsg,
        totalSize: totalSizeMsg,
        setFiles: setFilesMsg,
        removeFile: removeFileMsg,
        clearAllFiles: clearAllFilesMsg,
    } = useFileUpload();
    const messageRef: any = useRef()

    const sendMessageHandle = async (e: any) => {
        e.preventDefault()
        setSendMessageLoading(true)
        setMessageErrors({})
        try {
            const id = query.id
            const conversation: any = new FormData()
            filesMsg.map((file: any) =>
                conversation.append('attachments[]', file)
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
                setSendMessageLoading(false)
                conversationsSingle.data.messages.push(res.data.data)
                setMessage('')
                messageRef.current.focus()
                setMessageProgress(0)
                clearAllFilesMsg()
            }
        } catch (error) {
            setSendMessageLoading(false)
            if (error && error.response) {
                setMessageErrors(error.response.data.errors);
            }
        }
    }
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
    return (
        <>
            <MetaTags
                title={`المحادثات - ${conversationsSingle && conversationsSingle.data.title}`}
                metaDescription={'مبيعاتي - تيموورك'}
                ogDescription={'مبيعاتي - تيموورك'}
            />
            <div className="timwoork-single">
                <div className="row py-4 justify-content-center">
                    <div className="col-lg-11">
                        
                        <div className="row">
                            <div className="col-lg-4">
                                <Sidebar RouterId={query.id} />
                            </div>
                            <div className="col-lg-8">
                                <div className="app-bill">
                                    {!conversationsSingle && <Loading />}
                                    <div className="conversations-list">
                                        <div className="conversations-title">
                                            <h4 className="title">
                                                {conversationsSingle && conversationsSingle.data.title}
                                            </h4>
                                        </div>
                                        <ul
                                            className="conversations-items"
                                            style={{
                                                margin: 0,
                                                padding: 0,
                                                listStyle: 'none',
                                            }}
                                        >
                                            {conversationsSingle && conversationsSingle.data.messages.map((item: any) => (
                                                <motion.li
                                                    initial={{ y: -4, opacity: 0 }}
                                                    animate={{ y: 0, opacity: 1 }}
                                                    id={`msg-item-${item.id}`}
                                                    key={1}
                                                    className={(profileInfo && profileInfo.user_details.id == item.user.id ? '' : 'recieved ') + "d-flex message-item " + switchTypeMessage(item.type)}
                                                    style={{ marginBlock: 9 }}>
                                                    <div className="item-avatar" style={{ marginInline: 9 }}>
                                                        <img src={item.user.profile.avatar_url} width={60} height={60} className="rounded-pill" alt="" />
                                                    </div>

                                                    <div className="item-content">
                                                        {item.type == 1 && <span className="bg-success text-light d-inline-block" style={{ paddingInline: 9, paddingBlock: 3, borderRadius: '4px 4px 0 4px', fontSize: 12, marginBottom: 5 }}>تعليمات</span>}
                                                        {item.type == 2 && <span className="bg-danger text-light d-inline-block" style={{ paddingInline: 9, paddingBlock: 3, borderRadius: '4px 4px 0 4px', fontSize: 12, marginBottom: 5 }}>سبب إلغاء</span>}
                                                        <p className="text" style={{ margin: 0 }}>{item.message}</p>
                                                        <p className="meta" style={{ marginBlock: 4, fontSize: 12, fontWeight: 200 }}><LastSeen date={item.created_at} /></p>
                                                        {item.attachments &&
                                                            <div className="attach-items" style={{ marginBlock: 4, fontSize: 12, fontWeight: 200 }}>
                                                                {item.attachments.map((att: any, i: number) => (
                                                                    <div className="att-item" key={att.id}>
                                                                        <a href={att.full_path} rel="noreferrer" target="_blank">
                                                                            {switchFileTypes(att.mime_type)} تحميل الملف {i + 1}#
                                                                        </a>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        }
                                                        {(profileInfo && profileInfo.user_details.id == item.user.id) &&
                                                            <>
                                                                {item.read_at && <span className="readed is-readed">
                                                                    <span className="material-icons material-icons-outlined">
                                                                        done_all
                                                                    </span>
                                                                </span>}
                                                                {!item.read_at && <span className="readed is-unreaded">
                                                                    <span className="material-icons material-icons-outlined">
                                                                        done
                                                                    </span>
                                                                </span>}
                                                            </>
                                                        }
                                                    </div>
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="conversations-form-main">
                                    <div className="conversations-form" style={{ padding: 9 }}>
                                        <form onSubmit={sendMessageHandle}>
                                            <div className="timlands-form">
                                                <label htmlFor="message_type" className="form-text">اختر نوع الرسالة</label>
                                                <div className="py-1 d-flex">
                                                    <select className={"timlands-inputs me-auto"} disabled={sendMessageLoading} name="message_type" id="message_type" onChange={(e: any) => setMessageType(e.target.value)}>
                                                        <option value="0">نص عادي</option>
                                                        <option value="1">تعليمة</option>
                                                        <option value="2">سبب إلغاء</option>
                                                    </select>
                                                    <button
                                                        type="button"
                                                        style={{ width: '65%' }}
                                                        disabled={sendMessageLoading}
                                                        className="btn butt-sm butt-primary2-out mx-1 flex-center-just"
                                                        onClick={() => inputRefMsg.current.click()}
                                                    >
                                                        <span className="material-icons material-icons-outlined">attach_file</span> إرفاق ملفات
                                                    </button>
                                                </div>
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
                                                                    <span className="remove-icon d-flex" style={{ position: 'absolute', left: 10, fontSize: 13, top: 7, color: 'red', cursor: 'pointer' }} onClick={() => removeFileMsg(name)}>
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
                                                    <input ref={inputRefMsg} type="file" multiple style={{ display: 'none' }} onChange={(e: any) => setFilesMsg(e)} />
                                                </div>
                                                <div className="relative-form d-flex" style={{ position: 'relative', minHeight: 60 }}>
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
                                                        style={{ height: 60, width: 'calc(100% - 110px)', borderRadius: '0 5px 5px 0' }}
                                                    />
                                                    <button
                                                        style={{
                                                            width: 110,
                                                            height: 60,
                                                            borderRadius: '5px 0 0 5px'
                                                        }}
                                                        disabled={sendMessageLoading}
                                                        className="btn butt-sm butt-primary flex-center-just"
                                                        type="submit"
                                                    >
                                                        <span className="material-icons material-icons-outlined">send</span>
                                                        إرسال
                                                    </button>
                                                </div>
                                                {messageErrors && messageErrors.message &&
                                                    <motion.div initial={{ y: -6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                                        <p className="text">{messageErrors.message[0]}</p>
                                                    </motion.div>
                                                }
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
Conversation.getLayout = function getLayout(page: any): ReactElement {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
export default Conversation
Conversation.getInitialProps = async ({ query }) => {
    return { query }
}
Conversation.propTypes = {
    query: PropTypes.any,
};