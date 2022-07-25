import { Space } from "antd";
import React, { ReactElement, useState, useContext } from "react";
import { LanguageContext } from "../contexts/languageContext/context";

import PropTypes from "prop-types";
import { motion } from "framer-motion";
function EditModal({
  setIsConfirmText,
  text,
  handleFunc,
  title,
  msgValues,
}): ReactElement {
  const [msg, setMsg] = useState(msgValues);
  const [reason, setReason] = useState("");
  const { getSectionLanguage } = useContext(LanguageContext);
  const getLog = getSectionLanguage("login");
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="modal-conferm"
    >
      <div className="modal-conferm-inner">
        <div className="modal-conferm-head">
          <h3 className="title">{title}</h3>
        </div>
        <div className="modal-conferm-body">
          {text && <p className="text">{text}</p>}
          <div className="timlands-form">
            <label className="label-block" htmlFor="input-msg">
              {getLog("Message_text")}
            </label>
            <textarea
              id="input-msg"
              name="msg"
              placeholder={getLog("Message_text") + "..."}
              className={"timlands-inputs"}
              onChange={(e) => setMsg(e.target.value)}
              value={msg}
              style={{ minHeight: 120, marginBottom: 15 }}
            />
            <label className="label-block" htmlFor="input-msg">
              سبب التعديل
            </label>
            <textarea
              id="input-msg"
              name="msg"
              placeholder="التعديل..."
              className={"timlands-inputs"}
              onChange={(e) => setReason(e.target.value)}
              value={reason}
              style={{ minHeight: 120 }}
            />
          </div>
        </div>

        <div className="modal-conferm-footer">
          <Space>
            <button
              className="btn butt-sm butt-green"
              onClick={() => handleFunc({ message: msg, cause: reason })}
            >
              تحديث المعلومات
            </button>
            <button
              className="btn butt-sm butt-red-text"
              onClick={() => setIsConfirmText(false)}
            >
              {getLog("Cancel")}
            </button>
          </Space>
        </div>
      </div>
    </motion.div>
  );
}

export default EditModal;
EditModal.propTypes = {
  setIsConfirmText: PropTypes.func,
  handleChange: PropTypes.func,
  msgValues: PropTypes.string,
  text: PropTypes.string,
  title: PropTypes.string,
  handleFunc: PropTypes.func,
};
