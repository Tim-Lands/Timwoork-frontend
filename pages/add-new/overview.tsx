import Layout from "../../components/Layout/HomeLayout";
import React, { ReactElement, useEffect, useState, useRef } from "react";
import { useFormik } from "formik";
import { message } from "antd";
import { motion } from "framer-motion";
import { useAppSelector } from "@/store/hooks";
import { CategoriesService } from "@/services/categoriesServices";
import router from "next/router";
import SidebarAdvices from "./SidebarAdvices";
import API from "../../config";
import useSWR from "swr";
import PropTypes from "prop-types";
import { MetaTags } from "@/components/SEO/MetaTags";
import CreatableSelect from "react-select/creatable";
import FormLangs from "@/components/Forms/FormLangs";
import FormModal from "@/components/Forms/FormModal";

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
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories]: any = useState(false);
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
  const {
    user,
    languages: { language, getAll },
  } = useAppSelector((state) => state);

  const timeoutFunc: any = useRef();
  const { data: getProduct }: any = useSWR(
    `api/my_products/product/${query.id}`
  );
  useEffect(() => {
    CategoriesService.getProductsCategories()
      .then((res) => setCategories(res))
      .catch(() => {});
  });
  useEffect(() => {
    CategoriesService.getProductsSubCategories(formik.values.catetory)
      .then((res) => setSubCategories(res))
      .catch(() => {});
  });

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
      catetory: getProduct?.data?.subcategory?.category?.id,
      title: getProduct?.data?.title,
      subcategory: getProduct?.data?.subcategory?.id,
      tags: getProduct?.data?.product_tag,
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
        await API.post(`api/product/${id}/product-step-one`, body);
        // Authentication was successful.
        message.success(getAll("The_update_has"));
        router.push({
          pathname: "/add-new/prices",
          query: {
            id: id, // pass the id
          },
        });
      } catch (error: any) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          setValidationsErrors(error.response.data.errors);
        }
      }
    },
  });

  if (!query) return message.error(getAll("An_error_occurred"));
  async function getProductId() {
    try {
      // const res: any =
      await API.get(`api/my_products/product/${id}`);
      // if (res.status === 200) {
      // }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        router.push("/add-new");
      }
      if (error.response && error.response.status === 404) {
        router.push("/add-new");
      }
    }
  }
  useEffect(() => {
    if (!user.isLogged && !user.loading) {
      router.push("/login");
      return;
    }
    timeoutFunc.current = setTimeout(() => console.log("test time out "), 3000);
    getProductId();
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
                  <div className="timlands-steps-cont">
                    <div className="timlands-steps">
                      <div className="timlands-step-item active">
                        <h3 className="text">
                          <span className="icon-circular">
                            <span className="material-icons material-icons-outlined">
                              collections_bookmark
                            </span>
                          </span>
                          {getAll("General_information")}
                        </h3>
                      </div>
                      <div className="timlands-step-item">
                        <h3 className="text">
                          <span className="icon-circular">
                            <span className="material-icons material-icons-outlined">
                              payments
                            </span>
                          </span>
                          {getAll("Upgrades_price")}
                        </h3>
                      </div>
                      <div className="timlands-step-item">
                        <h3 className="text">
                          <span className="icon-circular">
                            <span className="material-icons material-icons-outlined">
                              description
                            </span>
                          </span>
                          {getAll("Description_and_instructions")}
                        </h3>
                      </div>
                      <div className="timlands-step-item">
                        <h3 className="text">
                          <span className="icon-circular">
                            <span className="material-icons material-icons-outlined">
                              mms
                            </span>
                          </span>
                          {getAll("Gallery_and_folders")}
                        </h3>
                      </div>
                      <div className="timlands-step-item">
                        <h3 className="text">
                          <span className="icon-circular">
                            <span className="material-icons material-icons-outlined">
                              publish
                            </span>
                          </span>
                          {getAll("Publish_service")}
                        </h3>
                      </div>
                    </div>
                  </div>

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
                            value={formik.values.title}
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
                            onChange={formik.handleChange}
                            value={formik.values.catetory}
                            //onChange={() => setmainCat(values.catetory)}
                          >
                            <option value="">
                              {getAll("Choose_the_principal")}
                            </option>
                            {categories.length === 0 && (
                              <option value="">{getAll("Please_wait")}</option>
                            )}
                            {categories.map((e: any) => (
                              <option value={e.id} key={e.id}>
                                {e[which(language)]}
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
                            {subCategories.subcategories.map((e: any) => (
                              <option value={e.id} key={e.id}>
                                {e[which(language)]}
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
                          <button
                            type="submit"
                            disabled={
                              (!getProduct ? true : false) ||
                              formik.isSubmitting
                            }
                            className="btn flex-center butt-green ml-auto butt-sm"
                          >
                            <span className="text">{getAll("Next_step")}</span>
                            {language === "ar" ? (
                              <span className="material-icons-outlined">
                                chevron_left
                              </span>
                            ) : (
                              <span className="material-icons-outlined">
                                chevron_right
                              </span>
                            )}
                          </button>
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
const which = (language) => {
  switch (language) {
    default:
      return "name_en";
    case "ar":
      return "name_ar";
    case "en":
      return "name_en";
    case "fr":
      return "name_fr";
  }
};
Overview.getInitialProps = ({ query }) => {
  return { query };
};
Overview.propTypes = {
  query: PropTypes.any,
};
