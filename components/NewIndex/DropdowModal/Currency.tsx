import { Space } from 'antd'
import React, { ReactElement } from 'react'
import PropTypes from "prop-types";
import { motion } from "framer-motion";
function Currency({ setIsConfirmText }): ReactElement {
  return (
    <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className='modal-conferm'>
      <div className="modal-conferm-inner">
        <div className="modal-conferm-head">
          <h3 className="title">
            اختيار عملة الموقع
          </h3>
        </div>
        <div className="modal-conferm-body">
          <ul className="new-drop-check currency-list">
              <li>
                  <button className='checked-item-button'>
                    USD الدولار الأمريكي
                  </button>
              </li>
              <li>
                  <button className='checked-item-button checked'>
                    EUR اليورو
                  </button>
              </li>
              <li>
                  <button className='checked-item-button'>
                  TRY الليرة التركية
                  </button>
              </li>
              <li>
                  <button className='checked-item-button'>
                  GBP الجنيه الإسترليني
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

export default Currency
Currency.propTypes = {
  setIsConfirmText: PropTypes.func,
};