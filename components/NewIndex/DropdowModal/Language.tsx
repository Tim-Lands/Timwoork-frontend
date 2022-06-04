import { Space } from 'antd'
import React, { ReactElement } from 'react'
import PropTypes from "prop-types";
import { motion } from "framer-motion";
function Language({ setIsConfirmText }): ReactElement {
  return (
    <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className='modal-conferm'>
      <div className="modal-conferm-inner">
        <div className="modal-conferm-head">
          <h3 className="title">
            اختيار لغة الموقع
          </h3>
        </div>
        <div className="modal-conferm-body">
          <ul className="new-drop-check language-list">
              <li>
                  <button className='checked-item-button'>
                    العربية
                  </button>
              </li>
              <li>
                  <button className='checked-item-button checked'>
                    الإنجليزية
                  </button>
              </li>
              <li>
                  <button className='checked-item-button'>
                    الفرنسية
                  </button>
              </li>
              <li>
                  <button className='checked-item-button'>
                    التركية
                  </button>
              </li>
          </ul>
        </div>

        <div className="modal-conferm-footer">
          <Space>
            <button className='btn butt-md butt-green' type='submit'>اختيار</button>
            <button className='btn butt-sm butt-red-text' type='button' onClick={() => setIsConfirmText(false)}>إلغاء الأمر</button>
          </Space>
        </div>
      </div>
    </motion.div>
  )
}

export default Language
Language.propTypes = {
  setIsConfirmText: PropTypes.func,
};