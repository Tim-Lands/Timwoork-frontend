import { Space } from 'antd'
import React, { ReactElement } from 'react'
import PropTypes from "prop-types";
import { motion } from "framer-motion";
function EditModal({ setIsConfirmText, text, handleFunc, title, handleChange, msgValues }): ReactElement {
    return (
        <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className='modal-conferm'>
            <div className="modal-conferm-inner">
                <div className="modal-conferm-head">
                    <h3 className="title">
                        {title}
                    </h3>
                </div>
                <div className="modal-conferm-body">
                    {text &&
                        <p className="text">
                            {text}
                        </p>
                    }
                    <div className="timlands-form">
                        <label className="label-block" htmlFor="input-msg">
                            نص الرسالة
                        </label>
                        <textarea
                            id="input-msg"
                            name="msg"
                            placeholder="نص الرسالة..."
                            className={"timlands-inputs"}
                            onChange={handleChange}
                            value={msgValues}
                            style={{ minHeight: 120 }}
                        />
                    </div>
                </div>

                <div className="modal-conferm-footer">
                    <Space>
                        <button className='btn butt-sm butt-green' onClick={() => handleFunc()}>تحديث المعلومات</button>
                        <button className='btn butt-sm butt-red-text' onClick={() => setIsConfirmText(false)}>إلغاء الأمر</button>
                    </Space>
                </div>
            </div>
        </motion.div>
    )
}

export default EditModal
EditModal.propTypes = {
    setIsConfirmText: PropTypes.func,
    handleChange: PropTypes.func,
    msgValues: PropTypes.string,
    text: PropTypes.string,
    title: PropTypes.string,
    handleFunc: PropTypes.func,
};