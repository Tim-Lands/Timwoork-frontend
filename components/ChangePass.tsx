import Layout from "@/components/Layout/HomeLayout";
import { Badge, message, Spin, Tooltip } from "antd";
import React, { ReactElement, useState, useContext } from "react";
import API from "../config";
import useSWR from "swr";
import { LanguageContext } from "../contexts/languageContext/context";
import Loading from "@/components/Loading";
import Cookies from "js-cookie";
import { Field, Form, Formik } from "formik";
import { motion } from "framer-motion";

function ChangePass() {
  const { getSectionLanguage } = useContext(LanguageContext);
  const getLog = getSectionLanguage("login");
  let token = Cookies.get("token");
  if (!token && typeof window !== "undefined")
    token = localStorage.getItem("token");
  const { data: userInfo }: any = useSWR("api/me");
  const [validationsErrors, setValidationsErrors]: any = useState({});

  function setValidationsErrorsHandle() {
    setValidationsErrors({});
  }
  return (
    <>
      {!userInfo && <Loading />}
      {userInfo && userInfo.user_details.profile && (
        <div className="timlands-profile-content my-2">
          <Formik
            initialValues={{
              old_password: "",
              password: "",
              password_confirmation: "",
            }}
            onSubmit={async (values) => {
              setValidationsErrors({});
              try {
                const res = await API.post("api/password/change", values, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                });
                // Authentication was successful.
                if (res.status === 200) {
                  message.success(getLog("The_password_has"));
                  values.old_password = "";
                  values.password_confirmation = "";
                  values.password = "";
                }
              } catch (error: any) {
                if (
                  error.response &&
                  error.response.data &&
                  error.response.data.errors
                ) {
                  setValidationsErrors(error.response.data.errors);
                }
              } //
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Spin spinning={isSubmitting}>
                  <div className="profile-content-body">
                    <div className="content-title">
                      <div className="d-flex">
                        <h3 className="title flex-center">
                          <span className="material-icons material-icons-outlined">
                            lock
                          </span>
                          تغيير كلمة المرور
                        </h3>
                      </div>
                    </div>
                    <div className="timlands-form">
                      <label className="label-block" htmlFor="old_password">
                        {getLog("Old_password")}
                      </label>
                      <Field
                        type="password"
                        id="old_password"
                        onKeyUp={setValidationsErrorsHandle}
                        name="old_password"
                        disabled={isSubmitting}
                        placeholder={getLog("Old_password")}
                        className="timlands-inputs"
                        autoComplete="off"
                      />
                      {validationsErrors && validationsErrors.old_password && (
                        <div style={{ overflow: "hidden" }}>
                          <motion.div
                            initial={{ y: -70, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="timlands-form-note form-note-error"
                          >
                            <p className="text">
                              {validationsErrors.old_password[0]}
                            </p>
                          </motion.div>
                        </div>
                      )}
                    </div>
                    <div className="timlands-form">
                      <label className="label-block" htmlFor="password">
                        {getLog("New_password")}
                        <Tooltip title="كلمة المرور يجب ان تحتوي على الاقل حرف كبير واحد وحرف صغير واحد وان يكون على الاقل 8 حروف أو أرقام.">
                          <Badge
                            style={{ color: "#52c41a " }}
                            count={
                              <span
                                style={{ color: "#52c41a", fontSize: 16 }}
                                className="material-icons"
                              >
                                info
                              </span>
                            }
                          />
                        </Tooltip>
                      </label>
                      <Field
                        type="password"
                        id="password"
                        name="password"
                        onKeyUp={setValidationsErrorsHandle}
                        disabled={isSubmitting}
                        placeholder={getLog("New_password")}
                        className="timlands-inputs"
                        autoComplete="off"
                      />
                      {validationsErrors && validationsErrors.password && (
                        <div style={{ overflow: "hidden" }}>
                          <motion.div
                            initial={{ y: -70, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="timlands-form-note form-note-error"
                          >
                            <p className="text">
                              {validationsErrors.password[0]}
                            </p>
                          </motion.div>
                        </div>
                      )}
                    </div>
                    <div className="timlands-form">
                      <label
                        className="label-block"
                        htmlFor="password_confirmation"
                      >
                        {getLog("Reset_password")}
                        <Tooltip title="كلمة المرور يجب ان تحتوي على الاقل حرف كبير واحد وحرف صغير واحد وان يكون على الاقل 8 حروف أو أرقام.">
                          <Badge
                            style={{ color: "#52c41a " }}
                            count={
                              <span
                                style={{ color: "#52c41a", fontSize: 16 }}
                                className="material-icons"
                              >
                                info
                              </span>
                            }
                          />
                        </Tooltip>
                      </label>
                      <Field
                        type="password"
                        disabled={isSubmitting}
                        onKeyUp={setValidationsErrorsHandle}
                        id="password_confirmation"
                        name="password_confirmation"
                        placeholder={getLog("Confirm_new_password")}
                        className="timlands-inputs"
                        autoComplete="off"
                      />
                      {validationsErrors &&
                        validationsErrors.password_confirmation && (
                          <div style={{ overflow: "hidden" }}>
                            <motion.div
                              initial={{ y: -70, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              className="timlands-form-note form-note-error"
                            >
                              <p className="text">
                                {validationsErrors.password_confirmation[0]}
                              </p>
                            </motion.div>
                          </div>
                        )}
                    </div>

                    <div className="panel-modal-footer">
                      <div className="d-flex">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="btn me-auto butt-primary butt-md"
                        >
                          تحديث المعلومات
                        </button>
                      </div>
                    </div>
                  </div>
                </Spin>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </>
  );
}

ChangePass.getLayout = function getLayout(page: any): ReactElement {
  return <Layout>{page}</Layout>;
};
export default ChangePass;
