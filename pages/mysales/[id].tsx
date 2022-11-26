import React, { ReactElement, useState, useRef, useEffect } from "react";
import Layout from "@/components/Layout/HomeLayout";
import { Alert } from "@/components/Alert/Alert";
import { MetaTags } from "@/components/SEO/MetaTags";
import PropTypes from "prop-types";
import Loading from "@/components/Loading";
import Link from "next/link";
import LastSeen from "@/components/LastSeen";
import { Modal, Progress, Spin, Timeline } from "antd";
import useFileUpload from "react-use-file-upload";
import { motion } from "framer-motion";
import router from "next/router";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { SalesActions } from "@/store/sales/salesActions";
import { ChatActions } from "@/store/chat/chatActions";

const User = ({ query }) => {
  const dispatch = useAppDispatch();
  const {
    languages: { getAll, language },
    mySales: { oneSale: ShowItem },
  } = useAppSelector((state) => state);
  const user = useAppSelector((state) => state.user);
  const inputRef: any = useRef();
  const inputRefMsg: any = useRef();
  const veriedEmail = user.email_verified;

  const [imageProgress, setImageProgress] = useState(0);
  const [messageProgress, setMessageProgress] = useState(0);
  const [messageErrors, setMessageErrors]: any = useState({});
  const [BySellerMSGLoading, setBySellerMSGLoading]: any = useState(false);
  const myRef: any = useRef();
  // Send Message function
  const rejectMessageCause = async (messageText: any, typeCause = 2) => {
    setBySellerMSGLoading(true);
    try {
      const id = ShowItem?.conversation?.id;
      const conversation: any = new FormData();
      conversation.append("type", typeCause);
      conversation.append("message", messageText);
      await dispatch(
        ChatActions.sendMessage({
          id,
          body: conversation,
          headers: {
            headers: {
              "X-LOCALIZATION": language,
            },
          },
        })
      ).unwrap();
      setBySellerMSGLoading(false);
      setIsModalVisible(false);
      setModalVisibleRejectModified(false);
      setModalVisibleReject(false);
    } catch (error) {
      if (error.errors) {
        setMessageErrors(error.errors);
      }
    }
  };
  useEffect(() => {
    if (!user.isLogged && !user.loading) {
      router.push("/login");
    }
  }, [user]);
  useEffect(() => {
    dispatch(SalesActions.getOneSale({ id: query.id }));
  }, [query.id]);
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
      await dispatch(
        SalesActions.updateSale({
          id,
          query: `api/order/items/${id}/item_accepted_by_seller`,
        })
      ).unwrap();
    } catch (error) {
      setAcceptedBySellerLoading(false);
    }
  };
  const item_rejected_by_seller = async (id: any) => {
    setRejectedBySellerLoading(true);
    try {
      await dispatch(
        SalesActions.updateSale({
          id,
          query: `api/order/items/${id}/item_rejected_by_seller`,
        })
      ).unwrap();
      rejectMessageCause(message);
      setModalVisibleReject(false);
    } catch (error) {
      setRejectedBySellerLoading(false);
    }
  };
  //  رفض طلب الالغاء الخدمة من قبل البائع
  const reject_cancel_request_by_seller = async (id: any) => {
    setRejectCancelRequestBySellerLoading(true);
    try {
      await dispatch(
        SalesActions.updateSale({
          id,
          query: `api/order/items/${id}/reject_cancel_request_by_seller`,
        })
      ).unwrap();

      rejectMessageCause(message);
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

      await dispatch(
        SalesActions.updateSale({
          id,
          query: `api/order/items/${id}/dilevered_by_seller`,
          body: attachments,
          headers: {
            onUploadProgress: (uploadEvent) => {
              setImageProgress(
                Math.round((uploadEvent.loaded / uploadEvent.total) * 100)
              );
            },
          },
        })
      ).unwrap();
    } catch (error) {
      setDileveredSellerLoading(false);
    }
  };

  //  قبول طلب الالغاء الخدمة من قبل البائع
  const accept_cancel_request_by_seller = async (id: any) => {
    setAcceptCancelRequestBySellerLoading(true);
    try {
      await dispatch(
        SalesActions.updateSale({
          id,
          query: `api/order/items/${id}/accept_cancel_request_by_seller`,
        })
      ).unwrap();
    } catch (error) {
      setAcceptCancelRequestBySellerLoading(false);
    }
  };
  // حل النزاع بين الطرفين في حالة الغاء الطلبية

  const resolve_the_conflict_between_them_in_rejected = async (id: any) => {
    setResolveConflictBetweenRejectedLoading(true);
    try {
      await dispatch(
        SalesActions.updateSale({
          id,
          query: `api/order/items/${id}/resolve_the_conflict_between_them_in_rejected`,
        })
      ).unwrap();
    } catch (error) {
      setResolveConflictBetweenRejectedLoading(false);
    }
  };
  // قبول تعديل الخدمة من قبل المشتري
  const accept_modified_by_seller = async (id: any) => {
    setAcceptModifiedSellerLoading(true);
    try {
      await dispatch(
        SalesActions.updateSale({
          id,
          query: `api/order/items/${id}/accept_modified_by_seller`,
        })
      ).unwrap();
    } catch (error) {
      setAcceptModifiedSellerLoading(false);
    }
  };

  // رفض تعديل الخدمة من قبل البائع

  const reject_modified_by_seller = async (id: any) => {
    setRejectModifiedSellerLoading(true);
    try {
      await dispatch(
        SalesActions.updateSale({
          id,
          query: `api/order/items/${id}/reject_modified_by_seller`,
        })
      ).unwrap();
    } catch (error) {
      setRejectModifiedSellerLoading(false);
    }
  };
  // حل النزاع من طرف البائع

  const resolve_the_conflict_between_them_in_modified = async (id: any) => {
    setResolveConflictBetweenThemModifiedLoading(true);
    try {
      await dispatch(
        SalesActions.updateSale({
          id,
          query: `api/order/items/${id}/resolve_the_conflict_between_them_in_modified`,
        })
      ).unwrap();
    } catch (error) {
      setResolveConflictBetweenThemModifiedLoading(false);
    }
  };
  // إنشاء محادثة جديدة بين البائع والمشتري

  const createConversation = async (id: any) => {
    setCreateConversationLoading(true);
    try {
      await dispatch(
        ChatActions.createChat({
          id,
          body: {
            initial_message: message,
            receiver_id: ShowItem?.order?.cart?.user.id,
            title: ShowItem?.title,
          },
        })
      ).unwrap();
      dispatch(SalesActions.getOneSale({ id: query.id }));
    } catch (error) {
      setCreateConversationLoading(false);
    }
  };
  // دالة إرسال الرسالة

  const messageRef: any = useRef();

  const sendMessageHandle = async (e: any) => {
    e.preventDefault();
    setSendMessageLoading(true);
    setMessageErrors({});
    try {
      const id = ShowItem?.conversation?.id;
      const conversation: any = new FormData();
      filesMsg.map((file: any) => conversation.append("attachments[]", file));
      conversation.append("type", messageType);
      conversation.append("message", message);

      const res = await dispatch(
        ChatActions.sendMessage({
          id,
          body: conversation,
          headers: {
            headers: {
              "X-LOCALIZATION": language,
            },
            onUploadProgress: (uploadEvent) => {
              if (filesMsg.length !== 0)
                setMessageProgress(
                  Math.round((uploadEvent.loaded / uploadEvent.total) * 100)
                );
            },
          },
        })
      ).unwrap();

      ShowItem?.conversation?.messages?.push(res);
      setSendMessageLoading(false);
      myRef.current.scrollTo(0, myRef.current.scrollHeight + 80);
      setMessage("");
      messageRef.current.focus();
      setMessageProgress(0);
      clearAllFilesMsg();
    } catch (error) {
      setSendMessageLoading(false);
      if (error.errors) {
        setMessageErrors(error.errors);
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
        return <span className="badge bg-secondary">{getAll("PEnding")}</span>;

      case 1:
        return (
          <span className="badge bg-warning">{getAll("Cancelled_by_the")}</span>
        );

      case 2:
        return (
          <span className="badge bg-danger">{getAll("Refused_by_the")}</span>
        );

      case 3:
        return (
          <span className="badge bg-info text-dark">
            {getAll("In_progress")}
          </span>
        );

      case 4:
        return (
          <span className="badge bg-warning">
            {getAll("Buyer_cancellation_request")}
          </span>
        );

      case 5:
        return (
          <span className="badge bg-warning">
            {getAll("Cancelled_by_the_seller")}
          </span>
        );

      case 6:
        return (
          <span className="badge bg-primary">{getAll("Pending_receipt")}</span>
        );

      case 7:
        return (
          <span className="badge bg-success text-light">
            {getAll("Completed")}
          </span>
        );

      case 8:
        return (
          <span className="badge bg-danger text-light">
            {getAll("Suspended")}
          </span>
        );

      case 9:
        return (
          <span className="badge bg-light text-dark">
            {getAll("Status_amendment_request")}
          </span>
        );

      case 10:
        return (
          <span className="badge bg-danger text-light">
            {getAll("Suspended_due_to")}
          </span>
        );

      default:
        return (
          <span className="badge bg-info text-dark">{getAll("PEnding")}</span>
        );
    }
  };
  function durationFunc() {
    if (ShowItem?.duration == 1) {
      return getAll("One_day");
    }
    if (ShowItem?.duration == 2) {
      return getAll("2_days");
    }
    if (ShowItem?.duration > 2 && ShowItem?.duration < 11) {
      return ShowItem?.duration + getAll("Days");
    }
    if (ShowItem?.duration >= 11) {
      return ShowItem?.duration + getAll("Day");
    }
  }
  console.log(ShowItem);

  return (
    <>
      <MetaTags
        title={getAll("View_order")}
        metaDescription={getAll("View_order")}
        ogDescription={getAll("View_order")}
      />
      {veriedEmail && (
        <div style={{ backgroundColor: "#f6f6f6" }} className="my-3">
          {ShowItem.loading && <Loading />}
          <Modal
            title={getAll("Rejection_reason")}
            visible={isModalVisibleReject}
            okText={getAll("I’m_sure")}
            onOk={() => item_rejected_by_seller(ShowItem?.id)}
            onCancel={() => setModalVisibleReject(false)}
            cancelText={getAll("Cancel")}
          >
            <Spin spinning={BySellerMSGLoading}>
              <div className="timlands-form">
                <label htmlFor="message_type" className="form-text">
                  {getAll("Write_the_reason")}
                </label>
                <div
                  className="relative-form d-flex"
                  style={{ position: "relative", minHeight: 60 }}
                >
                  <input
                    id="input-buyer_instruct"
                    name="buyer_instruct"
                    placeholder={getAll("Write_the_reason")}
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
            title={getAll("Rejection_reason")}
            visible={isModalVisible}
            okText={getAll("I’m_sure")}
            onOk={() => reject_cancel_request_by_seller(ShowItem?.id)}
            onCancel={() => setIsModalVisible(false)}
            cancelText={getAll("Cancel")}
          >
            <Spin spinning={BySellerMSGLoading}>
              <div className="timlands-form">
                <label htmlFor="message_type" className="form-text">
                  {getAll("Write_the_reason")}
                </label>
                <div
                  className="relative-form d-flex"
                  style={{ position: "relative", minHeight: 60 }}
                >
                  <input
                    id="input-buyer_instruct"
                    name="buyer_instruct"
                    placeholder={getAll("Write_the_reason")}
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
            title={getAll("Rejection_reason")}
            visible={isModalVisibleRejectModified}
            okText={getAll("I’m_sure")}
            onOk={() => reject_modified_by_seller(ShowItem?.id)}
            onCancel={() => setModalVisibleRejectModified(false)}
            cancelText={getAll("Cancel")}
          >
            <Spin spinning={BySellerMSGLoading}>
              <div className="timlands-form">
                <label htmlFor="message_type" className="form-text">
                  {getAll("Write_the_cancellation")}
                </label>
                <div
                  className="relative-form d-flex"
                  style={{ position: "relative", minHeight: 60 }}
                >
                  <input
                    id="input-buyer_instruct"
                    name="buyer_instruct"
                    placeholder={getAll("Write_the_cancellation")}
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
            title={getAll("Confirmation_message")}
            visible={isModalVisibleDilevered}
            okText={getAll("I’m_sure")}
            onOk={() => dilevered_by_seller(ShowItem?.id)}
            onCancel={() => setModalVisibleDilevered(false)}
            cancelText={getAll("Cancel")}
          >
            <Alert type="error">{getAll("Are_you_sure")}</Alert>
          </Modal>
          {!ShowItem.loading && (
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
                          <h3 className="title">{getAll("Seller")}</h3>
                        </div>
                        <Link
                          href={`/u/${
                            ShowItem &&
                            ShowItem.profile_seller?.profile.user.username
                          }`}
                        >
                          <a className="order-user-info d-flex flex-center">
                            <div className="order-user-avatar">
                              <img
                                src={
                                  ShowItem &&
                                  ShowItem.profile_seller?.profile.avatar_path
                                }
                                width={50}
                                height={50}
                              />
                            </div>
                            <div className="order-user-content">
                              <h2 className="user-title">
                                {ShowItem &&
                                  ShowItem.profile_seller?.profile.full_name}
                              </h2>
                              <p className="meta">
                                <span className="badge bg-light text-dark">
                                  {ShowItem &&
                                    ShowItem.profile_seller?.level &&
                                    ShowItem.profile_seller.level[
                                      `name_${language}`
                                    ]}
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
                          <h3 className="title">{getAll("Buyer")}</h3>
                        </div>
                        <Link href={`/u/${ShowItem.order.cart.user.username}`}>
                          <a className="order-user-info d-flex flex-center">
                            <div className="order-user-avatar">
                              <img
                                src={
                                  ShowItem &&
                                  ShowItem.order.cart.user.profile.avatar_path
                                }
                                width={50}
                                height={50}
                              />
                            </div>
                            <div className="order-user-content">
                              <h2 className="user-title">
                                {ShowItem &&
                                  ShowItem.order.cart.user.profile.full_name}
                              </h2>
                              <p className="meta">
                                <span className="badge bg-light text-dark">
                                  {ShowItem &&
                                    ShowItem.order.cart.user.profile.level &&
                                    ShowItem.order.cart.user.profile.level[
                                      `name_${language}`
                                    ]}
                                </span>
                              </p>
                            </div>
                          </a>
                        </Link>
                      </div>
                      {ShowItem && ShowItem.attachments && (
                        <>
                          <div style={{ backgroundColor: "#fff", padding: 9 }}>
                            <div className="aside-header">
                              <h3 className="title">
                                {getAll("Project_attachments")}
                              </h3>
                            </div>
                            <div className="aside-attachments">
                              <Timeline>
                                {ShowItem.attachments.map((e: any, i) => (
                                  <Timeline.Item
                                    key={i}
                                    dot={<>{switchFileTypes(e.mime_type)}</>}
                                  >
                                    <a
                                      href={e.mime_type}
                                      rel="noreferrer"
                                      target="_blank"
                                    >
                                      {getAll("Upload_file")}
                                      {i + 1}#
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
                          <h3 className="title">
                            {getAll("Important_notes_to")}
                          </h3>
                          <ul className="order-notes-list">
                            <li>
                              {getAll("Do_not_communicate")}{" "}
                              {getAll("Timwoork_protects_you")}
                            </li>
                            <li>{getAll("Never_provide_under")}</li>
                            <li>{getAll("Do_not_provide")}</li>
                            <li>{getAll("Providing_other_users")}</li>
                            <li>{getAll("The_messages_are")}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      {ShowItem && ShowItem.status == 4 && (
                        <>
                          {ShowItem &&
                            ShowItem.item_rejected &&
                            ShowItem.item_rejected.status == 2 && (
                              <Alert type="error">
                                <p className="text">
                                  {getAll("You_must_reach")}
                                </p>
                              </Alert>
                            )}
                        </>
                      )}
                      <div className="aside-header">
                        <h3 className="title">{ShowItem.title}</h3>
                      </div>
                      <div style={{ backgroundColor: "#fff", padding: 9 }}>
                        <div className="aside-header">
                          <h3 className="title">
                            {getAll("Instructions_to_the")}
                          </h3>
                        </div>
                        <div className="seller-info">
                          <div
                            className="timwoork-single-product-detailts"
                            dangerouslySetInnerHTML={{
                              __html:
                                ShowItem?.profile_seller?.products[0] &&
                                ShowItem?.profile_seller?.products[0]
                                  .buyer_instruct,
                            }}
                          />
                        </div>
                      </div>
                      {ShowItem && ShowItem.conversation && (
                        <>
                          <div className="aside-header">
                            <h3 className="title">{getAll("Conversation")}</h3>
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
                              {ShowItem.conversation.messages.map(
                                (item: any) => {
                                  return (
                                    <motion.li
                                      initial={{ y: -4, opacity: 0 }}
                                      animate={{ y: 0, opacity: 1 }}
                                      key={item.id}
                                      className={
                                        (ShowItem && user?.id === item.user?.id
                                          ? ""
                                          : "recieved ") +
                                        "d-flex message-item align-item-center" +
                                        switchTypeMessage(item.type)
                                      }
                                      style={{
                                        marginBlock: 6,
                                        borderRadius: 6,
                                      }}
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
                                            {getAll("Instructions")}
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
                                            {getAll("Rejection_reason")}
                                          </span>
                                        )}
                                        <p
                                          className="text"
                                          style={{ margin: 0 }}
                                        >
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
                                                    {getAll("Upload_file")}{" "}
                                                    {i + 1}#
                                                  </a>
                                                </div>
                                              )
                                            )}
                                          </div>
                                        )}
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html: linkify(
                                              item.message,
                                              query
                                            ),
                                          }}
                                        />
                                        {ShowItem &&
                                          ShowItem.profile_seller?.id ==
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
                                  );
                                }
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
                                  {getAll("Choose_message_type")}
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
                                    <option value="0">
                                      {getAll("Plain_text")}
                                    </option>
                                    <option value="1">
                                      {getAll("Instructions")}
                                    </option>
                                    {getAll("Rejection_reason")}
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
                                    {getAll("Attach_file")}
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
                                          <strong>
                                            {getAll("Overall_size")}
                                          </strong>
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
                                    placeholder={getAll("Message_text")}
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
                                    {getAll("Send")}
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
                      {ShowItem && ShowItem.conversation == null && (
                        <>
                          <div className="conversation-start">
                            <div className="icon">
                              <span className="material-icons material-icons-outlined">
                                forum
                              </span>
                            </div>
                            <h3 className="title">
                              {getAll("Contact_the_buyer")}
                            </h3>
                            <p className="text">{getAll("Try_to_agree")}</p>
                            <textarea
                              id="input-initial_message"
                              name="initial_message"
                              placeholder={getAll("Message_text")}
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
                                  createConversation(ShowItem && ShowItem.id)
                                }
                                className="btn butt-lg butt-primary"
                              >
                                {getAll("Create_a_conversation")}
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
                          <h3 className="title">{getAll("Tools")}</h3>
                        </div>
                        <div className="d-grid gap-2">
                          {ShowItem && ShowItem.status == 0 && (
                            <>
                              <button
                                disabled={acceptedBySellerLoadingLoading}
                                onClick={() =>
                                  item_accepted_by_seller(ShowItem.id)
                                }
                                className="btn butt-md butt-green mx-1 flex-center-just"
                              >
                                <span className="material-icons material-icons-outlined">
                                  done_all
                                </span>{" "}
                                {getAll("Request_accept")}
                              </button>
                              <button
                                disabled={rejectedBySellerLoading}
                                onClick={() => setModalVisibleReject(true)}
                                className="btn butt-md butt-red mx-1 flex-center-just"
                              >
                                <span className="material-icons material-icons-outlined">
                                  highlight_off
                                </span>{" "}
                                {getAll("Request_rejection")}
                              </button>
                            </>
                          )}
                          {ShowItem.status == 1 && (
                            <>
                              <div className="box-note red">
                                <p className="text">
                                  {getAll("This_operation_was ")}
                                </p>
                              </div>
                            </>
                          )}
                          {ShowItem && ShowItem.status == 2 && (
                            <div className="box-note warning">
                              <p className="text">
                                {getAll("You_have_rejected")}
                              </p>
                            </div>
                          )}
                          {ShowItem && ShowItem.status == 3 && (
                            <>
                              <div className="order-uploader-files">
                                <div className="uploader-header">
                                  <h3 className="title">
                                    {getAll("Attach_files_and")}
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
                                        {getAll("You_can_choose")}
                                      </p>
                                    </div>
                                  )}
                                  {files.length > 0 && (
                                    <ul className="files-proprieties">
                                      <li>
                                        <strong>
                                          {getAll("Overall_size")}
                                        </strong>
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
                                {getAll("Add_files")}
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
                                {getAll("Deliver_order")}{" "}
                              </button>
                            </>
                          )}
                          {ShowItem && ShowItem.status == 4 && (
                            <>
                              {ShowItem.item_rejected.status == 0 && (
                                <>
                                  <button
                                    disabled={
                                      acceptCancelRequestBySellerLoading
                                    }
                                    onClick={() =>
                                      accept_cancel_request_by_seller(
                                        ShowItem.id
                                      )
                                    }
                                    className="btn butt-md butt-green mx-1 flex-center-just"
                                  >
                                    <span className="material-icons material-icons-outlined">
                                      done_all
                                    </span>
                                    {getAll("Cancellation_request_accept")}
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
                                    {getAll("Cancellation_request_rejection")}
                                  </button>
                                </>
                              )}
                            </>
                          )}
                          {ShowItem && ShowItem.status == 5 && (
                            <div className="box-note warning">
                              <p className="text">
                                {getAll("You_have_cancelled")}
                              </p>
                            </div>
                          )}
                          {ShowItem && ShowItem.status == 6 && (
                            <div className="box-note primary">
                              <p className="text">
                                {getAll("Operation_receipt_in")}
                              </p>
                            </div>
                          )}
                          {ShowItem && ShowItem.status == 7 && (
                            <div className="box-note green-fill">
                              <p className="text">
                                <strong>{getAll("Complete_operation")}</strong>
                              </p>
                            </div>
                          )}
                          {ShowItem && ShowItem.status == 8 && (
                            <button
                              disabled={resolveConflictBetweenRejectedLoading}
                              onClick={() =>
                                resolve_the_conflict_between_them_in_rejected(
                                  ShowItem.id
                                )
                              }
                              className="btn butt-md butt-green mx-1 flex-center-just"
                            >
                              <span className="material-icons material-icons-outlined">
                                highlight_off
                              </span>
                              {getAll("Dispute_resolved")}
                            </button>
                          )}

                          {ShowItem && ShowItem.status == 9 && (
                            <>
                              {ShowItem && ShowItem.item_modified.status == 0 && (
                                <>
                                  <button
                                    disabled={acceptModifiedSellerLoading}
                                    onClick={() =>
                                      accept_modified_by_seller(ShowItem.id)
                                    }
                                    className="btn butt-md butt-green mx-1 flex-center-just"
                                  >
                                    <span className="material-icons material-icons-outlined">
                                      done_all
                                    </span>{" "}
                                    {getAll("Amendment_request_receipt")}
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
                                    {getAll("Reject_the_amendment")}
                                  </button>
                                </>
                              )}
                            </>
                          )}

                          {ShowItem && ShowItem.status == 10 && (
                            <>
                              <div className="box-note red">
                                <p className="text">{getAll("If_you_reach")}</p>
                              </div>
                              <button
                                disabled={
                                  resolveConflictBetweenThemModifiedLoading
                                }
                                onClick={() =>
                                  resolve_the_conflict_between_them_in_modified(
                                    ShowItem.id
                                  )
                                }
                                className="btn butt-md butt-green mx-1 flex-center-just"
                              >
                                <span className="material-icons material-icons-outlined">
                                  highlight_off
                                </span>
                                {getAll("Dispute_resolved")}
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                      <div style={{ backgroundColor: "#fff", padding: 9 }}>
                        <div className="aside-header">
                          <h3 className="title">
                            {getAll("Operation_details")}
                          </h3>
                        </div>
                        <table className="table table-borderless">
                          <tbody>
                            <tr>
                              <th>{getAll("Operation_number1")}</th>
                            </tr>
                            <tr>
                              <td>{ShowItem.uuid}</td>
                            </tr>
                            <tr>
                              <th>{getAll("Operation_status")}</th>
                            </tr>
                            <tr>
                              <td>{statusLabel(ShowItem.status)}</td>
                            </tr>
                            <tr>
                              <th>{getAll("Date_of_operation")}</th>
                            </tr>
                            <tr>
                              <td>
                                <LastSeen date={ShowItem.created_at} />
                              </td>
                            </tr>
                            <tr>
                              <th>{getAll("Completion_time")}</th>
                            </tr>
                            <tr>
                              <td>{durationFunc()}</td>
                            </tr>
                            <tr>
                              <th>{getAll("Order_price")}</th>
                            </tr>
                            <tr>
                              <td>${ShowItem.price_product}</td>
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

function linkify(text, query) {
  const urlRegex =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
  const before = text.replace(urlRegex, function (url) {
    const start = url.startsWith("http") || url.startsWith("https");
    let newUrl = url;
    newUrl = !start ? "https://" + url : url;
    if (newUrl.startsWith("https://timwoork")) {
      return '<a href="' + newUrl + '" target="_blank">' + url + "</a>";
    } else {
      return (
        '<a href="/redirect/f?url=' +
        newUrl +
        `&*conversations/${query.id}` +
        '" target="_blank">' +
        url +
        "</a>"
      );
    }
  });
  return `<p style="word-break: break-word;">${before}</p>`;
}

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
