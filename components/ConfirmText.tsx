import { Space } from 'antd'
import React, { ReactElement } from 'react'
import PropTypes from "prop-types";
import { motion } from "framer-motion";

function ConfirmText({ setIsConfirmText, text, handleFunc }): ReactElement {
    return (
        <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className='modal-conferm'>
            <div className="modal-conferm-inner">
                <div className="modal-conferm-head">
                    <h3 className="title">
                        رسالة تأكيد
                    </h3>
                </div>
                <div className="modal-conferm-body">
                    <p className="text">
                        {text}
                    </p>
                </div>
                <div className="modal-conferm-footer">
                    <Space>
                        <button className='btn butt-sm butt-green' onClick={handleFunc}>نعم</button>
                        <button className='btn butt-sm butt-red-text' onClick={() => setIsConfirmText(false)}>لا</button>
                    </Space>
                </div>
            </div>
        </motion.div>
    )
}

export default ConfirmText
ConfirmText.propTypes = {
    setIsConfirmText: PropTypes.func,
    text: PropTypes.string,
    handleFunc: PropTypes.func,
};