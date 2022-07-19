import API from "../../../../config";
import { motion } from "framer-motion";
import { ReactElement } from "react";
import PropTypes from "prop-types";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { LanguageContext } from "../../../../contexts/languageContext/context";
import { useContext } from "react";

const { getSectionLanguage } = useContext(LanguageContext);
const getAll = getSectionLanguage("all");
const getLogin = getSectionLanguage("login");
const SignupSchema = Yup.object().shape({
  name_ar: Yup.string().required(getLogin("This_field_is")),
  name_en: Yup.string().required(getLogin("This_field_is")),
  name_fr: Yup.string().required(getLogin("This_field_is")),
});
export default function AddNewTag({
  setIsModalHiddenHandle,
}: any): ReactElement {
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
          }}
          validationSchema={SignupSchema}
          onSubmit={async (values) => {
            try {
              const res = await API.post("dashboard/tags/store", values);
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
                        اسم الوسم بالعربي
                      </label>
                      <Field
                        id="name_ar"
                        name="name_ar"
                        placeholder="اسم الوسم بالعربي..."
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
                        اسم الوسم بالانجليزي
                      </label>
                      <Field
                        id="name_en"
                        name="name_en"
                        placeholder="اسم الوسم بالانجليزي..."
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
                        اسم الوسم بالفرنسي
                      </label>
                      <Field
                        id="name_fr"
                        name="name_fr"
                        placeholder="اسم الوسم بالفرنسي..."
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
AddNewTag.propTypes = {
  setIsModalHiddenHandle: PropTypes.func,
};
