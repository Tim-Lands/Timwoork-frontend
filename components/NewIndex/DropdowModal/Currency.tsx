import { Space } from "antd";
import React, { ReactElement } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { useAppSelector } from "@/store/hooks";

function Currency({ setIsConfirmText, currencies }): ReactElement {
  const { getAll } = useAppSelector((state) => state.languages);

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="modal-conferm"
    >
      <div className="modal-conferm-inner">
        <div className="modal-conferm-head">
          <h3 className="title">{getAll("Choose_the_currency")}</h3>
        </div>
        <div className="modal-conferm-body">
          <ul className="new-drop-check currency-list">
            {currencies?.map((currency) => (
              <li key={currency.id}>
                <button className="checked-item-button">
                  {currency.name + "   :"}
                  {currency.symbol}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="modal-conferm-footer">
          <Space>
            <button className="btn butt-md butt-green" type="submit">
              {getAll("Choose")}
            </button>
            <button
              className="btn butt-sm butt-red-text"
              type="button"
              onClick={() => setIsConfirmText(false)}
            >
              {getAll("Cancel")}
            </button>
          </Space>
        </div>
      </div>
    </motion.div>
  );
}

export default Currency;
Currency.propTypes = {
  setIsConfirmText: PropTypes.func,
  currencies: PropTypes.any,
};
