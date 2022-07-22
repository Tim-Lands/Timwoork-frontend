import Layout from "../../components/Layout/HomeLayout";
import { ReactElement, useState } from "react";
import { useFormik } from "formik";
import { message } from "antd";
import { motion } from "framer-motion";
import API from "../../config";
import PropTypes from "prop-types";
import useSWR from "swr";
import { Alert } from "../Alert/Alert";
import router from "next/router";
import { LanguageContext } from "../../contexts/languageContext/context";
import { useContext } from "react";

function MoneyAccount({ token, create, setIsShowBankTransfert }) {
  const { data: Countries }: any = useSWR("api/withdrawals/countries");
  const { data: userInfo }: any = useSWR("api/me");
  const [validationsErrors, setValidationsErrors]: any = useState({});
  const [validationsGeneral, setValidationsGeneral]: any = useState({});
  const UpdateMoney = async (values) => {
    try {
      const url = create
        ? "api/withdrawal/update_bank"
        : "api/withdrawal/store_bank";
      const res = await API.post(url, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Authentication was successful.
      if (res.status === 200) {
        message.success(getLogin("The_data_has"));
      }
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.errors) {
        setValidationsErrors(error.response.data.errors);
      }
      if (error.response && error.response.data) {
        setValidationsGeneral(error.response.data);
      }
    }
  };
  const clearValidationHandle = () => {
    setValidationsGeneral({});
    setValidationsErrors({});
  };
  const formik = useFormik({
    initialValues: {
      full_name:
        userInfo &&
        userInfo.user_details.profile.bank_account &&
        userInfo.user_details.profile.bank_account.full_name,
      wise_country_id:
        userInfo &&
        userInfo.user_details.profile.bank_account &&
        userInfo.user_details.profile.bank_account.wise_country_id,
      bank_swift:
        userInfo &&
        userInfo.user_details.profile.bank_account &&
        userInfo.user_details.profile.bank_account.bank_swift,
      bank_iban:
        userInfo &&
        userInfo.user_details.profile.bank_account &&
        userInfo.user_details.profile.bank_account.wise_country_id,
      bank_adress_line_one:
        userInfo &&
        userInfo.user_details.profile.bank_account &&
        userInfo.user_details.profile.bank_account.bank_adress_line_one,
      city:
        userInfo &&
        userInfo.user_details.profile.bank_account &&
        userInfo.user_details.profile.bank_account.city,
      state:
        userInfo &&
        userInfo.user_details.profile.bank_account &&
        userInfo.user_details.profile.bank_account.state,
      bank_name:
        userInfo &&
        userInfo.user_details.profile.bank_account &&
        userInfo.user_details.profile.bank_account.bank_name,
      phone_number_without_code:
        userInfo &&
        userInfo.user_details.profile.bank_account &&
        userInfo.user_details.profile.bank_account.wise_country_id,
      address_line_one:
        userInfo &&
        userInfo.user_details.profile.bank_account &&
        userInfo.user_details.profile.bank_account.address_line_one,
      code_postal:
        userInfo &&
        userInfo.user_details.profile.bank_account &&
        userInfo.user_details.profile.bank_account.code_postal,
      bank_number_account:
        userInfo &&
        userInfo.user_details.profile.bank_account &&
        userInfo.user_details.profile.bank_account.bank_number_account,
      bank_branch:
        userInfo &&
        userInfo.user_details.profile.bank_account &&
        userInfo.user_details.profile.bank_account.bank_branch,
    },
    isInitialValid: true,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        setValidationsErrors({});
        const url = create
          ? "api/withdrawals/update_bank"
          : "api/withdrawals/store_bank";
        const res = await API.post(url, values, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Authentication was successful.
        if (res.status === 200) {
          message.success(getLogin("The_withdrawal_request"));
          router.push("/mywallet");
        }
      } catch (error: any) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          setValidationsErrors(error.response.data.errors);
        }
        if (error.response && error.response.data) {
          setValidationsGeneral(error.response.data);
        }
      }
    },
  });
  // const noteContent = (
  //     <div>
  //         <ul>
  //             <li>من 5 دولار - 100 دولار مسموح له شراء الخدمة حتى 10 مرات</li>
  //             <li>من 101 دولار - 500 دولار مسموح له شراء الخدمة حتى 2 مره فقط للخدمة </li>
  //             <li>من 501 دولار - 1000 دولار مسموح له شراء الخدمة حتى 1 مره فقط</li>
  //         </ul>
  //     </div>
  // );
  const { getSectionLanguage } = useContext(LanguageContext);
  const getLogin = getSectionLanguage("login");
  const getAll = getSectionLanguage("all");
  return (
    <form onSubmit={formik.handleSubmit}>
      <div
        className={"timlands-panel" + (formik.isSubmitting ? " is-loader" : "")}
      >
        <div className="page-header d-flex">
          <h4 className="title me-auto">{getLogin("Bank_transfer")}</h4>
          {/* <button
            type="button"
            onClick={() => setIsShowBankTransfert(false)}
            className="btn-close ml-auto"
          ></button> */}
        </div>
        <div className="timlands-content-form">
          {validationsGeneral.msg && (
            <Alert type="error">{validationsGeneral.msg}</Alert>
          )}
          <div className="row">
            <div className="col-md-12">
              <div className="timlands-form">
                <label className="label-block" htmlFor="input-full_name">
                  {getLogin("Full_name")}
                </label>
                <input
                  id="input-full_name"
                  name="full_name"
                  placeholder={getLogin("Full_name")}
                  className={
                    "timlands-inputs " +
                    (validationsErrors &&
                      validationsErrors.full_name &&
                      " has-error")
                  }
                  autoComplete="off"
                  onKeyUp={clearValidationHandle}
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
                      <p className="text">{validationsErrors.full_name[0]}</p>
                    </motion.div>
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="timlands-form">
                <label className="label-block" htmlFor="input-bank_name">
                  {getLogin("Bank_name")}
                </label>
                <input
                  id="input-bank_name"
                  name="bank_name"
                  placeholder={getLogin("Bank_name")}
                  className={
                    "timlands-inputs " +
                    (validationsErrors &&
                      validationsErrors.bank_name &&
                      " has-error")
                  }
                  autoComplete="off"
                  onKeyUp={clearValidationHandle}
                  onChange={formik.handleChange}
                  value={formik.values.bank_name}
                />
                {validationsErrors && validationsErrors.bank_name && (
                  <div style={{ overflow: "hidden" }}>
                    <motion.div
                      initial={{ y: -70, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="timlands-form-note form-note-error"
                    >
                      <p className="text">{validationsErrors.bank_name[0]}</p>
                    </motion.div>
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="timlands-form">
                <label className="label-block" htmlFor="input-bank_swift">
                  {getLogin("SWIFT_code")}
                </label>
                <input
                  id="input-bank_swift"
                  name="bank_swift"
                  placeholder={getLogin("SWIFT_code")}
                  className={
                    "timlands-inputs " +
                    (validationsErrors &&
                      validationsErrors.bank_swift &&
                      " has-error")
                  }
                  autoComplete="off"
                  onKeyUp={clearValidationHandle}
                  onChange={formik.handleChange}
                  value={formik.values.bank_swift}
                />
                {validationsErrors && validationsErrors.bank_swift && (
                  <div style={{ overflow: "hidden" }}>
                    <motion.div
                      initial={{ y: -70, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="timlands-form-note form-note-error"
                    >
                      <p className="text">{validationsErrors.bank_swift[0]}</p>
                    </motion.div>
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="timlands-form">
                <label className="label-block" htmlFor="input-bank_iban">
                  {getLogin("IBAN")}
                </label>
                <input
                  id="input-bank_iban"
                  name="bank_iban"
                  placeholder={getLogin("IBAN")}
                  className={
                    "timlands-inputs " +
                    (validationsErrors &&
                      validationsErrors.bank_iban &&
                      " has-error")
                  }
                  autoComplete="off"
                  onKeyUp={clearValidationHandle}
                  onChange={formik.handleChange}
                  value={formik.values.bank_iban}
                />
                {validationsErrors && validationsErrors.bank_iban && (
                  <div style={{ overflow: "hidden" }}>
                    <motion.div
                      initial={{ y: -70, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="timlands-form-note form-note-error"
                    >
                      <p className="text">{validationsErrors.bank_iban[0]}</p>
                    </motion.div>
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="timlands-form">
                <label
                  className="label-block"
                  htmlFor="input-bank_number_account"
                >
                  {getLogin("Bank_account")}
                </label>
                <input
                  id="input-bank_number_account"
                  name="bank_number_account"
                  placeholder={getLogin("Bank_account")}
                  className={
                    "timlands-inputs " +
                    (validationsErrors &&
                      validationsErrors.bank_number_account &&
                      " has-error")
                  }
                  autoComplete="off"
                  onKeyUp={clearValidationHandle}
                  onChange={formik.handleChange}
                  value={formik.values.bank_number_account}
                />
                {validationsErrors && validationsErrors.bank_number_account && (
                  <div style={{ overflow: "hidden" }}>
                    <motion.div
                      initial={{ y: -70, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="timlands-form-note form-note-error"
                    >
                      <p className="text">
                        {validationsErrors.bank_number_account[0]}
                      </p>
                    </motion.div>
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="timlands-form">
                <label className="label-block" htmlFor="input-bank_branch">
                  {getLogin("Bank_branch")}
                </label>
                <input
                  id="input-bank_branch"
                  name="bank_branch"
                  placeholder={getLogin("Bank_branch")}
                  className={
                    "timlands-inputs " +
                    (validationsErrors &&
                      validationsErrors.bank_branch &&
                      " has-error")
                  }
                  autoComplete="off"
                  onKeyUp={clearValidationHandle}
                  onChange={formik.handleChange}
                  value={formik.values.bank_branch}
                />
                {validationsErrors && validationsErrors.bank_branch && (
                  <div style={{ overflow: "hidden" }}>
                    <motion.div
                      initial={{ y: -70, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="timlands-form-note form-note-error"
                    >
                      <p className="text">{validationsErrors.bank_branch[0]}</p>
                    </motion.div>
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="timlands-form">
                <label className="label-block" htmlFor="input-wise_country_id">
                  {getLogin("Select_country")}
                </label>
                <select
                  id="input-wise_country_id"
                  name="wise_country_id"
                  className={
                    "timlands-inputs select " +
                    (validationsErrors &&
                      validationsErrors.wise_country_id &&
                      " has-error")
                  }
                  autoComplete="off"
                  onChange={formik.handleChange}
                  value={formik.values.wise_country_id}
                >
                  <option value="">{getLogin("Select_country")}</option>
                  {!Countries && (
                    <option value="">{getAll("Please_wait")}</option>
                  )}
                  {Countries &&
                    Countries.data.map((e: any) => (
                      <option value={e.id} key={e.id}>
                        {e.ar_name}
                      </option>
                    ))}
                </select>
                {validationsErrors && validationsErrors.wise_country_id && (
                  <div style={{ overflow: "hidden" }}>
                    <motion.div
                      initial={{ y: -70, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="timlands-form-note form-note-error"
                    >
                      <p className="text">
                        {validationsErrors.wise_country_id[0]}
                      </p>
                    </motion.div>
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="timlands-form">
                <label className="label-block" htmlFor="input-state">
                  {getLogin("Province_state")}
                </label>
                <input
                  id="input-state"
                  name="state"
                  placeholder={getLogin("Province_state")}
                  className={
                    "timlands-inputs " +
                    (validationsErrors &&
                      validationsErrors.state &&
                      " has-error")
                  }
                  autoComplete="off"
                  onKeyUp={clearValidationHandle}
                  onChange={formik.handleChange}
                  value={formik.values.state}
                />
                {validationsErrors && validationsErrors.state && (
                  <div style={{ overflow: "hidden" }}>
                    <motion.div
                      initial={{ y: -70, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="timlands-form-note form-note-error"
                    >
                      <p className="text">{validationsErrors.state[0]}</p>
                    </motion.div>
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="timlands-form">
                <label className="label-block" htmlFor="input-city">
                  {getLogin("City_Municipality")}
                </label>
                <input
                  id="input-city"
                  name="city"
                  placeholder={getLogin("City_Municipality")}
                  className={
                    "timlands-inputs " +
                    (validationsErrors &&
                      validationsErrors.city &&
                      " has-error")
                  }
                  autoComplete="off"
                  onKeyUp={clearValidationHandle}
                  onChange={formik.handleChange}
                  value={formik.values.city}
                />
                {validationsErrors && validationsErrors.city && (
                  <div style={{ overflow: "hidden" }}>
                    <motion.div
                      initial={{ y: -70, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="timlands-form-note form-note-error"
                    >
                      <p className="text">{validationsErrors.city[0]}</p>
                    </motion.div>
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-12">
              <div className="timlands-form">
                <label
                  className="label-block"
                  htmlFor="input-bank_adress_line_one"
                >
                  {getLogin("Bank_address")}
                </label>
                <input
                  id="input-bank_adress_line_one"
                  name="bank_adress_line_one"
                  placeholder={getLogin("Bank_address")}
                  className={
                    "timlands-inputs " +
                    (validationsErrors &&
                      validationsErrors.bank_adress_line_one &&
                      " has-error")
                  }
                  autoComplete="off"
                  onKeyUp={clearValidationHandle}
                  onChange={formik.handleChange}
                  value={formik.values.bank_adress_line_one}
                />
                {validationsErrors && validationsErrors.bank_adress_line_one && (
                  <div style={{ overflow: "hidden" }}>
                    <motion.div
                      initial={{ y: -70, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="timlands-form-note form-note-error"
                    >
                      <p className="text">
                        {validationsErrors.bank_adress_line_one[0]}
                      </p>
                    </motion.div>
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-8">
              <div className="timlands-form">
                <label className="label-block" htmlFor="input-address_line_one">
                  {getLogin("Personal_address")}
                </label>
                <input
                  id="input-address_line_one"
                  name="address_line_one"
                  placeholder={getLogin("Personal_address")}
                  className={
                    "timlands-inputs " +
                    (validationsErrors &&
                      validationsErrors.address_line_one &&
                      " has-error")
                  }
                  autoComplete="off"
                  onKeyUp={clearValidationHandle}
                  onChange={formik.handleChange}
                  value={formik.values.address_line_one}
                />
                {validationsErrors && validationsErrors.address_line_one && (
                  <div style={{ overflow: "hidden" }}>
                    <motion.div
                      initial={{ y: -70, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="timlands-form-note form-note-error"
                    >
                      <p className="text">
                        {validationsErrors.address_line_one[0]}
                      </p>
                    </motion.div>
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-4">
              <div className="timlands-form">
                <label className="label-block" htmlFor="input-code_postal">
                  {getLogin("Postal_code")}
                </label>
                <input
                  id="input-code_postal"
                  name="code_postal"
                  placeholder={getLogin("Postal_code")}
                  className={
                    "timlands-inputs " +
                    (validationsErrors &&
                      validationsErrors.code_postal &&
                      " has-error")
                  }
                  autoComplete="off"
                  onKeyUp={clearValidationHandle}
                  onChange={formik.handleChange}
                  value={formik.values.code_postal}
                />
                {validationsErrors && validationsErrors.code_postal && (
                  <div style={{ overflow: "hidden" }}>
                    <motion.div
                      initial={{ y: -70, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="timlands-form-note form-note-error"
                    >
                      <p className="text">{validationsErrors.code_postal[0]}</p>
                    </motion.div>
                  </div>
                )}
              </div>
            </div>

            <div className="col-md-12">
              <div className="timlands-form">
                <label
                  className="label-block"
                  htmlFor="input-phone_number_without_code"
                >
                  {getLogin("Recipient’s_phone_number")}
                </label>
                <input
                  id="input-phone_number_without_code"
                  name="phone_number_without_code"
                  placeholder={getLogin("Recipient’s_phone_number")}
                  className={
                    "timlands-inputs " +
                    (validationsErrors &&
                      validationsErrors.phone_number_without_code &&
                      " has-error")
                  }
                  autoComplete="off"
                  onKeyUp={clearValidationHandle}
                  onChange={formik.handleChange}
                  value={formik.values.phone_number_without_code}
                />
                {validationsErrors &&
                  validationsErrors.phone_number_without_code && (
                    <div style={{ overflow: "hidden" }}>
                      <motion.div
                        initial={{ y: -70, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="timlands-form-note form-note-error"
                      >
                        <p className="text">
                          {validationsErrors.phone_number_without_code[0]}
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
                  onClick={() => UpdateMoney(formik.values)}
                  className="btn flex-center butt-green me-auto butt-lg"
                >
                  <span className="text">{getLogin("Save_edits")}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsShowBankTransfert(false)}
                  className="btn flex-center butt-red ml-auto butt-lg"
                >
                  <span className="text">{getLogin("Hide_edit")}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
MoneyAccount.getLayout = function getLayout(page: any): ReactElement {
  return <Layout>{page}</Layout>;
};
export default MoneyAccount;
MoneyAccount.propTypes = {
  token: PropTypes.any,
  setIsShowBankTransfert: PropTypes.func,
  create: PropTypes.any,
};
