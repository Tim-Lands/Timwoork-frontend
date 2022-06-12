import React, { ReactElement, useEffect, useState } from "react";
import Cookies from "js-cookie";
import Layout from "@/components/Layout/HomeLayout";
import { Field, Form, Formik } from "formik";
import API from "../../config";
import { motion } from "framer-motion";
import { message } from "antd";
import useSWR from "swr";
import Loading from "@/components/Loading";
import router from "next/router";
import UploadPicture from "@/components/Profile/UploadPicture";
import { MetaTags } from "@/components/SEO/MetaTags";
import ChangePass from "@/components/ChangePass";

const personalInformations = () => {
  let token = Cookies.get("token");
  if (!token && typeof window !== "undefined")
    token = localStorage.getItem("token");
  const [codes, setCodes] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const { data: userInfo }: any = useSWR("api/me");
  const { data: Countries }: any = useSWR("dashboard/countries");
  const [validationsErrors, setValidationsErrors]: any = useState({});
  function setValidationsErrorsHandle() {
    setValidationsErrors({});
  }
  // Redirect to user home route if user is authenticated.
  useEffect(() => {
    API.get("/api/phone_codes").then((data) => {
      setCodes(() => {
        return data.data.data;
      });
    });
    API.get("/api/currency").then((data) => {
      setCurrencies(() => {
        return data.data.data;
      });
    });
    if (!token) {
      router.push("/");
    }
  }, [token]);
  // Return statement.

  return (
    <>
      <MetaTags
        title="تعديل الملف الشخصي"
        metaDescription="تعديل الملف الشخصي"
        ogDescription="تعديل الملف الشخصي"
      />
      {!userInfo && <Loading />}
      <div className="container py-4">
        {userInfo && userInfo.user_details.profile && (
          <>
            <div className="row justify-content-md-center">
              <div className="col-lg-9">
                <div className="my-3">
                  <UploadPicture
                    token={token}
                    avatarPicture={userInfo.user_details.profile.avatar_path}
                  />
                </div>
                <Formik
                  isInitialValid={true}
                  initialValues={{
                    first_name: userInfo.user_details.profile.first_name || "",
                    last_name: userInfo.user_details.profile.last_name || "",
                    username: userInfo.user_details.username || "",
                    date_of_birth:
                      userInfo.user_details.profile.date_of_birth || "",
                    gender: parseInt(userInfo.user_details.profile.gender),
                    country_id:
                      parseInt(userInfo.user_details.profile.country_id) || "",
                    phone: userInfo.user_details.phone || "",
                    currency:
                      userInfo.user_details.profile.currency?.symbol_native ||
                      "",
                    code: userInfo.user_details.code_phone || "",
                  }}
                  //validationSchema={SignupSchema}
                  onSubmit={async (values) => {
                    setValidationsErrors({});

                    try {
                      const res = await API.post(
                        "api/profiles/step_one",
                        { ...values, code_phone: values.code },
                        {
                          headers: {
                            Authorization: `Bearer ${token}`,
                          },
                        }
                      );
                      // Authentication was successful.
                      if (res.status === 200) {
                        message.success("لقد تم التحديث بنجاح");
                        router.reload();
                      }
                    } catch (error: any) {
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
                  {({ isSubmitting }) => (
                    <Form>
                      <div className="login-panel update-form my-1">
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
                          <div className="update-form-header">
                            <h1 className="title">تعديل المعلومات الشخصية</h1>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="timlands-form">
                                <label
                                  className="label-block"
                                  htmlFor="first_name"
                                >
                                  الاسم الأول
                                </label>
                                <Field
                                  id="first_name"
                                  name="first_name"
                                  onKeyUp={setValidationsErrorsHandle}
                                  placeholder="الاسم الأول..."
                                  className={
                                    "timlands-inputs " +
                                    (validationsErrors &&
                                      validationsErrors.first_name &&
                                      " has-error")
                                  }
                                  autoComplete="off"
                                />
                                {validationsErrors &&
                                  validationsErrors.first_name && (
                                    <div style={{ overflow: "hidden" }}>
                                      <motion.div
                                        initial={{ y: -70, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        className="timlands-form-note form-note-error"
                                      >
                                        <p className="text">
                                          {validationsErrors.first_name[0]}
                                        </p>
                                      </motion.div>
                                    </div>
                                  )}
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="timlands-form">
                                <label
                                  className="label-block"
                                  htmlFor="last_name"
                                >
                                  الاسم الأخير
                                </label>
                                <Field
                                  id="last_name"
                                  name="last_name"
                                  placeholder="الاسم الأخير..."
                                  className={
                                    "timlands-inputs " +
                                    (validationsErrors &&
                                      validationsErrors.last_name &&
                                      " has-error")
                                  }
                                  autoComplete="off"
                                  onKeyUp={setValidationsErrorsHandle}
                                />
                                {validationsErrors &&
                                  validationsErrors.last_name && (
                                    <div style={{ overflow: "hidden" }}>
                                      <motion.div
                                        initial={{ y: -70, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        className="timlands-form-note form-note-error"
                                      >
                                        <p className="text">
                                          {validationsErrors.last_name[0]}
                                        </p>
                                      </motion.div>
                                    </div>
                                  )}
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="timlands-form">
                                <label
                                  className="label-block"
                                  htmlFor="username"
                                >
                                  اسم المستخدم
                                </label>
                                <Field
                                  id="username"
                                  name="username"
                                  onKeyUp={setValidationsErrorsHandle}
                                  placeholder="اسم المستخدم..."
                                  className={
                                    "timlands-inputs " +
                                    (validationsErrors &&
                                      validationsErrors.username &&
                                      " has-error")
                                  }
                                  autoComplete="off"
                                />
                                {validationsErrors &&
                                  validationsErrors.username && (
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
                            <div className="col-md-6">
                              <div className="timlands-form">
                                <label className="label-block" htmlFor="gender">
                                  اختر الجنس
                                </label>
                                <Field
                                  as="select"
                                  id="gender"
                                  name="gender"
                                  className={
                                    "timlands-inputs " +
                                    (validationsErrors &&
                                      validationsErrors.gender &&
                                      " has-error")
                                  }
                                >
                                  <option value="">اختر الجنس</option>
                                  <option value="0">أنثى</option>
                                  <option value="1">ذكر</option>
                                </Field>
                                {validationsErrors && validationsErrors.gender && (
                                  <div style={{ overflow: "hidden" }}>
                                    <motion.div
                                      initial={{ y: -70, opacity: 0 }}
                                      animate={{ y: 0, opacity: 1 }}
                                      className="timlands-form-note form-note-error"
                                    >
                                      <p className="text">
                                        {validationsErrors.gender[0]}
                                      </p>
                                    </motion.div>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="timlands-form">
                                <label
                                  className="label-block"
                                  htmlFor="date_of_birth"
                                >
                                  تاريخ الميلاد
                                </label>
                                <Field
                                  type="date"
                                  id="date_of_birth"
                                  name="date_of_birth"
                                  onKeyUp={setValidationsErrorsHandle}
                                  placeholder="تاريخ الميلاد..."
                                  className={
                                    "timlands-inputs " +
                                    (validationsErrors &&
                                      validationsErrors.date_of_birth &&
                                      " has-error")
                                  }
                                  autoComplete="off"
                                />
                                {validationsErrors &&
                                  validationsErrors.date_of_birth && (
                                    <div style={{ overflow: "hidden" }}>
                                      <motion.div
                                        initial={{ y: -70, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        className="timlands-form-note form-note-error"
                                      >
                                        <p className="text">
                                          {validationsErrors.date_of_birth[0]}
                                        </p>
                                      </motion.div>
                                    </div>
                                  )}
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="timlands-form">
                                <label
                                  className="label-block"
                                  htmlFor="country_id"
                                >
                                  اختر البلد
                                </label>
                                <Field
                                  as="select"
                                  id="country_id"
                                  name="country_id"
                                  className={
                                    "timlands-inputs " +
                                    (validationsErrors &&
                                      validationsErrors.country_id &&
                                      " has-error")
                                  }
                                >
                                  <option value="">اختر البلد...</option>
                                  {Countries &&
                                    Countries.data.map((e: any) => (
                                      <option key={e.id} value={e.id}>
                                        {e.name_ar}
                                      </option>
                                    ))}
                                </Field>
                                {validationsErrors &&
                                  validationsErrors.country_id && (
                                    <div style={{ overflow: "hidden" }}>
                                      <motion.div
                                        initial={{ y: -70, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        className="timlands-form-note form-note-error"
                                      >
                                        <p className="text">
                                          {validationsErrors.country_id[0]}
                                        </p>
                                      </motion.div>
                                    </div>
                                  )}
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="timlands-form">
                                <label className="label-block" htmlFor="phone">
                                  رقم الهاتف
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
                                  className={"registerPhone prof row"}
                                >
                                  <div className="col-9 p-0">
                                    <Field
                                      id="phone"
                                      name="phone"
                                      onKeyUp={setValidationsErrorsHandle}
                                      placeholder="رقم الهاتف..."
                                      className={"timlands-inputs "}
                                      autoComplete="off"
                                    />
                                  </div>
                                  <div className="col-3 p-0">
                                    <Field
                                      as="select"
                                      id="code"
                                      name="code"
                                      style={{ border: "none", width: 100 }}
                                      className={"timlands-inputs "}
                                    >
                                      <option value="">كود</option>
                                      {codes.map((e: any) => (
                                        <option key={e.id} value={e.code_phone}>
                                          {e.code_phone}
                                        </option>
                                      ))}
                                    </Field>
                                  </div>
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
                            <div className="col-md-6">
                              <div className="timlands-form">
                                <label
                                  className="label-block"
                                  htmlFor="currency"
                                >
                                  اختر عملة
                                </label>
                                <Field
                                  as="select"
                                  id="currency"
                                  name="currency"
                                  className={
                                    "timlands-inputs " +
                                    (validationsErrors &&
                                      validationsErrors.currency &&
                                      " has-error")
                                  }
                                >
                                  <option value="">الافتراضية</option>

                                  {currencies.map((e: any) => (
                                    <option
                                      key={e?.id}
                                      value={e?.symbol_native}
                                    >
                                      {e?.code}
                                    </option>
                                  ))}
                                </Field>
                                {validationsErrors &&
                                  validationsErrors.country_id && (
                                    <div style={{ overflow: "hidden" }}>
                                      <motion.div
                                        initial={{ y: -70, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        className="timlands-form-note form-note-error"
                                      >
                                        <p className="text">
                                          {validationsErrors.country_id[0]}
                                        </p>
                                      </motion.div>
                                    </div>
                                  )}
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
                                تحديث المعلومات اﻷساسية
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
                <ChangePass />
              </div>
            </div>
          </>
        )}
      </div>
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
export default personalInformations;
personalInformations.getLayout = function getLayout(page: any): ReactElement {
  return <Layout>{page}</Layout>;
};
