import { ReactElement, useState } from "react";
import { useFormik } from "formik";
import { message } from "antd";
import { motion } from "framer-motion";
import Layout from "@/components/Layout/HomeLayout";
import API from "../config";
import { MetaTags } from "@/components/SEO/MetaTags";

function Overview() {
  const [validationsErrors, setValidationsErrors]: any = useState({});
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
          message.success("لقد تم التحديث بنجاح");
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
        title="اتصل بنا"
        metaDescription="اتصل بنا - تيموورك"
        ogDescription="اتصل بنا - تيموورك"
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
                  <h2 className="title">اتصل بنا</h2>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="timlands-form">
                      <label className="label-block" htmlFor="input-subject">
                        عنوان الرسالة
                      </label>
                      <input
                        id="input-subject"
                        name="subject"
                        placeholder="عنوان الرسالة..."
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
                        البريد الإلكتروني
                      </label>
                      <input
                        id="input-email"
                        name="email"
                        placeholder="البريد الإلكتروني..."
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
                        رقم الهاتف *
                      </label>
                      <input
                        id="input-phone"
                        name="phoneNumber"
                        placeholder="رقم الهاتف..."
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
                        الاسم الكامل
                      </label>
                      <input
                        id="input-full_name"
                        name="full_name"
                        placeholder="الاسم الكامل..."
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
                        اختر نوع الرسالة
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
                        <option value="">اختر نوع الرسالة</option>
                        <option value="0">شكوى</option>
                        <option value="1">استفسار</option>
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
                        نص الرسالة
                      </label>
                      <textarea
                        id="input-message"
                        name="message"
                        onChange={formik.handleChange}
                        value={formik.values.message}
                        placeholder="نص الرسالة..."
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
                        رابط الملف *
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
                        <span className="text">إرسال المعلومات</span>
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
