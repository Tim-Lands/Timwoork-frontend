import { message, Space } from "antd";
import React, { ReactElement, useState } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { FormInput } from "./Forms/Forms";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import API from "../../config";
import { GoogleLogin } from "react-google-login";
import router from "next/router";
import { useAppSelector } from "@/store/hooks";

const clientId =
  "1055095089511-f7lip5othejakennssbrlfbjbo2t9dp0.apps.googleusercontent.com";

function LoginForm({ setIsConfirmText }): ReactElement {
  const { getAll } = useAppSelector((state) => state.languages);
  const [validationsErrors, setValidationsErrors]: any = useState({});
  const [validationsGeneral, setValidationsGeneral]: any = useState({});
  const [isShowenPass, setIsShowenPass] = useState(false);
  function setValidationsErrorsHandle() {
    setValidationsErrors({});
    setValidationsGeneral({});
  }
  const generateUsername = (email: string) => {
    const result = email.indexOf("@");
    const len = email.length;
    const mystr = email.slice(result, len);
    const removeData = email.replace(mystr, "");
    const username = removeData + Math.floor(Math.random() * 100000);
    return username;
  };
  // Login with Google
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

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    isInitialValid: true,
    enableReinitialize: true,
    onSubmit: async (values) => {
      console.log("submittung");
      setValidationsErrors({});
      try {
        const res = await API.post("api/login", values);
        // Authentication was successful.
        if (res.status === 200) {
          Cookies.set("token", res.data.data.token, { expires: 365 });
          Cookies.set("username", values.username);
          if (res.data.data.is_verified) {
            router.reload();
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
        console.log(validationsGeneral);
      }
    },
  });
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="modal-conferm"
    >
      <div className="modal-conferm-inner">
        <div className="modal-conferm-head">
          <h3 className="title">{getAll("Log_in")}</h3>
        </div>
        <div className="modal-conferm-body">
          <form onSubmit={formik.handleSubmit}>
            <FormInput
              name="username"
              value={formik.values.username}
              size="small"
              title={
                getAll("E_mail") + " " + getAll("or") + " " + getAll("Username")
              }
              handleChange={formik.handleChange}
              validationsErrors={
                validationsErrors &&
                validationsErrors.username &&
                validationsErrors.username[0]
              }
            />
            <FormInput
              type={!isShowenPass ? "password" : "text"}
              name="password"
              isVisibleBtn={true}
              size="small"
              setIsShowenPass={setIsShowenPass}
              isShowenPass={isShowenPass}
              value={formik.values.password}
              title={getAll("Password")}
              handleChange={formik.handleChange}
              validationsErrors={
                validationsErrors &&
                validationsErrors.password &&
                validationsErrors.password[0]
              }
            />
            <div className="new-form-forget">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="remember_me"
                />
                <label className="form-check-label" htmlFor="remember_me">
                  {getAll("Remember_me")}
                </label>
              </div>
              <div className="forget-pass">
                <a href="#">{getAll("Forgotten_password")}</a>
              </div>
            </div>
            <div className="external-login-modal">
              <h5 className="title">
                {getAll("Or_sign_in")}
                {getAll("Google")}
              </h5>
              <GoogleLogin
                clientId={clientId}
                buttonText={getAll("Google")}
                onSuccess={onLoginSuccess}
                onFailure={onLoginFailure}
                cookiePolicy={"single_host_origin"}
                //isSignedIn={true}
                className="ext-butt"
              />
            </div>

            <button
              className="btn butt-md butt-green submit-button-modal"
              type="submit"
            >
              {getAll("Login_in")}
            </button>
          </form>
        </div>

        <div className="modal-conferm-footer">
          <Space>
            <button
              className="btn butt-sm butt-red-text"
              type="button"
              onClick={() => setIsConfirmText(false)}
            >
              {getAll("Cancel")}
            </button>
          </Space>
        </div>
      </div>
    </motion.div>
  );
}

export default LoginForm;
LoginForm.propTypes = {
  setIsConfirmText: PropTypes.func,
  handleChange: PropTypes.func,
  setMsg: PropTypes.func,
  msg: PropTypes.string,
  title: PropTypes.string,
  handleFunc: PropTypes.func,
};
