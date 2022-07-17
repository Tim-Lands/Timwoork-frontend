import axios from "axios";
import { motion } from "framer-motion";
import { ReactElement } from "react";
import PropTypes from "prop-types";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { LanguageContext } from "../../../../contexts/languageContext/context";
import { useContext } from "react";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const { getSectionLanguage } = useContext(LanguageContext);
const getAll = getSectionLanguage("all");
const getLogin = getSectionLanguage("login");

const SignupSchema = Yup.object().shape({
  password: Yup.string().required(getLogin("This_field_is")),
  repassword: Yup.string()
    .oneOf([Yup.ref("password"), null], getLogin("Passwords_are_not"))
    .required(getLogin("This_field_is")),
  username: Yup.string()
    .min(4, getLogin("This_fiels_is"))
    .max(30, getLogin("This_field_is_2"))
    .required(getLogin("This_field_is")),
  name: Yup.string()
    .min(4, getLogin("This_fiels_is"))
    .max(35, getLogin("This_field_is_2"))
    .required(getLogin("This_field_is")),
  email: Yup.string()
    .email(getLogin("Please_enter_a"))
    .max(60, getLogin("This_field_is_2"))
    .required(getLogin("This_field_is")),
  phone: Yup.string().matches(phoneRegExp, getLogin("This_is_not")),
});
export default function AddNewUser({
  setIsModalHiddenHandle,
}: any): ReactElement {
  return (
    <>
      <div className="panel-modal-overlay"></div>
      <div className="panel-modal modal-add-new">
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
            username: "",
            email: "",
            repassword: "",
            phone: "",
            name: "",
            password: "",
            address: {
              street: "",
              state: "",
            },
          }}
          validationSchema={SignupSchema}
          onSubmit={async (values) => {
            try {
              const res = await axios.post(
                "https://flexyapp.herokuapp.com/api/v1/users",
                values
              );
              // If Activate Network
              // Authentication was successful.
              if (res.status == 201 || res.status == 200) {
                alert(getLogin("Added_successfully"));
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
                      <label className="label-block" htmlFor="input-fname">
                        {getLogin("Full_name")}
                      </label>
                      <Field
                        id="input-fname"
                        name="name"
                        placeholder={getLogin("Full_name")}
                        className="timlands-inputs"
                        autoComplete="off"
                      />
                      {errors.name && touched.name ? (
                        <div style={{ overflow: "hidden" }}>
                          <motion.div
                            initial={{ y: -70, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="timlands-form-note form-note-error"
                          >
                            <p className="text">{errors.name}</p>
                          </motion.div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="timlands-form">
                      <label className="label-block" htmlFor="input-username">
                        {getLogin("Username")}
                      </label>
                      <Field
                        id="input-username"
                        name="username"
                        placeholder={getLogin("Username")}
                        className="timlands-inputs"
                        autoComplete="off"
                      />
                      {errors.username && touched.username ? (
                        <div style={{ overflow: "hidden" }}>
                          <motion.div
                            initial={{ y: -70, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="timlands-form-note form-note-error"
                          >
                            <p className="text">{errors.username}</p>
                          </motion.div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="timlands-form">
                      <label className="label-block" htmlFor="input-email">
                        {getLogin("E_mail")}
                      </label>
                      <Field
                        id="input-email"
                        name="email"
                        placeholder={getLogin("E_mail")}
                        className="timlands-inputs"
                        autoComplete="off"
                      />
                      {errors.email && touched.email ? (
                        <div style={{ overflow: "hidden" }}>
                          <motion.div
                            initial={{ y: -70, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="timlands-form-note form-note-error"
                          >
                            <p className="text">{errors.email}</p>
                          </motion.div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="timlands-form">
                      <label className="label-block" htmlFor="input-state">
                        {getLogin("Select_a_state")}
                      </label>
                      <Field
                        as="select"
                        id="input-state"
                        name="address.state"
                        className="timlands-inputs select"
                      >
                        <option value="">{getLogin("Select_a_state")}</option>
                        <option value="الجلفة">الجلفة</option>
                      </Field>
                      {errors.address?.state && touched.address?.state ? (
                        <div style={{ overflow: "hidden" }}>
                          <motion.div
                            initial={{ y: -70, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="timlands-form-note form-note-error"
                          >
                            <p className="text">{errors.address.street}</p>
                          </motion.div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="timlands-form">
                      <label className="label-block" htmlFor="input-street">
                        {getLogin("Address")}
                      </label>
                      <Field
                        id="input-street"
                        name="address.street"
                        placeholder={getLogin("Address")}
                        className="timlands-inputs"
                        autoComplete="off"
                      />
                      {errors.address?.street && touched.address?.street ? (
                        <div style={{ overflow: "hidden" }}>
                          <motion.div
                            initial={{ y: -70, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="timlands-form-note form-note-error"
                          >
                            <p className="text">{errors.address.street}</p>
                          </motion.div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="timlands-form">
                      <label className="label-block" htmlFor="input-phone">
                        {getLogin("Phone_number")}
                      </label>
                      <Field
                        id="input-phone"
                        name="phone"
                        placeholder={getLogin("Phone_number")}
                        className="timlands-inputs"
                      />
                      {errors.phone && touched.phone ? (
                        <div style={{ overflow: "hidden" }}>
                          <motion.div
                            initial={{ y: -70, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="timlands-form-note form-note-error"
                          >
                            <p className="text">{errors.phone}</p>
                          </motion.div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="timlands-form">
                      <label className="label-block" htmlFor="input-password">
                        {getLogin("Password")}
                      </label>
                      <Field
                        id="input-password"
                        type="password"
                        name="password"
                        placeholder={getLogin("Password")}
                        className="timlands-inputs"
                      />
                      {errors.password && touched.password ? (
                        <div style={{ overflow: "hidden" }}>
                          <motion.div
                            initial={{ y: -70, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="timlands-form-note form-note-error"
                          >
                            <p className="text">{errors.password}</p>
                          </motion.div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="timlands-form">
                      <label className="label-block" htmlFor="input-repassword">
                        {getLogin("Reset_password")}
                      </label>
                      <Field
                        type="password"
                        id="input-repassword"
                        name="repassword"
                        placeholder={getLogin("Reset_password")}
                        className="timlands-inputs"
                      />
                      {errors.repassword && touched.repassword ? (
                        <div style={{ overflow: "hidden" }}>
                          <motion.div
                            initial={{ y: -70, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="timlands-form-note form-note-error"
                          >
                            <p className="text">{errors.repassword}</p>
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
AddNewUser.propTypes = {
  setIsModalHiddenHandle: PropTypes.func,
};
