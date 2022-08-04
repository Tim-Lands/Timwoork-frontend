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
  const getAll = getSectionLanguage();
  return (
    <>
      <div className="panel-modal-overlay"></div>
      <div className="panel-modal modal-add-new">
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
            code_phone: 1,
          }}
          validationSchema={Yup.object().shape({
            name_ar: Yup.string().required(getAll("This_field_is")),
            name_en: Yup.string().required(getAll("This_field_is")),
            name_fr: Yup.string().required(getAll("This_field_is")),
            code_phone: Yup.number().required(getAll("This_field_is")),
          })}
          onSubmit={async (values) => {
            try {
              const res = await API.post("dashboard/countries/store", values);
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
                  <div className="col-sm-6">
                    <div className="timlands-form">
                      <label className="label-block" htmlFor="name_ar">
                        اسم الدولة بالعربي
                      </label>
                      <Field
                        id="name_ar"
                        name="name_ar"
                        placeholder="اسم الدولة بالعربي..."
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
                  <div className="col-sm-6">
                    <div className="timlands-form">
                      <label className="label-block" htmlFor="name_en">
                        اسم الدولة بالانجليزي
                      </label>
                      <Field
                        id="name_en"
                        name="name_en"
                        placeholder="اسم الدولة بالانجليزي..."
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
                  <div className="col-sm-6">
                    <div className="timlands-form">
                      <label className="label-block" htmlFor="name_fr">
                        اسم الدولة بالفرنسي
                      </label>
                      <Field
                        id="name_fr"
                        name="name_fr"
                        placeholder="اسم الدولة بالفرنسي..."
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
                  <div className="col-sm-6">
                    <div className="timlands-form">
                      <label className="label-block" htmlFor="code_phone">
                        رمز الدولة
                      </label>
                      <Field
                        id="code_phone"
                        name="code_phone"
                        placeholder="رمز الدولة..."
                        className="timlands-inputs"
                      />
                      {errors.code_phone && touched.code_phone ? (
                        <div style={{ overflow: "hidden" }}>
                          <motion.div
                            initial={{ y: -70, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="timlands-form-note form-note-error"
                          >
                            <p className="text">{errors.code_phone}</p>
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
AddNewCategory.propTypes = {
  setIsModalHiddenHandle: PropTypes.func,
};
