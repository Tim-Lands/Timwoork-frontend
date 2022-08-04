import React, { ReactElement, useEffect, useState } from "react";
import Link from "next/link";
import API from "../config";
import { Field, Form, Formik } from "formik";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { MetaTags } from "@/components/SEO/MetaTags";
import { GoogleLogin } from "react-google-login";
import { message } from "antd";
import { Alert } from "@/components/Alert/Alert";
import { LanguageContext } from "../contexts/languageContext/context";
import { useContext } from "react";

const clientId =
  "1055095089511-f7lip5othejakennssbrlfbjbo2t9dp0.apps.googleusercontent.com";

const Login = (): ReactElement => {
  const [passVisibled, setPassVisibled] = useState(false);
  const [validationsErrors, setValidationsErrors]: any = useState({});
  const [validationsGeneral, setValidationsGeneral]: any = useState({});
  function setValidationsErrorsHandle() {
    setValidationsErrors({});
    setValidationsGeneral({});
  }
  /* Generate username from email and random 4 numbers
   * ex. if email = roqaia.alrfou3@gmail.com & random 4 numbers= 1234
   * then the username= roqaia.alrfou31234
   */
  const generateUsername = (email: string) => {
    const result = email.indexOf("@");
    const len = email.length;
    const mystr = email.slice(result, len);
    const removeData = email.replace(mystr, "");
    const username = removeData + Math.floor(Math.random() * 100000);
    return username;
  };

  // Login with Google

  // Login with Google
  const { getSectionLanguage } = useContext(LanguageContext);
  const getAll = getSectionLanguage();
  const onLoginSuccess = async (res) => {
    setValidationsErrorsHandle();
    //أرسل هذا الريسبونس الى الباكند
    try {
      const response = await API.post("api/login/google", {
        email: res.profileObj.email,
        first_name: res.profileObj.givenName,
        last_name: res.profileObj.familyName,
        full_name: res.profileObj.name,
        avatar: res.profileObj.imageUrl,
        provider_id: res.profileObj.googleId,
        username: generateUsername(res.profileObj.email),
      });
      // Authentication was successful.
      if (response.status === 200) {
        Cookies.set("token", response.data.data.token, { expires: 365 });
        if (!Cookies.get("token") && typeof window !== "undefined") {
          localStorage.setItem("token", response.data.data.token);
        }
        // Cookies.set('username', );
        // Cookies.set('userID', )
        message.success(getAll("Logged_in_successfully"));
        switch (response.data.data.step) {
          case 0:
            router.push("/user/personalInformations");
            break;
          case 1:
            router.push("/user/personalInformations");
            break;
          case 2:
            router.push("/");
            break;
          default:
            router.push("/");
        }
      }
    } catch (error: any) {
      message.error(getAll("An_unexpected_error_occurred"));
    }
  };

  const onLoginFailure = () => {};

  // The router object used for redirecting after login.
  const router = useRouter();
  // Redirect to user home route if user is authenticated.
  let token = Cookies.get("token");
  if (!token && typeof window !== "undefined")
    token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      router.push("/");
      return;
    }
  }, [token]);

  // Return statement.
  return (
    <>
      <MetaTags
        title={getAll("Login_in")}
        metaDescription={getAll("Home")}
        ogDescription={getAll("Home")}
      />
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        onSubmit={async (values) => {
          setValidationsErrors({});
          try {
            const res = await API.post("api/login", values);
            // Authentication was successful.
            if (res.status === 200) {
              Cookies.set("token", res.data.data.token, { expires: 365 });
              Cookies.set("username", values.username);
              if (res.data.data.is_verified) {
                router.push("/");
              } else {
                router.push("/email/verification");
              }
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
              <div className="col-lg-5 p-0" style={{ maxWidth: 900 }}>
                <div className="login-panel">
                  {(validationsGeneral.msg || validationsGeneral.message) && (
                    <Alert type="error">
                      {validationsGeneral.msg || validationsGeneral.message}
                    </Alert>
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
                      <h1 className="title">{getAll("Login_in")}</h1>
                    </div>
                    <div className="timlands-form">
                      <label className="label-block" htmlFor="email">
                        {getAll("E_mail")}
                      </label>
                      <Field
                        id="email"
                        name="username"
                        onKeyUp={setValidationsErrorsHandle}
                        placeholder={getAll("E_mail")}
                        className={
                          "timlands-inputs " +
                          (validationsErrors &&
                            validationsErrors.username &&
                            " has-error")
                        }
                      />
                      {validationsErrors && validationsErrors.username && (
                        <div style={{ overflow: "hidden" }}>
                          <motion.div
                            initial={{ y: -70, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="timlands-form-note form-note-error"
                          >
                            <p className="text">
                              {validationsErrors.username[0]}
                            </p>
                          </motion.div>
                        </div>
                      )}
                    </div>
                    <div className="timlands-form">
                      <label className="label-block" htmlFor="password">
                        {getAll("Password")}
                      </label>
                      <Field
                        type={passVisibled ? "text" : "password"}
                        id="password"
                        name="password"
                        placeholder={getAll("Password")}
                        onKeyUp={setValidationsErrorsHandle}
                        className={
                          "timlands-inputs " +
                          (validationsErrors &&
                            validationsErrors.password &&
                            " has-error")
                        }
                        autoComplete="off"
                      />
                      <button
                        type="button"
                        className={
                          "timlands-form-btn" + (passVisibled ? " active" : "")
                        }
                        onClick={() => setPassVisibled(!passVisibled)}
                      >
                        {passVisibled ? (
                          <span className="material-icons material-icons-outlined">
                            visibility_off
                          </span>
                        ) : (
                          <span className="material-icons material-icons-outlined">
                            visibility
                          </span>
                        )}
                      </button>
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
                      <div className="flex-center remember-text">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="defaultCheck1"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="defaultCheck1"
                          >
                            {getAll("Remember_me")}
                          </label>
                        </div>
                        <p className="text">
                          <Link href="/user/forgetPass">
                            <a>{getAll("Forgotten_password")}</a>
                          </Link>
                        </p>
                      </div>
                    </div>
                    <div className="panel-modal-footer">
                      <div className="login-middle-footer-cont">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="btn  butt-primary butt-md"
                        >
                          {getAll("Login_in")}
                        </button>
                        <div className="footer-text">
                          <p className="text" style={{ margin: 0 }}>
                            {getAll("Have_you_already")}
                            <Link href="/register">
                              <a>{getAll("join_us")}</a>
                            </Link>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="panel-login-external">
                      <div className="login-external-header">
                        <h4 className="title">{getAll("Or_log_in")}</h4>
                      </div>
                      <ul className="login-external-links nav justify-content-center">
                        {/* <li>
                                                    <button className="ext-butt">
                                                        <i className="fab fa-facebook"></i> | فيسبووك
                                                    </button>
                                                </li> */}
                        <li>
                          <GoogleLogin
                            clientId={clientId}
                            buttonText={getAll("Google")}
                            onSuccess={onLoginSuccess}
                            onFailure={onLoginFailure}
                            cookiePolicy={"single_host_origin"}
                            //isSignedIn={true}
                            className="ext-butt"
                          />
                        </li>
                      </ul>
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
