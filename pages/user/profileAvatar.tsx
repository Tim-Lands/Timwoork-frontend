import React, { ReactElement } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Link from "next/link";
import Cookies from "js-cookie";
import { Formik } from "formik";
import * as Yup from "yup";
import API from "../../config";
import { motion } from "framer-motion";
import withAuth from "../../services/withAuth";
import { message } from "antd";
import "antd/dist/antd.min.css";
import useSWR from "swr";
import { LanguageContext } from "../../contexts/languageContext/context";
import { useContext } from "react";

const profileAvatar = (): ReactElement => {
  const { data: userInfo }: any = useSWR("api/me");

  // Redirect to user home route if user is authenticated.
  const SignupSchema = Yup.object().shape({
    avatar: Yup.mixed().required(),
  });
  const { getSectionLanguage } = useContext(LanguageContext);
  const getLanguage = getSectionLanguage("all");
  const getLogin = getSectionLanguage("login");
  // Return statement.
  return (
    <>
      {userInfo && userInfo.profile && (
        <Formik
          isInitialValid={true}
          initialValues={{
            avatar:
              "https://api.timwoork.com/avatars/" +
                userInfo.profile.avatar_path || null,
          }}
          validationSchema={SignupSchema}
          onSubmit={async (values) => {
            try {
              const dataform = new FormData();
              dataform.append("avatar", values.avatar);

              let token = Cookies.get("token");
              if (!token && typeof window !== "undefined")
                token = localStorage.getItem("token");
              const res = await API.post("api/profiles/step_two", dataform, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              // Authentication was successful.
              if (res.status === 200) {
                message.success(getLogin("The_update_has"));
              }
            } catch (error: any) {
              if (error.response && error.response.status === 200) {
                message.success(getLogin("The_update_has"));
              }
              if (error.response && error.response.status === 422) {
                message.error(getLanguage("Please_fill_in"));
              }
              if (error.response && error.response.status === 419) {
                message.error(getLogin("Operation_failed"));
              }
              if (error.response && error.response.status === 400) {
                message.error(getLogin("An_error_occurred"));
              } else {
                message.error(getLogin("An_unexpected_error"));
              }
            }
          }}
        >
          {({
            errors,
            touched,
            isSubmitting,
            handleSubmit,
            setFieldValue,
            values,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-lg-6 p-0">
                  <div className="login-image">
                    <div className="timwoork-logo">
                      <Link href="/">
                        <a>
                          <img src="/logo4.png" alt="" />
                        </a>
                      </Link>
                    </div>
                    <h1 className="login-title">
                      {getLogin("Update_profile_picture")}
                    </h1>
                    <h3 className="login-text">{getLogin("This_text_is")}</h3>
                  </div>
                </div>
                <div className="col-lg-6 p-0">
                  <div className="login-panel">
                    <div
                      className={
                        "panel-modal-body login-panel-body auto-height" +
                        (isSubmitting ? " is-loading" : "")
                      }
                    >
                      {!isSubmitting ? (
                        ""
                      ) : (
                        <motion.div
                          initial={{ opacity: 0, y: 50 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="is-loading"
                        >
                          <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        </motion.div>
                      )}
                      <div className="row">
                        <div className="col-md-12 align-center">
                          <img
                            src={values.avatar}
                            className="circular-img huge2-size"
                            alt=""
                          />
                          <div className="timlands-form">
                            <label className="label-block" htmlFor="avatar">
                              {getLogin("Choose_profile_picture")}
                            </label>
                            <input
                              id="avatar"
                              name="avatar"
                              type="file"
                              onChange={(event) => {
                                setFieldValue(
                                  "avatar",
                                  event.currentTarget.files[0]
                                );
                              }}
                              className="form-control"
                            />
                            {errors.avatar && touched.avatar ? (
                              <div style={{ overflow: "hidden" }}>
                                <motion.div
                                  initial={{ y: -70, opacity: 0 }}
                                  animate={{ y: 0, opacity: 1 }}
                                  className="timlands-form-note form-note-error"
                                >
                                  <p className="text">{errors.avatar}</p>
                                </motion.div>
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                      <div className="panel-modal-footer">
                        <div className="d-flex">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn me-auto butt-primary butt-md"
                          >
                            {getLogin("Update_basic_information")}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )}
        </Formik>
      )}
    </>
  );
};

// Map redux states to local component props.
const mapStateToProps = (state: any) => ({
  isAuthenticated: state.auth.isAuthenticated,
  userInfo: state.auth.user,
});

// Define PropTypes.
profileAvatar.propTypes = {
  props: PropTypes.object,
};

export default connect(mapStateToProps, {})(withAuth(profileAvatar));
