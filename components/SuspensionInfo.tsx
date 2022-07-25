import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { LanguageContext } from "../contexts/languageContext/context";
import { useContext } from "react";
function SuspensionInfo({ setIsShowSuspensionInfo, user }: any) {
  const { getSectionLanguage } = useContext(LanguageContext);
  const getLog = getSectionLanguage("login");
  return (
    <div className="single-comments-overlay">
      <motion.div
        initial={{ scale: 0, opacity: 0, y: 60 }}
        exit={{ scale: 0, opacity: 0, y: 60 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="single-comments-modal"
      >
        <div className="modal-title">
          <h4 className="title">
            {getLog("Suspension_of_the")}
            {user.id}
          </h4>
          <button
            className="btn-close"
            type="button"
            onClick={() => setIsShowSuspensionInfo(false)}
          ></button>
        </div>

        <div className="modal-body">
          <h4 className="title-modal">{getLog("Suspension_reason")}</h4>
          <p className="cause-text">{user.bans[0].comment}</p>
          <h4 className="title-modal">{getLog("Suspension_duration")}</h4>
          <p className="delay-text">
            {user.bans[0].expired_at} {getLog("Day")}
          </p>
          <h4 className="title-modal">{getLog("Tasks_suspended")}</h4>
          <div className="sus-list-inner">
            <ul className="sus-list">
              <li className="sus-item">{getLog("All_tasks")}</li>
            </ul>
          </div>
          <hr />
          <button
            onClick={() => setIsShowSuspensionInfo(false)}
            className="btn butt-light butt-sm mx-1"
            type="submit"
          >
            {getLog("Cancel_2")}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

SuspensionInfo.propTypes = {
  id: PropTypes.any,
  setIsShowSuspensionInfo: PropTypes.func,
  user: PropTypes.object,
};

export default SuspensionInfo;
