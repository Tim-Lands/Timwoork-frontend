import React, { ReactElement } from "react";
import Cookies from "js-cookie";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import API from "../../config";
import { motion } from "framer-motion";
import { message } from "antd";
import "antd/dist/antd.min.css";
import useSWR from "swr";
import { useAppSelector } from "@/store/hooks";

const NumberPhone = (): ReactElement => {
  const { data: userInfo }: any = useSWR("api/me");
  const { getAll } = useAppSelector((state) => state.languages);

  // Redirect to user home route if user is authenticated.
  const SignupSchema = Yup.object().shape({
    phone_number: Yup.number().required(getAll("This_field_is")),
  });
  // Return statement.
  return (
    <>
      {userInfo && userInfo.user_details.profile && (
        <Formik
          isInitialValid={true}
          initialValues={{
            phone_number: userInfo.user_details.phone || "",
          }}
          validationSchema={SignupSchema}
          onSubmit={async (values) => {
            try {
              let token = Cookies.get("token");
              if (!token && typeof window !== "undefined")
                token = localStorage.getItem("token");
              const res = await API.post("api/profiles/step_three", values, {
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
              <div className="login-panel number-phone update-form">
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

                  <div className="update-form-header">
                    <h1 className="title">{getAll("Update_phone_number")}</h1>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="timlands-form">
                        <label className="label-block" htmlFor="phone_number">
                          {getAll("Phone_number")}
                        </label>
                        <Field
                          id="phone_number"
                          name="phone_number"
                          placeholder={getAll("Phone_number")}
                          className="timlands-inputs"
                          autoComplete="off"
                        />
                        {errors.phone_number && touched.phone_number ? (
                          <div style={{ overflow: "hidden" }}>
                            <motion.div
                              initial={{ y: -70, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              className="timlands-form-note form-note-error"
                            >
                              <p className="text">{errors.phone_number}</p>
                            </motion.div>
                          </div>
                        ) : null}
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
                        {getAll("Update_phone_number")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};
export default NumberPhone;
