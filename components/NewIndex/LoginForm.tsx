import { Space } from 'antd'
import React, { ReactElement, useState } from 'react'
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { FormInput } from './Forms/Forms';
import { useFormik } from 'formik';
import Cookies from "js-cookie";
import API from "../../config";
import router from 'next/router';

function LoginForm({ setIsConfirmText }): ReactElement {
  const [validationsErrors, setValidationsErrors]: any = useState({});
  const [validationsGeneral, setValidationsGeneral]: any = useState({});
  const [isShowenPass, setIsShowenPass] = useState(false)
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    isInitialValid: true,
    enableReinitialize: true,
    onSubmit: async (values) => {
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
        console.log(validationsGeneral);

      }
    },
  });
  return (
    <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className='modal-conferm'>
      <div className="modal-conferm-inner">
        <div className="modal-conferm-head">
          <h3 className="title">
            تسجيل الدخول
          </h3>
        </div>
        <div className="modal-conferm-body">
          <FormInput
            name="username"
            value={formik.values.username}
            title="البريد الإلكتروني أو اسم المستخدم"
            handleChange={formik.handleChange}
            validationsErrors={validationsErrors && validationsErrors.username && validationsErrors.username[0]}
          />
          <FormInput
            type={!isShowenPass ? 'password' : 'text'}
            name='password'
            isVisibleBtn={true}
            setIsShowenPass={setIsShowenPass}
            isShowenPass={isShowenPass}
            value={formik.values.password}
            title="كلمة المرور"
            handleChange={formik.handleChange}
            validationsErrors={validationsErrors && validationsErrors.password && validationsErrors.password[0]}
          />
          <div className="form-forget">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="remember_me" />
                <label className="form-check-label" htmlFor="remember_me">
                  تذكرني
                </label>
            </div>
            <div className="forget-pass">
              <a href="#">نسيت كلمة المرور؟</a>
            </div>
          </div>
        </div>

        <div className="modal-conferm-footer">
          <Space>
            <button className='btn butt-sm butt-green' type='submit'>أرسل الآن</button>
            <button className='btn butt-sm butt-red-text' type='button' onClick={() => setIsConfirmText(false)}>إلغاء الأمر</button>
          </Space>
        </div>
      </div>
    </motion.div>
  )
}

export default LoginForm
LoginForm.propTypes = {
  setIsConfirmText: PropTypes.func,
  handleChange: PropTypes.func,
  setMsg: PropTypes.func,
  msg: PropTypes.string,
  title: PropTypes.string,
  handleFunc: PropTypes.func,
};