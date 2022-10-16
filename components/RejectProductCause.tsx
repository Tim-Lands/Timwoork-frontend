import { Space } from "antd";
import React, { ReactElement, useState } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { useAppSelector } from "@/store/hooks";
function RejectProductCause({
  setIsConfirmText,
  text,
  handleFunc,
  title,
}): ReactElement {
  const { getAll } = useAppSelector((state) => state.languages);
  const [msg, setMsg] = useState("");
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
              {getAll("Rejection_reason")}
            </label>
            <textarea
              id="input-msg"
              name="msg"
              placeholder={getAll("Rejection_reason")}
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
              onClick={() => handleFunc({ cause: msg })}
            >
              {getAll("Reject_now")}
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

export default RejectProductCause;
RejectProductCause.propTypes = {
  setIsConfirmText: PropTypes.func,
  handleChange: PropTypes.func,
  setMsg: PropTypes.func,
  msg: PropTypes.string,
  text: PropTypes.string,
  title: PropTypes.string,
  handleFunc: PropTypes.func,
};
