import { Space } from "antd";
import { motion } from "framer-motion";
import React, { ReactElement, useState } from "react";
import PropTypes from "prop-types";
import { LanguageContext } from "../../../contexts/languageContext/context";
import { useContext } from "react";

function FormModal({ setIsConfirmText, onSubmit }): ReactElement {
  const [subtitle, setSubtitle] = useState('')
  const { getSectionLanguage } = useContext(LanguageContext);
  const getAll = getSectionLanguage("all");
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="modal-conferm"
    >
      <div className="modal-conferm-inner">
        <div className="modal-conferm-head">
          <h3 className="title">إضافة حقل لغة جديد</h3>
        </div>
        <div className="modal-conferm-body">
          <div className="timlands-form">
            <label className="label-block" htmlFor="input-title">
              {getAll("Service_title")}
            </label>
            <input
              id="input-title"
              name="title"
              placeholder={getAll("Service_title")}
              className={"timlands-inputs "}
              value={subtitle}
              onChange={e => setSubtitle(e.target.value)}
            />
          </div>
        </div>

        <div className="modal-conferm-footer">
          <Space>
            <button className="btn butt-md butt-green" type="button"
              onClick={() => {
                onSubmit(subtitle)
                setIsConfirmText(false)
              }}>
              {getAll("Choose")}

              اختيار
            </button>
            <button
              className="btn butt-sm butt-red-text"
              type="button"
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

export default FormModal;
FormModal.propTypes = {
  setIsConfirmText: PropTypes.func,
  onSubmit: PropTypes.func
};
