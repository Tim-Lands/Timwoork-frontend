import API from "../../../../config";
import { motion } from "framer-motion";
import { ReactElement } from "react";
import PropTypes from "prop-types";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { LanguageContext } from "../../../../contexts/languageContext/context";
import { useContext } from "react";

export default function AddNewCategory({
  setIsModalHiddenHandle,
}: any): ReactElement {
  const { getSectionLanguage } = useContext(LanguageContext);
  const getAll = getSectionLanguage("all");
  const getLogin = getSectionLanguage("login");
  return (
    <>
      <div className="panel-modal-overlay"></div>
      <div className="panel-modal lg modal-add-new">
        <div className="panel-modal-header">
          <h2 className="title">
            <span className="material-icons material-icons-outlined">
              add_box
            </span>
            {getLogin("Add_new")}
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
            description_ar: "",
            description_en: "",
            description_fr: "",
            icon: "",
          }}
          validationSchema={Yup.object().shape({
            name_ar: Yup.string().required(getLogin("This_field_is")),
            name_en: Yup.string().required(getLogin("This_field_is")),
            name_fr: Yup.string().required(getLogin("This_field_is")),
            description_ar: Yup.string()
              .min(8, "يجب أن يكون عدد الحروف أكثر من 8")
              .required(getLogin("This_field_is")),
            description_en: Yup.string()
              .min(8, "يجب أن يكون عدد الحروف أكثر من 8")
              .required(getLogin("This_field_is")),
            description_fr: Yup.string()
              .min(8, "يجب أن يكون عدد الحروف أكثر من 8")
              .required(getLogin("This_field_is")),
            icon: Yup.string().required(getLogin("This_field_is")),
          })}
          onSubmit={async (values) => {
            try {
              const res = await API.post("dashboard/categories/store", values);
              // If Activate Network
              // Authentication was successful.
              if (res.status == 201 || res.status == 200) {
                //alert(getLogin("Added_successfully"))
                setIsModalHiddenHandle();
              } else {
                alert("Error");
              }
            } catch (error) {
              alert("Error Network");
            }
          }}
        >
          {({ errors, touched, isSubmitting, handleChange, values }) => (
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
                        اسم الصنف بالعربي
                      </label>
                      <Field
                        id="name_ar"
                        name="name_ar"
                        placeholder="اسم الصنف بالعربي..."
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
                        اسم الصنف بالانجليزي
                      </label>
                      <Field
                        id="name_en"
                        name="name_en"
                        placeholder="اسم الصنف بالانجليزي..."
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
                        اسم الصنف بالفرنسي
                      </label>
                      <Field
                        id="name_fr"
                        name="name_fr"
                        placeholder="اسم الصنف بالفرنسي..."
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
                      <label className="label-block" htmlFor="description_ar">
                        الوصف بالعربي
                      </label>
                      <Field
                        as="textarea"
                        id="description_ar"
                        name="description_ar"
                        placeholder="الوصف بالعربي..."
                        className="timlands-inputs"
                      ></Field>
                      {errors.description_ar && touched.description_ar ? (
                        <div style={{ overflow: "hidden" }}>
                          <motion.div
                            initial={{ y: -70, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="timlands-form-note form-note-error"
                          >
                            <p className="text">{errors.description_ar}</p>
                          </motion.div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="timlands-form">
                      <label className="label-block" htmlFor="description_en">
                        الوصف بالإنجليزي
                      </label>
                      <Field
                        as="textarea"
                        id="description_en"
                        name="description_en"
                        placeholder="الوصف بالإنجليزي..."
                        className="timlands-inputs"
                      ></Field>
                      {errors.description_en && touched.description_en ? (
                        <div style={{ overflow: "hidden" }}>
                          <motion.div
                            initial={{ y: -70, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="timlands-form-note form-note-error"
                          >
                            <p className="text">{errors.description_en}</p>
                          </motion.div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="timlands-form">
                      <label className="label-block" htmlFor="description_fr">
                        الوصف بالفرنسي
                      </label>
                      <Field
                        as="textarea"
                        id="description_fr"
                        name="description_fr"
                        placeholder="الوصف بالفرنسي..."
                        className="timlands-inputs"
                      ></Field>
                      {errors.description_fr && touched.description_fr ? (
                        <div style={{ overflow: "hidden" }}>
                          <motion.div
                            initial={{ y: -70, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="timlands-form-note form-note-error"
                          >
                            <p className="text">{errors.description_fr}</p>
                          </motion.div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <div className="timlands-form">
                      <label className="label-block" htmlFor="icon">
                        أيقونة الصنف
                      </label>
                      <Field
                        as="select"
                        id="icon"
                        name="icon"
                        className="timlands-inputs"
                        onChange={handleChange}
                      >
                        <option value="bookmark_border">bookmark_border</option>
                        <option value="description">description</option>
                        <option value="account_circle">account_circle</option>
                        <option value="favorite_border">favorite_border</option>
                        <option value="dashboard">dashboard</option>
                        <option value="fact_check">fact_check</option>
                        <option value="question_answer">question_answer</option>
                        <option value="verified_user">verified_user</option>
                        <option value="code">code</option>
                        <option value="settings">settings</option>
                        <option value="analytics">analytics</option>
                        <option value="account_tree">account_tree</option>
                        <option value="headphones">headphones</option>
                        <option value="ondemand_video">ondemand_video</option>
                        <option value="rate_review">rate_review</option>
                        <option value="connected_tv">connected_tv</option>
                        <option value="view_in_ar">view_in_ar</option>
                        <option value="business">business</option>
                        <option value="volunteer_activism">
                          volunteer_activism
                        </option>
                      </Field>
                      <div className="icon-preview">
                        <span className="material-icons material-icons-outlined">
                          {values.icon}
                        </span>
                      </div>
                      {errors.icon && touched.icon ? (
                        <div style={{ overflow: "hidden" }}>
                          <motion.div
                            initial={{ y: -70, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="timlands-form-note form-note-error"
                          >
                            <p className="text">{errors.icon}</p>
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
                  {getLogin("Save_edits")}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}
AddNewCategory.propTypes = {
  setIsModalHiddenHandle: PropTypes.func,
};
