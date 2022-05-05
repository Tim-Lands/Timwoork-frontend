import { Space } from 'antd'
import React, { ReactElement } from 'react'
import PropTypes from "prop-types";
import { motion } from "framer-motion";

function LogoutModal({ setIsLogoutModal }): ReactElement {
    return (
        <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className='modal-conferm'>
            <div className="modal-conferm-head">
                <h3 className="title">
                    رسالة تأكيد
                </h3>
            </div>
            <div className="modal-conferm-body">
                <p className="text">
                    هل أنت متأكد من أنك تريد تسجيل الخروج من جميع الأجهزة؟
                </p>
            </div>
            <div className="modal-conferm-footer">
                <Space>
                    <button className='btn butt-sm butt-green'>نعم</button>
                    <button className='btn butt-sm butt-red-text' onClick={() => setIsLogoutModal(false)}>لا</button>
                </Space>
            </div>
        </motion.div>
    )
}

export default LogoutModal
LogoutModal.propTypes = {
    setIsLogoutModal: PropTypes.func,
};