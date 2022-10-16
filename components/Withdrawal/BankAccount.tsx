import Layout from "../../components/Layout/HomeLayout";
import { ReactElement, useState } from "react";
//import { useFormik } from 'formik';
import { message } from "antd";
import { motion } from "framer-motion";
import API from "../../config";
import PropTypes from "prop-types";
import useSWR from "swr";
import { Alert } from "../Alert/Alert";
import UploadImageForm from "../UploadImageForm";
import { useAppSelector } from "@/store/hooks";

function BankAccount({ token, create, setIsShowBankTransfert }: any) {
  const { data: Countries }: any = useSWR("dashboard/countries");
  const { data: userInfo }: any = useSWR("api/me");

  const [isLoading, setisLoading]: any = useState(false);

  const [full_name, setfull_name]: any = useState(
    userInfo &&
      userInfo.user_details.profile.bank_transfer_detail &&
      userInfo.user_details.profile.bank_transfer_detail.full_name
  );
  const [country_id, setcountry_id]: any = useState("");
  const [city, setcity]: any = useState(
    userInfo &&
      userInfo.user_details.profile.bank_transfer_detail &&
      userInfo.user_details.profile.bank_transfer_detail.city
  );
  const [id_type, setid_type]: any = useState(
    userInfo &&
      userInfo.user_details.profile.bank_transfer_detail &&
      userInfo.user_details.profile.bank_transfer_detail.id_type
  );
  const [state, setstate]: any = useState(
    userInfo &&
      userInfo.user_details.profile.bank_transfer_detail &&
      userInfo.user_details.profile.bank_transfer_detail.state
  );
  const [country_code_phone, setcountry_code_phone]: any = useState(
    userInfo &&
      userInfo.user_details.profile.bank_transfer_detail &&
      userInfo.user_details.profile.bank_transfer_detail.country_code_phone
  );
  const [phone_number_without_code, setphone_number_without_code]: any =
    useState(
      userInfo &&
        userInfo.user_details.profile.bank_transfer_detail &&
        userInfo.user_details.profile.bank_transfer_detail
          .phone_number_without_code
    );
  const [address_line_one, setaddress_line_one]: any = useState(
    userInfo &&
      userInfo.user_details.profile.bank_transfer_detail &&
      userInfo.user_details.profile.bank_transfer_detail.address_line_one
  );
  const [code_postal, setcode_postal]: any = useState(
    userInfo &&
      userInfo.user_details.profile.bank_transfer_detail &&
      userInfo.user_details.profile.bank_transfer_detail.code_postal
  );
  const [attachments, setattachments]: any = useState(null);

  const [validationsErrors, setValidationsErrors]: any = useState({});
  const [validationsGeneral, setValidationsGeneral]: any = useState({});
  const UpdateMoney = async (e) => {
    e.preventDefault();
    setisLoading(true);
    try {
      const formdata = new FormData();
      formdata.append("full_name", full_name);
      formdata.append("country_id", country_id);
      formdata.append("city", city);
      formdata.append("id_type", id_type);
      formdata.append("state", state);
      formdata.append("country_code_phone", country_code_phone);
      formdata.append("phone_number_without_code", phone_number_without_code);
      formdata.append("address_line_one", address_line_one);
      formdata.append("code_postal", code_postal);
      attachments &&
        attachments.forEach((attach) =>
          formdata.append("attachments[]", attach)
        );
      const url = create
        ? "api/withdrawals/update_bank_transfer"
        : "api/withdrawals/store_bank_transfer";
      const res = await API.post(url, formdata, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Authentication was successful.
      if (res.status === 200) {
        message.success(getAll("The_data_has"));
        setisLoading(false);
      }
    } catch (error: any) {
      setisLoading(false);
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
  const { getAll } = useAppSelector((state) => state.languages);

  return (
    <form onSubmit={UpdateMoney}>
      <div className={"timlands-panel" + (isLoading ? " is-loader" : "")}>
        <div className="page-header d-flex">
          <h4 className="title">{getAll("Money_orders")}</h4>
          {/* <button
            type="button"
            onClick={() => {
              setIsShowBankTransfert(false);
            }}
            className="btn-close ml-auto"
          ></button> */}
        </div>

        <div className="timlands-content-form">
          {validationsGeneral.msg && (
            <Alert type="error">{validationsGeneral.msg}</Alert>
          )}

          <div className="row">
            <div className="col-md-6">
              <div className="timlands-form">
                <label className="label-block" htmlFor="input-full_name">
                  {getAll("Full_name")}
                </label>
                <input
                  id="input-full_name"
                  name="full_name"
                  placeholder={getAll("Full_name")}
                  className={
                    "timlands-inputs " +
                    (validationsErrors &&
                      validationsErrors.full_name &&
                      " has-error")
                  }
                  autoComplete="off"
                  onKeyUp={clearValidationHandle}
                  onChange={(e) => setfull_name(e.target.value)}
                  value={full_name}
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
                <label className="label-block" htmlFor="input-country_id">
                  {getAll("Select_country")}
                </label>
                <select
                  id="input-country_id"
                  name="country_id"
                  className={
                    "timlands-inputs select " +
                    (validationsErrors &&
                      validationsErrors.country_id &&
                      " has-error")
                  }
                  autoComplete="off"
                  onChange={(e) => setcountry_id(e.target.value)}
                  value={country_id}
                >
                  <option value="">{getAll("Select_country")}</option>
                  {!Countries && (
                    <option value="">{getAll("Please_wait")}</option>
                  )}
                  {Countries &&
                    Countries.data.map((e: any) => (
                      <option value={e.id} key={e.id}>
                        {e.name_ar}
                      </option>
                    ))}
                </select>
                {validationsErrors && validationsErrors.country_id && (
                  <div style={{ overflow: "hidden" }}>
                    <motion.div
                      initial={{ y: -70, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="timlands-form-note form-note-error"
                    >
                      <p className="text">{validationsErrors.country_id[0]}</p>
                    </motion.div>
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="timlands-form">
                <label className="label-block" htmlFor="input-state">
                  {getAll("Province_state")}
                </label>
                <input
                  id="input-state"
                  name="state"
                  placeholder={getAll("Province_state")}
                  className={
                    "timlands-inputs " +
                    (validationsErrors &&
                      validationsErrors.state &&
                      " has-error")
                  }
                  autoComplete="off"
                  onKeyUp={clearValidationHandle}
                  onChange={(e) => setstate(e.target.value)}
                  value={state}
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
                  {getAll("City_Municipality")}
                </label>
                <input
                  id="input-city"
                  name="city"
                  placeholder={getAll("City_Municipality")}
                  className={
                    "timlands-inputs " +
                    (validationsErrors &&
                      validationsErrors.city &&
                      " has-error")
                  }
                  autoComplete="off"
                  onKeyUp={clearValidationHandle}
                  onChange={(e) => setcity(e.target.value)}
                  value={city}
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
            <div className="col-md-6">
              <div className="timlands-form">
                <label
                  className="label-block"
                  htmlFor="input-phone_number_without_code"
                >
                  {getAll("Recipient’s_phone_number")}
                </label>
                <input
                  id="input-phone_number_without_code"
                  name="phone_number_without_code"
                  placeholder={getAll("Recipient’s_phone_number")}
                  className={
                    "timlands-inputs " +
                    (validationsErrors &&
                      validationsErrors.phone_number_without_code &&
                      " has-error")
                  }
                  autoComplete="off"
                  onKeyUp={clearValidationHandle}
                  onChange={(e) => setphone_number_without_code(e.target.value)}
                  value={phone_number_without_code}
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
            <div className="col-md-6">
              <div className="timlands-form">
                <label
                  className="label-block"
                  htmlFor="input-phone_number_without_code"
                >
                  {getAll("Country_code")}
                </label>
                <input
                  placeholder={getAll("Countys_phone_code")}
                  className={
                    "timlands-inputs " +
                    (validationsErrors &&
                      validationsErrors.country_code_phone &&
                      " has-error")
                  }
                  autoComplete="off"
                  onKeyUp={clearValidationHandle}
                  value={country_code_phone}
                  type="text"
                  name="country_code_phone"
                  onChange={(e) => setcountry_code_phone(e.target.value)}
                />

                {validationsErrors && validationsErrors.country_code_phone && (
                  <div style={{ overflow: "hidden" }}>
                    <motion.div
                      initial={{ y: -70, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="timlands-form-note form-note-error"
                    >
                      <p className="text">
                        {validationsErrors.country_code_phone[0]}
                      </p>
                    </motion.div>
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-7">
              <div className="timlands-form">
                <label className="label-block" htmlFor="input-address_line_one">
                  {getAll("Personal_address")}
                </label>
                <input
                  id="input-address_line_one"
                  name="address_line_one"
                  placeholder={getAll("Personal_address")}
                  className={
                    "timlands-inputs " +
                    (validationsErrors &&
                      validationsErrors.address_line_one &&
                      " has-error")
                  }
                  autoComplete="off"
                  onKeyUp={clearValidationHandle}
                  onChange={(e) => setaddress_line_one(e.target.value)}
                  value={address_line_one}
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
            <div className="col-md-5">
              <div className="timlands-form">
                <label className="label-block" htmlFor="input-code_postal">
                  {getAll("Postal_code")}
                </label>
                <input
                  id="input-code_postal"
                  name="code_postal"
                  placeholder={getAll("Postal_code")}
                  className={
                    "timlands-inputs " +
                    (validationsErrors &&
                      validationsErrors.code_postal &&
                      " has-error")
                  }
                  autoComplete="off"
                  onKeyUp={clearValidationHandle}
                  onChange={(e) => setcode_postal(e.target.value)}
                  value={code_postal}
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
            <div className="col-md-4">
              <div className="timlands-form">
                <label className="label-block" htmlFor="input-id_type">
                  {getAll("Select_the_type")}
                </label>
                <select
                  id="input-id_type"
                  name="id_type"
                  className={
                    "timlands-inputs select " +
                    (validationsErrors &&
                      validationsErrors.id_type &&
                      " has-error")
                  }
                  autoComplete="off"
                  onChange={(e) => setid_type(e.target.value)}
                  value={id_type}
                >
                  <option value="">{getAll("Select_the_type")}</option>
                  <option value="0">{getAll("The_National_identity")}</option>
                  <option value="1">{getAll("Passeport")}</option>
                  <option value="2">{getAll("Other_documents_proving")}</option>
                </select>
                {validationsErrors && validationsErrors.id_type && (
                  <div style={{ overflow: "hidden" }}>
                    <motion.div
                      initial={{ y: -70, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="timlands-form-note form-note-error"
                    >
                      <p className="text">{validationsErrors.id_type[0]}</p>
                    </motion.div>
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-8">
              <div className="timlands-form">
                <label className="label-block" htmlFor="input-attachments">
                  {getAll("Attachments")}
                </label>

                <UploadImageForm
                  picture={attachments}
                  setPicture={setattachments}
                  validationsErrors={
                    validationsErrors &&
                    validationsErrors.attachments &&
                    validationsErrors.attachments[0]
                  }
                  src="/background.jpg"
                />
                <div className="app-form-note">
                  <div className="text">{getAll("The_profil_picture")}</div>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="py-4 d-flex">
                <button
                  type="submit"
                  disabled={isLoading}
                  onClick={UpdateMoney}
                  className="btn flex-center butt-green me-auto butt-lg"
                >
                  <span className="text">{getAll("Save_edits")}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsShowBankTransfert(false)}
                  className="btn flex-center butt-red ml-auto butt-lg"
                >
                  <span className="text">{getAll("Hide_edit")}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
BankAccount.getLayout = function getLayout(page: any): ReactElement {
  return <Layout>{page}</Layout>;
};
export default BankAccount;
BankAccount.propTypes = {
  token: PropTypes.any,
  setIsShowBankTransfert: PropTypes.func,
  create: PropTypes.any,
};
