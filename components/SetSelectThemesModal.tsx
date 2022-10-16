import React, { ReactElement } from "react";
import { useAppSelector } from "@/store/hooks";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

function SetSelectThemesModal({ setIsConfirmText, title }: any): ReactElement {
  const { getAll } = useAppSelector((state) => state.languages);
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="modal-conferm sub-modal md"
    >
      <div className="modal-conferm-inner">
        <div className="modal-conferm-head">
          <h3 className="title">{title}</h3>
        </div>
        <div className="modal-conferm-body" style={{ paddingTop: 0 }}>
          <p className="modal-note">{getAll("Please_choose_one")}</p>
          <div className="row">
            <div className="col-lg-3 col-6">
              <div className="theme-item">
                <label>
                  <input type="radio" name="test" value="big" />
                  <img src="/theme1.png" />
                </label>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="theme-item">
                <label>
                  <input type="radio" name="test" value="big2" />
                  <img src="/theme2.png" />
                </label>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="theme-item">
                <label>
                  <input type="radio" name="test" value="big" />
                  <img src="/theme1.png" />
                </label>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="theme-item">
                <label>
                  <input type="radio" name="test" value="big2" />
                  <img src="/theme2.png" />
                </label>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="theme-item">
                <label>
                  <input type="radio" name="test" value="big3" />
                  <img src="/theme3.png" />
                </label>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="theme-item">
                <label>
                  <input type="radio" name="test" value="big4" />
                  <img src="/theme4.png" />
                </label>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="theme-item">
                <label>
                  <input type="radio" name="test" value="big3" />
                  <img src="/theme3.png" />
                </label>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="theme-item">
                <label>
                  <input type="radio" name="test" value="big4" />
                  <img src="/theme4.png" />
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-conferm-footer">
          <div className="d-flex">
            <div className="me-auto">
              <button className="btn butt-sm butt-green mx-1">
                {getAll("Select_now")}
              </button>
              <button
                className="btn butt-sm butt-red-text mx-1"
                onClick={() => setIsConfirmText(false)}
              >
                {getAll("Cancel")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default SetSelectThemesModal;
SetSelectThemesModal.propTypes = {
  setIsConfirmText: PropTypes.func,
  setMsg: PropTypes.func,
  title: PropTypes.string,
};
