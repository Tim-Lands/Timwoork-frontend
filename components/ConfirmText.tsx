import { Space } from 'antd'
import React, { ReactElement, useRef } from 'react'
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { Input } from 'antd';

const { TextArea } = Input;
function ConfirmText({ setIsConfirmText, text, handleFunc }): ReactElement {
    const comment = useRef('لا يوجد سبب بعينه')

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
                    <p>برجاء توضيح سبب الحذف</p>
                    <TextArea onChange={e => comment.current = e.target.value} />
                </div>


                <div className="modal-conferm-footer">
                    <Space>
                        <button className='btn butt-sm butt-green' onClick={() => handleFunc({ comment: comment.current })}>نعم</button>
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