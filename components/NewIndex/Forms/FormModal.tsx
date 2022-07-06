import { Space } from "antd";
import { motion } from "framer-motion";
import React, { ReactElement } from "react";
import PropTypes from "prop-types";

function FormModal({ setIsConfirmText }): ReactElement {
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
              عنوان الخدمة
            </label>
            <input
              id="input-title"
              name="title"
              placeholder="عنوان الخدمة..."
              className={"timlands-inputs "}
            />
          </div>
        </div>

        <div className="modal-conferm-footer">
          <Space>
            <button className="btn butt-md butt-green" type="submit">
              اختيار
            </button>
            <button
              className="btn butt-sm butt-red-text"
              type="button"
              onClick={() => setIsConfirmText(false)}
            >
              إلغاء الأمر
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
};
