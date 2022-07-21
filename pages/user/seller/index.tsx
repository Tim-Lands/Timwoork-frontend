import React, { ReactElement } from "react";
import Layout from "@/components/Layout/HomeLayout";
import Link from "next/link";
import Cookies from "js-cookie";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import API from "../../../config";
import { motion } from "framer-motion";
import { message } from "antd";
import useSWR from "swr";
import { MetaTags } from "@/components/SEO/MetaTags";
import Loading from "@/components/Loading";
import Unauthorized from "@/components/Unauthorized";
import { LanguageContext } from "../../../contexts/languageContext/context";
import { useContext } from "react";

const sellerInformations = (): ReactElement => {
  const { getSectionLanguage } = useContext(LanguageContext);
  const getAll = getSectionLanguage("all");
  const getLogin = getSectionLanguage("login");
  const getMain = getSectionLanguage("main");
  let token = Cookies.get("token");
  if (!token && typeof window !== "undefined")
    token = localStorage.getItem("token");
  const { data: userInfo }: any = useSWR("api/me");
  // Redirect to user home route if user is authenticated.
  const SignupSchema = Yup.object().shape({
    first_name: Yup.string().required(getLogin("This_field_is")),
    last_name: Yup.string().required(getLogin("This_field_is")),
    date_of_birth: Yup.string().required(getLogin("This_field_is")),
    gender: Yup.number().required(getLogin("This_field_is")),
    username: Yup.string().required(getLogin("This_field_is")),
    country_id: Yup.number().required(getLogin("This_field_is")),
  });
  // Return statement.
  return (
    <>
      {!userInfo && <Loading />}
      {!token && <Unauthorized />}
      {userInfo && userInfo.profile && (
        <>
          <MetaTags
            title={getLogin("Edit_profile")}
            metaDescription={getLogin("Edit_profile")}
            ogDescription={getLogin("Edit_profile")}
          />
          <Formik
            isInitialValid={true}
            initialValues={{
              first_name: userInfo.profile.first_name || "",
              last_name: userInfo.profile.last_name || "",
              username: userInfo.username || "",
              date_of_birth: userInfo.profile.date_of_birth || "",
              gender: parseInt(userInfo.profile.gender) || 1,
              country_id: parseInt(userInfo.profile.country_id) || 1,
            }}
            validationSchema={SignupSchema}
            onSubmit={async (values) => {
              try {
                const res = await API.post("api/profiles/step_one", values, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                });
                // Authentication was successful.
                if (res.status === 200) {
                  message.success(getLogin("The_update_has"));
                }
              } catch (error: any) {
                if (error.response && error.response.status === 200) {
                  message.success(getLogin("The_update_has"));
                }
                if (error.response && error.response.status === 422) {
                  message.error(getAll("Please_fill_in"));
                }
                if (error.response && error.response.status === 419) {
                  message.error(getAll("Failed_operation"));
                }
                if (error.response && error.response.status === 400) {
                  message.error(getLogin("An_error_occurred"));
                } else {
                  message.error(getLogin("An_unexpected_error"));
                }
              }
            }}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form>
                <div className="row">
                  <div className="col-lg-6 p-0">
                    <div className="login-image">
                      <div className="timwoork-logo">
                        <Link href="/">
                          <a>
                            <img src="/logo4.png" alt="" />
                          </a>
                        </Link>
                      </div>
                      <h1 className="login-title">
                        {getLogin("Edit_personal_information")}
                      </h1>
                      <h3 className="login-text">{getLogin("This_text_is")}</h3>
                    </div>
                  </div>
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
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </div>
                          </motion.div>
                        )}
                        <div className="row">
                          <div className="col-md-6">
                            <div className="timlands-form">
                              <label
                                className="label-block"
                                htmlFor="first_name"
                              >
                                {getLogin("First_name")}
                              </label>
                              <Field
                                id="first_name"
                                name="first_name"
                                placeholder={getLogin("First_name")}
                                className="timlands-inputs"
                                autoComplete="off"
                              />
                              {errors.first_name && touched.first_name ? (
                                <div style={{ overflow: "hidden" }}>
                                  <motion.div
                                    initial={{ y: -70, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    className="timlands-form-note form-note-error"
                                  >
                                    <p className="text">{errors.first_name}</p>
                                  </motion.div>
                                </div>
                              ) : null}
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="timlands-form">
                              <label
                                className="label-block"
                                htmlFor="last_name"
                              >
                                {getLogin("Last_name")}{" "}
                              </label>
                              <Field
                                id="last_name"
                                name="last_name"
                                placeholder={getLogin("Last_name")}
                                className="timlands-inputs"
                                autoComplete="off"
                              />
                              {errors.last_name && touched.last_name ? (
                                <div style={{ overflow: "hidden" }}>
                                  <motion.div
                                    initial={{ y: -70, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    className="timlands-form-note form-note-error"
                                  >
                                    <p className="text">{errors.last_name}</p>
                                  </motion.div>
                                </div>
                              ) : null}
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="timlands-form">
                              <label className="label-block" htmlFor="username">
                                {getLogin("Username")}
                              </label>
                              <Field
                                id="username"
                                name="username"
                                placeholder={getLogin("Username")}
                                className="timlands-inputs"
                                autoComplete="off"
                              />
                              {errors.username && touched.username ? (
                                <div style={{ overflow: "hidden" }}>
                                  <motion.div
                                    initial={{ y: -70, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    className="timlands-form-note form-note-error"
                                  >
                                    <p className="text">{errors.username}</p>
                                  </motion.div>
                                </div>
                              ) : null}
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="timlands-form">
                              <label
                                className="label-block"
                                htmlFor="date_of_birth"
                              >
                                {getLogin("Birthday")}
                              </label>
                              <Field
                                type="date"
                                id="date_of_birth"
                                name="date_of_birth"
                                placeholder={getLogin("Birthday")}
                                className="timlands-inputs"
                                autoComplete="off"
                              />
                              {errors.date_of_birth && touched.date_of_birth ? (
                                <div style={{ overflow: "hidden" }}>
                                  <motion.div
                                    initial={{ y: -70, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    className="timlands-form-note form-note-error"
                                  >
                                    <p className="text">
                                      {errors.date_of_birth}
                                    </p>
                                  </motion.div>
                                </div>
                              ) : null}
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="timlands-form">
                              <label className="label-block" htmlFor="gender">
                                {getLogin("Select_sexe")}
                              </label>
                              <Field
                                as="select"
                                id="gender"
                                name="gender"
                                className="timlands-inputs"
                              >
                                <option value={1}>{getLogin("Man")}</option>
                                <option value={0}>{getLogin("woman")}</option>
                              </Field>
                              {errors.gender && touched.gender ? (
                                <div style={{ overflow: "hidden" }}>
                                  <motion.div
                                    initial={{ y: -70, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    className="timlands-form-note form-note-error"
                                  >
                                    <p className="text">{errors.gender}</p>
                                  </motion.div>
                                </div>
                              ) : null}
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="timlands-form">
                              <label
                                className="label-block"
                                htmlFor="country_id"
                              >
                                {getLogin("Select_country")}
                              </label>
                              <Field
                                as="select"
                                id="country_id"
                                name="country_id"
                                className="timlands-inputs"
                              >
                                <option value={1}>الجزائر</option>
                                <option value={2}>فلسطين</option>
                                <option value={3}>الكويت</option>
                                <option value={4}>الأردن</option>
                                <option value={5}>تركيا</option>
                              </Field>
                              {errors.country_id && touched.country_id ? (
                                <div style={{ overflow: "hidden" }}>
                                  <motion.div
                                    initial={{ y: -70, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    className="timlands-form-note form-note-error"
                                  >
                                    <p className="text">{errors.country_id}</p>
                                  </motion.div>
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>

                        <div className="timlands-form">
                          <div style={{ overflow: "hidden" }}>
                            <div className="timlands-form-note">
                              <p className="text">
                                {getLogin("If_your_press")}{" "}
                                <Link href="/">
                                  <a>{getMain("Terms_of_use")}</a>
                                </Link>{" "}
                                و{" "}
                                <Link href="/">
                                  <a>{getAll("Privacy_policy")}</a>
                                </Link>
                              </p>
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
                              {getLogin("Edit_information")}
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
      )}
    </>
  );
};

export default sellerInformations;
sellerInformations.getLayout = function getLayout(page: any): ReactElement {
  return <Layout>{page}</Layout>;
};
