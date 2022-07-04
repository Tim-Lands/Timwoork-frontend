import { Space } from "antd";
import React, { ReactElement } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
function DeleteConfirm({ setIsDeleteModal }): ReactElement {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="modal-conferm"
    >
      <div className="modal-conferm-inner">
        <div className="modal-conferm-head">
          <h3 className="title">رسالة تأكيد</h3>
        </div>
        <div className="modal-conferm-body">
          <p className="text">هل تريد حقا حذف معرض أعمالك؟</p>
        </div>
        <div className="modal-conferm-footer">
          <Space>
            <button
              className="btn butt-sm butt-green"
              onClick={() => console.log("jhkjfh")}
            >
              نعم
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
