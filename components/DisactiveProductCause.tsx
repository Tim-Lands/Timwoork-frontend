import { Space } from "antd";
import React, { ReactElement, useContext } from "react";
import PropTypes from "prop-types";
import { LanguageContext } from "../contexts/languageContext/context";

import { motion } from "framer-motion";

function DisactiveProductCause({
  setIsConfirmText,
  handleFunc,
  title,
  msg,
  setMsg,
}): ReactElement {
  const { getSectionLanguage } = useContext(LanguageContext);
  const getAll = getSectionLanguage();
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
          <div className="timlands-form">
            <label className="label-block" htmlFor="input-msg">
              سبب التعطيل
            </label>
            <textarea
              id="input-msg"
              name="msg"
              placeholder="سبب التعطيل..."
              className={"timlands-inputs"}
              onChange={(e) => setMsg(e.target.value)}
              value={msg}
              style={{ minHeight: 120 }}
            />
          </div>
        </div>

        <div className="modal-conferm-footer">
          <Space>
            <button
              className="btn butt-sm butt-green"
              onClick={() => handleFunc({ message: msg })}
            >
              تعطيل الآن
            </button>
            <button
              className="btn butt-sm butt-red-text"
              onClick={() => setIsConfirmText(false)}
            >
              {getAll("Cancel")}
            </button>
          </Space>
        </div>
      </div>
    </motion.div>
  );
}

export default DisactiveProductCause;
DisactiveProductCause.propTypes = {
  setIsConfirmText: PropTypes.func,
  handleChange: PropTypes.func,
  setMsg: PropTypes.func,
  msg: PropTypes.string,
  title: PropTypes.string,
  handleFunc: PropTypes.func,
};
