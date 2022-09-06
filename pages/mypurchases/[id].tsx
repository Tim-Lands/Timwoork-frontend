import React, { ReactElement, useEffect, useRef, useState } from "react";
import Layout from "@/components/Layout/HomeLayout";
import { MetaTags } from "@/components/SEO/MetaTags";
import useSWR from "swr";
import PropTypes from "prop-types";
import useFileUpload from "react-use-file-upload";
import Loading from "@/components/Loading";
import API from "../../config";
import Cookies from "js-cookie";
import LastSeen from "@/components/LastSeen";
import { Progress, Rate, Result, Spin, Timeline } from "antd";
import router from "next/router";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Alert } from "@/components/Alert/Alert";
import { LanguageContext } from "../../contexts/languageContext/context";
import { useContext } from "react";

const Order = ({ query }) => {
  const { getSectionLanguage, language } = useContext(LanguageContext);
  const getAll = getSectionLanguage();
  let token = Cookies.get("token");
  if (!token && typeof window !== "undefined")
    token = localStorage.getItem("token");

  const { data: userInfo }: any = useSWR("api/me");
  const veriedEmail = userInfo && userInfo.user_details.email_verified_at;

  const { data: ShowItem, errorItem }: any = useSWR(
    `api/my_purchases/${query.id}`
  );
  const inputRefMsg: any = useRef();
  const myRef = useRef(null);

  const [messageProgress, setMessageProgress] = useState(0);
  const [messageErrors, setMessageErrors]: any = useState({});

  const [isRattingLoading, setIsRattingLoading] = useState(false);
  const [rattingState, setRattingState] = useState("");
  const [rattingCount, setRattingCount] = useState(0);
  const [isModalVisibleRatting, setModalVisibleRatting] = useState(false);
  const [rattingValidationsErrors, setRattingValidationsErrors]: any = useState(
    {}
  );
  const [validationsGeneral, setValidationsGeneral]: any = useState({});

  async function rattingHandle(id: any) {
    setIsRattingLoading(true);
    setRattingValidationsErrors({});
    setValidationsGeneral({});
    try {
      const res = await API.post(
        `api/order/items/${id}/rating`,
        {
          comment: rattingState,
          rating: rattingCount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        setIsRattingLoading(false);
        setValidationsGeneral({});
        router.reload();
      }
    } catch (error) {
      setIsRattingLoading(false);
      if (error.response && error.response.data && error.response.data.errors) {
        setRattingValidationsErrors(error.response.data.errors);
      }
      if (error.response && error.response.data) {
        setValidationsGeneral(error.response.data);
      }
    }
  }

  const [cancelledBuyerLoading, setCancelledBuyerLoading] = useState(false);
  const [requestCancelItemBuyerLoading, setRequestCancelItemBuyerLoading] =
    useState(false);
  const [acceptedDeliveryBuyerLoading, setAcceptedDeliveryBuyerLoading] =
    useState(false);
  const [requestModifiedBuyerLoading, setRequestModifiedBuyerLoading] =
    useState(false);
  const [createConversationLoading, setCreateConversationLoading] =
    useState(false);
  const [sendMessageLoading, setSendMessageLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(0);
  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, []);
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

  const {
    files: filesMsg,
    fileNames: fileNamesMsg,
    totalSize: totalSizeMsg,
    setFiles: setFilesMsg,
    removeFile: removeFileMsg,
    clearAllFiles: clearAllFilesMsg,
  } = useFileUpload();

  // الغاء الطلبية من قبل المشتري
  const item_cancelled_by_buyer = async (id: any) => {
    setCancelledBuyerLoading(true);
    try {
      const res = await API.post(
        `api/order/items/${id}/item_cancelled_by_buyer`,
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
      setCancelledBuyerLoading(false);
    }
  };

  // طلب الالغاء الخدمة من قبل المشتري
  const request_cancel_item_by_buyer = async (id: any) => {
    setRequestCancelItemBuyerLoading(true);
    try {
      const res = await API.post(
        `api/order/items/${id}/request_cancel_item_by_buyer`,
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
      setRequestCancelItemBuyerLoading(false);
    }
  };

  // قبول المشروع من قبل المشتري
  const accepted_delivery_by_buyer = async (id: any) => {
    setAcceptedDeliveryBuyerLoading(true);
    try {
      const res = await API.post(
        `api/order/items/${id}/accepted_delivery_by_buyer`,
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
      setAcceptedDeliveryBuyerLoading(false);
    }
  };

  // طلب تعديل الخدمة من قبل المشتري
  const request_modified_by_buyer = async (id: any) => {
    setRequestModifiedBuyerLoading(true);
    try {
      const res = await API.post(
        `api/order/items/${id}/request_modified_by_buyer`,
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
      setRequestModifiedBuyerLoading(false);
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
          receiver_id: ShowItem && ShowItem.data.user_id,
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
        return <span className="badge bg-primary">{getAll("In_receipt")}</span>;

      case 7:
        return (
          <span className="badge bg-success text-light">
            {getAll("Completed")}
          </span>
        );

      case 8:
        return (
          <span className="badge bg-red text-light">{getAll("Suspended")}</span>
        );

      case 9:
        return (
          <span className="badge bg-light text-dark">
            {getAll("Amendment_request_status")}
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
    if (ShowItem.data.duration == 1) {
      return getAll("One_day");
    }
    if (ShowItem.data.duration == 2) {
      return getAll("2_days");
    }
    if (ShowItem.data.duration > 2 && ShowItem.data.duration < 11) {
      return ShowItem.data.duration + getAll("Days");
    }
    if (ShowItem.data.duration >= 11) {
      return ShowItem.data.duration + getAll("Day");
    }
  }
  return (
    <div style={{ backgroundColor: "#f6f6f6" }}>
      <MetaTags
        title={getAll("View_order")}
        metaDescription={getAll("View_order")}
        ogDescription={getAll("View_order")}
      />
      {errorItem && !ShowItem.data && (
        <Result
          status="warning"
          title={getAll("An_unexpected_error_occurred")}
        />
      )}
      {!ShowItem && <Loading />}
      {ShowItem && veriedEmail && (
        <div className="row py-4 justify-content-center">
          <div className="col-md-12">
            <div className="app-bill" style={{ backgroundColor: "#f6f6f6" }}>
              <div className="row">
                <div className="col-md-3">
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
                    <Link
                      href={`/u/${
                        ShowItem && ShowItem.data.order.cart.user.username
                      }`}
                    >
                      <a className="order-user-info d-flex flex-center">
                        <div className="order-user-avatar">
                          <Image
                            src={
                              ShowItem &&
                              ShowItem.data.order.cart.user.profile.avatar_path
                            }
                            width={50}
                            height={50}
                            quality={80}
                          />
                        </div>
                        <div className="order-user-content">
                          <h2 className="user-title">
                            {ShowItem &&
                              ShowItem.data.order.cart.user.profile.full_name}
                          </h2>
                          <p className="meta">
                            <span className="badge bg-light text-dark">
                              {ShowItem &&
                                ShowItem.data.order.cart.user.profile.level &&
                                ShowItem.data.order.cart.user.profile.level[
                                  which(language)
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
                      <h3 className="title">{getAll("Seller")}</h3>
                    </div>
                    <Link
                      href={`/u/${
                        ShowItem &&
                        ShowItem.data.profile_seller.profile.user.username
                      }`}
                    >
                      <a className="order-user-info d-flex flex-center">
                        <div className="order-user-avatar">
                          <Image
                            src={
                              ShowItem &&
                              ShowItem.data.profile_seller.profile.avatar_path
                            }
                            width={50}
                            height={50}
                            quality={80}
                          />
                        </div>
                        <div className="order-user-content">
                          <h2 className="user-title">
                            {ShowItem &&
                              ShowItem.data.profile_seller.profile.full_name}
                          </h2>
                          <p className="meta">
                            <span className="badge bg-light text-dark">
                              {ShowItem &&
                                ShowItem.data.profile_seller.level &&
                                ShowItem.data.profile_seller.level[
                                  which(language)
                                ]}
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
                          <h3 className="title">
                            {getAll("Project_attachments")}
                          </h3>
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
                      <h3 className="title">{getAll("Important_notes_to")}</h3>
                      <ul className="order-notes-list">
                        <li>
                          {getAll("Do_not_communicate")}
                          {getAll("Timwoork_protects_you")}.
                        </li>
                        <li>{getAll("Never_provide_under")}</li>
                        <li>{getAll("Do_not_provide")}</li>
                        <li>{getAll("Providing_other_users")}</li>
                        <li>{getAll("The_messages_are")}</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="py-2">
                    {ShowItem && ShowItem.data.is_rating == 1 && (
                      <>
                        {isModalVisibleRatting && (
                          <div className="single-comments-overlay">
                            <motion.div
                              initial={{ scale: 0, opacity: 0, y: 60 }}
                              exit={{ scale: 0, opacity: 0, y: 60 }}
                              animate={{ scale: 1, opacity: 1, y: 0 }}
                              className="single-comments-modal"
                            >
                              <div className="modal-title">
                                <h4 className="title">{getAll("Reply")}</h4>
                                <button
                                  className="btn-close"
                                  type="button"
                                  onClick={() => setModalVisibleRatting(false)}
                                ></button>
                              </div>

                              <div className="modal-body">
                                {validationsGeneral.msg && (
                                  <Alert type="error">
                                    {validationsGeneral.msg}
                                  </Alert>
                                )}
                                <Spin spinning={isRattingLoading}>
                                  <div className="timlands-form">
                                    <label
                                      htmlFor="message_rating"
                                      className="form-text"
                                    >
                                      {getAll("Choose_a_review")}
                                    </label>

                                    <Rate
                                      style={{ fontSize: 30 }}
                                      onChange={(e: any) => setRattingCount(e)}
                                      value={rattingCount}
                                    />
                                    {rattingValidationsErrors &&
                                      rattingValidationsErrors.rating && (
                                        <motion.div
                                          initial={{ y: -6, opacity: 0 }}
                                          animate={{ y: 0, opacity: 1 }}
                                          className="timlands-form-note form-note-error"
                                        >
                                          <p className="text">
                                            {rattingValidationsErrors.rating[0]}
                                          </p>
                                        </motion.div>
                                      )}
                                  </div>
                                  <div className="timlands-form">
                                    <label
                                      htmlFor="message_type"
                                      className="form-text"
                                    >
                                      {getAll("Write_the_comment")}
                                    </label>
                                    <div
                                      className="relative-form d-flex"
                                      style={{
                                        position: "relative",
                                        minHeight: 60,
                                      }}
                                    >
                                      <textarea
                                        id="input-buyer_instruct"
                                        name="buyer_instruct"
                                        placeholder={getAll(
                                          "Write_the_comment"
                                        )}
                                        className={"timlands-inputs"}
                                        autoComplete="off"
                                        value={rattingState}
                                        onChange={(e: any) =>
                                          setRattingState(e.target.value)
                                        }
                                      />
                                    </div>
                                    {rattingValidationsErrors &&
                                      rattingValidationsErrors.comment && (
                                        <motion.div
                                          initial={{ y: -6, opacity: 0 }}
                                          animate={{ y: 0, opacity: 1 }}
                                          className="timlands-form-note form-note-error"
                                        >
                                          <p className="text">
                                            {
                                              rattingValidationsErrors
                                                .comment[0]
                                            }
                                          </p>
                                        </motion.div>
                                      )}
                                  </div>
                                </Spin>
                                <hr />
                                <button
                                  className="btn butt-primary butt-sm mx-1"
                                  type="submit"
                                  onClick={() =>
                                    rattingHandle(ShowItem && ShowItem.data.id)
                                  }
                                >
                                  {getAll("Add_comment")}
                                </button>
                                <button
                                  className="btn butt-red-text butt-sm mx-1"
                                  onClick={() => setModalVisibleRatting(false)}
                                  type="button"
                                >
                                  {getAll("Cancel_2")}
                                </button>
                              </div>
                            </motion.div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  {ShowItem && ShowItem.data.is_rating == 1 && (
                    <div
                      className="alert-info p-3 d-flex"
                      style={{
                        borderRadius: 7,
                        flexDirection: "column",
                        textAlign: "center",
                      }}
                    >
                      <p className="text">{getAll("You_can_now")}</p>
                      <button
                        className="btn butt-sm butt-primary"
                        style={{ width: "40%", margin: "auto" }}
                        type="button"
                        onClick={() => setModalVisibleRatting(true)}
                      >
                        {getAll("Add_a_review")}
                      </button>
                    </div>
                  )}
                  <div className="aside-header">
                    <h3 className="title">{ShowItem.data.title}</h3>
                  </div>
                  <div style={{ backgroundColor: "#fff", padding: 9 }}>
                    <div className="aside-header">
                      <h3 className="title">{getAll("Instructions_to_the")}</h3>
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
                          {ShowItem.data.conversation.messages.map(
                            (item: any) => (
                              <motion.li
                                initial={{ y: -4, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                key={item.id}
                                className={
                                  (ShowItem &&
                                  ShowItem.data.order.cart.user_id ==
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
                                  <Image
                                    src={item.user.profile.avatar_path}
                                    width={45}
                                    height={45}
                                    quality={80}
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
                                      {getAll("Educational")}
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
                                      {getAll("Cancellation_reason")}
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
                                              {switchFileTypes(att.mime_type)}{" "}
                                              {getAll("Upload_file")}
                                              {i + 1}#
                                            </a>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  )}
                                  <p className="text2" style={{ margin: 0 }}>
                                    {item.message}
                                  </p>
                                  {ShowItem &&
                                    ShowItem.data.order.cart.user_id ==
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
                            <label htmlFor="message_type" className="form-text">
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
                                <option value="2">
                                  {getAll("Cancellation_reason")}
                                </option>
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
                                      <span className="name-file">{name}</span>
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
                                      <strong>{getAll("Overall_size")}</strong>
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
                              style={{ position: "relative", minHeight: 60 }}
                            >
                              <input
                                id="input-buyer_instruct"
                                name="buyer_instruct"
                                onKeyUp={() => {
                                  setMessageErrors({});
                                }}
                                placeholder={getAll("Message")}
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
                  {ShowItem && ShowItem.data.conversation == null && (
                    <>
                      <div className="conversation-start">
                        <div className="icon">
                          <span className="material-icons material-icons-outlined">
                            forum
                          </span>
                        </div>
                        <h3 className="title">{getAll("Contact_buyer")}</h3>
                        <p className="text">{getAll("Try_to_agree")}</p>
                        <textarea
                          id="input-initial_message"
                          name="initial_message"
                          placeholder={getAll("Message")}
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
                              createConversation(ShowItem && ShowItem.data.id)
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
                <div className="col-md-3">
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
                      {ShowItem && ShowItem.data.status == 0 && (
                        <button
                          disabled={cancelledBuyerLoading}
                          onClick={() =>
                            item_cancelled_by_buyer(ShowItem.data.id)
                          }
                          className="btn butt-md butt-red mx-1 flex-center-just"
                        >
                          <span className="material-icons material-icons-outlined">
                            highlight_off
                          </span>{" "}
                          {getAll("Cancel_your_purchase")}
                        </button>
                      )}
                      {ShowItem && ShowItem.data.status == 1 && (
                        <span className="badge bg-success">
                          {getAll("You’ve_cancelled_it")}
                        </span>
                      )}
                      {ShowItem && ShowItem.data.status == 2 && (
                        <span className="badge bg-warning">
                          {getAll("This_order_was")}
                        </span>
                      )}
                      {ShowItem && ShowItem.data.status == 3 && (
                        <button
                          disabled={requestCancelItemBuyerLoading}
                          onClick={() =>
                            request_cancel_item_by_buyer(ShowItem.data.id)
                          }
                          className="btn butt-md butt-red mx-1 flex-center-just"
                        >
                          <span className="material-icons material-icons-outlined">
                            highlight_off
                          </span>{" "}
                          {getAll("Cancellation_request")}{" "}
                        </button>
                      )}
                      {ShowItem && ShowItem.data.status == 4 && (
                        <>
                          {ShowItem.data.item_rejected.status == 0 && (
                            <p className="note-text">
                              {getAll("Waiting_for_your")}
                            </p>
                          )}
                        </>
                      )}
                      {ShowItem && ShowItem.data.status == 5 && (
                        <span className="badge bg-warning">
                          {getAll("Cancelled_by_the_seller")}
                        </span>
                      )}
                      {ShowItem && ShowItem.data.status == 6 && (
                        <>
                          <button
                            disabled={acceptedDeliveryBuyerLoading}
                            onClick={() =>
                              accepted_delivery_by_buyer(ShowItem.data.id)
                            }
                            className="btn butt-md butt-green mx-1 flex-center-just"
                          >
                            <span className="material-icons material-icons-outlined">
                              check_circle_outline
                            </span>{" "}
                            {getAll("Receipt_accept")}{" "}
                          </button>
                          <button
                            disabled={requestModifiedBuyerLoading}
                            onClick={() =>
                              request_modified_by_buyer(ShowItem.data.id)
                            }
                            className="btn butt-md butt-primary2 mx-1 flex-center-just"
                          >
                            <span className="material-icons material-icons-outlined">
                              edit
                            </span>{" "}
                            {getAll("Edit")}{" "}
                          </button>
                        </>
                      )}
                      {ShowItem && ShowItem.data.status == 7 && (
                        <span className="badge bg-success text-light">
                          {getAll("Completed")}
                        </span>
                      )}
                      {ShowItem && ShowItem.data.status == 8 && (
                        <>
                          <p className="note-text">
                            {getAll("The_seller_has")}
                          </p>
                          <div className="box-note red">
                            <p className="text">
                              {getAll("Waiting_for_your_2")}
                            </p>
                          </div>
                        </>
                      )}

                      {ShowItem && ShowItem.data.status == 9 && (
                        <>
                          {ShowItem && ShowItem.data.item_modified.status == 0 && (
                            <>
                              <div className="box-note warning">
                                <p className="text">
                                  {getAll("Waiting_for_the")}
                                </p>
                              </div>
                            </>
                          )}
                        </>
                      )}

                      {ShowItem && ShowItem.data.status == 10 && (
                        <div className="box-note warning">
                          <p className="text">{getAll("The_amendment_has")}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div style={{ backgroundColor: "#fff", padding: 9 }}>
                    <div className="aside-header">
                      <h3 className="title">{getAll("Operation_details")}</h3>
                    </div>
                    <table className="table table-borderless">
                      <tbody>
                        <tr>
                          <th>{getAll("Operation_number1")}</th>
                        </tr>
                        <tr>
                          <td>{ShowItem.data.uuid}</td>
                        </tr>
                        <tr>
                          <th>{getAll("Operation_status")}</th>
                        </tr>
                        <tr>
                          <td>{statusLabel(ShowItem.data.status)}</td>
                        </tr>
                        <tr>
                          <th>{getAll("Date_of_operation")}</th>
                        </tr>
                        <tr>
                          <td>
                            <LastSeen date={ShowItem.data.created_at} />
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
  );
};
const which = (language) => {
  switch (language) {
    default:
      return "name_en";
    case "ar":
      return "name_ar";
    case "en":
      return "name_en";
    case "fr":
      return "name_fr";
  }
};

export default Order;
Order.getLayout = function getLayout(page: any): ReactElement {
  return <Layout>{page}</Layout>;
};
Order.getInitialProps = async ({ query }) => {
  return { query };
};
Order.propTypes = {
  query: PropTypes.any,
};
