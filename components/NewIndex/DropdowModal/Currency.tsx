import { Space } from 'antd'
import React, { ReactElement } from 'react'
import PropTypes from "prop-types";
import { motion } from "framer-motion";
function Currency({ setIsConfirmText, currencies }): ReactElement {
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
            {currencies?.map(currency => <li key={currency.id}>
              <button className='checked-item-button'>
                {currency.name + "   :"}{currency.symbol}
              </button>
            </li>)}

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
  currencies: PropTypes.any
};