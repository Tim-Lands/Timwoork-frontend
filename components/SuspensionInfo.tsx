import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { useAppSelector } from "@/store/hooks";
function SuspensionInfo({ setIsShowSuspensionInfo, user }: any) {
  const { getAll } = useAppSelector((state) => state.languages);
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
            {getAll("Suspension_of_the")}
            {user.id}
          </h4>
          <button
            className="btn-close"
            type="button"
            onClick={() => setIsShowSuspensionInfo(false)}
          ></button>
        </div>

        <div className="modal-body">
          <h4 className="title-modal">{getAll("Suspension_reason")}</h4>
          <p className="cause-text">{user.bans[0].comment}</p>
          <h4 className="title-modal">{getAll("Suspension_duration")}</h4>
          <p className="delay-text">
            {user.bans[0].expired_at} {getAll("Day")}
          </p>
          <h4 className="title-modal">{getAll("Tasks_suspended")}</h4>
          <div className="sus-list-inner">
            <ul className="sus-list">
              <li className="sus-item">{getAll("All_tasks")}</li>
            </ul>
          </div>
          <hr />
          <button
            onClick={() => setIsShowSuspensionInfo(false)}
            className="btn butt-light butt-sm mx-1"
            type="submit"
          >
            {getAll("Cancel_2")}
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
