import { ReactElement, useState } from "react";
import { useAppSelector } from "@/store/hooks";

import { useFormik } from "formik";
import { message } from "antd";
import { motion } from "framer-motion";
import Layout from "@/components/Layout/HomeLayout";
import API from "../config";
import { MetaTags } from "@/components/SEO/MetaTags";

function Overview() {
  const [validationsErrors, setValidationsErrors]: any = useState({});
  const { getAll } = useAppSelector((state) => state.languages);

  const formik = useFormik({
    initialValues: {
      subject: "",
      email: "",
      full_name: "",
      message: "",
      type_message: "",
      url: "",
      phoneNumber: "",
    },
    isInitialValid: true,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        setValidationsErrors({});
        const res = await API.post(`api/contactus`, values);
        // Authentication was successful.
        if (res.status === 200) {
          message.success(getAll("The_update_has"));
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
    },
  });

  return (
    <>
      <MetaTags
        title={getAll("Contact_us")}
        metaDescription={getAll("Contact_us_Timwoork")}
        ogDescription={getAll("Contact_us_Timwoork")}
      />
      <div className="row justify-content-md-center">
        <div className="col-md-7 pt-3 mb-3">
          <form onSubmit={formik.handleSubmit}>
            <div
              className={
                "timlands-panel" + (formik.isSubmitting ? " is-loader" : "")
              }
            >
              <div className="timlands-content-form">
                <div className="page-header">
                  <h2 className="title">{getAll("Contact_us")}</h2>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="timlands-form">
                      <label className="label-block" htmlFor="input-subject">
                        {getAll("Object")}
                      </label>
                      <input
                        id="input-subject"
                        name="subject"
                        placeholder={getAll("Object")}
                        className={
                          "timlands-inputs " +
                          (validationsErrors &&
                            validationsErrors.subject &&
                            " has-error")
                        }
                        autoComplete="off"
                        onChange={formik.handleChange}
                        value={formik.values.subject}
                      />
                      {validationsErrors && validationsErrors.subject && (
                        <div style={{ overflow: "hidden" }}>
                          <motion.div
                            initial={{ y: -70, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="timlands-form-note form-note-error"
                          >
                            <p className="text">
                              {validationsErrors.subject[0]}
                            </p>
                          </motion.div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="timlands-form">
                      <label className="label-block" htmlFor="input-email">
                        {getAll("Email")}
                      </label>
                      <input
                        id="input-email"
                        name="email"
                        placeholder={getAll("Email")}
                        className={
                          "timlands-inputs " +
                          (validationsErrors &&
                            validationsErrors.email &&
                            " has-error")
                        }
                        autoComplete="off"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                      />
                      {validationsErrors && validationsErrors.email && (
                        <div style={{ overflow: "hidden" }}>
                          <motion.div
                            initial={{ y: -70, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="timlands-form-note form-note-error"
                          >
                            <p className="text">{validationsErrors.email[0]}</p>
                          </motion.div>
                        </div>
                      )}
                    </div>
                    <div className="timlands-form">
                      <label className="label-block" htmlFor="input-phone">
                        {getAll("Phone_number")} *
                      </label>
                      <input
                        id="input-phone"
                        name="phoneNumber"
                        placeholder={getAll("Phone_number")}
                        className={"timlands-inputs "}
                        autoComplete="off"
                        onChange={formik.handleChange}
                        value={formik.values.phoneNumber}
                      />
                    </div>
                  </div>
                  <div className="col-md-7">
                    <div className="timlands-form">
                      <label className="label-block" htmlFor="input-full_name">
                        {getAll("Complete_name")}
                      </label>
                      <input
                        id="input-full_name"
                        name="full_name"
                        placeholder={getAll("Complete_name")}
                        className={
                          "timlands-inputs " +
                          (validationsErrors &&
                            validationsErrors.full_name &&
                            " has-error")
                        }
                        autoComplete="off"
                        onChange={formik.handleChange}
                        value={formik.values.full_name}
                      />
                      {validationsErrors && validationsErrors.full_name && (
                        <div style={{ overflow: "hidden" }}>
                          <motion.div
                            initial={{ y: -70, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="timlands-form-note form-note-error"
                          >
                            <p className="text">
                              {validationsErrors.full_name[0]}
                            </p>
                          </motion.div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-5">
                    <div className="timlands-form">
                      <label
                        className="label-block"
                        htmlFor="input-type_message"
                      >
                        {getAll("Choose_the_message")}
                      </label>
                      <select
                        id="input-type_message"
                        name="type_message"
                        className={
                          "timlands-inputs select " +
                          (validationsErrors &&
                            validationsErrors.type_message &&
                            " has-error")
                        }
                        autoComplete="off"
                        onChange={formik.handleChange}
                        value={formik.values.type_message}
                      >
                        <option value="">
                          {" "}
                          {getAll("Choose_the_message")}
                        </option>
                        <option value="0">{getAll("Complaint")}</option>
                        <option value="1">{getAll("Inquiry")}</option>
                      </select>
                      {validationsErrors && validationsErrors.type_message && (
                        <div style={{ overflow: "hidden" }}>
                          <motion.div
                            initial={{ y: -70, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="timlands-form-note form-note-error"
                          >
                            <p className="text">
                              {validationsErrors.type_message[0]}
                            </p>
                          </motion.div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="timlands-form">
                      <label className="label-block" htmlFor="input-message">
                        {getAll("Message")}
                      </label>
                      <textarea
                        id="input-message"
                        name="message"
                        onChange={formik.handleChange}
                        value={formik.values.message}
                        placeholder={getAll("Message")}
                        className={
                          "timlands-inputs " +
                          (validationsErrors &&
                            validationsErrors.message &&
                            " has-error")
                        }
                        autoComplete="off"
                        style={{ height: 200 }}
                      ></textarea>
                      {validationsErrors && validationsErrors.message && (
                        <div style={{ overflow: "hidden" }}>
                          <motion.div
                            initial={{ y: -70, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="timlands-form-note form-note-error"
                          >
                            <p className="text">
                              {validationsErrors.message[0]}
                            </p>
                          </motion.div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="timlands-form">
                      <label className="label-block" htmlFor="input-url">
                        {getAll("File_link")}*
                      </label>
                      <input
                        id="input-url"
                        name="url"
                        dir="ltr"
                        placeholder="https://"
                        className={
                          "timlands-inputs " +
                          (validationsErrors &&
                            validationsErrors.url &&
                            " has-error")
                        }
                        autoComplete="off"
                        onChange={formik.handleChange}
                        value={formik.values.url}
                      />
                      {validationsErrors && validationsErrors.url && (
                        <div style={{ overflow: "hidden" }}>
                          <motion.div
                            initial={{ y: -70, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="timlands-form-note form-note-error"
                          >
                            <p className="text">{validationsErrors.url[0]}</p>
                          </motion.div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="py-4 d-flex">
                      <button
                        type="submit"
                        disabled={formik.isSubmitting}
                        className="btn flex-center butt-green mr-auto butt-sm"
                      >
                        <span className="text">
                          {getAll("Send_information")}
                        </span>
                        <span className="material-icons-outlined">
                          chevron_left
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
Overview.getLayout = function getLayout(page: any): ReactElement {
  return <Layout>{page}</Layout>;
};
export default Overview;
