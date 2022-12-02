import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useRef, useState } from "react";
import Link from "next/link";
import { Progress, Timeline } from "antd";
import { Alert } from "../Alert/Alert";
import { motion } from "framer-motion";
import LastSeen from "../LastSeen";
import { useFileUpload } from "react-use-file-upload/dist/lib/useFileUpload";
import { SalesActions } from "@/store/sales/salesActions";
import { ChatActions } from "@/store/chat/chatActions";
import Loading from "../Loading";
import ButtonAction from "./ButtonAction";
import { EItemType } from "./EItemType";


const messageType = {
  0: "",
  1: "instruct",
  2: "cause",
};

const fileTypes = {
  png: { color: "orange", icon: "image" },
  jpg: { color: "orange", icon: "image" },
  gif: { color: "orange", icon: "image" },
  psd: { color: "orange", icon: "image" },
  zip: { color: "plum", icon: "folder_zip" },
  rar: { color: "plum", icon: "folder_zip" },
  mp3: { color: "springgreen", icon: "headphones" },
  wma: { color: "springgreen", icon: "headphones" },
  aac: { color: "springgreen", icon: "headphones" },
  ogg: { color: "springgreen", icon: "headphones" },
  wav: { color: "springgreen", icon: "headphones" },
  mp4: { color: "yellowgreen", icon: "smart_display" },
  avi: { color: "yellowgreen", icon: "smart_display" },
  mpg: { color: "yellowgreen", icon: "smart_display" },
  pdf: { color: "maroon", icon: "picture_as_pdf" },
};
const switchTypeMessage = (type: number) => {
  return Object.prototype.hasOwnProperty.call(messageType, type)
    ? messageType[type]
    : "";
};

const switchFileTypes = (type: any) => {
  return Object.prototype.hasOwnProperty.call(fileTypes, type) ? (
    <span
      className="material-icons material-icons-outlined"
      style={{ color: fileTypes[type].color }}
    >
      {fileTypes[type].icon}
    </span>
  ) : (
    <span className="material-icons material-icons-outlined">description</span>
  );
};

function linkify(text, id) {
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
        `&*conversations/${id}` +
        '" target="_blank">' +
        url +
        "</a>"
      );
    }
  });
  return `<p style="word-break: break-word;">${before}</p>`;
}

const Item = ({
  id,
  type,
  ShowItem,
}: {
  id: number;
  type: EItemType;
  ShowItem: any;
}) => {
  const {
    languages: { getAll, language },
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const inputRefMsg: any = useRef();
  const veriedEmail = user.email_verified;
  const myRef: any = useRef();
  const [sendMessageLoading, setSendMessageLoading] = useState(false);
  const [messageType, setMessageType] = useState(0);
  const [messageProgress, setMessageProgress] = useState(0);
  const [messageErrors, setMessageErrors]: any = useState({});
  const [message, setMessage] = useState("");
  const messageRef: any = useRef();
  const [createConversationLoading, setCreateConversationLoading] =
    useState(false);
  const {
    files: filesMsg,
    fileNames: fileNamesMsg,
    totalSize: totalSizeMsg,
    setFiles: setFilesMsg,
    removeFile: removeFileMsg,
    clearAllFiles: clearAllFilesMsg,
  } = useFileUpload();

  const createConversation = async (id: any) => {
    setCreateConversationLoading(true);
    const receiver_id = type==EItemType.PURCHASES
    ?ShowItem.profile_seller?.profile.user?.id
    :ShowItem?.order?.cart?.user.id
    try {
      await dispatch(
        ChatActions.createChat({
          id,
          body: {
            initial_message: message,
            receiver_id,
            title: ShowItem?.title,
          },
        })
      ).unwrap();
      dispatch(SalesActions.getOneSale({ id }));
    } catch (error) {
      setCreateConversationLoading(false);
    }
  };

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
    if (ShowItem.duration == 1) {
      return getAll("One_day");
    }
    if (ShowItem.duration == 2) {
      return getAll("2_days");
    }
    if (ShowItem.duration > 2 && ShowItem.duration < 11) {
      return ShowItem.duration + getAll("Days");
    }
    if (ShowItem.duration >= 11) {
      return ShowItem.duration + getAll("Day");
    }
  }
  console.log(ShowItem);
  return (
    <>
      {veriedEmail && (
        <div style={{ backgroundColor: "#f6f6f6" }} className="my-3">
          {ShowItem.loading && <Loading />}
          <div className="row py-4 justify-content-center">
            <div className="col-md-12" style={{ maxWidth: 1300 }}>
              <div className="app-bill" style={{ backgroundColor: "#f6f6f6" }}>
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
                          ShowItem.profile_seller?.profile.user?.username
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
                                  ShowItem.profile_seller?.level.name}
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
                      <Link
                        href={`/u/${
                          type == EItemType.SALES
                            ? ShowItem.order.cart.user.username
                            : ShowItem.profile_seller.profile.user?.username
                        }`}
                      >
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
                                  ShowItem.order.cart.user.profile.level[
                                    `name`
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
                                  key={i} //
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
                              <p className="text">{getAll("You_must_reach")}</p>
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
                            {ShowItem.conversation.messages.map((item: any) => {
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
                                                {getAll("Upload_file")} {i + 1}#
                                              </a>
                                            </div>
                                          )
                                        )}
                                      </div>
                                    )}
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html: linkify(item.message, id),
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
                            })}
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
                    <ButtonAction type={type} ShowItem={ShowItem} id={id} />
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
        </div>
      )}
    </>
  );
};

export default Item;
