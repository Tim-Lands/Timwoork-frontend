import Layout from "@/components/Layout/HomeLayout";
import { message } from "antd";
import React, { ReactElement, useEffect, useState } from "react";
import Cookies from "js-cookie";
import PropTypes from "prop-types";
import API from "../../config";
import * as Yup from "yup";
import { MetaTags } from "@/components/SEO/MetaTags";
import { Field, Form, Formik } from "formik";
import { motion } from "framer-motion";
import router from "next/router";
import Loading from "@/components/Loading";
import { LanguageContext } from "../../contexts/languageContext/context";
import { useContext } from "react";

function ResetPassword({ query }) {
  const { getSectionLanguage } = useContext(LanguageContext);
  const getAll = getSectionLanguage();
  let token = Cookies.get("token");
  if (!token && typeof window !== "undefined")
    token = localStorage.getItem("token");
  const [isToken, setIsToken] = useState(false);
  const [dataInfo, setdataInfo]: any = useState({});
  async function verifyToken() {
    try {
      const res = await API.post("api/password/forget/verify", {
        token: query.token,
      });
      // Authentication was successful.
      setdataInfo(res.data.data);
      if (res.data.success) {
        setIsToken(true);
      } else {
        setIsToken(false);
      }
    } catch (error: any) {
      setIsToken(false);
    }
  }

  useEffect(() => {
    verifyToken();
  }, []);
  if (!query.token || !isToken || token)
    return (
      <div className="row justify-content-md-center">
        <div className="col-md-5">
          <Loading />
        </div>
      </div>
    );
  const SignupSchema = Yup.object().shape({
    password: Yup.string().required(getAll("This_field_is")),
    password_confirmation: Yup.string().oneOf(
      [Yup.ref("password"), null],
      getAll("Passwords_are_not")
    ),
  });
  return (
    <div className="py-3">
      <>
        <MetaTags
          title={getAll("Reset_password")}
          metaDescription={getAll("Reset_password")}
          ogDescription={getAll("Reset_password")}
        />
        {!dataInfo && <Loading />}
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-lg-8">
              <div className="timlands-profile-content">
                <Formik
                  isInitialValid={true}
                  initialValues={{
                    password: "",
                    password_confirmation: "",
                    email: dataInfo && dataInfo.email,
                  }}
                  validationSchema={SignupSchema}
                  onSubmit={async (values) => {
                    try {
                      const res = await API.post(
                        "api/password/forget/reset",
                        values
                      );
                      // Authentication was successful.
                      if (res.status === 200) {
                        message.success(getAll("The_update_has"));
                        router.push("/login");
                      }
                    } catch (error: any) {
                      if (error.response && error.response.status === 200) {
                        message.success(getAll("The_update_has"));
                      }
                      if (error.response && error.response.status === 422) {
                        message.error(getAll("Please_fill_in"));
                      }
                      if (error.response && error.response.status === 419) {
                        message.error(getAll("Operation_failed"));
                      }
                      if (error.response && error.response.status === 400) {
                        message.error(getAll("An_error_occurred"));
                      } else {
                        message.error(getAll("An_unexpected_error_occurred"));
                      }
                    }
                  }}
                >
                  {({ errors, touched, isSubmitting }) => (
                    <Form>
                      <div className="profile-content-body">
                        <div className="content-title">
                          <div className="d-flex">
                            <h3 className="title flex-center">
                              <span className="material-icons material-icons-outlined">
                                account_circle
                              </span>
                              {getAll("Reset_password")}
                            </h3>
                          </div>
                        </div>
                        <div className="timlands-form">
                          <label className="label-block" htmlFor="password">
                            {getAll("New_password")}
                          </label>
                          <Field
                            type="password"
                            id="password"
                            name="password"
                            disabled={isSubmitting}
                            placeholder={getAll("New_password")}
                            className="timlands-inputs"
                            autoComplete="off"
                          />
                          {errors.password && touched.password ? (
                            <div style={{ overflow: "hidden" }}>
                              <motion.div
                                initial={{ y: -70, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="timlands-form-note form-note-error"
                              >
                                <p className="text">{errors.password}</p>
                              </motion.div>
                            </div>
                          ) : null}
                        </div>
                        <div className="timlands-form">
                          <label
                            className="label-block"
                            htmlFor="password_confirmation"
                          >
                            {getAll("New_password")}
                          </label>
                          <Field
                            type="password"
                            disabled={isSubmitting}
                            id="password_confirmation"
                            name="password_confirmation"
                            placeholder={getAll("New_password")}
                            className="timlands-inputs"
                            autoComplete="off"
                          />
                          {errors.password_confirmation &&
                          touched.password_confirmation ? (
                            <div style={{ overflow: "hidden" }}>
                              <motion.div
                                initial={{ y: -70, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="timlands-form-note form-note-error"
                              >
                                <p className="text">
                                  {errors.password_confirmation}
                                </p>
                              </motion.div>
                            </div>
                          ) : null}
                        </div>

                        <div className="panel-modal-footer">
                          <div className="d-flex">
                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className="btn me-auto butt-primary butt-md"
                            >
                              {getAll("Update_basic_information")}
                            </button>
                          </div>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

ResetPassword.getLayout = function getLayout(page: any): ReactElement {
  return <Layout>{page}</Layout>;
};
export default ResetPassword;
ResetPassword.getInitialProps = async ({ query }) => {
  return { query };
};
ResetPassword.propTypes = {
  query: PropTypes.any,
};
