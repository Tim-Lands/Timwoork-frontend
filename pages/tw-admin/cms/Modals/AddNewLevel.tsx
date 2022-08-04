import API from "../../../../config";
import { motion } from "framer-motion";
import { ReactElement } from "react";
import PropTypes from "prop-types";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { LanguageContext } from "../../../../contexts/languageContext/context";
import { useContext } from "react";

export default function AddNewUser({
  setIsModalHiddenHandle,
}: any): ReactElement {
  const { getSectionLanguage } = useContext(LanguageContext);
  const getAll = getSectionLanguage();
  return (
    <>
      <div className="panel-modal-overlay"></div>
      <div className="panel-modal lg modal-add-new">
        <div className="panel-modal-header">
          <h2 className="title">
            <span className="material-icons material-icons-outlined">
              add_box
            </span>
            {getAll("Add_new")}
          </h2>
          <div className="panel-modal-left-tools">
            <button onClick={setIsModalHiddenHandle} className="close-modal">
              <span className="material-icons material-icons-outlined">
                close
              </span>
            </button>
          </div>
        </div>
        <Formik
          initialValues={{
            name_ar: "",
            name_en: "",
            name_fr: "",
            type: 1,
            number_developments: "",
            price_developments: "",
            number_sales: "",
            value_bayer: "",
          }}
          validationSchema={Yup.object().shape({
            name_ar: Yup.string().required(getAll("This_field_is")),
            name_en: Yup.string().required(getAll("This_field_is")),
            name_fr: Yup.string().required(getAll("This_field_is")),
            type: Yup.number().required(getAll("This_field_is")),
            number_developments: Yup.number()
              .lessThan(127, "عدد التطويرات لا يتعدى 127")
              .required(getAll("This_field_is")),
            price_developments: Yup.number().required(getAll("This_field_is")),
            number_sales: Yup.number().required(getAll("This_field_is")),
            value_bayer: Yup.number().required(getAll("This_field_is")),
          })}
          onSubmit={async (values) => {
            try {
              const res = await API.post("dashboard/levels/store", values);
              // If Activate Network
              // Authentication was successful.
              if (res.status == 201 || res.status == 200) {
                //alert(getAll("Added_successfully"))
                setIsModalHiddenHandle();
              } else {
                alert("Error");
              }
            } catch (error) {
              alert("Error Network");
            }
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <div
                className={
                  "panel-modal-body auto-height" +
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
                <div className="row">
                  <div className="col-sm-4">
                    <div className="timlands-form">
                      <label className="label-block" htmlFor="name_ar">
                        اسم المستوى بالعربي
                      </label>
                      <Field
                        id="name_ar"
                        name="name_ar"
                        placeholder="اسم المستوى بالعربي..."
                        className="timlands-inputs"
                        autoComplete="off"
                      />
                      {errors.name_ar && touched.name_ar ? (
                        <div style={{ overflow: "hidden" }}>
                          <motion.div
                            initial={{ y: -70, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="timlands-form-note form-note-error"
                          >
                            <p className="text">{errors.name_ar}</p>
                          </motion.div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="timlands-form">
                      <label className="label-block" htmlFor="name_en">
                        اسم المستوى بالانجليزي
                      </label>
                      <Field
                        id="name_en"
                        name="name_en"
                        placeholder="اسم المستوى بالانجليزي..."
                        className="timlands-inputs"
                        autoComplete="off"
                      />
                      {errors.name_en && touched.name_en ? (
                        <div style={{ overflow: "hidden" }}>
                          <motion.div
                            initial={{ y: -70, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="timlands-form-note form-note-error"
                          >
                            <p className="text">{errors.name_en}</p>
                          </motion.div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="timlands-form">
                      <label className="label-block" htmlFor="name_fr">
                        اسم المستوى بالفرنسي
                      </label>
                      <Field
                        id="name_fr"
                        name="name_fr"
                        placeholder="اسم المستوى بالفرنسي..."
                        className="timlands-inputs"
                        autoComplete="off"
                      />
                      {errors.name_fr && touched.name_fr ? (
                        <div style={{ overflow: "hidden" }}>
                          <motion.div
                            initial={{ y: -70, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="timlands-form-note form-note-error"
                          >
                            <p className="text">{errors.name_fr}</p>
                          </motion.div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="timlands-form">
                      <label className="label-block" htmlFor="input-state">
                        اختر نوع المستوى
                      </label>
                      <Field
                        as="select"
                        id="input-state"
                        name="address.state"
                        className="timlands-inputs select"
                      >
                        <option value="">اختر نوع المستوى</option>
                        <option value={1}>{getAll("Seller")}</option>
                        <option value={0}>{getAll("Buyer")}</option>
                      </Field>
                      {errors.type && touched.type ? (
                        <div style={{ overflow: "hidden" }}>
                          <motion.div
                            initial={{ y: -70, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="timlands-form-note form-note-error"
                          >
                            <p className="text">{errors.type}</p>
                          </motion.div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="timlands-form">
                      <label className="label-block" htmlFor="value_bayer">
                        القيمة الشرائية
                      </label>
                      <Field
                        id="value_bayer"
                        name="value_bayer"
                        placeholder="القيمة الشرائية..."
                        className="timlands-inputs"
                        autoComplete="off"
                      />
                      {errors.value_bayer && touched.value_bayer ? (
                        <div style={{ overflow: "hidden" }}>
                          <motion.div
                            initial={{ y: -70, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="timlands-form-note form-note-error"
                          >
                            <p className="text">{errors.value_bayer}</p>
                          </motion.div>
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="col-sm-4">
                    <div className="timlands-form">
                      <label className="label-block" htmlFor="number_sales">
                        عدد المبيعات{" "}
                      </label>
                      <Field
                        id="number_sales"
                        name="number_sales"
                        placeholder="عدد المبيعات ..."
                        className="timlands-inputs"
                      />
                      {errors.number_sales && touched.number_sales ? (
                        <div style={{ overflow: "hidden" }}>
                          <motion.div
                            initial={{ y: -70, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="timlands-form-note form-note-error"
                          >
                            <p className="text">{errors.number_sales}</p>
                          </motion.div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="timlands-form">
                      <label
                        className="label-block"
                        htmlFor="number_developments"
                      >
                        عدد التطويرات المسموح بها
                      </label>
                      <Field
                        id="number_developments"
                        name="number_developments"
                        placeholder="عدد التطويرات المسموح بها..."
                        className="timlands-inputs"
                      />
                      {errors.number_developments &&
                      touched.number_developments ? (
                        <div style={{ overflow: "hidden" }}>
                          <motion.div
                            initial={{ y: -70, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="timlands-form-note form-note-error"
                          >
                            <p className="text">{errors.number_developments}</p>
                          </motion.div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="timlands-form">
                      <label
                        className="label-block"
                        htmlFor="price_developments"
                      >
                        أعلى سعر للتطوير الواحد
                      </label>
                      <Field
                        id="price_developments"
                        name="price_developments"
                        placeholder="أعلى سعر للتطوير الواحد..."
                        className="timlands-inputs"
                      />
                      {errors.price_developments &&
                      touched.price_developments ? (
                        <div style={{ overflow: "hidden" }}>
                          <motion.div
                            initial={{ y: -70, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="timlands-form-note form-note-error"
                          >
                            <p className="text">{errors.price_developments}</p>
                          </motion.div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
              <div className="panel-modal-footer">
                <button
                  onClick={setIsModalHiddenHandle}
                  type="button"
                  className="btn butt-red butt-sm"
                >
                  {getAll("Cancel_2")}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn butt-primary butt-sm"
                >
                  {getAll("Save_edits")}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}
AddNewUser.propTypes = {
  setIsModalHiddenHandle: PropTypes.func,
};
