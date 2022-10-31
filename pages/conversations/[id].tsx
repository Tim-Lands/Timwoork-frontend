import Layout from "@/components/Layout/HomeLayout";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import { ChatActions } from "store/chat/chatActions";
import { MetaTags } from "@/components/SEO/MetaTags";
import PropTypes from "prop-types";
import LastSeen from "@/components/LastSeen";
import useFileUpload from "react-use-file-upload";
import Sidebar from "@/components/Conversations/Sidebar";
import { Progress } from "antd";
import { motion } from "framer-motion";
import router from "next/router";
import Loading from "@/components/Loading";
import { useAppSelector, useAppDispatch } from "@/store/hooks";

let testTime;

function Conversation({ query }) {
  const {
    languages: { getAll, language },
    user,
    chat: { one: conversationsSingle },
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (query.id === null) return;
    dispatch(ChatActions.setId(query.id));
  }, [query.id]);
  useEffect(() => {
    if (conversationsSingle.id === null) return;
    dispatch(ChatActions.getSingleChat({ id: conversationsSingle.id }));
  }, [conversationsSingle.id]);
  const [userLang] = useState();
  const inputRefMsg: any = useRef();
  const messageCont = useRef(null);

  const veriedEmail = user.email_verified;
  const [messageProgress, setMessageProgress] = useState(0);
  const [messageErrors, setMessageErrors]: any = useState({});
  const [sendMessageLoading, setSendMessageLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(0);
  const [isTranslate, setIsTranslate] = useState({});
  useEffect(() => {
    if (!user.isLogged && !user.loading) {
      router.push("/login");
    }
  }, [user]);
  useEffect(() => {
    if (messageCont.current) {
      messageCont.current.scrollTop = 100000000000;
    }
  });

  const {
    files: filesMsg,
    fileNames: fileNamesMsg,
    totalSize: totalSizeMsg,
    setFiles: setFilesMsg,
    removeFile: removeFileMsg,
    clearAllFiles: clearAllFilesMsg,
  } = useFileUpload();

  const messageRef: any = useRef();

  const sendMessageHandle = async (e: any) => {
    e.preventDefault();
    setSendMessageLoading(true);
    setMessageErrors({});
    try {
      const id = query.id;
      const conversation: any = new FormData();
      filesMsg.map((file: any) => conversation.append("attachments[]", file));
      conversation.append("type", messageType);
      conversation.append("message", message);
      setSendMessageLoading(true);
      await dispatch(
        ChatActions.sendMessage({
          id,
          body: conversation,
          headers: {
            headers: {
              "X-LOCALIZATION": userLang,
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

      setMessage("");
      messageRef.current.focus();
      setMessageProgress(0);
      clearAllFilesMsg();
    } catch (error) {
      if (error) {
        setMessageErrors(error.errors);
      }
    } finally {
      setSendMessageLoading(false);
    }
  };

  const detectLang = async () => {
    // const res = await API.post(`/api/detectLang`, { sentence: txt });
    // setUserLang(res.data.data);
  };
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
            description description
          </span>
        );
    }
  };
  return (
    <>
      <MetaTags
        title={`${getAll("Conversations")} - ${conversationsSingle.title}`}
        metaDescription={getAll("My_sells_Timwoork")}
        ogDescription={getAll("My_sells_Timwoork")}
      />
      <div
        className="timwoork-single my-3"
        style={{ maxWidth: 1300, marginInline: "auto" }}
      >
        {veriedEmail && (
          <div className="row ">
            <div className="col-lg-4 ">
              <Sidebar RouterId={query.id} />
            </div>
            <div className="col-lg-8 mt-4">
              <div className="app-bill conv" ref={messageCont}>
                {conversationsSingle.loading && <Loading />}
                <div className="conversations-list">
                  <div className="conversations-title">
                    <h4 className="title">{conversationsSingle.title}</h4>
                  </div>
                  <ul
                    className="conversations-items"
                    style={{
                      margin: 0,
                      padding: 0,
                      listStyle: "none",
                      flexDirection: "column",
                      display: "flex",
                    }}
                  >
                    {conversationsSingle.data.map((item: any) => (
                      <motion.li
                        initial={{ y: -4, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        id={`msg-item-${item.id}`}
                        key={item.id}
                        className={
                          (user.id == item.user.id ? "" : "recieved ") +
                          "d-flex message-item " +
                          switchTypeMessage(item.type)
                        }
                        style={{ marginBlock: 9 }}
                      >
                        <div
                          className="item-avatar"
                          style={{ marginInline: 9 }}
                        >
                          <img
                            src={item.user.profile.avatar_path}
                            width={60}
                            height={60}
                            className="rounded-pill"
                            alt=""
                          />
                        </div>

                        <div className="item-content">
                          <button
                            className="btn butt-sm butt-primary-text btn-translate flex-center"
                            onClick={() =>
                              setIsTranslate({
                                ...isTranslate,
                                [item.id]: !isTranslate[item.id],
                              })
                            }
                          >
                            <span className="material-icons material-icons-outlined">
                              translate
                            </span>
                            {isTranslate[item.id]
                              ? "إعادة النص للترجمة الاصلية"
                              : "ترجمة"}
                          </button>
                          <LastSeen date={item.created_at} />
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
                              {getAll("Cancellation_reason")}
                            </span>
                          )}
                          <p className="text" style={{ margin: 0 }}>
                            {item.user.profile.full_name}
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
                              {item.attachments.map((att: any, i: number) => (
                                <div className="att-item" key={att.id}>
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
                              ))}
                            </div>
                          )}

                          <div
                            dangerouslySetInnerHTML={
                              isTranslate[item.id]
                                ? {
                                    __html: linkify(
                                      item[`message_${language}`] || "",
                                      query
                                    ),
                                  }
                                : {
                                    __html: linkify(item.message, query),
                                  }
                            }
                          />
                          {user.id == item.user.id && (
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
                    ))}
                  </ul>
                </div>
              </div>
              <div
                className="conversations-form"
                style={{
                  padding: 9,
                  backgroundColor: "white",
                  border: "1px solid rgba(0,0,0,.2)",
                }}
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
                        onChange={(e: any) => setMessageType(e.target.value)}
                      >
                        <option value="0">{getAll("Plain_text")}</option>
                        <option value="1">{getAll("Instructions")}</option>
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
                        onKeyDown={() => {
                          clearTimeout(testTime);
                        }}
                        onKeyUp={() => {
                          setMessageErrors({});
                          testTime = setTimeout(() => detectLang(), 3000);
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
                        onChange={(e: any) => setMessage(e.target.value)}
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
                        <p className="text">{messageErrors.message[0]}</p>
                      </motion.div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
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
Conversation.getLayout = function getLayout(page: any): ReactElement {
  return <Layout>{page}</Layout>;
};
export default Conversation;
Conversation.getInitialProps = async ({ query }) => {
  return { query };
};
Conversation.propTypes = {
  query: PropTypes.any,
};
