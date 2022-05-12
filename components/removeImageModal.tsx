import { Space } from 'antd'
import React, { ReactElement } from 'react'
import PropTypes from "prop-types";
import { motion } from "framer-motion";

function RemoveImageModal({ setIsRemoveModal,onSubmit, image_id, index }): ReactElement {
    
    return (
        <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className='modal-conferm'>
            <div className="modal-conferm-head">
                <h3 className="title">
                    رسالة تأكيد
                </h3>
            </div>
            <div className="modal-conferm-body">
                <p className="text">
                    هل أنت متأكد أنك تريد مسح الصورة ؟
                </p>
            </div>
            <div className="modal-conferm-footer">
                <Space>
                    <button className='btn butt-sm butt-green' onClick={()=>onSubmit(image_id, index)}>نعم</button>
                    <button className='btn butt-sm butt-red-text' onClick={() => setIsRemoveModal(false)}>لا</button>
                </Space>
            </div>
        </motion.div>
    )
}

export default RemoveImageModal
RemoveImageModal.propTypes = {
    setIsRemoveModal: PropTypes.func,
    product_id:PropTypes.number,
    image_id:PropTypes.number,
    onSubmit:PropTypes.func,
    index:PropTypes.number
};