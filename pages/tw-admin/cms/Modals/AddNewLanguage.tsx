import { motion } from "framer-motion";
import { ReactElement } from "react";
import PropTypes from "prop-types";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { LanguagestActions } from "@/store/tw-admin/languages/languagesActions";

export default function AddNewLanguage({
  setIsModalHiddenHandle,
}: any): ReactElement {
  const { getAll } = useAppSelector((state) => state.languages);
  const dispatch = useAppDispatch()


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
          }}
          validationSchema={Yup.object().shape({
            name_ar: Yup.string().required('getAll("This_field_is")'),
            name_en: Yup.string().required('getAll("This_field_is")'),
            name_fr: Yup.string().required('getAll("This_field_is")'),
          })}
          onSubmit={async (values) => {
            try {
              await dispatch(LanguagestActions.createOne({language: values}))
              setIsModalHiddenHandle()
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
                        اسم اللغة بالعربي
                      </label>
                      <Field
                        id="name_ar"
                        name="name_ar"
                        placeholder="اسم اللغة بالعربي..."
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
                        اسم اللغة بالانجليزي
                      </label>
                      <Field
                        id="name_en"
                        name="name_en"
                        placeholder="اسم اللغة بالانجليزي..."
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
                        اسم اللغة بالفرنسي
                      </label>
                      <Field
                        id="name_fr"
                        name="name_fr"
                        placeholder="اسم اللغة بالفرنسي..."
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
AddNewLanguage.propTypes = {
  setIsModalHiddenHandle: PropTypes.func,
};
