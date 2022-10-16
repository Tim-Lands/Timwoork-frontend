import React, { useEffect, useState } from "react";
//  import cookies from 'next-cookies'
import API from "../../../config";
import PropTypes from "prop-types";
import { message, Result } from "antd";
import Link from "next/link";
import { motion } from "framer-motion";
import { Field, Form, Formik } from "formik";
import Loading from "@/components/Loading";
import { useAppSelector } from "@/store/hooks";

function Token({ query }) {
  const { getAll } = useAppSelector((state) => state.languages);

  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tokenError, setTokenError]: any = useState({});
  const [email, setEmail]: any = useState("");
  const [validationsErrors, setValidationsErrors]: any = useState({});
  function setValidationsErrorsHandle() {
    setValidationsErrors({});
  }
  async function verifyToken() {
    setIsError(false);
    setTokenError({});
    setIsSuccess(false);
    setIsLoading(true);
    try {
      const res = await API.post("api/password/forget/verify", {
        token: query.token,
      });
      if (res.status === 200) {
        setEmail(res.data.data.email);
        setIsError(false);
        setIsSuccess(true);
        setIsLoading(false);
        //router.push('/login')
      }
    } catch (error) {
      setIsSuccess(false);
      setIsLoading(false);
      if (error.response && error.response.data) {
        setTokenError(error.response.data);
      }
      if (error.response && error.response.status === 400) {
        setIsError(true);
      }
    }
  }
  useEffect(() => {
    verifyToken();
  }, []);
  return (
    <div>
      {isLoading && <Loading />}
      {isError && !isSuccess && (
        <Result
          status="warning"
          title={getAll("Error")}
          subTitle={tokenError && tokenError.msg && tokenError.msg}
          extra={
            <Link href="/">
              <a className="btn butt-primary butt-md">{getAll("Go_Home")}</a>
            </Link>
          }
        />
      )}
      {!isError && isSuccess && (
        <div className="row justify-content-md-center">
          <div className="col-md-6">
            <Formik
              isInitialValid={true}
              initialValues={{
                password: "",
                password_confirmation: "",
                email: email,
              }}
              //validationSchema={SignupSchema}
              onSubmit={async (values) => {
                console.log(values);
                setValidationsErrors({});
                try {
                  console.log(query);
                  const res = await API.post("api/password/forget/reset", {
                    ...values,
                    token: query.token,
                  });
                  // Authentication was successful.
                  if (res.status === 200) {
                    message.success(getAll("The_update_has"));
                    //router.push('/')
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
                  <div className="login-panel update-form my-1">
                    <div
                      className={
                        "panel-modal-body login-panel-body auto-height" +
                        (isSubmitting ? " is-loading" : "")
                      }
                    >
                      <div className="timwoork-logo">
                        <Link href="/">
                          <a>
                            <img src="/logo6.png" alt="" />
                          </a>
                        </Link>
                      </div>
                      {!isSubmitting ? (
                        ""
                      ) : (
                        <motion.div
                          initial={{ opacity: 0, y: 50 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="is-loading"
                        >
                          <div className="spinner-border" role="status">
                            <span className="visually-hidden">
                              {getAll("Loading")}
                            </span>
                          </div>
                        </motion.div>
                      )}
                      <div className="update-form-header">
                        <h1 className="title">{getAll("Reset_password")}</h1>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="timlands-form">
                            <label className="label-block" htmlFor="password">
                              {getAll("New_password")}
                            </label>
                            <Field
                              type="password"
                              id="password"
                              name="password"
                              onKeyUp={setValidationsErrorsHandle}
                              placeholder={getAll("New_password")}
                              className={
                                "timlands-inputs " +
                                (validationsErrors &&
                                  validationsErrors.password &&
                                  " has-error")
                              }
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
                        </div>
                        <div className="col-md-12">
                          <div className="timlands-form">
                            <label
                              className="label-block"
                              htmlFor="password_confirmation"
                            >
                              {getAll("Confirm_new_password")}
                            </label>
                            <Field
                              type="password"
                              id="password_confirmation"
                              name="password_confirmation"
                              onKeyUp={setValidationsErrorsHandle}
                              placeholder={getAll("Confirm_new_password")}
                              className={
                                "timlands-inputs " +
                                (validationsErrors &&
                                  validationsErrors.password_confirmation &&
                                  " has-error")
                              }
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
                                      {
                                        validationsErrors
                                          .password_confirmation[0]
                                      }
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
                            تعيين كلمة المرور
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
}

Token.getInitialProps = ({ query }) => {
  return { query };
};
Token.propTypes = {
  query: PropTypes.any,
};
export default Token;
