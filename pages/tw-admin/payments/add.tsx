import { ReactElement, useState } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import API from "config";
import { motion } from "framer-motion";
import { MetaTags } from "@/components/SEO/MetaTags";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import { message } from "antd";
import router from "next/router";
import { useAppSelector } from "@/store/hooks";

function Countries(): ReactElement {
  const { getAll } = useAppSelector((state) => state.languages);

  const token = Cookies.get("token_dash");
  const [validationsErrors, setValidationsErrors]: any = useState({});
  const clearValidationHandle = () => {
    setValidationsErrors({});
  };
  const formik = useFormik({
    initialValues: {
      name_ar: "",
      name_en: "",
      precent_of_payment: "",
      value_of_cent: "",
    },
    isInitialValid: true,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        setValidationsErrors({});
        const res = await API.post(`dashboard/types_payments/store`, values, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Authentication was successful.
        if (res.status === 200) {
          message.success(getAll("The_gateaway_had"));
          router.push(`/tw-admin/payments`);
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
  // Return statement.
  return (
    <>
      <MetaTags
        title={getAll("General_administration_Add")}
        metaDescription={getAll("Home_Add_a")}
        ogDescription={getAll("Home_Add_a")}
      />
      <div className="timlands-panel">
        <div className="timlands-panel-header d-flex align-items-center">
          <h2 className="title">{getAll("Add_a_new")}</h2>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div
            className={
              "timlands-panel" + (formik.isSubmitting ? " is-loader" : "")
            }
          >
            <div className="timlands-content-form">
              <div className="row">
                <div className="col-md-6">
                  <div className="timlands-form">
                    <label className="label-block" htmlFor="input-name_ar">
                      {getAll("Gateway_name_in")}
                    </label>
                    <input
                      id="input-name_ar"
                      name="name_ar"
                      placeholder={getAll("Gateway_name_in")}
                      className={
                        "timlands-inputs " +
                        (validationsErrors &&
                          validationsErrors.name_ar &&
                          " has-error")
                      }
                      autoComplete="off"
                      onKeyUp={clearValidationHandle}
                      onChange={formik.handleChange}
                      value={formik.values.name_ar}
                    />
                    {validationsErrors && validationsErrors.name_ar && (
                      <div style={{ overflow: "hidden" }}>
                        <motion.div
                          initial={{ y: -70, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          className="timlands-form-note form-note-error"
                        >
                          <p className="text">{validationsErrors.name_ar[0]}</p>
                        </motion.div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="timlands-form">
                    <label className="label-block" htmlFor="input-name_en">
                      {getAll("Gateway_name_in_2")}
                    </label>
                    <input
                      id="input-name_en"
                      name="name_en"
                      placeholder={getAll("Gateway_name_in_2")}
                      className={
                        "timlands-inputs " +
                        (validationsErrors &&
                          validationsErrors.name_en &&
                          " has-error")
                      }
                      autoComplete="off"
                      onKeyUp={clearValidationHandle}
                      onChange={formik.handleChange}
                      value={formik.values.name_en}
                    />
                    {validationsErrors && validationsErrors.name_en && (
                      <div style={{ overflow: "hidden" }}>
                        <motion.div
                          initial={{ y: -70, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          className="timlands-form-note form-note-error"
                        >
                          <p className="text">{validationsErrors.name_en[0]}</p>
                        </motion.div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="timlands-form">
                    <label
                      className="label-block"
                      htmlFor="input-precent_of_payment"
                    >
                      {getAll("Deduction_rate")}
                    </label>
                    <input
                      id="input-precent_of_payment"
                      name="precent_of_payment"
                      placeholder={getAll("Deduction_rate")}
                      className={
                        "timlands-inputs " +
                        (validationsErrors &&
                          validationsErrors.precent_of_payment &&
                          " has-error")
                      }
                      autoComplete="off"
                      onKeyUp={clearValidationHandle}
                      onChange={formik.handleChange}
                      value={formik.values.precent_of_payment}
                    />
                    {validationsErrors && validationsErrors.precent_of_payment && (
                      <div style={{ overflow: "hidden" }}>
                        <motion.div
                          initial={{ y: -70, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          className="timlands-form-note form-note-error"
                        >
                          <p className="text">
                            {validationsErrors.precent_of_payment[0]}
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
                      htmlFor="input-value_of_cent"
                    >
                      {getAll("Cent_value")}
                    </label>
                    <input
                      id="input-value_of_cent"
                      name="value_of_cent"
                      placeholder={getAll("Cent_value")}
                      className={
                        "timlands-inputs " +
                        (validationsErrors &&
                          validationsErrors.value_of_cent &&
                          " has-error")
                      }
                      autoComplete="off"
                      onKeyUp={clearValidationHandle}
                      onChange={formik.handleChange}
                      value={formik.values.value_of_cent}
                    />
                    {validationsErrors && validationsErrors.value_of_cent && (
                      <div style={{ overflow: "hidden" }}>
                        <motion.div
                          initial={{ y: -70, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          className="timlands-form-note form-note-error"
                        >
                          <p className="text">
                            {validationsErrors.value_of_cent[0]}
                          </p>
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
                      className="btn flex-center butt-green ml-auto butt-sm"
                    >
                      <span className="text">{getAll("Save_edits")}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
Countries.getLayout = function getLayout(page: any): ReactElement {
  return <DashboardLayout>{page}</DashboardLayout>;
};
export default Countries;
