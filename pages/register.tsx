import React, { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import API from "../config";
import { Field, Form, Formik } from "formik";
import { motion } from "framer-motion";
import { GoogleLogin } from "react-google-login";
import { MetaTags } from "@/components/SEO/MetaTags";
import { Badge, message, Tooltip } from "antd";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { UserActions } from "../store/user/UserActions";

const clientId =
  "1055095089511-f7lip5othejakennssbrlfbjbo2t9dp0.apps.googleusercontent.com";
const Register = (): ReactElement => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.user);
  const validationsErrors = user.signInError;

  const [passVisibled, setPassVisibled] = useState(false);
  const registerLoading = user.loading;
  const [codes, setCodes] = useState([]);
  const { getAll } = useAppSelector((state) => state.languages);

  const onLoginSuccess = async (res) => {
    try {
      await dispatch(
        UserActions.loginGoogle({
          email: res.profileObj.email,
          first_name: res.profileObj.givenName,
          last_name: res.profileObj.familyName,
          full_name: res.profileObj.name,
          avatar: res.profileObj.imageUrl,
          provider_id: res.profileObj.googleId,
          username: generateUsername(res.profileObj.email),
        })
      ).unwrap();
      message.success(getAll("Logged_in_successfully"));
    } catch (error: any) {
      message.error(getAll("An_unexpected_error"));
    }
  };
  const generateUsername = (email: string) => {
    const result = email.indexOf("@");
    const len = email.length;
    const mystr = email.slice(result, len);
    const removeData = email.replace(mystr, "");
    const username = removeData + Math.floor(Math.random() * 100000);
    return username;
  };
  const clearValidationHandle = () => {
    dispatch(UserActions.clearErrors());
  };
  const onLoginFailure = () => {};

  useEffect(() => {
    API.get("/api/phone_codes").then((data) => {
      setCodes(() => {
        return data.data.data;
      });
    });
  }, []);

  const router = useRouter();
  useEffect(() => {
    if (user.isLogged && user.step !== null) {
      switch (user.step) {
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
      return;
    }
    if (user.isLogged && user.email_verified) {
      router.push("/");
      return;
    }
    if (user.isLogged && !user.email_verified) {
      router.push("/email/verification");
      return;
    }
  }, [user]);
  return (
    <>
      <MetaTags
        title={getAll("Sign_up")}
        metaDescription={getAll("Home")}
        ogDescription={getAll("Home")}
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
          dispatch(UserActions.register(values));
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
                    <h1 className="title">{getAll("Sign_up")}</h1>
                  </div>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="timlands-form">
                        <label className="label-block" htmlFor="username">
                          {getAll("Username")}
                        </label>
                        <Field
                          id="username"
                          name="username"
                          onKeyUp={clearValidationHandle}
                          placeholder={getAll("Username")}
                          className={
                            "timlands-inputs " +
                            (validationsErrors.username && " has-error")
                          }
                          autoComplete="off"
                        />
                        {validationsErrors.username && (
                          <div style={{ overflow: "hidden" }}>
                            <motion.div
                              initial={{ y: -70, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              className="timlands-form-note form-note-error"
                            >
                              <p className="text">
                                {validationsErrors.username}
                              </p>
                            </motion.div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="timlands-form">
                        <label className="label-block" htmlFor="email">
                          {getAll("E_mail")}
                        </label>
                        <Field
                          id="email"
                          name="email"
                          onKeyUp={clearValidationHandle}
                          placeholder={getAll("E_mail")}
                          className={
                            "timlands-inputs " +
                            (validationsErrors.email && " has-error")
                          }
                          autoComplete="off"
                        />
                        {validationsErrors.email && (
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
                          {getAll("Phone_number")}
                        </label>
                        <div
                          style={{
                            borderColor:
                              anyone(
                                validationsErrors.phone,
                                validationsErrors.code_phone
                              ) && " red",
                          }}
                          className="registerPhone"
                        >
                          <Field
                            id="phone"
                            name="phone"
                            onKeyUp={clearValidationHandle}
                            placeholder={getAll("Phone_number")}
                            className={
                              "innerPhone " +
                              (validationsErrors.phone && " has-error")
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
                        {anyone(
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
                          {getAll("Password")}{" "}
                          <Tooltip title={getAll("The_password_must")}>
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
                          placeholder={getAll("Password")}
                          className={
                            "timlands-inputs " +
                            (validationsErrors.password && " has-error")
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
                        {validationsErrors.password && (
                          <div style={{ overflow: "hidden" }}>
                            <motion.div
                              initial={{ y: -70, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              className="timlands-form-note form-note-error"
                            >
                              <p className="text">
                                {validationsErrors.password}
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
                          {getAll("Reset_password")}
                          <Tooltip title={getAll("The_password_must")}>
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
                          placeholder={getAll("Reset_password")}
                          className={
                            "timlands-inputs " +
                            (validationsErrors.password_confirmation &&
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
                        {validationsErrors.password_confirmation && (
                          <div style={{ overflow: "hidden" }}>
                            <motion.div
                              initial={{ y: -70, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              className="timlands-form-note form-note-error"
                            >
                              <p className="text">
                                {validationsErrors.password_confirmation}
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
                          {getAll("If_your_press")}
                          <strong>{getAll("Create_an_account")}</strong> فأنت
                          توافق على{" "}
                          <Link href="/terms">
                            <a>شروط الاستخدام</a>
                          </Link>{" "}
                          و{" "}
                          <Link href="/privacy">
                            <a>{getAll("Privacy_policy")}</a>
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
                        {getAll("Create_an_account")}
                      </button>
                      <div className="footer-text">
                        <p className="text" style={{ margin: 0 }}>
                          {" "}
                          {getAll("Do_you_have")}
                          <Link href="/login">
                            <a>{getAll("Login_in")}</a>
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="panel-login-external">
                    <div className="login-external-header">
                      <h4 className="title">{getAll("Or_sign_up")}</h4>
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
      </Formik>
    </>
  );
};
const which = (one, two) => {
  if (one) {
    return one;
  } else {
    return two;
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
