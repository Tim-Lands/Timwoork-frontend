import React, { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import API from "../config";
import { Field, Form, Formik } from "formik";
import { motion } from "framer-motion";
import { GoogleLogin } from "react-google-login";
import Cookies from "js-cookie";
import { MetaTags } from "@/components/SEO/MetaTags";
import { Badge, message, Tooltip, Select } from "antd";

const { Option } = Select;
const clientId =
  "1055095089511-f7lip5othejakennssbrlfbjbo2t9dp0.apps.googleusercontent.com";
const Register = (): ReactElement => {
  const [passVisibled, setPassVisibled] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [validationsErrors, setValidationsErrors]: any = useState({});
  const [code, setCode] = useState("+1");
  const [codes, setCodes] = useState([]);
  const clearValidationHandle = () => {
    setValidationsErrors({});
  };
  const handleChange = (value: string) => {
    setCode(value);
  };
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
        message.success("تم تسجيل الدخول بنجاح");
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
      message.error("حدث خطأ غير متوقع");
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
    API.get("/api/get_countries").then((data) => {
      setCodes(data.data.data);
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
        title={"التسجيل"}
        metaDescription={"الصفحة الرئيسية"}
        ogDescription={"الصفحة الرئيسية"}
      />
      <Formik
        initialValues={{
          email: "",
          password: "",
          password_confirmation: "",
          username: "",
          phone: ``,
        }}
        onSubmit={async (values) => {
          setRegisterLoading(true);
          setValidationsErrors({});
          try {
            // Start loading.
            const res = await API.post("api/register", {
              ...values,
              phone: values.phone && code + values.phone,
            });
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
                    <h1 className="title">التسجيل</h1>
                  </div>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="timlands-form">
                        <label className="label-block" htmlFor="username">
                          اسم المستخدم
                        </label>
                        <Field
                          id="username"
                          name="username"
                          onKeyUp={clearValidationHandle}
                          placeholder=" اسم المستخدم..."
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
                          البريد الإلكتروني
                        </label>
                        <Field
                          id="email"
                          name="email"
                          onKeyUp={clearValidationHandle}
                          placeholder="البريد الإلكتروني..."
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
                          رقم الهاتف
                        </label>
                        <div className="registerPhone">
                          <Field
                            id="phone"
                            name="phone"
                            onKeyUp={clearValidationHandle}
                            placeholder="رقم الهاتف..."
                            className={
                              "innerPhone " +
                              (validationsErrors &&
                                validationsErrors.phone &&
                                " has-error")
                            }
                            autoComplete="off"
                          />
                          <Select
                            defaultValue="+1"
                            className="selectCode"
                            onChange={handleChange}
                          >
                            {codes.map((code) => {
                              if (code.code_phone) {
                                return (
                                  <Option
                                    key={code.code_phone}
                                    value={code.code_phone}
                                  >
                                    {code.code_phone}
                                  </Option>
                                );
                              }
                            })}
                          </Select>
                        </div>
                        {validationsErrors && validationsErrors.phone && (
                          <div style={{ overflow: "hidden" }}>
                            <motion.div
                              initial={{ y: -70, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              className="timlands-form-note form-note-error"
                            >
                              <p className="text">{validationsErrors.phone}</p>
                            </motion.div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="timlands-form">
                        <label className="label-block" htmlFor="password">
                          {" "}
                          كلمة المرور{" "}
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
                          type={passVisibled ? "text" : "password"}
                          id="password"
                          name="password"
                          onKeyUp={clearValidationHandle}
                          placeholder="كلمة المرور..."
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
                          إعادة كلمة المرور
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
                          type={passVisibled ? "text" : "password"}
                          id="password_confirmation"
                          name="password_confirmation"
                          onKeyUp={clearValidationHandle}
                          placeholder="إعادة كلمة المرور..."
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
                          بمجرد قمت بالضغط على <strong>إنشاء حساب</strong> فأنت
                          توافق على{" "}
                          <Link href="/terms">
                            <a>شروط الاستخدام</a>
                          </Link>{" "}
                          و{" "}
                          <Link href="/privacy">
                            <a>سياسة الخصوصية</a>
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
                        إنشاء حساب
                      </button>
                      <div className="footer-text">
                        <p className="text" style={{ margin: 0 }}>
                          {" "}
                          لديك حساب؟
                          <Link href="/login">
                            <a>تسجيل الدخول</a>
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="panel-login-external">
                    <div className="login-external-header">
                      <h4 className="title">أو التسجيل بواسطة</h4>
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
                          buttonText="غوغل"
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

export default Register;
