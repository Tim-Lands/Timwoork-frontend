import Layout from "../../components/Layout/HomeLayout";
import React, { ReactElement, useEffect, useState, useRef } from "react";
import { useFormik } from "formik";
import { message } from "antd";
import { motion } from "framer-motion";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { CategoriesService } from "@/services/categoriesServices";
import router from "next/router";
import SidebarAdvices from "../../components/add-new/SidebarAdvices";
import API from "../../config";
import PropTypes from "prop-types";
import { MyProductsActions } from "store/myProducts/myProductsActions";
import Navbar from "components/productModify/navbar";
import { MetaTags } from "@/components/SEO/MetaTags";
import CreatableSelect from "react-select/creatable";
import FormLangs from "@/components/Forms/FormLangs";
import FormModal from "@/components/Forms/FormModal";
import NavigationButtons from "@/components/NavigationButtons";

const MySelect = (props: any) => {
  const [dataTags, setDataTags] = useState([]);
  const [isLoadingTags, setIsLoadingTags] = useState(false);
  const getdataTags = async (tag: string) => {
    setIsLoadingTags(true);
    try {
      const res: any = await API.get(`api/tags/filter?tag=${tag}`);
      setIsLoadingTags(false);
      setDataTags(res.data.data.data);
    } catch (error) {
      setIsLoadingTags(false);
    }
  };
  const handleChange = (value) => {
    props.onChange("tags", value);
  };
  const handleBlur = () => {
    props.onBlur("tags", true);
  };
  return (
    <div
      className="select-tags-form"
      style={{ margin: "1rem 0", position: "relative", maxWidth: 1300 }}
    >
      {isLoadingTags && (
        <span className="spinner-border spinner-border-sm" role="status"></span>
      )}
      <CreatableSelect
        id="color"
        options={dataTags}
        onKeyDown={(e: any) => {
          if (e.target.value) {
            getdataTags(e.target.value);
          }
        }}
        isMulti={true}
        onChange={handleChange}
        onBlur={handleBlur}
        value={props.value}
      />
    </div>
  );
};
let testTime;

