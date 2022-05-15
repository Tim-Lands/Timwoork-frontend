import React, { ReactElement, useState, useRef, useEffect } from "react";
import Layout from "@/components/Layout/HomeLayout";
import { Alert } from "@/components/Alert/Alert";
import { MetaTags } from "@/components/SEO/MetaTags";
import useSWR from "swr";
import PropTypes from "prop-types";
import Loading from "@/components/Loading";
import Link from "next/link";
import API from "../../config";
import Cookies from "js-cookie";
import LastSeen from "@/components/LastSeen";
import { Modal, Progress, Result, Spin, Timeline } from "antd";
import useFileUpload from "react-use-file-upload";
import { motion } from "framer-motion";
import router from "next/router";
//import { pusher } from "../../config/pusher";

const User = ({ query }) => {
  let token = Cookies.get("token");
  if (!token && typeof window !== "undefined")
    token = localStorage.getItem("token");
  const { data: ShowItem, errorItem }: any = useSWR(`api/my_sales/${query.id}`);
  const inputRef: any = useRef();
  const inputRefMsg: any = useRef();
  console.log(ShowItem);
  const { data: userInfo }: any = useSWR("api/me");
  const veriedEmail = userInfo && userInfo.user_details.email_verified_at;

  const [imageProgress, setImageProgress] = useState(0);
  const [messageProgress, setMessageProgress] = useState(0);
  const [messageErrors, setMessageErrors]: any = useState({});
  const [BySellerMSGLoading, setBySellerMSGLoading]: any = useState(false);

  const myRef: any = useRef();
  // Send Message function
  const rejectMessageCause = async (messageText: any, typeCause = 2) => {
    setBySellerMSGLoading(true);
    try {
      const id = ShowItem && ShowItem.data.conversation.id;
      const conversation: any = new FormData();
      conversation.append("type", typeCause);
      conversation.append("message", messageText);
      const res = await API.post(
        `api/conversations/${id}/sendMessage`,
        conversation,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        //router.reload()
        setBySellerMSGLoading(false);
        setIsModalVisible(false);
        setModalVisibleRejectModified(false);
        setModalVisibleReject(false);
        router.reload();
      }
    } catch (error) {
      if (error && error.response) {
        setMessageErrors(error.response.data.errors);
      }
    }
  };
  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, []);

  const { files, fileNames, totalSize, setFiles, removeFile } = useFileUpload();

  const {
    files: filesMsg,
    fileNames: fileNamesMsg,
    totalSize: totalSizeMsg,
    setFiles: setFilesMsg,
    removeFile: removeFileMsg,
    clearAllFiles: clearAllFilesMsg,
  } = useFileUpload();

  const [acceptedBySellerLoadingLoading, setAcceptedBySellerLoading] =
    useState(false);
  const [rejectedBySellerLoading, setRejectedBySellerLoading] = useState(false);
  const [
    acceptCancelRequestBySellerLoading,
    setAcceptCancelRequestBySellerLoading,
  ] = useState(false);
  const [
    rejectCancelRequestBySellerLoading,
    setRejectCancelRequestBySellerLoading,
  ] = useState(false);
  const [
    resolveConflictBetweenRejectedLoading,
    setResolveConflictBetweenRejectedLoading,
  ] = useState(false);
  const [acceptModifiedSellerLoading, setAcceptModifiedSellerLoading] =
    useState(false);
  const [rejectModifiedSellerLoading, setRejectModifiedSellerLoading] =
    useState(false);
  const [dileveredSellerLoading, setDileveredSellerLoading] = useState(false);
  const [
    resolveConflictBetweenThemModifiedLoading,
    setResolveConflictBetweenThemModifiedLoading,
  ] = useState(false);

  const [createConversationLoading, setCreateConversationLoading] =
    useState(false);
  const [sendMessageLoading, setSendMessageLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleDilevered, setModalVisibleDilevered] = useState(false);
  const [isModalVisibleReject, setModalVisibleReject] = useState(false);
  const [isModalVisibleRejectModified, setModalVisibleRejectModified] =
    useState(false);

  function switchTypeMessage(type: any) {
    switch (type) {
      case 0:
        return "";
      case 1:
        return "instruct";
      case 2:
        return "cause";
      default:
        return "";
    }
  }

  const item_accepted_by_seller = async (id: any) => {
    setAcceptedBySellerLoading(true);
    try {
      const res = await API.post(
        `api/order/items/${id}/item_accepted_by_seller`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        router.reload();
      }
    } catch (error) {
      setAcceptedBySellerLoading(false);
    }
  };
  const item_rejected_by_seller = async (id: any) => {
    setRejectedBySellerLoading(true);
    try {
      const res = await API.post(
        `api/order/items/${id}/item_rejected_by_seller`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        rejectMessageCause(message);
        setModalVisibleReject(false);
      }
    } catch (error) {
      setRejectedBySellerLoading(false);
    }
  };
  //  رفض طلب الالغاء الخدمة من قبل البائع
  const reject_cancel_request_by_seller = async (id: any) => {
    setRejectCancelRequestBySellerLoading(true);
    try {
      const res = await API.post(
        `api/order/items/${id}/reject_cancel_request_by_seller`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        rejectMessageCause(message);
      }
    } catch (error) {
      setRejectCancelRequestBySellerLoading(false);
    }
  };

  //  تسليم العمل من طرف البائع
  const dilevered_by_seller = async (id: any) => {
    setDileveredSellerLoading(true);
    try {
      const attachments: any = new FormData();
      files.map((file: any) => attachments.append("item_attachments[]", file));
      const res = await API.post(
        `api/order/items/${id}/dilevered_by_seller`,
        attachments,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          onUploadProgress: (uploadEvent) => {
            setImageProgress(
              Math.round((uploadEvent.loaded / uploadEvent.total) * 100)
            );
          },
        }
      );
      if (res.status === 200) {
        router.reload();
      }
    } catch (error) {
      setDileveredSellerLoading(false);
    }
  };

  //  قبول طلب الالغاء الخدمة من قبل البائع
  const accept_cancel_request_by_seller = async (id: any) => {
    setAcceptCancelRequestBySellerLoading(true);
    try {
      const res = await API.post(
        `api/order/items/${id}/accept_cancel_request_by_seller`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        router.reload();
      }
    } catch (error) {
      setAcceptCancelRequestBySellerLoading(false);
    }
  };
  // حل النزاع بين الطرفين في حالة الغاء الطلبية

  const resolve_the_conflict_between_them_in_rejected = async (id: any) => {
    setResolveConflictBetweenRejectedLoading(true);
    try {
      const res = await API.post(
        `api/order/items/${id}/resolve_the_conflict_between_them_in_rejected`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        router.reload();
      }
    } catch (error) {
      setResolveConflictBetweenRejectedLoading(false);
    }
  };
  // قبول تعديل الخدمة من قبل المشتري
  const accept_modified_by_seller = async (id: any) => {
    setAcceptModifiedSellerLoading(true);
    try {
      const res = await API.post(
        `api/order/items/${id}/accept_modified_by_seller`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        router.reload();
      }
    } catch (error) {
      setAcceptModifiedSellerLoading(false);
    }
  };

  // رفض تعديل الخدمة من قبل البائع

  const reject_modified_by_seller = async (id: any) => {
    setRejectModifiedSellerLoading(true);
    try {
      const res = await API.post(
        `api/order/items/${id}/reject_modified_by_seller`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        router.reload();
      }
    } catch (error) {
      setRejectModifiedSellerLoading(false);
    }
  };
  // حل النزاع من طرف البائع

  const resolve_the_conflict_between_them_in_modified = async (id: any) => {
    setResolveConflictBetweenThemModifiedLoading(true);
    try {
      const res = await API.post(
        `api/order/items/${id}/resolve_the_conflict_between_them_in_modified`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        router.reload();
      }
    } catch (error) {
      setResolveConflictBetweenThemModifiedLoading(false);
    }
  };
  // إنشاء محادثة جديدة بين البائع والمشتري

  const createConversation = async (id: any) => {
    setCreateConversationLoading(true);
    try {
      const res = await API.post(
        `api/order/items/${id}/conversations/create`,
        {
          initial_message: message,
          receiver_id: ShowItem && ShowItem.data.order.cart.user.id,
          title: ShowItem && ShowItem.data.title,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        router.reload();
      }
    } catch (error) {
      setCreateConversationLoading(false);
    }
  };
  // دالة إرسال الرسالة
  //const scrollToRef = (ref) => window.scrollTo(5764, ref.current.offsetTop)
  // console.log(ref.current.scrollTop + ' ', ref.current.scrollHeight)

  const messageRef: any = useRef();

  const sendMessageHandle = async (e: any) => {
    e.preventDefault();
    setSendMessageLoading(true);
    setMessageErrors({});
    try {
      const id = ShowItem && ShowItem.data.conversation.id;
      const conversation: any = new FormData();
      filesMsg.map((file: any) => conversation.append("attachments[]", file));
      conversation.append("type", messageType);
      conversation.append("message", message);
      const res = await API.post(
        `api/conversations/${id}/sendMessage`,
        conversation,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          onUploadProgress: (uploadEvent) => {
            if (filesMsg.length !== 0)
              setMessageProgress(
                Math.round((uploadEvent.loaded / uploadEvent.total) * 100)
              );
          },
        }
      );
      if (res.status === 200) {
        ShowItem && ShowItem.data.conversation.messages.push(res.data.data);
        setSendMessageLoading(false);
        myRef.current.scrollTo(0, myRef.current.scrollHeight + 80);
        setMessage("");
        messageRef.current.focus();
        setMessageProgress(0);
        clearAllFilesMsg();
      }
    } catch (error) {
      setSendMessageLoading(false);
      if (error && error.response) {
        setMessageErrors(error.response.data.errors);
      }
    }
  };
  const switchFileTypes = (type: any) => {
    switch (type) {
      case "png":
        return (
          <span
            style={{ color: "orange" }}
            className="material-icons material-icons-outlined"
          >
            image
          </span>
        );

      case "jpg":
        return (
          <span
            style={{ color: "orange" }}
            className="material-icons material-icons-outlined"
          >
            image
          </span>
        );

      case "gif":
        return (
          <span
            style={{ color: "orange" }}
            className="material-icons material-icons-outlined"
          >
            image
          </span>
        );

      case "psd":
        return (
          <span
            style={{ color: "orange" }}
            className="material-icons material-icons-outlined"
          >
            image
          </span>
        );

      case "zip":
        return (
          <span
            style={{ color: "plum" }}
            className="material-icons material-icons-outlined"
          >
            folder_zip
          </span>
        );

      case "rar":
        return (
          <span
            style={{ color: "plum" }}
            className="material-icons material-icons-outlined"
          >
            folder_zip
          </span>
        );

      case "mp3":
        return (
          <span
            style={{ color: "springgreen" }}
            className="material-icons material-icons-outlined"
          >
            headphones
          </span>
        );

      case "wma":
        return (
          <span
            style={{ color: "springgreen" }}
            className="material-icons material-icons-outlined"
          >
            headphones
          </span>
        );

      case "aac":
        return (
          <span
            style={{ color: "springgreen" }}
            className="material-icons material-icons-outlined"
          >
            headphones
          </span>
        );

      case "ogg":
        return (
          <span
            style={{ color: "springgreen" }}
            className="material-icons material-icons-outlined"
          >
            headphones
          </span>
        );

      case "wav":
        return (
          <span
            style={{ color: "springgreen" }}
            className="material-icons material-icons-outlined"
          >
            headphones
          </span>
        );

      case "mp4":
        return (
          <span
            style={{ color: "yellowgreen" }}
            className="material-icons material-icons-outlined"
          >
            smart_display
          </span>
        );

      case "avi":
        return (
          <span
            style={{ color: "yellowgreen" }}
            className="material-icons material-icons-outlined"
          >
            smart_display
          </span>
        );

      case "mpg":
        return (
          <span
            style={{ color: "yellowgreen" }}
            className="material-icons material-icons-outlined"
          >
            smart_display
          </span>
        );

      case "pdf":
        return (
          <span
            style={{ color: "maroon" }}
            className="material-icons material-icons-outlined"
          >
            picture_as_pdf
          </span>
        );

      default:
        return (
          <span className="material-icons material-icons-outlined">
            description
          </span>
        );
    }
  };
  const statusLabel = (status: any) => {
    switch (status) {
      case 0:
        return <span className="badge bg-secondary">قيد الانتظار...</span>;

      case 1:
        return <span className="badge bg-warning">ملغية من طرف المشتري</span>;

      case 2:
        return <span className="badge bg-danger">مرفوضة من طرف البائع</span>;

      case 3:
        return <span className="badge bg-info text-dark">قيد التنفيذ...</span>;

      case 4:
        return (
          <span className="badge bg-warning">طلب إلغاء من طرف المشتري</span>
        );

      case 5:
        return <span className="badge bg-warning">ملغية من طرف البائع</span>;

      case 6:
        return <span className="badge bg-primary">قيد الإستلام</span>;

      case 7:
        return <span className="badge bg-success text-light">مكتملة</span>;

      case 8:
        return <span className="badge bg-danger text-light">معلقة</span>;

      case 9:
        return <span className="badge bg-light text-dark">حالة طلب تعديل</span>;

      case 10:
        return (
          <span className="badge bg-danger text-light">
            معلقة بسبب رفض التعديل
          </span>
        );

      default:
        return <span className="badge bg-info text-dark">قيد الانتظار...</span>;
    }
  };
  function durationFunc() {
    if (ShowItem.data.duration == 1) {
      return "يوم واحد";
    }
    if (ShowItem.data.duration == 2) {
      return "يومين";
    }
    if (ShowItem.data.duration > 2 && ShowItem.data.duration < 11) {
      return ShowItem.data.duration + " أيام ";
    }
    if (ShowItem.data.duration >= 11) {
      return ShowItem.data.duration + " يوم ";
    }
  }

  return (
    <>
      <MetaTags
        title={"عرض الطلبية"}
        metaDescription={"عرض الطلبية"}
        ogDescription={"عرض الطلبية"}
      />
      {veriedEmail && (
        <div style={{ backgroundColor: "#f6f6f6" }} className="my-3">
          {errorItem && !ShowItem.data && (
            <Result status="warning" title="حدث خطأ غير متوقع" />
          )}
          {!ShowItem && <Loading />}
          <Modal
            title="سبب الرفض"
            visible={isModalVisibleReject}
            okText="أنا متأكد"
            onOk={() => item_rejected_by_seller(ShowItem.data.id)}
            onCancel={() => setModalVisibleReject(false)}
            cancelText="إلغاء"
          >
            <Spin spinning={BySellerMSGLoading}>
              <div className="timlands-form">
                <label htmlFor="message_type" className="form-text">
                  أكتب سبب الرفض
                </label>
                <div
                  className="relative-form d-flex"
                  style={{ position: "relative", minHeight: 60 }}
                >
                  <input
                    id="input-buyer_instruct"
                    name="buyer_instruct"
                    placeholder="أكتب سبب الرفض..."
                    className={"timlands-inputs"}
                    autoComplete="off"
                    value={message}
                    onChange={(e: any) => setMessage(e.target.value)}
                  />
                </div>
                {messageErrors && messageErrors.message && (
                  <motion.div
                    initial={{ y: -6, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="timlands-form-note form-note-error"
                  >
                    <p className="text">{messageErrors.message[0]}</p>
                  </motion.div>
                )}
              </div>
            </Spin>
          </Modal>
          <Modal
            title="سبب إلغاء"
            visible={isModalVisible}
            okText="أنا متأكد"
            onOk={() => reject_cancel_request_by_seller(ShowItem.data.id)}
            onCancel={() => setIsModalVisible(false)}
            cancelText="إلغاء"
          >
            <Spin spinning={BySellerMSGLoading}>
              <div className="timlands-form">
                <label htmlFor="message_type" className="form-text">
                  أكتب سبب الرفض
                </label>
                <div
                  className="relative-form d-flex"
                  style={{ position: "relative", minHeight: 60 }}
                >
                  <input
                    id="input-buyer_instruct"
                    name="buyer_instruct"
                    placeholder="أكتب سبب الرفض..."
                    className={"timlands-inputs"}
                    autoComplete="off"
                    value={message}
                    onChange={(e: any) => setMessage(e.target.value)}
                  />
                </div>
                {messageErrors && messageErrors.message && (
                  <motion.div
                    initial={{ y: -6, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="timlands-form-note form-note-error"
                  >
                    <p className="text">{messageErrors.message[0]}</p>
                  </motion.div>
                )}
              </div>
            </Spin>
          </Modal>
          <Modal
            title="سبب إلغاء"
            visible={isModalVisibleRejectModified}
            okText="أنا متأكد"
            onOk={() => reject_modified_by_seller(ShowItem.data.id)}
            onCancel={() => setModalVisibleRejectModified(false)}
            cancelText="إلغاء"
          >
            <Spin spinning={BySellerMSGLoading}>
              <div className="timlands-form">
                <label htmlFor="message_type" className="form-text">
                  أكتب سبب الإلغاء
                </label>
                <div
                  className="relative-form d-flex"
                  style={{ position: "relative", minHeight: 60 }}
                >
                  <input
                    id="input-buyer_instruct"
                    name="buyer_instruct"
                    placeholder="أكتب سبب الإلغاء..."
                    className={"timlands-inputs"}
                    autoComplete="off"
                    value={message}
                    onChange={(e: any) => setMessage(e.target.value)}
                  />
                </div>
                {messageErrors && messageErrors.message && (
                  <motion.div
                    initial={{ y: -6, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="timlands-form-note form-note-error"
                  >
                    <p className="text">{messageErrors.message[0]}</p>
                  </motion.div>
                )}
              </div>
            </Spin>
          </Modal>

          <Modal
            title="رسالة تأكيد"
            visible={isModalVisibleDilevered}
            okText="أنا متأكد"
            onOk={() => dilevered_by_seller(ShowItem.data.id)}
            onCancel={() => setModalVisibleDilevered(false)}
            cancelText="إلغاء"
          >
            <Alert type="error">هل أنت متأكد من انك تريد تسليم المشروع ؟</Alert>
          </Modal>
          {ShowItem && (
            <div className="row py-4 justify-content-center">
              <div className="col-md-12" style={{ maxWidth: 1300 }}>
                <div
                  className="app-bill"
                  style={{ backgroundColor: "#f6f6f6" }}
                >
                  <div className="row">
                    <div className="col-lg-3">
                      <div
                        style={{
                          backgroundColor: "#fff",
                          padding: 9,
                          marginBottom: 7,
                        }}
                      >
                        <div className="aside-header">
                          <h3 className="title">البائع</h3>
                        </div>
                        <Link
                          href={`/u/${
                            ShowItem &&
                            ShowItem.data.profile_seller.profile.user.username
                          }`}
                        >
                          <a className="order-user-info d-flex flex-center">
                            <div className="order-user-avatar">
                              <img
                                src={
                                  ShowItem &&
                                  ShowItem.data.profile_seller.profile
                                    .avatar_path
                                }
                                width={50}
                                height={50}
                              />
                            </div>
                            <div className="order-user-content">
                              <h2 className="user-title">
                                {ShowItem &&
                                  ShowItem.data.profile_seller.profile
                                    .full_name}
                              </h2>
                              <p className="meta">
                                <span className="badge bg-light text-dark">
                                  {ShowItem &&
                                    ShowItem.data.profile_seller.level &&
                                    ShowItem.data.profile_seller.level.name_ar}
                                </span>
                              </p>
                            </div>
                          </a>
                        </Link>
                      </div>

                      <div
                        style={{
                          backgroundColor: "#fff",
                          padding: 9,
                          marginBottom: 7,
                        }}
                      >
                        <div className="aside-header">
                          <h3 className="title">المشتري</h3>
                        </div>
                        <Link
                          href={`/u/${ShowItem.data.order.cart.user.username}`}
                        >
                          <a className="order-user-info d-flex flex-center">
                            <div className="order-user-avatar">
                              <img
                                src={
                                  ShowItem &&
                                  ShowItem.data.order.cart.user.profile
                                    .avatar_path
                                }
                                width={50}
                                height={50}
                              />
                            </div>
                            <div className="order-user-content">
                              <h2 className="user-title">
                                {ShowItem &&
                                  ShowItem.data.order.cart.user.profile
                                    .full_name}
                              </h2>
                              <p className="meta">
                                <span className="badge bg-light text-dark">
                                  {ShowItem &&
                                    ShowItem.data.order.cart.user.profile
                                      .level &&
                                    ShowItem.data.order.cart.user.profile.level
                                      .name_ar}
                                </span>
                              </p>
                            </div>
                          </a>
                        </Link>
                      </div>
                      {ShowItem && ShowItem.data.attachments && (
                        <>
                          <div style={{ backgroundColor: "#fff", padding: 9 }}>
                            <div className="aside-header">
                              <h3 className="title">مرفقات المشروع</h3>
                            </div>
                            <div className="aside-attachments">
                              <Timeline>
                                {ShowItem.data.attachments.map((e: any, i) => (
                                  <Timeline.Item
                                    key={i}
                                    dot={<>{switchFileTypes(e.mime_type)}</>}
                                  >
                                    <a
                                      href={e.full_path}
                                      rel="noreferrer"
                                      target="_blank"
                                    >
                                      تحميل الملف {i + 1}#
                                    </a>
                                  </Timeline.Item>
                                ))}
                              </Timeline>
                            </div>
                          </div>
                        </>
                      )}

                      <div style={{ backgroundColor: "#fff", marginTop: 10 }}>
                        <div className="order-notes p-1">
                          <h3 className="title">ملاحظات هامة لحماية حسابك</h3>
                          <ul className="order-notes-list">
                            <li>
                              لا تتواصل مع أي مستخدم آخر خارج الموقع. موقع
                              تيموورك يحميك ببقاء تواصلك داخل الموقع فقط.
                            </li>
                            <li>
                              لا تزود أي مستخدم تحت أي ظرف بأي معلومات حساسة
                            </li>
                            <li>
                              لا تعطي معلومات الدخول الخاصة ببريدك الالكتروني أو
                              حسابك في PayPal أو حساباتك على الشبكات الاجتماعية
                            </li>
                            <li>
                              تزويدك لأي مستخدم بمعلومات دخول لموقعك، جهازك
                              الشخصي أو أي شيء آخر يتم على مسؤوليتك الشخصية
                            </li>
                            <li>
                              الرسائل مخصصة للاستفسار حول الخدمة فقط ولا يجب
                              البدء في تنفيذ خدمة أو تسليمها عبر الرسائل قبل
                              شرائها
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      {ShowItem && ShowItem.data.status == 4 && (
                        <>
                          {ShowItem &&
                            ShowItem.data.item_rejected &&
                            ShowItem.data.item_rejected.status == 2 && (
                              <Alert type="error">
                                <p className="text">
                                  يجب عليكم الوصول إلى اتفاق وإلا ستتدخل الإدارة
                                  في ظرف 48 ساعة
                                </p>
                              </Alert>
                            )}
                        </>
                      )}
                      <div className="aside-header">
                        <h3 className="title">{ShowItem.data.title}</h3>
                      </div>
                      <div style={{ backgroundColor: "#fff", padding: 9 }}>
                        <div className="aside-header">
                          <h3 className="title">تعليمات للمشتري</h3>
                        </div>
                        <div className="seller-info">
                          <div
                            className="timwoork-single-product-detailts"
                            dangerouslySetInnerHTML={{
                              __html:
                                ShowItem &&
                                ShowItem.data.profile_seller.products[0]
                                  .buyer_instruct,
                            }}
                          />
                        </div>
                      </div>
                      {ShowItem && ShowItem.data.conversation && (
                        <>
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
                                listStyle: "none",
                                height: 350,
                                overflow: "hidden",
                                overflowY: "scroll",
                              }}
                            >
                              {ShowItem.data.conversation.messages.map(
                                (item: any) => (
                                  <motion.li
                                    initial={{ y: -4, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    key={item.id}
                                    className={
                                      (ShowItem &&
                                      ShowItem.data.profile_seller.id ==
                                        item.user.id
                                        ? ""
                                        : "recieved ") +
                                      "d-flex message-item " +
                                      switchTypeMessage(item.type)
                                    }
                                    style={{ marginBlock: 6, borderRadius: 6 }}
                                  >
                                    <div
                                      className="item-avatar"
                                      style={{ marginInline: 6 }}
                                    >
                                      <img
                                        src={item.user.profile.avatar_path}
                                        width={45}
                                        height={45}
                                        className="rounded-pill"
                                        alt=""
                                      />
                                    </div>

                                    <div className="item-content">
                                      {item.type == 1 && (
                                        <span
                                          className="bg-success text-light d-inline-block"
                                          style={{
                                            paddingInline: 9,
                                            paddingBlock: 3,
                                            borderRadius: "4px 4px 0 4px",
                                            fontSize: 12,
                                            marginBottom: 5,
                                          }}
                                        >
                                          تعليمات
                                        </span>
                                      )}
                                      {item.type == 2 && (
                                        <span
                                          className="bg-danger text-light d-inline-block"
                                          style={{
                                            paddingInline: 9,
                                            paddingBlock: 3,
                                            borderRadius: "4px 4px 0 4px",
                                            fontSize: 12,
                                            marginBottom: 5,
                                          }}
                                        >
                                          سبب إلغاء
                                        </span>
                                      )}
                                      <p className="text" style={{ margin: 0 }}>
                                        {item.user.profile.full_name}
                                      </p>
                                      <p
                                        className="meta"
                                        style={{
                                          marginBlock: 4,
                                          fontSize: 11,
                                          fontWeight: 200,
                                        }}
                                      >
                                        <LastSeen date={item.created_at} />
                                      </p>
                                      {item.attachments && (
                                        <div
                                          className="attach-items"
                                          style={{
                                            marginBlock: 4,
                                            fontSize: 12,
                                            fontWeight: 200,
                                          }}
                                        >
                                          {item.attachments.map(
                                            (att: any, i: number) => (
                                              <div
                                                className="att-item"
                                                key={att.id}
                                              >
                                                <a
                                                  href={att.full_path}
                                                  rel="noreferrer"
                                                  target="_blank"
                                                >
                                                  {switchFileTypes(
                                                    att.mime_type
                                                  )}{" "}
                                                  تحميل الملف {i + 1}#
                                                </a>
                                              </div>
                                            )
                                          )}
                                        </div>
                                      )}
                                      <p
                                        className="text2"
                                        style={{ margin: 0 }}
                                      >
                                        {item.message}
                                      </p>
                                      {ShowItem &&
                                        ShowItem.data.profile_seller.id ==
                                          item.user.id && (
                                          <>
                                            {item.read_at && (
                                              <span className="readed is-readed">
                                                <span className="material-icons material-icons-outlined">
                                                  done_all
                                                </span>
                                              </span>
                                            )}
                                            {!item.read_at && (
                                              <span className="readed is-unreaded">
                                                <span className="material-icons material-icons-outlined">
                                                  done
                                                </span>
                                              </span>
                                            )}
                                          </>
                                        )}
                                    </div>
                                  </motion.li>
                                )
                              )}
                            </ul>
                          </div>
                          <div
                            className="conversations-form"
                            style={{ backgroundColor: "#fff", padding: 9 }}
                          >
                            <form onSubmit={sendMessageHandle}>
                              <div className="timlands-form">
                                <label
                                  htmlFor="message_type"
                                  className="form-text"
                                >
                                  اختر نوع الرسالة
                                </label>
                                <div className="py-1 d-flex">
                                  <select
                                    className={"timlands-inputs me-auto"}
                                    disabled={sendMessageLoading}
                                    name="message_type"
                                    id="message_type"
                                    onChange={(e: any) =>
                                      setMessageType(e.target.value)
                                    }
                                  >
                                    <option value="0">نص عادي</option>
                                    <option value="1">تعليمات</option>
                                    <option value="2">سبب إلغاء</option>
                                  </select>
                                  <button
                                    type="button"
                                    style={{ width: "65%" }}
                                    disabled={sendMessageLoading}
                                    className="btn butt-sm butt-primary2-out mx-1 flex-center-just"
                                    onClick={() => inputRefMsg.current.click()}
                                  >
                                    <span className="material-icons material-icons-outlined">
                                      attach_file
                                    </span>{" "}
                                    إرفاق ملفات
                                  </button>
                                </div>
                                <div className="send-attachments">
                                  {messageProgress !== 0 && (
                                    <Progress percent={messageProgress} />
                                  )}
                                  <div className="form-conainer">
                                    <ul
                                      className="attachment-list-items"
                                      style={{
                                        listStyle: "none",
                                        paddingInline: 0,
                                        paddingTop: 6,
                                        overflow: "hidden",
                                      }}
                                    >
                                      {fileNamesMsg.map((name) => (
                                        <motion.li
                                          style={{
                                            overflow: "hidden",
                                            position: "relative",
                                            paddingBlock: 3,
                                            paddingInline: 9,
                                            fontSize: 13,
                                          }}
                                          initial={{ y: -5, opacity: 0 }}
                                          animate={{ y: 0, opacity: 1 }}
                                          key={name}
                                        >
                                          <span className="name-file">
                                            {name}
                                          </span>
                                          <span
                                            className="remove-icon d-flex"
                                            style={{
                                              position: "absolute",
                                              left: 10,
                                              fontSize: 13,
                                              top: 7,
                                              color: "red",
                                              cursor: "pointer",
                                            }}
                                            onClick={() => removeFileMsg(name)}
                                          >
                                            <i className="fa fa-times"></i>
                                          </span>
                                        </motion.li>
                                      ))}
                                    </ul>
                                    {filesMsg.length > 0 && (
                                      <ul
                                        className="files-proprieties"
                                        style={{
                                          listStyle: "none",
                                          padding: 0,
                                          overflow: "hidden",
                                        }}
                                      >
                                        <li>
                                          <strong>الحجم الكلي: </strong>
                                          {totalSizeMsg}
                                        </li>
                                      </ul>
                                    )}
                                  </div>
                                  <input
                                    ref={inputRefMsg}
                                    type="file"
                                    multiple
                                    style={{ display: "none" }}
                                    onChange={(e: any) => setFilesMsg(e)}
                                  />
                                </div>
                                <div
                                  className="relative-form d-flex"
                                  style={{
                                    position: "relative",
                                    minHeight: 60,
                                  }}
                                >
                                  <input
                                    id="input-buyer_instruct"
                                    name="buyer_instruct"
                                    onKeyUp={() => {
                                      setMessageErrors({});
                                    }}
                                    placeholder="نص الرسالة..."
                                    className={
                                      "timlands-inputs " +
                                      (messageErrors &&
                                        messageErrors.message &&
                                        " has-error")
                                    }
                                    disabled={sendMessageLoading}
                                    autoComplete="off"
                                    value={message}
                                    ref={messageRef}
                                    onChange={(e: any) =>
                                      setMessage(e.target.value)
                                    }
                                    style={{
                                      height: 60,
                                      width: "calc(100% - 110px)",
                                      borderRadius: "0 5px 5px 0",
                                    }}
                                  />
                                  <button
                                    style={{
                                      width: 110,
                                      height: 60,
                                      borderRadius: "5px 0 0 5px",
                                    }}
                                    disabled={sendMessageLoading}
                                    className="btn butt-sm butt-primary flex-center-just"
                                    type="submit"
                                  >
                                    <span className="material-icons material-icons-outlined">
                                      send
                                    </span>
                                    إرسال
                                  </button>
                                </div>
                                {messageErrors && messageErrors.message && (
                                  <motion.div
                                    initial={{ y: -6, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    className="timlands-form-note form-note-error"
                                  >
                                    <p className="text">
                                      {messageErrors.message[0]}
                                    </p>
                                  </motion.div>
                                )}
                              </div>
                            </form>
                          </div>
                        </>
                      )}
                      {ShowItem && ShowItem.data.conversation == null && (
                        <>
                          <div className="conversation-start">
                            <div className="icon">
                              <span className="material-icons material-icons-outlined">
                                forum
                              </span>
                            </div>
                            <h3 className="title">تواصل مع المشتري</h3>
                            <p className="text">
                              حاول ان تتفق مع المشتري قبل البدء في تنفيذ العملية
                            </p>
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
                              <button
                                type="button"
                                disabled={createConversationLoading}
                                onClick={() =>
                                  createConversation(
                                    ShowItem && ShowItem.data.id
                                  )
                                }
                                className="btn butt-lg butt-primary"
                              >
                                إنشاء المحادثة
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="col-lg-3">
                      <div
                        style={{
                          backgroundColor: "#fff",
                          padding: 9,
                          marginBottom: 7,
                        }}
                      >
                        <div className="aside-header">
                          <h3 className="title">الأدوات</h3>
                        </div>
                        <div className="d-grid gap-2">
                          {ShowItem && ShowItem.data.status == 0 && (
                            <>
                              <button
                                disabled={acceptedBySellerLoadingLoading}
                                onClick={() =>
                                  item_accepted_by_seller(ShowItem.data.id)
                                }
                                className="btn butt-md butt-green mx-1 flex-center-just"
                              >
                                <span className="material-icons material-icons-outlined">
                                  done_all
                                </span>{" "}
                                قبول الطلب
                              </button>
                              <button
                                disabled={rejectedBySellerLoading}
                                onClick={() => setModalVisibleReject(true)}
                                className="btn butt-md butt-red mx-1 flex-center-just"
                              >
                                <span className="material-icons material-icons-outlined">
                                  highlight_off
                                </span>{" "}
                                رفض الطلب
                              </button>
                            </>
                          )}
                          {ShowItem && ShowItem.data.status == 1 && (
                            <>
                              <div className="box-note red">
                                <p className="text">
                                  هذه العملية ملغية من طرف المشتري
                                </p>
                              </div>
                            </>
                          )}
                          {ShowItem && ShowItem.data.status == 2 && (
                            <div className="box-note warning">
                              <p className="text">هذه العملية مرفوضة من طرفك</p>
                            </div>
                          )}
                          {ShowItem && ShowItem.data.status == 3 && (
                            <>
                              <div className="order-uploader-files">
                                <div className="uploader-header">
                                  <h3 className="title">
                                    إرفاق ملفات مع تسليم العمل
                                  </h3>
                                </div>
                                {imageProgress !== 0 && (
                                  <Progress percent={imageProgress} />
                                )}
                                <div className="form-conainer">
                                  <ul className="attachment-list-items">
                                    {fileNames.map((name) => (
                                      <motion.li
                                        initial={{ y: -5, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        key={name}
                                      >
                                        <span className="name-file">
                                          {name}
                                        </span>
                                        <span
                                          className="remove-icon"
                                          onClick={() => removeFile(name)}
                                        >
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
                                      <li>
                                        <strong>الحجم الكلي: </strong>
                                        {totalSize}
                                      </li>
                                    </ul>
                                  )}
                                </div>
                              </div>
                              <button
                                className="btn butt-md butt-primary2 mx-1 flex-center-just"
                                onClick={() => inputRef.current.click()}
                              >
                                <span className="material-icons material-icons-outlined">
                                  file_upload
                                </span>{" "}
                                إضافة ملفات
                              </button>
                              <input
                                ref={inputRef}
                                type="file"
                                multiple
                                style={{ display: "none" }}
                                onChange={(e: any) => setFiles(e)}
                              />
                              <button
                                disabled={dileveredSellerLoading}
                                onClick={() => setModalVisibleDilevered(true)}
                                className="btn butt-md butt-primary mx-1 flex-center-just"
                              >
                                <span className="material-icons material-icons-outlined">
                                  file_upload
                                </span>{" "}
                                تسليم الطلب{" "}
                              </button>
                            </>
                          )}
                          {ShowItem && ShowItem.data.status == 4 && (
                            <>
                              {ShowItem.data.item_rejected.status == 0 && (
                                <>
                                  <button
                                    disabled={
                                      acceptCancelRequestBySellerLoading
                                    }
                                    onClick={() =>
                                      accept_cancel_request_by_seller(
                                        ShowItem.data.id
                                      )
                                    }
                                    className="btn butt-md butt-green mx-1 flex-center-just"
                                  >
                                    <span className="material-icons material-icons-outlined">
                                      done_all
                                    </span>
                                    قبول طلب الإلغاء
                                  </button>
                                  <button
                                    disabled={
                                      rejectCancelRequestBySellerLoading
                                    }
                                    onClick={() => setIsModalVisible(true)}
                                    className="btn butt-md butt-red mx-1 flex-center-just"
                                  >
                                    <span className="material-icons material-icons-outlined">
                                      highlight_off
                                    </span>
                                    رفض طلب الإلغاء
                                  </button>
                                </>
                              )}
                            </>
                          )}
                          {ShowItem && ShowItem.data.status == 5 && (
                            <div className="box-note warning">
                              <p className="text">هذه العملية ملغية من طرفك</p>
                            </div>
                          )}
                          {ShowItem && ShowItem.data.status == 6 && (
                            <div className="box-note primary">
                              <p className="text">هذه العملية قيد الإستلام</p>
                            </div>
                          )}
                          {ShowItem && ShowItem.data.status == 7 && (
                            <div className="box-note green-fill">
                              <p className="text">
                                <strong>هذه العملية مكتملة</strong>
                              </p>
                            </div>
                          )}
                          {ShowItem && ShowItem.data.status == 8 && (
                            <button
                              disabled={resolveConflictBetweenRejectedLoading}
                              onClick={() =>
                                resolve_the_conflict_between_them_in_rejected(
                                  ShowItem.data.id
                                )
                              }
                              className="btn butt-md butt-green mx-1 flex-center-just"
                            >
                              <span className="material-icons material-icons-outlined">
                                highlight_off
                              </span>
                              تم حل النزاع
                            </button>
                          )}

                          {ShowItem && ShowItem.data.status == 9 && (
                            <>
                              {ShowItem &&
                                ShowItem.data.item_modified.status == 0 && (
                                  <>
                                    <button
                                      disabled={acceptModifiedSellerLoading}
                                      onClick={() =>
                                        accept_modified_by_seller(
                                          ShowItem.data.id
                                        )
                                      }
                                      className="btn butt-md butt-green mx-1 flex-center-just"
                                    >
                                      <span className="material-icons material-icons-outlined">
                                        done_all
                                      </span>{" "}
                                      قبول طلب التعديل
                                    </button>
                                    <button
                                      disabled={rejectModifiedSellerLoading}
                                      onClick={() =>
                                        setModalVisibleRejectModified(true)
                                      }
                                      className="btn butt-md butt-red mx-1 flex-center-just"
                                    >
                                      <span className="material-icons material-icons-outlined">
                                        highlight_off
                                      </span>{" "}
                                      رفض طلب التعديل
                                    </button>
                                  </>
                                )}
                            </>
                          )}

                          {ShowItem && ShowItem.data.status == 10 && (
                            <>
                              <div className="box-note red">
                                <p className="text">
                                  إذا تواصلتما إلى حل يمكنك تحويل العملية إلى
                                  قيد التنفيد مرة اخرى
                                </p>
                              </div>
                              <button
                                disabled={
                                  resolveConflictBetweenThemModifiedLoading
                                }
                                onClick={() =>
                                  resolve_the_conflict_between_them_in_modified(
                                    ShowItem.data.id
                                  )
                                }
                                className="btn butt-md butt-green mx-1 flex-center-just"
                              >
                                <span className="material-icons material-icons-outlined">
                                  highlight_off
                                </span>
                                تم حل النزاع
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                      <div style={{ backgroundColor: "#fff", padding: 9 }}>
                        <div className="aside-header">
                          <h3 className="title">تفاصيل العملية</h3>
                        </div>
                        <table className="table table-borderless">
                          <tbody>
                            <tr>
                              <th>رقم العملية</th>
                            </tr>
                            <tr>
                              <td>{ShowItem.data.uuid}</td>
                            </tr>
                            <tr>
                              <th>حالة العملية</th>
                            </tr>
                            <tr>
                              <td>{statusLabel(ShowItem.data.status)}</td>
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
                              <td>{durationFunc()}</td>
                            </tr>
                            <tr>
                              <th>سعر الطلبية</th>
                            </tr>
                            <tr>
                              <td>${ShowItem.data.price_product}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default User;
User.getLayout = function getLayout(page: any): ReactElement {
  return <Layout>{page}</Layout>;
};
User.getInitialProps = async ({ query }) => {
  return { query };
};
User.propTypes = {
  query: PropTypes.any,
};
