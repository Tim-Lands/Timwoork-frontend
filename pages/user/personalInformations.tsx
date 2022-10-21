import React, { ReactElement, useEffect, useState } from "react";
import Layout from "@/components/Layout/HomeLayout";
import { Field, Form, Formik } from "formik";
import API from "../../config";
import { motion } from "framer-motion";
import { message } from "antd";

import { CountriesService } from "@/services/countryService";
import Loading from "@/components/Loading";
import router from "next/router";
import UploadPicture from "@/components/Profile/UploadPicture";
import { useAppSelector } from "@/store/hooks";

import { MetaTags } from "@/components/SEO/MetaTags";
import ChangePass from "@/components/ChangePass";

const personalInformations = () => {
  const { getAll } = useAppSelector((state) => state.languages);
  const user = useAppSelector((state) => state.user);
  const profile = useAppSelector((state) => state.profile);
  const currency = useAppSelector((state) => state.currency);
  const [Countries, setCountries] = useState([]);
  const [codes, setCodes] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [validationsErrors, setValidationsErrors]: any = useState({});
  function setValidationsErrorsHandle() {
    setValidationsErrors({});
  }
  // Redirect to user home route if user is authenticated.
  useEffect(() => {
    API.get("/api/phone_codes")
      .then((data) => {
        setCodes(() => {
          return data.data.data;
        });
      })
      .catch(() => {});
    API.get("/api/currency")
      .then((data) => {
        setCurrencies(() => {
          return data.data.data;
        });
      })
      .catch(() => {});
    CountriesService.getAll()
      .then((data) => {
        setCountries(data);
      })
      .catch(() => {});
    if (!user.isLogged && !user.loading) {
      router.push("/login");
    }
  }, [user]);
  // Return statement.

  return (
    <>
      <MetaTags
        title={getAll("Profile_editing")}
        metaDescription={getAll("Profile_editing")}
        ogDescription={getAll("Profile_editing")}
      />
      {user.loading || (profile.loading && <Loading />)}
      <div className="container py-4">
        {user.isLogged && !user.loading && !profile.loading && (
          <>
            <div className="row justify-content-md-center">
              <div className="col-lg-9">
                <div className="my-3">
                  <UploadPicture avatarPicture={profile.avatar_path} />
                </div>
                <Formik
                  isInitialValid={true}
                  initialValues={{
                    first_name: profile.first_name,
                    last_name: profile.last_name,
                    username: user.username,
                    date_of_birth: profile.date_of_birth,
                    gender: profile.gender,
                    country_id: profile.country_id,
                    phone: user.phone,
                    currency_id: currency.my.id,
                    code_phone: user.code_phone,
                  }}
                  //validationSchema={SignupSchema}
                  onSubmit={async (values) => {
                    setValidationsErrors({});

                    try {
                      await API.post("api/profiles/step_one", {
                        ...values,
                      });
                      // Authentication was successful.
                      message.success(getAll("The_update_has"));
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
                            <h1 className="title">
                              {getAll("Edit_personal_information")}
                            </h1>
                          </div>
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
                                  onKeyUp={setValidationsErrorsHandle}
                                  placeholder={getAll("First_name")}
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
                                  {getAll("Last_name")}
                                </label>
                                <Field
                                  id="last_name"
                                  name="last_name"
                                  placeholder={getAll("Last_name")}
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
                                  {getAll("Username")}
                                </label>
                                <Field
                                  id="username"
                                  name="username"
                                  onKeyUp={setValidationsErrorsHandle}
                                  placeholder={getAll("Username")}
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
                                  {getAll("Select_sexe")}
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
                                  <option value="">
                                    {getAll("Select_sexe")}
                                  </option>
                                  <option value="0">{getAll("woman")}</option>
                                  <option value="1">{getAll("Man")}</option>
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
                                  {getAll("Birthday")}
                                </label>
                                <Field
                                  type="date"
                                  id="date_of_birth"
                                  name="date_of_birth"
                                  onKeyUp={setValidationsErrorsHandle}
                                  placeholder={getAll("Birthday")}
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
                                  {getAll("Select_country")}
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
                                  <option value="">
                                    {getAll("Select_country")}
                                  </option>
                                  {Countries.map((e: any) => (
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
                                  {getAll("Phone_number")}
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
                                  className={"registerPhone prof "}
                                >
                                  <Field
                                    id="phone"
                                    name="phone"
                                    onKeyUp={setValidationsErrorsHandle}
                                    placeholder={getAll("Phone_number")}
                                    // className={"timlands-inputs "}
                                    autoComplete="off"
                                  />
                                  <Field
                                    as="select"
                                    id="code"
                                    name="code_phone"
                                    // className={"timlands-inputs "}
                                  >
                                    <option value="">{getAll("Code")}</option>
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
                            <div className="col-md-6">
                              <div className="timlands-form">
                                <label
                                  className="label-block"
                                  htmlFor="currency"
                                >
                                  {getAll("Select_currency")}
                                </label>
                                <Field
                                  as="select"
                                  id="currency"
                                  name="currency_id"
                                  className={
                                    "timlands-inputs " +
                                    (validationsErrors &&
                                      validationsErrors.currency &&
                                      " has-error")
                                  }
                                >
                                  <option
                                    value={
                                      currencies?.find((e) => e.code == "USD")
                                        ?.id
                                    }
                                  >
                                    {getAll("Virtual")}
                                  </option>

                                  {currencies.map((e: any) => (
                                    <option key={e?.id} value={e?.id}>
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
                                {getAll("Update_basic_information")}
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
