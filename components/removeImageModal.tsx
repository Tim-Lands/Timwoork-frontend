import { Space } from "antd";
import React, { ReactElement, useContext } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { LanguageContext } from "../contexts/languageContext/context";

function RemoveImageModal({
  setIsRemoveModal,
  onSubmit,
  image_id,
  index,
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
          <h3 className="title">{getAll("Confirmation_message")}</h3>
        </div>
        <div className="modal-conferm-body">
          <p className="text">{getAll("Are_sure_you")}</p>
        </div>
        <div className="modal-conferm-footer">
          <Space>
            <button
              className="btn butt-sm butt-green"
              onClick={() => onSubmit(image_id, index)}
            >
              {getAll("Yes")}
            </button>
            <button
              className="btn butt-sm butt-red-text"
              onClick={() => setIsRemoveModal(false)}
            >
              {getAll("No")}
            </button>
          </Space>
        </div>
      </div>
    </motion.div>
  );
}

export default RemoveImageModal;
RemoveImageModal.propTypes = {
  setIsRemoveModal: PropTypes.func,
  product_id: PropTypes.number,
  image_id: PropTypes.number,
  onSubmit: PropTypes.func,
  index: PropTypes.number,
};