function Overview({ query }) {
  const dispatch = useAppDispatch();
  const getProduct = useAppSelector((state) => state.myProducts.product);
  const {
    user,
    categories: { product: categories },
    languages: { getAll },
  } = useAppSelector((state) => state);
  useEffect(() => {
    if (getProduct.loaded && getProduct.id == query.id) return;
    dispatch(MyProductsActions.getProduct({ id: query.id }))
      .unwrap()
      .then(() => {})
      .catch(() => {
        router.push("/add-new");
      });
  }, []);
  const [subCategories, setSubCategories]: any = useState({
    subCategories: { subcategories: {} },
  });
  const [isShowenModal, setIsShowenModal] = useState(false);
  const [checkedLangs, setCheckedLangs] = useState({
    ar: false,
    fr: false,
    en: false,
  });
  const [selectedLang, setSelectedLang] = useState("");
  const [subtitles, setSubtitles] = useState({ ar: null, fr: null, en: null });
  const [isSubtitle, setIsSubtitle] = useState({
    ar: false,
    fr: false,
    en: false,
  });
  const [userLang, setUserLang] = useState();
  const id = query.id;

  const timeoutFunc: any = useRef();

  useEffect(() => {
    if (!getProduct?.subcategory?.category?.id) return;
    CategoriesService.getProductsSubCategories(
      getProduct?.subcategory?.category?.id
    )
      .then((res) => setSubCategories(res))
      .catch(() => {});
  }, [getProduct]);

  const veriedEmail = user.email_verified;
  const [validationsErrors, setValidationsErrors]: any = useState({});
  const clearValidationHandle = () => {
    setValidationsErrors({});
  };

  const addSubtitle = (subtitle) => {
    switch (selectedLang) {
      case "ar":
        setSubtitles({ ...subtitles, ar: subtitle });
        break;
      case "en":
        setSubtitles({ ...subtitles, en: subtitle });
        break;
      case "fr":
        setSubtitles({ ...subtitles, fr: subtitle });
        break;
    }
  };
  const formik = useFormik({
    initialValues: {
      content: "ejrferjgh erfkerh whgferg",
      title: "",
      subcategory: null,
      tags: [],
    },
    isInitialValid: true,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        setValidationsErrors({});
        const body: any = { ...values };
        if (!isSubtitle["ar"] && subtitles["ar"])
          body.title_ar = subtitles["ar"];
        if (!isSubtitle["en"] && subtitles["en"])
          body.title_en = subtitles["en"];
        if (!isSubtitle["fr"] && subtitles["fr"])
          body.title_fr = subtitles["fr"];
        await dispatch(
          MyProductsActions.modifySteps({
            url: `api/product/${id}/product-step-one`,
            id,
            body,
          })
        ).unwrap();
        message.success(getAll("The_update_has"));
        router.push({
          pathname: "/add-new/prices",
          query: {
            id: id, // pass the id
          },
        });
      } catch (error: any) {
        if (error.errors) {
          setValidationsErrors(error.errors);
        }
      }
    },
  });

  if (!query) return message.error(getAll("An_error_occurred"));

  useEffect(() => {
    if (!user.isLogged && !user.loading) {
      router.push("/login");
      return;
    }
    timeoutFunc.current = setTimeout(() => {}, 3000);
  }, [user]);

  const detectLang = async (txt) => {
    const res = await API.post(`/api/detectLang`, { sentence: txt });
    setCheckedLangs({ ...checkedLangs, [res.data.data]: false });
    setUserLang(res.data.data);
  };
  return (
    <>
      <MetaTags
        title={getAll("Service_editing_General")}
        metaDescription={getAll("Service_editing_General")}
        ogDescription={getAll("Service_editing_General")}
      />
      {user.token && veriedEmail && (
        <div className="container-fluid">
          {!getProduct && <div>{getAll("Please_wait")}</div>}
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
                  defaultValue={subtitles[selectedLang]}
                  isSwitchChecked={isSubtitle[selectedLang]}
                  onSubmit={(txt) => addSubtitle(txt)}
                  setIsConfirmText={setIsShowenModal}
                  onSwitch={() =>
                    setIsSubtitle({
                      ...isSubtitle,
                      [selectedLang]: !isSubtitle[selectedLang],
                    })
                  }
                />
              )}
              <form onSubmit={formik.handleSubmit}>
                <div
                  className={
                    "timlands-panel" + (formik.isSubmitting ? " is-loader" : "")
                  }
                >
                  <Navbar active="general" navigate={false} url="" />
                  <div className="timlands-content-form">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="timlands-form">
                          <label className="label-block" htmlFor="input-title">
                            {getAll("Service_title")}
                          </label>
                          <input
                            id="input-title"
                            name="title"
                            placeholder={getAll("Service_title")}
                            disabled={!getProduct ? true : false}
                            className={
                              "timlands-inputs " +
                              (validationsErrors &&
                                validationsErrors.title &&
                                " has-error")
                            }
                            autoComplete="off"
                            onKeyDown={() => {
                              clearTimeout(testTime);
                            }}
                            onKeyUp={() => {
                              clearValidationHandle();
                              testTime = setTimeout(
                                () => detectLang(formik.values["title"]),
                                3000
                              );
                            }}
                            onChange={formik.handleChange}
                            value={formik.values.title || ""}
                          />
                          <FormLangs
                            onClick={(lang) => {
                              setSelectedLang(lang);
                              setIsShowenModal(true);
                            }}
                            default_lang={userLang}
                          />
                          <div className="note-form-text-sh">
                            <p className="text"></p>
                          </div>
                          {validationsErrors && validationsErrors.title && (
                            <div style={{ overflow: "hidden" }}>
                              <motion.div
                                initial={{ y: -70, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="timlands-form-note form-note-error"
                              >
                                <p className="text">
                                  {validationsErrors.title[0]}
                                </p>
                              </motion.div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-md-5">
                        <div className="timlands-form">
                          <label
                            className="label-block"
                            htmlFor="input-catetory"
                          >
                            {getAll("Choose_the_principal")}
                          </label>
                          <select
                            id="input-catetory"
                            name="catetory"
                            className="timlands-inputs select"
                            autoComplete="off"
                            disabled={!getProduct ? true : false}
                            value={getProduct?.subcategory?.category?.id || ""}
                            onChange={(e) => {
                              dispatch(
                                MyProductsActions.changeSubCategory(
                                  e.target.value
                                )
                              );
                            }}
                          >
                            <option value="">
                              {getAll("Choose_the_principal")}
                            </option>
                            {categories.length === 0 && (
                              <option value="">{getAll("Please_wait")}</option>
                            )}
                            {categories.map((e: any) => (
                              <option value={e.id} key={e.id}>
                                {e.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-7">
                        <div className="timlands-form">
                          <label
                            className="label-block"
                            htmlFor="input-subcategory"
                          >
                            {getAll("Choose_a_subcategory")}
                          </label>
                          <select
                            id="input-subcategory"
                            name="subcategory"
                            className={
                              "timlands-inputs select " +
                              (validationsErrors &&
                                validationsErrors.subcategory &&
                                " has-error")
                            }
                            autoComplete="off"
                            disabled={!getProduct ? true : false}
                            onChange={formik.handleChange}
                            value={formik.values.subcategory}
                          >
                            <option value={0}>
                              {getAll("Choose_a_subcategory")}
                            </option>

                            {!subCategories && (
                              <option value="">{getAll("Please_wait")}</option>
                            )}
                            {subCategories?.subcategories?.map((e: any) => (
                              <option value={e.id} key={e.id}>
                                {e.name}
                              </option>
                            ))}
                          </select>
                          {validationsErrors && validationsErrors.subcategory && (
                            <div style={{ overflow: "hidden" }}>
                              <motion.div
                                initial={{ y: -70, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="timlands-form-note form-note-error"
                              >
                                <p className="text">
                                  {validationsErrors.subcategory[0]}
                                </p>
                              </motion.div>
                            </div>
                          )}
                        </div>
                      </div>
                      <p
                        className="label-text"
                        style={{
                          fontWeight: "bold",
                          marginTop: 10,
                          marginBottom: -9,
                        }}
                      >
                        {getAll("Key_words")}
                      </p>
                      <MySelect
                        value={formik.values.tags}
                        onChange={formik.setFieldValue}
                        onBlur={formik.setFieldTouched}
                        disabled={!getProduct ? true : false}
                      />
                      {validationsErrors && validationsErrors.tags && (
                        <div style={{ overflow: "hidden" }}>
                          <motion.div
                            initial={{ y: -70, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="timlands-form-note form-note-error"
                          >
                            <p className="text">{validationsErrors.tags[0]}</p>
                          </motion.div>
                        </div>
                      )}
                      <div className="col-md-12">
                        <div className="py-4 d-flex">
                          <span className="me-auto"></span>
                          <NavigationButtons isBackVisible={false} onNextClick={formik.handleSubmit} nextTitle={getAll('Next_step')}/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
Overview.getLayout = function getLayout(page: any): ReactElement {
  return <Layout>{page}</Layout>;
};
export default Overview;

Overview.getInitialProps = ({ query }) => {
  return { query };
};
Overview.propTypes = {
  query: PropTypes.any,
};
