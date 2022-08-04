import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { Spin } from "antd";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import { LanguageContext } from "../contexts/languageContext/context";
import { useContext } from "react";
function SuspensionPermanent({
  setIsShowSuspensionPermanent,
  id,
  onSuspend,
}: any) {
  const { getSectionLanguage } = useContext(LanguageContext);
  const getAll = getSectionLanguage();
  let token = Cookies.get("token");
  if (!token && typeof window !== "undefined")
    token = localStorage.getItem("token");

  const formik = useFormik({
    initialValues: {
      cause: "",
      susponds: [],
    },
    isInitialValid: true,
    enableReinitialize: true,
    onSubmit: async (values) => {
      onSuspend({ comment: values.cause });
      setIsShowSuspensionPermanent(false);
    },
  });
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
            {id}
          </h4>
          <button
            className="btn-close"
            type="button"
            onClick={() => setIsShowSuspensionPermanent(false)}
          ></button>
        </div>

        <div className="modal-body">
          <Spin spinning={formik.isSubmitting}>
            <form onSubmit={formik.handleSubmit}>
              <div className="timlands-form" style={{ marginTop: -17 }}>
                <label
                  htmlFor="input-cause"
                  style={{ fontSize: 13, fontWeight: "bold", marginBottom: 10 }}
                  className="form-text"
                >
                  {getAll("Write_the_reason")}
                </label>
                <div className="relative-form d-flex">
                  <textarea
                    id="input-cause"
                    name="cause"
                    placeholder={getAll("Write_the_reason") + "..."}
                    className={"timlands-inputs"}
                    value={formik.values.cause}
                    style={{ minHeight: 130 }}
                    onChange={formik.handleChange}
                  />
                </div>
              </div>
              <div
                className="sus-options-inner"
                style={{ overflowY: "scroll", height: 190 }}
              >
                <div className="sus-options">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="susponds"
                      onChange={formik.handleChange}
                      value="1"
                      checked={true}
                      disabled={true}
                      id="suspond-1"
                    />
                    <label className="form-check-label" htmlFor="suspond-1">
                      {getAll("Stop_purchases")}
                    </label>
                  </div>
                </div>
                <div className="sus-options">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="susponds"
                      onChange={formik.handleChange}
                      value="2"
                      checked={true}
                      disabled={true}
                      id="suspond-2"
                    />
                    <label className="form-check-label" htmlFor="suspond-2">
                      {getAll("Stop_Selling_operations")}
                    </label>
                  </div>
                </div>
                <div className="sus-options">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="susponds"
                      onChange={formik.handleChange}
                      value="3"
                      checked={true}
                      disabled={true}
                      id="suspond-3"
                    />
                    <label className="form-check-label" htmlFor="suspond-3">
                      {getAll("Stop_conversations")}
                    </label>
                  </div>
                </div>
                <div className="sus-options">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="susponds"
                      onChange={formik.handleChange}
                      value="4"
                      checked={true}
                      disabled={true}
                      id="suspond-4"
                    />
                    <label className="form-check-label" htmlFor="suspond-4">
                      {getAll("Stop_delivery")}
                    </label>
                  </div>
                </div>
                <div className="sus-options">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="susponds"
                      onChange={formik.handleChange}
                      value="5"
                      checked={true}
                      disabled={true}
                      id="suspond-5"
                    />
                    <label className="form-check-label" htmlFor="suspond-5">
                      {getAll("Stop_adding_services")}
                    </label>
                  </div>
                </div>
                <div className="sus-options">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="susponds"
                      onChange={formik.handleChange}
                      value="6"
                      checked={true}
                      disabled={true}
                      id="suspond-6"
                    />
                    <label className="form-check-label" htmlFor="suspond-6">
                      {getAll("Stop_displaying_services")}
                    </label>
                  </div>
                </div>
                <div className="sus-options">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="susponds"
                      onChange={formik.handleChange}
                      value="7"
                      checked={true}
                      disabled={true}
                      id="suspond-7"
                    />
                    <label className="form-check-label" htmlFor="suspond-7">
                      {getAll("Stop_editing_services")}
                    </label>
                  </div>
                </div>
                <div className="sus-options">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="susponds"
                      onChange={formik.handleChange}
                      value="8"
                      checked={true}
                      disabled={true}
                      id="suspond-8"
                    />
                    <label className="form-check-label" htmlFor="suspond-8">
                      {getAll("Stop_deleting_services")}
                    </label>
                  </div>
                </div>
                <div className="sus-options">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="susponds"
                      onChange={formik.handleChange}
                      value="9"
                      checked={true}
                      disabled={true}
                      id="suspond-9"
                    />
                    <label className="form-check-label" htmlFor="suspond-9">
                      {getAll("Stop_withdrawing_balances")}
                    </label>
                  </div>
                </div>
                <div className="sus-options">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="susponds"
                      onChange={formik.handleChange}
                      value="10"
                      checked={true}
                      disabled={true}
                      id="suspond-10"
                    />
                    <label className="form-check-label" htmlFor="suspond-10">
                      {getAll("Stop_changing_the")}
                    </label>
                  </div>
                </div>
                <div className="sus-options">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="susponds"
                      onChange={formik.handleChange}
                      value="11"
                      id="suspond-11"
                    />
                    <label className="form-check-label" htmlFor="suspond-11">
                      {getAll("Stop_signing_in")}
                    </label>
                  </div>
                </div>
              </div>
              <hr />
              <button className="btn butt-primary butt-sm mx-1" type="submit">
                {getAll("Account_suspension")}
              </button>
              <button
                className="btn butt-red-text butt-sm mx-1"
                onClick={() => setIsShowSuspensionPermanent(false)}
                type="button"
              >
                {getAll("Cancel_2")}
              </button>
            </form>
          </Spin>
        </div>
      </motion.div>
    </div>
  );
}

SuspensionPermanent.propTypes = {
  id: PropTypes.any,
  setIsShowSuspensionPermanent: PropTypes.func,
  refreshData: PropTypes.func,
  onSuspend: PropTypes.func,
};

export default SuspensionPermanent;
