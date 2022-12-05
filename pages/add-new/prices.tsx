import { ReactElement, useEffect, useState, useRef } from "react";
import { Field, FieldArray, Form, Formik } from "formik";
import { motion } from "framer-motion";
import Navbar from "components/productModify/navbar";
import Layout from "@/components/Layout/HomeLayout";
import router from "next/router";
import SidebarAdvices from "../../components/add-new/SidebarAdvices";
import { MyProductsActions } from "store/myProducts/myProductsActions";
import { useAppSelector, useAppDispatch } from "@/store/hooks";

import { message } from "antd";
import API from "../../config";
import { MetaTags } from "@/components/SEO/MetaTags";

import PropTypes from "prop-types";
import FormLangs from "@/components/Forms/FormLangs";
import FormModal from "@/components/Forms/FormModal";
import NavigationButtons from "@/components/NavigationButtons";
let testTime;
function Prices({ query }) {
  const dispatch = useAppDispatch();
  const getProduct = useAppSelector((state) => state.myProducts.product);
  const id = query.id;
  const ref = useRef(null);

  useEffect(() => {
    if (!id) return;
    if (getProduct.loaded && getProduct.id == id) return;
    dispatch(MyProductsActions.getProduct({ id: id }))
      .unwrap()
      .then(() => {})
      .catch(() => {
        router.push("/myproducts");
      });
  }, [id]);
  const [userLang, setUserLang] = useState();
  const [checkedLangs, setCheckedLangs] = useState({
    ar: false,
    fr: false,
    en: false,
  });
  const [selectedLang, setSelectedLang] = useState("");
  const [subtitles, setSubtitles]: any = useState([
    { ar: null, fr: null, en: null },
  ]);
  const [isSubtitle, setIsSubtitle] = useState([
    { ar: false, fr: false, en: false },
  ]);
  const {
    user,
    languages: { getAll },
  } = useAppSelector((state) => state);

  const [isShowenModal, setIsShowenModal] = useState(false);
  const [dvlpindex, setDvlpindex] = useState(0);
  const stepsView = useRef(null);
  const [validationsErrors, setValidationsErrors]: any = useState({});
  const veriedEmail = user.email_verified;
  const clearValidationHandle = () => {
    setValidationsErrors({});
  };

  const allowOnlyNumericsOrDigits = (evt) => {
    const financialGoal = evt.target.validity.valid
      ? evt.target.value
      : getProduct.price;
    dispatch(MyProductsActions.setPrice(financialGoal));
  };
  const allowOnlyNumericsOrDigitsDuration = (evt) => {
    const financialGoal = evt.target.validity.valid
      ? evt.target.value
      : getProduct.duration;
    dispatch(MyProductsActions.setDuration(financialGoal));
  };

  const addSubtitle = (subtitle) => {
    switch (selectedLang) {
      case "ar":
        setSubtitles([...subtitles, { ...subtitles[dvlpindex], ar: subtitle }]);
        break;
      case "en":
        setSubtitles([...subtitles, { ...subtitles[dvlpindex], en: subtitle }]);
        break;
      case "fr":
        setSubtitles([...subtitles, { ...subtitles[dvlpindex], fr: subtitle }]);
        break;
    }
  };

  useEffect(() => {
    stepsView.current && stepsView.current.scrollIntoView();

    if (!user.isLogged && !user.loading) {
      router.push("/login");
      return;
    }
  }, [user]);
  const detectLang = async (txt) => {
    const res = await API.post(`/api/detectLang`, { sentence: txt });
    setCheckedLangs({ ...checkedLangs, [res.data.data]: false });
    setUserLang(res.data.data);
  };

  const handleSubmit = async () => {
    const values = ref.current.values
    console.log(ref.current.values)
    setValidationsErrors({});
    try {
      values.developments.forEach((val, indx) => {
        if (!isSubtitle[indx]["ar"] && subtitles[indx]["ar"])
          val.title = subtitles["ar"];
        if (!isSubtitle[indx]["en"] && subtitles[indx]["en"])
          val.title = subtitles["en"];
        if (!isSubtitle[indx]["fr"] && subtitles[indx]["fr"])
          val.title = subtitles["fr"];
      });

      await dispatch(
        MyProductsActions.modifySteps({
          url: `api/product/${id}/product-step-two`,
          body: {
            ...values,
          },
          id,
        })
      ).unwrap();
      // Authentication was successful.
      message.success(getAll("The_update_has"));
      router.push({
        pathname: "/add-new/description",
        query: {
          id: id, // pass the id
        },
      });
    } catch (error: any) {
      if (error.errors) {
        setValidationsErrors(error.errors);
      }
    }
  }
  return (
    <>
      <MetaTags
        title="إضافة خدمة جديدة - السعر والمدة"
        metaDescription="إضافة خدمة جديدة - السعر والمدة "
        ogDescription="إضافة خدمة جديدة - السعر والمدة"
      />
      {user.token && veriedEmail && (
        <div className="container-fluid">
          <div
            className="row my-3"
            style={{ maxWidth: 1300, marginInline: "auto" }}
          >
            <div className="col-md-4">
              <SidebarAdvices />
            </div>
            <div className="col-md-8 pt-3">
              {isShowenModal && (
                <FormModal
                  isSwitchChecked={isSubtitle[selectedLang]}
                  onSwitch={() =>
                    setIsSubtitle({
                      ...isSubtitle,
                      [selectedLang]: !isSubtitle[selectedLang],
                    })
                  }
                  onSubmit={(txt) => addSubtitle(txt)}
                  setIsConfirmText={setIsShowenModal}
                />
              )}

              <Formik
                innerRef={ref}
                isInitialValid={true}
                initialValues={{
                  price: getProduct.price,
                  duration: getProduct.duration,
                  developments: getProduct.developments,
                }}
                enableReinitialize={true}
                onSubmit={handleSubmit}
              >
                {({ errors, touched, isSubmitting, values }) => (
                  <Form>
                    <div
                      className={
                        "timlands-panel " + (isSubmitting ? " is-loader" : "")
                      }
                    >
                      <Navbar active="price" navigate={false} url="" />

                      <div className="timlands-content-form ">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="timlands-form">
                              <label
                                className="label-block"
                                htmlFor="input-price"
                              >
                                {getAll("Service_price")}
                              </label>
                              <Field
                                id="input-price"
                                name="price"
                                maxLength={9}
                                onInput={allowOnlyNumericsOrDigits}
                                value={getProduct.price}
                                onChange={(e) => {
                                  dispatch(
                                    MyProductsActions.setPrice(e.target.value)
                                  );
                                }}
                                pattern="[0-9]*"
                                disabled={!getProduct ? true : false}
                                onKeyUp={clearValidationHandle}
                                className={
                                  "timlands-inputs " +
                                  (validationsErrors &&
                                    validationsErrors.price &&
                                    " has-error")
                                }
                              />
                              {validationsErrors && validationsErrors.price && (
                                <div style={{ overflow: "hidden" }}>
                                  <motion.div
                                    initial={{ y: -70, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    className="timlands-form-note form-note-error"
                                  >
                                    <p className="text">
                                      {validationsErrors.price[0]}
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
                                htmlFor="input-duration"
                              >
                                {getAll("Delivery_terme")}
                              </label>
                              <div className="rel-form">
                                <Field
                                  id="input-duration"
                                  maxLength={4}
                                  onInput={allowOnlyNumericsOrDigitsDuration}
                                  value={getProduct.duration}
                                  pattern="[0-9]*"
                                  name="duration"
                                  onChange={(e) => {
                                    dispatch(
                                      MyProductsActions.setDuration(
                                        e.target.value
                                      )
                                    );
                                  }}
                                  disabled={!getProduct ? true : false}
                                  onKeyUp={clearValidationHandle}
                                  className={
                                    "timlands-inputs select " +
                                    (validationsErrors &&
                                      validationsErrors.duration &&
                                      " has-error")
                                  }
                                  autoComplete="off"
                                />
                                <div className="timlands-form-label">
                                  <p className="text">{getAll("In_Days")}</p>
                                </div>
                              </div>
                              <motion.div
                                initial={{ y: -70, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="timlands-form-note"
                              >
                                <p className="text">
                                  {getAll("Choose_a_suitable")}
                                </p>
                              </motion.div>
                              {validationsErrors && validationsErrors.duration && (
                                <div style={{ overflow: "hidden" }}>
                                  <motion.div
                                    initial={{ y: -70, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    className="timlands-form-note form-note-error"
                                  >
                                    <p className="text">
                                      {validationsErrors.duration[0]}
                                    </p>
                                  </motion.div>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="timlands-form">
                              <label
                                className="label-block"
                                htmlFor="input-tags"
                              >
                                {getAll("Upgrades")}
                              </label>

                              <FieldArray
                                name="developments"
                                render={(arrayHelpers) => (
                                  <div>
                                    {values.developments &&
                                    values.developments !== null &&
                                    values.developments.length > 0
                                      ? values.developments &&
                                        values.developments.map(
                                          (development, index) => (
                                            <motion.div
                                              initial={{ y: -7, opacity: 0 }}
                                              exit={{ y: -7, opacity: 0 }}
                                              animate={{ y: 0, opacity: 1 }}
                                              className="develop-price"
                                              key={index}
                                            >
                                              <div className="row">
                                                <div className="col-sm-12">
                                                  {/* <FormLangsCheck /> */}
                                                  <div className="timlands-form">
                                                    <label
                                                      className="label-block"
                                                      htmlFor={
                                                        "input-name-" + index
                                                      }
                                                    >
                                                      {getAll(
                                                        "Development_title"
                                                      )}
                                                    </label>

                                                    <Field
                                                      id={"input-name-" + index}
                                                      placeholder={getAll(
                                                        "Development_title"
                                                      )}
                                                      onKeyUp={() => {
                                                        clearValidationHandle();
                                                        testTime = setTimeout(
                                                          () =>
                                                            detectLang(
                                                              values[
                                                                "developments"
                                                              ][index].title
                                                            ),
                                                          3000
                                                        );
                                                      }}
                                                      onKeyDown={() => {
                                                        clearTimeout(testTime);
                                                      }}
                                                      className={
                                                        "timlands-inputs " +
                                                        (validationsErrors &&
                                                          validationsErrors[
                                                            `developments.${index}.title`
                                                          ] &&
                                                          " has-error")
                                                      }
                                                      name={`developments[${index}].title`}
                                                    />
                                                    <FormLangs
                                                      onClick={(lang) => {
                                                        setIsShowenModal(true);
                                                        setSelectedLang(lang);
                                                        setDvlpindex(index);
                                                      }}
                                                      default_lang={userLang}
                                                    />
                                                    {/* <FormLangs /> */}
                                                    {validationsErrors &&
                                                      validationsErrors[
                                                        `developments.${index}.title`
                                                      ] && (
                                                        <div
                                                          style={{
                                                            overflow: "hidden",
                                                          }}
                                                        >
                                                          <motion.div
                                                            initial={{
                                                              y: -70,
                                                              opacity: 0,
                                                            }}
                                                            animate={{
                                                              y: 0,
                                                              opacity: 1,
                                                            }}
                                                            className="timlands-form-note form-note-error"
                                                          >
                                                            <p className="text">
                                                              {
                                                                validationsErrors[
                                                                  `developments.${index}.title`
                                                                ][0]
                                                              }
                                                            </p>
                                                          </motion.div>
                                                        </div>
                                                      )}
                                                  </div>
                                                </div>
                                                <div className="col-sm-6">
                                                  <div className="timlands-form">
                                                    <label
                                                      className="label-block"
                                                      htmlFor={
                                                        "input-price-" + index
                                                      }
                                                    >
                                                      {getAll(
                                                        "Development_price"
                                                      )}
                                                    </label>
                                                    <Field
                                                      id={
                                                        "input-price-" + index
                                                      }
                                                      placeholder={getAll(
                                                        "Development_price"
                                                      )}
                                                      onKeyUp={
                                                        clearValidationHandle
                                                      }
                                                      className={
                                                        "timlands-inputs " +
                                                        (validationsErrors &&
                                                          validationsErrors[
                                                            `developments.${index}.price`
                                                          ] &&
                                                          " has-error")
                                                      }
                                                      name={`developments[${index}].price`}
                                                    />
                                                    {validationsErrors &&
                                                      validationsErrors[
                                                        `developments.${index}.price`
                                                      ] && (
                                                        <div
                                                          style={{
                                                            overflow: "hidden",
                                                          }}
                                                        >
                                                          <motion.div
                                                            initial={{
                                                              y: -70,
                                                              opacity: 0,
                                                            }}
                                                            animate={{
                                                              y: 0,
                                                              opacity: 1,
                                                            }}
                                                            className="timlands-form-note form-note-error"
                                                          >
                                                            <p className="text">
                                                              {
                                                                validationsErrors[
                                                                  `developments.${index}.price`
                                                                ][0]
                                                              }
                                                            </p>
                                                          </motion.div>
                                                        </div>
                                                      )}
                                                  </div>
                                                </div>
                                                <div className="col-sm-6">
                                                  <div className="timlands-form with-label">
                                                    <label
                                                      className="label-block"
                                                      htmlFor={
                                                        "input-duration-" +
                                                        index
                                                      }
                                                    >
                                                      {getAll(
                                                        "Development_duration"
                                                      )}
                                                    </label>
                                                    <div className="rel-form">
                                                      <Field
                                                        type="number"
                                                        id="input-duration"
                                                        onKeyUp={
                                                          clearValidationHandle
                                                        }
                                                        name={`developments[${index}].duration`}
                                                        className={
                                                          "timlands-inputs " +
                                                          (validationsErrors &&
                                                            validationsErrors[
                                                              `developments.${index}.duration`
                                                            ] &&
                                                            " has-error")
                                                        }
                                                        autoComplete="off"
                                                      />
                                                      <div className="timlands-form-label">
                                                        <p className="text">
                                                          {getAll("In_Days")}
                                                        </p>
                                                      </div>
                                                    </div>
                                                    {validationsErrors &&
                                                      validationsErrors[
                                                        `developments.${index}.duration`
                                                      ] && (
                                                        <div
                                                          style={{
                                                            overflow: "hidden",
                                                          }}
                                                        >
                                                          <motion.div
                                                            initial={{
                                                              y: -70,
                                                              opacity: 0,
                                                            }}
                                                            animate={{
                                                              y: 0,
                                                              opacity: 1,
                                                            }}
                                                            className="timlands-form-note form-note-error"
                                                          >
                                                            <p className="text">
                                                              {
                                                                validationsErrors[
                                                                  `developments.${index}.duration`
                                                                ][0]
                                                              }
                                                            </p>
                                                          </motion.div>
                                                        </div>
                                                      )}
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="buttons-tools">
                                                <button
                                                  type="button"
                                                  className="formarray-butt del"
                                                  onClick={() =>
                                                    arrayHelpers.remove(index)
                                                  } // remove a friend from the list
                                                >
                                                  -
                                                </button>
                                              </div>
                                            </motion.div>
                                          )
                                        )
                                      : ""}
                                    {values.developments &&
                                    values.developments.length < 5 ? (
                                      <div className="product-devlopes-butt">
                                        <p className="product-devlopes-text">
                                          {getAll("Service_upgrades_are")}
                                        </p>
                                        <button
                                          type="button"
                                          className="btn add-devs-btn flex-center butt-primary butt-lg"
                                          onClick={() => arrayHelpers.push("")}
                                        >
                                          {/* show this when user has removed all friends from the list */}
                                          <span className="material-icons-outlined">
                                            post_add
                                          </span>{" "}
                                          {getAll("Click_to_add")}
                                        </button>
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                )}
                              />
                              {errors.developments && touched.developments ? (
                                <div style={{ overflow: "hidden" }}>
                                  <motion.div
                                    initial={{ y: -70, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    className="timlands-form-note form-note-error"
                                  >
                                    <p className="text">
                                      {errors.developments}
                                    </p>
                                  </motion.div>
                                </div>
                              ) : null}
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="py-4 d-flex">
                              <NavigationButtons onNextClick={handleSubmit} nextTitle={getAll('Next_step')} backTitle={getAll('Previous_step')}/>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default Prices;
Prices.getLayout = function getLayout(page): ReactElement {
  return <Layout>{page}</Layout>;
};

Prices.getInitialProps = ({ query }) => {
  return { query };
};
Prices.propTypes = {
  query: PropTypes.any,
};
