import { notification, Space } from "antd";
import React, { ReactElement, useState } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import API from "../config";
import Cookies from "js-cookie";

export const MenuBar = ({ editor }: any) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="menubar">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        <span className="material-icons material-icons-outlined">
          format_bold
        </span>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        <span className="material-icons material-icons-outlined">
          format_italic
        </span>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "is-active" : ""}
      >
        <span className="material-icons material-icons-outlined">
          strikethrough_s
        </span>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
      >
        h1
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
      >
        h2
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
      >
        h3
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive("heading", { level: 4 }) ? "is-active" : ""}
      >
        h4
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "is-active" : ""}
      >
        <span className="material-icons material-icons-outlined">
          format_list_bulleted
        </span>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "is-active" : ""}
      >
        <span className="material-icons material-icons-outlined">
          format_list_numbered
        </span>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        <span className="material-icons material-icons-outlined">
          horizontal_rule
        </span>
      </button>
    </div>
  );
};
const Tiptap = ({ value, editor }: any) => {
  return (
    <EditorContent
      content={value}
      editor={editor}
      onChange={() => console.log("test")}
      style={{ minHeight: 170 }}
    />
  );
};
function ReplyContactModal({
  setIsConfirmText,
  onClose,
  title,
  user,
}): ReactElement {
  const [fromState, setFromState] = useState("");
  const [toEmail, setToEmail] = useState(user?.email);
  const [messageState, setMessageState] = useState("");
  const [subject, setSubject] = useState("");
  const [validationsErrors, setValidationsErrors]: any = useState({});
  const editor = useEditor({
    onUpdate({ editor }) {
      setMessageState(editor.getText());
    },
    extensions: [StarterKit],
    content: "stars && stars.data.buyer_instruct",
  });
  async function sendEmail() {
    console.log(messageState);
    const token = Cookies.get("token_dash");
    const res = await API.post(
      `dashboard/contacts/sent_to_client_by_email/${user.id}`,
      {
        message: messageState,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.status == 200)
      notification.open({
        message: "تم إرسال الرد بنجاح",
        type: "success",
      });

    onClose();
  }
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="modal-conferm lg"
    >
      <div className="modal-conferm-inner">
        <div className="modal-conferm-head">
          <h3 className="title" style={{ fontSize: 17 }}>
            {title}
          </h3>
        </div>
        <div className="modal-conferm-body" style={{ paddingTop: 0 }}>
          <div className="row">
            <div className="col-xl-6">
              <div className="timlands-form">
                <label className="label-block" htmlFor="input-msg">
                  من
                </label>
                <select
                  id="input-msg"
                  name="fromState"
                  placeholder="من..."
                  className={
                    "timlands-inputs sm " +
                    (validationsErrors &&
                      validationsErrors.fromState &&
                      " has-error")
                  }
                  onChange={(e) => setFromState(e.target.value)}
                  value={fromState}
                >
                  <option value="1">info@timlands.com</option>
                  <option value="1">contact@timlands.com</option>
                  <option value="1">support@timlands.com</option>
                  <option value="1">timlands@timlands.com</option>
                  <option value="1">chairman@timlands.com</option>
                  <option value="1">info@timwoork.com</option>
                  <option value="1">contact@timwoork.com</option>
                  <option value="1">support@timwoork.com</option>
                  <option value="1">timwoork@timwoork.com</option>
                  <option value="1">chairman@timwoork.com</option>
                </select>
                {validationsErrors && validationsErrors.fromState && (
                  <div style={{ overflow: "hidden" }}>
                    <motion.div
                      initial={{ y: -70, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="timlands-form-note form-note-error"
                    >
                      <p className="text">{validationsErrors.fromState[0]}</p>
                    </motion.div>
                  </div>
                )}
              </div>
            </div>
            <div className="col-xl-6">
              <div className="timlands-form">
                <label className="label-block" htmlFor="input-toState">
                  إلى
                </label>
                <input
                  type="text"
                  id="input-toState"
                  name="toState"
                  placeholder="إلى..."
                  className={
                    "timlands-inputs sm " +
                    (validationsErrors &&
                      validationsErrors.toState &&
                      " has-error")
                  }
                  onChange={(e) => setToEmail(e.target.value)}
                  value={toEmail}
                />
                {validationsErrors && validationsErrors.toState && (
                  <div style={{ overflow: "hidden" }}>
                    <motion.div
                      initial={{ y: -70, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="timlands-form-note form-note-error"
                    >
                      <p className="text">{validationsErrors.toState[0]}</p>
                    </motion.div>
                  </div>
                )}
              </div>
            </div>
            <div className="col-xl-12">
              <div className="timlands-form">
                <label className="label-block" htmlFor="input-subject">
                  موضوع الرسالة
                </label>
                <input
                  type="text"
                  id="input-subject"
                  name="subject"
                  placeholder="موضوع الرسالة..."
                  className={
                    "timlands-inputs sm " +
                    (validationsErrors &&
                      validationsErrors.subject &&
                      " has-error")
                  }
                  onChange={(e) => setSubject(e.target.value)}
                  value={subject}
                />
                {validationsErrors && validationsErrors.subject && (
                  <div style={{ overflow: "hidden" }}>
                    <motion.div
                      initial={{ y: -70, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="timlands-form-note form-note-error"
                    >
                      <p className="text">{validationsErrors.subject[0]}</p>
                    </motion.div>
                  </div>
                )}
              </div>
            </div>
            <div className="col-xl-12">
              <div className="timlands-form">
                <div className="app-content-editor">
                  <MenuBar editor={editor} />
                  <Tiptap
                    value={messageState}
                    changeHandle={(e: any) => () => {
                      console.log(e.target.value);
                      setMessageState(e.target.value);
                    }}
                    editor={editor}
                  />
                </div>
                {validationsErrors && validationsErrors.messageState && (
                  <div style={{ overflow: "hidden" }}>
                    <motion.div
                      initial={{ y: -70, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="timlands-form-note form-note-error"
                    >
                      <p className="text">
                        {validationsErrors.messageState[0]}
                      </p>
                    </motion.div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="modal-conferm-footer">
          <Space>
            <button
              className="btn butt-sm butt-green"
              onClick={() => sendEmail()}
            >
              إرسال الآن
            </button>
            <button
              className="btn butt-sm butt-red-text"
              onClick={() => {
                setIsConfirmText(false);
                setValidationsErrors(); // just Test
              }}
            >
              إلغاء الأمر
            </button>
          </Space>
        </div>
      </div>
    </motion.div>
  );
}

export default ReplyContactModal;
ReplyContactModal.propTypes = {
  setIsConfirmText: PropTypes.func,
  title: PropTypes.string,
  onClose: PropTypes.func,
  editor: PropTypes.any,
  user: PropTypes.any,
};
