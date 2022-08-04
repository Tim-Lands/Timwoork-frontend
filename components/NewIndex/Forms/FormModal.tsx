import { Space } from "antd";
import { motion } from "framer-motion";
import React, { ReactElement, useState } from "react";
import PropTypes from "prop-types";
import { LanguageContext } from "../../../contexts/languageContext/context";
import { useContext } from "react";
import { Switch } from "antd";
function FormModal({
  setIsConfirmText,
  onSubmit,
  onSwitch,
  isSwitchChecked,
  defaultValue,
}): ReactElement {
  const [subtitle, setSubtitle] = useState(defaultValue);
  const { getSectionLanguage } = useContext(LanguageContext);
  const getAll = getSectionLanguage();
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="modal-conferm lg"
    >
      <div className="modal-conferm-inner">
        <div className="modal-conferm-head flex-center">
          <h3 className="title me-auto">إضافة حقل لغة جديد</h3>
          <div className="ml-auto">
            <Switch
              onChange={onSwitch}
              checkedChildren="ترجمة تلقائية"
              unCheckedChildren="ترجمة يدوية"
              checked={isSwitchChecked}
            />
          </div>
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
              onChange={(e) => setSubtitle(e.target.value)}
              disabled={isSwitchChecked}
            />
          </div>
        </div>

        <div className="modal-conferm-footer">
          <Space>
            <button
              className="btn butt-md butt-green"
              type="button"
              onClick={() => {
                onSubmit(subtitle);
                setIsConfirmText(false);
              }}
            >
              {getAll("Choose")}
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
  onSubmit: PropTypes.func,
  onSwitch: PropTypes.func,
  isSwitchChecked: PropTypes.bool,
  defaultValue: PropTypes.string,
};
