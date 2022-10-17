import { Space } from "antd";
import React, { ReactElement } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { useAppSelector } from "@/store/hooks";

function DeleteConfirm({ setIsDeleteModal }): ReactElement {
  const { getAll } = useAppSelector((state) => state.languages);

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
          <p className="text">{getAll("Do_you_really")}</p>
        </div>
        <div className="modal-conferm-footer">
          <Space>
            <button
              className="btn butt-sm butt-green"
              onClick={() => console.log("jhkjfh")}
            >
              {getAll("Yes")}
            </button>
            <button
              className="btn butt-sm butt-red-text"
              onClick={() => setIsDeleteModal(false)}
            >
              لا
            </button>
          </Space>
        </div>
      </div>
    </motion.div>
  );
}

export default DeleteConfirm;
DeleteConfirm.propTypes = {
  setIsDeleteModal: PropTypes.func,
};
