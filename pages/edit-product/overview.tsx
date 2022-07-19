import Layout from "../../components/Layout/HomeLayout";
import { ReactElement, useEffect, useState, useContext } from "react";
import { useFormik } from "formik";
import { message } from "antd";
import { motion } from "framer-motion";
import router from "next/router";
import Cookies from "js-cookie";
import { LanguageContext } from "../../contexts/languageContext/context";
import API from "../../config";
import useSWR from "swr";
import PropTypes from "prop-types";
import { MetaTags } from "@/components/SEO/MetaTags";
import CreatableSelect from "react-select/creatable";
import Link from "next/link";

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
      style={{ margin: "1rem 0", position: "relative" }}
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
function Overview({ query }) {
  const id = query.id;
  const { getSectionLanguage } = useContext(LanguageContext);
  const getLanguage = getSectionLanguage("add_new");
  const getAll = getSectionLanguage("all");
  const getLogin = getSectionLanguage("login");
  let token = Cookies.get("token");
  if (!token && typeof window !== "undefined")
    token = localStorage.getItem("token");
  const { data: getProduct }: any = useSWR(
    `api/my_products/product/${query.id}`
  );
  const { data: categories, categoriesError }: any = useSWR(
    "api/get_categories_for_add_product"
  );

  const { data: userInfo }: any = useSWR("api/me");
  const veriedEmail = userInfo && userInfo.user_details.email_verified_at;
  const [validationsErrors, setValidationsErrors]: any = useState({});
  const clearValidationHandle = () => {
    setValidationsErrors({});
  };
  const formik = useFormik({
    initialValues: {
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
        const res = await API.post(
          `api/product/${id}/product-step-one`,
          values,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Authentication was successful.
        if (res.status === 200) {
          message.success(getAll("The_update_has"));
          router.push(`/edit-product/prices?id=${getProduct?.data?.id}`);
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
        router.push("/myproducts");
      }
      if (error.response && error.response.status === 404) {
        router.push("/myproducts");
      }
    }
  }
  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }
    getProductId();
  }, []);
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
          <div className="row justify-content-md-center my-3">
            <div className="col-md-7 pt-3">
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
                          <Link href={`/edit-product/overview?id=${id}`}>
                            <a>
                              <span className="icon-circular">
                                <span className="material-icons material-icons-outlined">
                                  collections_bookmark
                                </span>
                              </span>
                              {getLanguage("General_information")}
                            </a>
                          </Link>
                        </h3>
                      </div>
                      <div
                        className={`timlands-step-item ${
                          getProduct?.data.current_step < 1 && "pe-none"
                        }`}
                      >
                        <h3 className="text">
                          <Link href={`/edit-product/prices?id=${id}`}>
                            <a>
                              <span className="icon-circular">
                                <span className="material-icons material-icons-outlined">
                                  payments
                                </span>
                              </span>
                              {getLanguage("Upgrades_price")}
                            </a>
                          </Link>
                        </h3>
                      </div>
                      <div
                        className={`timlands-step-item ${
                          getProduct?.data.current_step < 2 && "pe-none"
                        }`}
                      >
                        <h3 className="text">
                          <Link href={`/edit-product/description?id=${id}`}>
                            <a>
                              <span className="icon-circular">
                                <span className="material-icons material-icons-outlined">
                                  description
                                </span>
                              </span>
                              {getLanguage("Description_and_instructions")}
                            </a>
                          </Link>
                        </h3>
                      </div>
                      <div
                        className={`timlands-step-item ${
                          getProduct?.data.current_step < 3 && "pe-none"
                        }`}
                      >
                        <h3 className="text">
                          <Link href={`/edit-product/medias?id=${id}`}>
                            <a>
                              <span className="icon-circular">
                                <span className="material-icons material-icons-outlined">
                                  mms
                                </span>
                              </span>
                              {getLanguage("Gallery_and_folders")}
                            </a>
                          </Link>
                        </h3>
                      </div>
                      <div className="timlands-step-item ">
                        <h3 className="text">
                          <Link
                            href={`/edit-product/complete?id=${getProduct?.data.id}`}
                          >
                            <a>
                              <span className="icon-circular">
                                <span className="material-icons material-icons-outlined">
                                  {getLanguage("Publish_service")}
                                </span>
                              </span>
                              {getAll("Publish_service")}
                            </a>
                          </Link>
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
                            className={
                              "timlands-inputs " +
                              (validationsErrors &&
                                validationsErrors.title &&
                                " has-error")
                            }
                            autoComplete="off"
                            disabled={!getProduct ? true : false}
                            onKeyUp={clearValidationHandle}
                            onChange={formik.handleChange}
                            value={formik.values.title}
                          />
                          <div className="note-form-text-sh">
                            <p className="text">
                              {getAll("The_service_title")}
                            </p>
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
                            {getLanguage("Choose_the_principal")}
                          </label>
                          {categoriesError && getAll("An_error_occured")}
                          <select
                            id="input-catetory"
                            name="catetory"
                            className="timlands-inputs select"
                            disabled={!getProduct ? true : false}
                            autoComplete="off"
                            onChange={formik.handleChange}
                            value={formik.values.catetory}
                            //onChange={() => setmainCat(values.catetory)}
                          >
                            <option value="">
                              {" "}
                              {getLanguage("Choose_the_principal")}
                            </option>
                            {!categories && (
                              <option value="">{getAll("Please_wait")}</option>
                            )}
                            {categories &&
                              categories.data.map((e: any) => (
                                <option value={e.id} key={e.id}>
                                  {e.name_ar}
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
                            {getLanguage("Choose_a_subcategory")}
                          </label>
                          <select
                            id="input-subcategory"
                            disabled={!getProduct ? true : false}
                            name="subcategory"
                            className={
                              "timlands-inputs select " +
                              (validationsErrors &&
                                validationsErrors.subcategory &&
                                " has-error")
                            }
                            autoComplete="off"
                            onChange={formik.handleChange}
                            value={formik.values.subcategory}
                          >
                            <option value={0}>
                              {" "}
                              {getLanguage("Choose_a_subcategory")}
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
                                  {e.name_ar}
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
                      <MySelect
                        value={formik.values.tags}
                        onChange={formik.setFieldValue}
                        disabled={!getProduct ? true : false}
                        onBlur={formik.setFieldTouched}
                      />
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
                            <span className="text">
                              {getLogin("Save_edits")}
                            </span>
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

Overview.getInitialProps = ({ query }) => {
  return { query };
};
Overview.propTypes = {
  query: PropTypes.any,
};
