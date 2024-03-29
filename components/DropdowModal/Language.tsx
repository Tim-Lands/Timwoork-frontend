import { Space } from "antd";
import React, { ReactElement } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { LanguagesActions } from "@/store/languages/languagesActions";

function Language({ setIsConfirmText }): ReactElement {
  const { getAll, language } = useAppSelector((state) => state.languages);
  const dispatch = useAppDispatch();

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="modal-conferm"
    >
      <div className="modal-conferm-inner">
        <div className="modal-conferm-head">
          <h3 className="title">{getAll("Choose_the_website’s")}</h3>
        </div>
        <div className="modal-conferm-body">
          <ul className="new-drop-check language-list">
            <li>
              <button
                className={`checked-item-button ${
                  language === "ar" ? " checked" : ""
                }`}
                onClick={() => dispatch(LanguagesActions.setLanguage("ar"))}
              >
                العربية
              </button>
            </li>
            <li>
              <button
                className={`checked-item-button ${
                  language === "en" ? " checked" : ""
                }`}
                onClick={() => dispatch(LanguagesActions.setLanguage("en"))}
              >
                English
              </button>
            </li>
            <li>
              <button
                className={`checked-item-button ${
                  language === "fr" ? " checked" : ""
                }`}
                onClick={() => dispatch(LanguagesActions.setLanguage("fr"))}
              >
                French
              </button>
            </li>
          </ul>
        </div>

        <div className="modal-conferm-footer">
          <Space>
            <button
              className="btn butt-md butt-green"
              onClick={() => setIsConfirmText(false)}
            >
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

export default Language;
Language.propTypes = {
  setIsConfirmText: PropTypes.func,
};
