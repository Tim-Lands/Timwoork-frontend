import React, { ReactElement } from "react";
import Layout from "@/components/Layout/HomeLayout";
import Link from "next/link";
import Cookies from "js-cookie";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import API from "../../../config";
import { motion } from "framer-motion";
import { message } from "antd";
import { useAppSelector } from "@/store/hooks";

import useSWR from "swr";
import { MetaTags } from "@/components/SEO/MetaTags";
import Loading from "@/components/Loading";
import Unauthorized from "@/components/Unauthorized";

const sellerInformations = (): ReactElement => {
  const { getAll } = useAppSelector((state) => state.languages);

  let token = Cookies.get("token");
  if (!token && typeof window !== "undefined")
    token = localStorage.getItem("token");
  const { data: userInfo }: any = useSWR("api/me");
  // Redirect to user home route if user is authenticated.
  const SignupSchema = Yup.object().shape({
    first_name: Yup.string().required(getAll("This_field_is")),
    last_name: Yup.string().required(getAll("This_field_is")),
    date_of_birth: Yup.string().required(getAll("This_field_is")),
    gender: Yup.number().required(getAll("This_field_is")),
    username: Yup.string().required(getAll("This_field_is")),
    country_id: Yup.number().required(getAll("This_field_is")),
  });
  // Return statement.
  return (
    <>
      {!userInfo && <Loading />}
      {!token && <Unauthorized />}
      {userInfo && userInfo.profile && (
        <>
          <MetaTags
            title={getAll("Edit_profile")}
            metaDescription={getAll("Edit_profile")}
            ogDescription={getAll("Edit_profile")}
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
                  message.success(getAll("The_update_has"));
                }
              } catch (error: any) {
                if (error.response && error.response.status === 200) {
                  message.success(getAll("The_update_has"));
                }
                if (error.response && error.response.status === 422) {
                  message.error(getAll("Please_fill_in"));
                }
                if (error.response && error.response.status === 419) {
                  message.error(getAll("Failed_operation"));
                }
                if (error.response && error.response.status === 400) {
                  message.error(getAll("An_error_occurred"));
                } else {
                  message.error(getAll("An_unexpected_error"));
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
                        {getAll("Edit_personal_information")}
                      </h1>
                      <h3 className="login-text">{getAll("This_text_is")}</h3>
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
                                {getAll("First_name")}
                              </label>
                              <Field
                                id="first_name"
                                name="first_name"
                                placeholder={getAll("First_name")}
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
                                {getAll("Last_name")}{" "}
                              </label>
                              <Field
                                id="last_name"
                                name="last_name"
                                placeholder={getAll("Last_name")}
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
                                {getAll("Username")}
                              </label>
                              <Field
                                id="username"
                                name="username"
                                placeholder={getAll("Username")}
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
                                {getAll("Birthday")}
                              </label>
                              <Field
                                type="date"
                                id="date_of_birth"
                                name="date_of_birth"
                                placeholder={getAll("Birthday")}
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
                                {getAll("Select_sexe")}
                              </label>
                              <Field
                                as="select"
                                id="gender"
                                name="gender"
                                className="timlands-inputs"
                              >
                                <option value={1}>{getAll("Man")}</option>
                                <option value={0}>{getAll("woman")}</option>
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
                                {getAll("Select_country")}
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
                                {getAll("If_your_press")}{" "}
                                <Link href="/">
                                  <a>{getAll("Terms_of_use")}</a>
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
                              {getAll("Edit_information")}
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
