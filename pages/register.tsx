import React, { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import API from "../config";
import { Field, Form, Formik } from "formik";
import { motion } from "framer-motion";
import { GoogleLogin } from "react-google-login";
import Cookies from "js-cookie";
import { MetaTags } from "@/components/SEO/MetaTags";
import { Badge, message, Tooltip } from "antd";
import { LanguageContext } from "../contexts/languageContext/context";
import { useContext } from "react";

const clientId =
  "1055095089511-f7lip5othejakennssbrlfbjbo2t9dp0.apps.googleusercontent.com";
const Register = (): ReactElement => {
  const [passVisibled, setPassVisibled] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [validationsErrors, setValidationsErrors]: any = useState({});
  const [codes, setCodes] = useState([]);
  const clearValidationHandle = () => {
    setValidationsErrors({});
  };
  const { getSectionLanguage } = useContext(LanguageContext);
  const getLanguage = getSectionLanguage("all");
  const getLogin = getSectionLanguage("login");
  const onLoginSuccess = async (res) => {
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
        // Cookies.set('username', generateUsername(res.profileObj.email) );// just  for chat
        Cookies.set("token", response.data.data.token);
        if (!Cookies.get("token"))
          localStorage.setItem("token", response.data.data.token);
        message.success(getLogin("Logged_in_successfully"));
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
      message.error(getLanguage("An_unexpected_error"));
    }
  };
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

  const onLoginFailure = () => {};
  // Redirect to user home route if user is authenticated.
  let token = Cookies.get("token");
  if (!token && typeof window !== "undefined")
    token = localStorage.getItem("token");
  useEffect(() => {
    API.get("/api/phone_codes").then((data) => {
      setCodes(() => {
        console.log(data.data.data);
        return data.data.data;
      });
    });
    if (token) {
      router.push("/");
    }
  }, []);

  const router = useRouter();
  // Return statement.
  return (
    <>
      <MetaTags
        title={getLanguage("Sign_up")}
        metaDescription={getLogin("Home")}
        ogDescription={getLogin("Home")}
      />
      <Formik
        initialValues={{
          email: "",
          password: "",
          password_confirmation: "",
          username: "",
          phone: ``,
          code_phone: "",
        }}
        onSubmit={async (values) => {
          setRegisterLoading(true);
          setValidationsErrors({});
          try {
            // Start loading.
            const res = await API.post("api/register", values);
            // Authentication was successful.
            if (res.status === 200) {
              setRegisterLoading(false);
              Cookies.set("token", res.data.data.token);
              if (res.data.data.is_verified) {
                router.push("/");
              } else {
                router.push("/email/verification");
              }
            }
          } catch (error: any) {
            setRegisterLoading(false);
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
        <Form>
          <div className="row justify-content-md-center">
            <div className="col-lg-6 p-0" style={{ maxWidth: 1200 }}>
              <div className="login-panel">
                <div
                  className={
                    "panel-modal-body login-panel-body auto-height" +
                    (registerLoading ? " is-loading" : "")
                  }
                >
                  {!registerLoading ? (
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
                    <h1 className="title">{getLanguage("Sign_up")}</h1>
                  </div>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="timlands-form">
                        <label className="label-block" htmlFor="username">
                          {getLogin("Username")}
                        </label>
                        <Field
                          id="username"
                          name="username"
                          onKeyUp={clearValidationHandle}
                          placeholder={getLogin("Username")}
                          className={
                            "timlands-inputs " +
                            (validationsErrors &&
                              validationsErrors.username &&
                              " has-error")
                          }
                          autoComplete="off"
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
                    </div>
                    <div className="col-lg-6">
                      <div className="timlands-form">
                        <label className="label-block" htmlFor="email">
                          {getLogin("E_mail")}
                        </label>
                        <Field
                          id="email"
                          name="email"
                          onKeyUp={clearValidationHandle}
                          placeholder={getLogin("E_mail")}
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
                              <p className="text">{validationsErrors.email}</p>
                            </motion.div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="timlands-form">
                        <label className="label-block" htmlFor="phone">
                          {getLogin("Phone_number")}
                        </label>
                        <div
                          style={{
                            borderColor:
                              validationsErrors &&
                              anyone(
                                validationsErrors.phone,
                                validationsErrors.code_phone
                              ) &&
                              " red",
                          }}
                          className="registerPhone"
                        >
                          <Field
                            id="phone"
                            name="phone"
                            onKeyUp={clearValidationHandle}
                            placeholder={getLogin("Phone_number")}
                            className={
                              "innerPhone " +
                              (validationsErrors &&
                                validationsErrors.phone &&
                                " has-error")
                            }
                            autoComplete="off"
                          />
                          <Field as="select" id="code_phone" name="code_phone">
                            <option value="">كود</option>
                            {codes.map((e: any) => (
                              <option key={e.id} value={e.code_phone}>
                                {e.code_phone}
                              </option>
                            ))}
                          </Field>
                        </div>
                        {validationsErrors &&
                          anyone(
                            validationsErrors.phone,
                            validationsErrors.code_phone
                          ) && (
                            <div style={{ overflow: "hidden" }}>
                              <motion.div
                                initial={{ y: -70, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="timlands-form-note form-note-error"
                              >
                                <p className="text">
                                  {which(
                                    validationsErrors.phone,
                                    validationsErrors.code_phone
                                  )}
                                </p>
                              </motion.div>
                            </div>
                          )}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="timlands-form">
                        <label className="label-block" htmlFor="password">
                          {" "}
                          {getLogin("Password")}{" "}
                          <Tooltip title={getLogin("The_password_must")}>
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
                          type={passVisibled ? "text" : "password"}
                          id="password"
                          name="password"
                          onKeyUp={clearValidationHandle}
                          placeholder={getLogin("Password")}
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
                            "timlands-form-btn" +
                            (passVisibled ? " active" : "")
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
                    </div>
                    <div className="col-lg-6">
                      <div className="timlands-form">
                        <label
                          className="label-block"
                          htmlFor="password_confirmation"
                        >
                          {getLogin("Reset_password")}
                          <Tooltip title={getLogin("The_password_must")}>
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
                          type={passVisibled ? "text" : "password"}
                          id="password_confirmation"
                          name="password_confirmation"
                          onKeyUp={clearValidationHandle}
                          placeholder={getLogin("Reset_password")}
                          className={
                            "timlands-inputs " +
                            (validationsErrors &&
                              validationsErrors.password_confirmation &&
                              " has-error")
                          }
                          autoComplete="off"
                        />
                        <button
                          type="button"
                          className={
                            "timlands-form-btn" +
                            (passVisibled ? " active" : "")
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
                    </div>
                  </div>
                  <div className="timlands-form">
                    <div style={{ overflow: "hidden" }}>
                      <div className="timlands-form-note">
                        <p className="text">
                          {getLanguage("If_your_press")}
                          <strong>{getLogin("Create_an_account")}</strong> فأنت
                          توافق على{" "}
                          <Link href="/terms">
                            <a>شروط الاستخدام</a>
                          </Link>{" "}
                          و{" "}
                          <Link href="/privacy">
                            <a>{getLanguage("Privacy_policy")}</a>
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="panel-modal-footer">
                    <div className="login-middle-footer-cont">
                      <button
                        type="submit"
                        disabled={registerLoading}
                        className="btn  butt-primary butt-md"
                      >
                        {getLogin("Create_an_account")}
                      </button>
                      <div className="footer-text">
                        <p className="text" style={{ margin: 0 }}>
                          {" "}
                          {getLogin("Do_you_have")}
                          <Link href="/login">
                            <a>{getLanguage("Login_in")}</a>
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="panel-login-external">
                    <div className="login-external-header">
                      <h4 className="title">{getLogin("Or_sign_up")}</h4>
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
                          buttonText={getLogin("Google")}
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
      </Formik>
    </>
  );
};
const which = (one, two) => {
  if (one) {
    return one[0];
  } else {
    return two[0];
  }
};
const anyone = (one, two) => {
  if (one || two) {
    return true;
  } else {
    return false;
  }
};
export default Register;
