import Layout from "@/components/Layout/HomeLayout";
import { Result, message, Spin } from "antd";
import React, { ReactElement, useState, useEffect } from "react";
import Link from "next/link";
import API from "../../config";
import Loading from "@/components/Loading";
import { useAppSelector } from "@/store/hooks";
import router from "next/router";

import { Field, Form, Formik } from "formik";
import { motion } from "framer-motion";

function ChangePass() {
  const { getAll } = useAppSelector((state) => state.languages);
  const user = useAppSelector((state) => state.user);
  const profile = useAppSelector((state) => state.profile);
  useEffect(() => {
    if (!user.isLogged && !user.loading) {
      router.push("/login");
      return;
    }
  }, [user]);
  if (profile.steps < 1)
    return (
      <div className="row justify-content-md-center">
        <div className="col-md-5">
          <Result
            status="warning"
            title={getAll("Your_account_is")}
            subTitle={getAll("Your_account_is")}
            extra={
              <Link href="/user/personalInformations">
                <a className="btn butt-primary butt-md">
                  {getAll("Go_to_Edit")}
                </a>
              </Link>
            }
          />
        </div>
      </div>
    );
  const [validationsErrors, setValidationsErrors]: any = useState({});

  function setValidationsErrorsHandle() {
    setValidationsErrors({});
  }
  return (
    <>
      {user.loading && <Loading />}
      {user.isLogged && (
        <div className="timlands-profile-content">
          <Formik
            initialValues={{
              old_password: "",
              password: "",
              password_confirmation: "",
            }}
            onSubmit={async (values) => {
              setValidationsErrors({});
              try {
                await API.post("api/password/change", values);
                // Authentication was successful.
                message.success(getAll("The_password_has"));
                values.old_password = "";
                values.password_confirmation = "";
                values.password = "";
              } catch (error: any) {
                if (
                  error.response &&
                  error.response.data &&
                  error.response.data.errors
                ) {
                  setValidationsErrors(error.response.data.errors);
                }
              } //
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Spin spinning={isSubmitting}>
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
                      <label className="label-block" htmlFor="old_password">
                        {getAll("Old_password")}
                      </label>
                      <Field
                        type="password"
                        id="old_password"
                        onKeyUp={setValidationsErrorsHandle}
                        name="old_password"
                        disabled={isSubmitting}
                        placeholder={getAll("Old_password")}
                        className="timlands-inputs"
                        autoComplete="off"
                      />
                      {validationsErrors && validationsErrors.old_password && (
                        <div style={{ overflow: "hidden" }}>
                          <motion.div
                            initial={{ y: -70, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="timlands-form-note form-note-error"
                          >
                            <p className="text">
                              {validationsErrors.old_password[0]}
                            </p>
                          </motion.div>
                        </div>
                      )}
                    </div>
                    <div className="timlands-form">
                      <label className="label-block" htmlFor="password">
                        {getAll("New_password")}
                      </label>
                      <Field
                        type="password"
                        id="password"
                        name="password"
                        onKeyUp={setValidationsErrorsHandle}
                        disabled={isSubmitting}
                        placeholder={getAll("New_password")}
                        className="timlands-inputs"
                        autoComplete="off"
                      />
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
                    <div className="timlands-form">
                      <label
                        className="label-block"
                        htmlFor="password_confirmation"
                      >
                        {getAll("Confirm_new_password")}
                      </label>
                      <Field
                        type="password"
                        disabled={isSubmitting}
                        onKeyUp={setValidationsErrorsHandle}
                        id="password_confirmation"
                        name="password_confirmation"
                        placeholder={getAll("Confirm_new_password")}
                        className="timlands-inputs"
                        autoComplete="off"
                      />
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
                </Spin>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </>
  );
}

ChangePass.getLayout = function getLayout(page: any): ReactElement {
  return <Layout>{page}</Layout>;
};
export default ChangePass;
