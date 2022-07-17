import React, { ReactElement, useEffect, useState } from "react";
import Link from "next/link";
import { Field, Form, Formik } from "formik";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { MetaTags } from "@/components/SEO/MetaTags";
import API from "../../config";
import { Alert } from "@/components/Alert/Alert";
import { LanguageContext } from "../../contexts/languageContext/context";
import { useContext } from "react";

const { getSectionLanguage } = useContext(LanguageContext);
const getAll = getSectionLanguage("all");
const getLogin = getSectionLanguage("login");
const Login = (): ReactElement => {
  // The router object used for redirecting after login.
  const router = useRouter();
  // Redirect to user home route if user is authenticated.
  const token = Cookies.get("token_dash");
  const [validationsErrors, setValidationsErrors]: any = useState({});
  const [validationsGeneral, setValidationsGeneral]: any = useState({});
  function setValidationsErrorsHandle() {
    setValidationsErrors({});
    setValidationsGeneral({});
  }
  useEffect(() => {
    if (token) {
      router.push("/tw-admin");
      return;
    }
  }, [token]);
  // Return statement.
  return (
    <>
      <MetaTags
        title={getAll("Log_in")}
        metaDescription={getLogin("Home")}
        ogDescription={getLogin("Home")}
      />
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={async (values) => {
          setValidationsErrors({});
          setValidationsGeneral({});
          try {
            const res = await API.post("dashboard/login", values);
            // Authentication was successful.
            if (res.status === 200) {
              Cookies.set("token_dash", res.data.data);
              router.push("/tw-admin");
            }
          } catch (error: any) {
            if (
              error.response &&
              error.response.data &&
              error.response.data.errors
            ) {
              setValidationsErrors(error.response.data.errors);
            }
            if (error.response && error.response.data) {
              setValidationsGeneral(error.response.data);
            }
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="row justify-content-md-center">
              <div className="col-lg-5 p-0">
                <div className="login-panel">
                  {validationsGeneral.msg && (
                    <Alert type="error">{validationsGeneral.msg}</Alert>
                  )}
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
                    <div className="page-header">
                      <h1 className="title">{getLogin("Log_in")}</h1>
                    </div>
                    <div className="timlands-form">
                      <label className="label-block" htmlFor="email">
                        {getLogin("E_mail")}
                      </label>
                      <Field
                        id="email"
                        onKeyUp={setValidationsErrorsHandle}
                        name="email"
                        placeholder={getLogin("E_mail")}
                        className={
                          "timlands-inputs " +
                          (validationsErrors &&
                            validationsErrors.password &&
                            " has-error")
                        }
                      />
                      {validationsErrors && validationsErrors.email && (
                        <div style={{ overflow: "hidden" }}>
                          <motion.div
                            initial={{ y: -70, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="timlands-form-note form-note-error"
                          >
                            <p className="text">{validationsErrors.email[0]}</p>
                          </motion.div>
                        </div>
                      )}
                    </div>
                    <div className="timlands-form">
                      <label className="label-block" htmlFor="password">
                        {getLogin("Password")}
                      </label>
                      <Field
                        type="password"
                        onKeyUp={setValidationsErrorsHandle}
                        id="password"
                        name="password"
                        placeholder={getLogin("Password")}
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
                    <div className="panel-modal-footer">
                      <div className="d-flex">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="btn me-auto butt-primary butt-md"
                        >
                          {getAll("Log_in")}
                        </button>
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

export default Login;
