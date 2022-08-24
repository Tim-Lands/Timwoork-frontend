import Layout from "../../components/Layout/HomeLayout";
import React, {
  ReactElement,
  useEffect,
  useState,
  useContext,
  useRef,
} from "react";
import { useFormik } from "formik";
import { message } from "antd";
import { motion } from "framer-motion";
import { LanguageContext } from "../../contexts/languageContext/context";
import router from "next/router";
import SidebarAdvices from "./SidebarAdvices";
import Cookies from "js-cookie";
import API from "../../config";
import useSWR from "swr";
import PropTypes from "prop-types";
import { MetaTags } from "@/components/SEO/MetaTags";
import CreatableSelect from "react-select/creatable";
import FormLangs from "@/components/NewIndex/Forms/FormLangs";
import FormModal from "@/components/NewIndex/Forms/FormModal";

// import FormLangs from "@/components/NewIndex/Forms/FormLangs";
// import FormLangsCheck from "@/components/NewIndex/Forms/FormLangsCheck";

const MySelect = (props: any) => {
  const [dataTags, setDataTags] = useState([]);
  const [isLoadingTags, setIsLoadingTags] = useState(false);
  const getdataTags = async (tag: string) => {
    setIsLoadingTags(true);
    try {
      const res: any = await API.get(`api/tags/filter?tag=${tag}`);
      if (res.status === 200) {
        setIsLoadingTags(false);
        setDataTags(res.data.data.data);
      }
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
  const { data: userInfo }: any = useSWR("api/me");
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
  const { getSectionLanguage, language } = useContext(LanguageContext);
  const getAll = getSectionLanguage();
  const timeoutFunc: any = useRef();
  let token = Cookies.get("token");
  if (!token && typeof window !== "undefined")
    token = localStorage.getItem("token");
  const { data: getProduct }: any = useSWR(
    `api/my_products/product/${query.id}`
  );
  const { data: categories, categoriesError }: any = useSWR(
    "api/get_categories_for_add_product"
  );
  const veriedEmail = userInfo && userInfo.user_details.email_verified_at;
  const [validationsErrors, setValidationsErrors]: any = useState({});
  const clearValidationHandle = () => {
    setValidationsErrors({});
  };

  const addSubtitle = (subtitle) => {
    console.log(subtitle);
    console.log(selectedLang);
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
  console.log(getProduct?.data)
  const formik = useFormik({
    initialValues: {
      content: "ejrferjgh erfkerh whgferg",
      catetory:
        getProduct &&
        getProduct.data.subcategory &&
        getProduct.data.subcategory.category &&
        getProduct.data.subcategory.category.id,
      title: getProduct && getProduct.data.title,
      subcategory:
        getProduct &&
        getProduct.data.subcategory &&
        getProduct.data.subcategory.id,
      tags: getProduct && getProduct.data.product_tag,
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
        const res = await API.post(`api/product/${id}/product-step-one`, body, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Authentication was successful.
        if (res.status === 200) {
          message.success(getAll("The_update_has"));
          router.push({
            pathname: "/add-new/prices",
            query: {
              id: id, // pass the id
            },
          });
        }
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
  const { data: subCategories, subCategoriesError }: any = useSWR(
    `api/get_categories_for_add_product/${formik.values.catetory}`
  );

  if (!query) return message.error(getAll("An_error_occurred"));
  async function getProductId() {
    try {
      // const res: any =
      await API.get(`api/my_products/product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
    if (!token) {
      router.push("/login");
      return;
    }
    timeoutFunc.current = setTimeout(() => console.log("test time out "), 3000);
    getProductId();
  }, []);

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
      {token && veriedEmail && (
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
                              setSelectedLang(lang)
                              setIsShowenModal(true)
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
                          {categoriesError && getAll("An_error_occured")}
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
                            {!categories && (
                              <option value="">{getAll("Please_wait")}</option>
                            )}
                            {categories &&
                              categories.data.map((e: any) => (
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
                            {subCategoriesError && (
                              <option value="">
                                {getAll("An_error_occured")}
                              </option>
                            )}
                            {!subCategories && (
                              <option value="">{getAll("Please_wait")}</option>
                            )}
                            {subCategories &&
                              subCategories.data.subcategories.map((e: any) => (
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
