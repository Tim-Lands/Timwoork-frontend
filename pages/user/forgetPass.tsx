import React, { ReactElement, useState } from "react";
import { Field, Form, Formik } from "formik";
import API from "../../config";
import { motion } from "framer-motion";
import { message } from "antd";
import router from "next/router";
import Link from "next/link";
import { LanguageContext } from "../../contexts/languageContext/context";
import { useContext } from "react";

const ForgetPass = (): ReactElement => {
  const [validationsErrors, setValidationsErrors]: any = useState({});
  function setValidationsErrorsHandle() {
    setValidationsErrors({});
  }
  const { getSectionLanguage } = useContext(LanguageContext);
  const getAll = getSectionLanguage("all");
  const getLogin = getSectionLanguage("login");
  // Return statement.
  return (
    <>
      <Formik
        initialValues={{
          email: "",
        }}
        onSubmit={async (values) => {
          try {
            const res = await API.post(
              "api/password/forget/sendResetLink",
              values
            );
            // Authentication was successful.
            if (res.status === 200) {
              message.success(getLogin("The_password_reset"));
              router.push("/user/sentToken");
            }
          } catch (error: any) {
            if (
              error.response &&
              error.response.data &&
              error.response.data.errors
            ) {
              setValidationsErrors(error.response.data.errors);
            }
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="row justify-content-md-center pt-5">
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
                    <div className="timwoork-logo">
                      <Link href="/">
                        <a>
                          <img src="/logo6.png" alt="" />
                        </a>
                      </Link>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="timlands-form">
                          <label className="label-block" htmlFor="email">
                            {getLogin("Enter_your_e_mail")}
                          </label>
                          <Field
                            id="email"
                            name="email"
                            placeholder={getLogin("E_mail")}
                            onKeyUp={setValidationsErrorsHandle}
                            className={
                              "timlands-inputs " +
                              (validationsErrors &&
                                validationsErrors.email &&
                                " has-error")
                            }
                            autoComplete="off"
                          />
                          {validationsErrors && validationsErrors.email && (
                            <div style={{ overflow: "hidden" }}>
                              <motion.div
                                initial={{ y: -70, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="timlands-form-note form-note-error"
                              >
                                <p className="text">
                                  {validationsErrors.email[0]}
                                </p>
                              </motion.div>
                            </div>
                          )}
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
                          {getLogin("Recover")}
                        </button>
                        <Link href="/">
                          <a className="btn ml-auto butt-light butt-md flex-center">
                            {" "}
                            {getAll("Home")}{" "}
                            <span className="material-icons material-icons-outlined">
                              arrow_back
                            </span>
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ForgetPass;
