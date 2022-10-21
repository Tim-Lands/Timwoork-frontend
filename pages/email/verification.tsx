import React, { ReactElement, useEffect, useState } from "react";
import Link from "next/link";
import router from "next/router";
import API from "../../config";
import { Field, Form, Formik } from "formik";
import { motion } from "framer-motion";
import { message } from "antd";
import Layout from "@/components/Layout/HomeLayout";
import { MetaTags } from "@/components/SEO/MetaTags";
import { useAppSelector } from "@/store/hooks";

function EmailConfig() {
  const { getAll } = useAppSelector((state) => state.languages);
  const user = useAppSelector((state) => state.user);

  const [validationsErrors, setValidationsErrors]: any = useState({});
  const veriedEmail = user.email_verified;
  useEffect(() => {
    if (!user.isLogged && !user.loading) {
      router.push("/login");
    }
    if (veriedEmail) {
      router.push("/");
    }
  }, [user]);
  return (
    <div className="row justify-content-md-center">
      <MetaTags
        title={getAll("E_mail_ctivation")}
        metaDescription={getAll("E_mail_ctivation")}
        ogDescription={getAll("E_mail_ctivation")}
      />
      <div className="col-lg-6 p-0">
        <Formik
          isInitialValid={true}
          initialValues={{
            email: user.email,
            code: "",
          }}
          enableReinitialize={true}
          onSubmit={async (values) => {
            setValidationsErrors({});
            try {
              const res = await API.post("api/email/verify", values);
              // Authentication was successful.
              if (res.status === 200) {
                message.success("تم التحقق بنجاح");
                router.push("/user/personalInformations");
              }
            } catch (error: any) {
              if (error.response && error.response.data) {
                setValidationsErrors(error.response.data);
              }
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="login-panel email-config mb-3">
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
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </motion.div>
                  )}
                  <h1 className="login-title-form">
                    {getAll("E_mail_ctivation")}
                  </h1>
                  <p className="login-text-form">
                    {getAll("Please_check_out")}
                  </p>
                  <div className="timlands-form">
                    <label className="label-block" htmlFor="code">
                      {getAll("Activation_code")}
                    </label>
                    <Field
                      id="code"
                      name="code"
                      placeholder="######"
                      className={
                        "timlands-inputs code " +
                        (validationsErrors &&
                          validationsErrors.msg &&
                          validationsErrors.errors &&
                          validationsErrors.errors.email &&
                          validationsErrors.errors.code &&
                          " has-error")
                      }
                      autoComplete="off"
                      disabled={isSubmitting}
                    />
                    {validationsErrors &&
                      validationsErrors.errors &&
                      validationsErrors.errors.code && (
                        <div style={{ overflow: "hidden" }}>
                          <motion.div
                            initial={{ y: -70, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="timlands-form-note form-note-error"
                          >
                            <p className="text">
                              {validationsErrors.errors.code[0]}
                            </p>
                          </motion.div>
                        </div>
                      )}
                    {validationsErrors &&
                      validationsErrors.errors &&
                      validationsErrors.errors.email &&
                      !validationsErrors.errors.code && (
                        <div style={{ overflow: "hidden" }}>
                          <motion.div
                            initial={{ y: -70, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="timlands-form-note form-note-error"
                          >
                            <p className="text">
                              {validationsErrors.errors.email[0]}
                            </p>
                          </motion.div>
                        </div>
                      )}
                    {validationsErrors && validationsErrors.msg && (
                      <div style={{ overflow: "hidden" }}>
                        <motion.div
                          initial={{ y: -70, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          className="timlands-form-note form-note-error"
                        >
                          <p className="text">{validationsErrors.msg}</p>
                        </motion.div>
                      </div>
                    )}
                    <button
                      type="button"
                      className="btn flex-center butt-sm butt-black me-auto"
                      onClick={async () => {
                        await API.post("api/email/resend", {
                          email: user.email,
                        });
                        message.success("تم الارسال بنجاح");
                      }}
                    >
                      <span className="material-icons material-icons-outlined">
                        replay
                      </span>{" "}
                      {getAll("Send_the_code")}
                    </button>
                  </div>
                  <div className="timlands-form confirm d-flex ">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn flex-center butt-md butt-primary "
                    >
                      <span className="material-icons material-icons-outlined">
                        check_circle_outline
                      </span>{" "}
                      {getAll("Confirm_e_mail")}
                    </button>
                    <Link href="/">
                      <a className="btn flex-center butt-md ml-auto">
                        <span className="material-icons material-icons-outlined">
                          home
                        </span>{" "}
                        {getAll("Back_to_Home")}
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
export default EmailConfig;

EmailConfig.getLayout = function getLayout(page: any): ReactElement {
  return <Layout>{page}</Layout>;
};
