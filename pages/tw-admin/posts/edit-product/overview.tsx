import Layout from "@/components/Layout/DashboardLayout";
import { ReactElement, useEffect, useState, useRef } from "react";
import { useFormik } from "formik";
import { message } from "antd";
import { motion } from "framer-motion";
import router from "next/router";
import Cookies from "js-cookie";
import API from "../../../../config";
import PropTypes from "prop-types";
import { MetaTags } from "@/components/SEO/MetaTags";
import CreatableSelect from "react-select/creatable";
import Link from "next/link";
import { LanguageContext } from "../../../../contexts/languageContext/context";
import { useContext } from "react";

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
  const { getSectionLanguage } = useContext(LanguageContext);
  const getAll = getSectionLanguage("all");
  const getLogin = getSectionLanguage("login");
  const [product, setProduct]: any = useState({});
  const [categories, setCategories] = useState({});
  const [subCategories, setSubCategories]: any = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const id = query.id;
  const token = useRef(Cookies.get("token_dash"));

  useEffect(() => {
    if (!token) {
      router.push("/tw-admin/login");
      return;
    }
    fetchCategories();
  }, []);
  useEffect(() => {
    if (Object.keys(categories).length > 0) fetchSubCategories();
  }, [categories]);
  useEffect(() => {
    if (!token) {
      router.push("/tw-admin/login");
      return;
    }
    fetchData();
  }, [query.id]);
  const fetchCategories = async () => {
    try {
      const res = await API.get(`api/get_categories`);
      setCategories(res.data.data.reduce((a, v) => ({ ...a, [v.id]: v }), {}));
    } catch (err) {
      console.log(err);
    }
  };
  const fetchSubCategories = async () => {
    const promises = [];
    let temp_subCategories = {};
    Object.keys(categories)?.forEach((key) =>
      promises.push(API.get(`api/get_categories/${categories[key].id}`))
    );
    const sub_categories = await Promise.all(promises);
    sub_categories.forEach((sub_category) => {
      console.log(sub_category.data.data.sub_categories);
      temp_subCategories = {
        ...temp_subCategories,
        ...sub_category.data.data.sub_categories.reduce(
          (a, v) => ({ ...a, [v.id]: v }),
          {}
        ),
      };
    });
    setSubCategories(temp_subCategories);
  };
  const fetchData = async () => {
    try {
      const res = await API.get(`dashboard/products/${query.id}`, {
        headers: {
          Authorization: `Bearer ${token.current}`,
        },
      });
      setProduct(res?.data?.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const [validationsErrors, setValidationsErrors]: any = useState({});
  const clearValidationHandle = () => {
    setValidationsErrors({});
  };
  const formik = useFormik({
    initialValues: {
      category:
        product &&
        subCategories &&
        subCategories[product.category_id]?.parent_id,
      title: product && product.title,
      subcategory: product && product.subcategory && product.subcategory.id,
      tags: product && product.product_tag,
    },
    isInitialValid: true,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        setValidationsErrors({});
        const res = await API.post(
          `dashboard/products/${query.id}/step_one`,
          values,
          {
            headers: {
              Authorization: `Bearer ${token.current}`,
            },
          }
        );
        // Authentication was successful.
        if (res.status === 200) {
          message.success(getAll("The_update_has"));
          router.push(`/tw-admin/posts/edit-product/prices?id=${product?.id}`);
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
  if (!query) return message.error(getAll("An_error_occured"));
  console.log(formik.values);
  return (
    <>
      <MetaTags
        title={getAll("Service_editing_General")}
        metaDescription={getAll("Service_editing_General")}
        ogDescription={getAll("Service_editing_General")}
      />
      {token && (
        <div className="container-fluid">
          {isLoading && <div>{getAll("Please_wait…")}</div>}
          <div className="row justify-content-md-center my-3">
            <div className="col-md-8 pt-3">
              <form onSubmit={formik.handleSubmit}>
                <div
                  className={
                    "timlands-panel" + (formik.isSubmitting ? " is-loader" : "")
                  }
                >
                  <div className="timlands-steps">
                    <div className="timlands-step-item active">
                      <h3 className="text">
                        <Link
                          href={`/tw-admin/posts/edit-product/overview?id=${id}`}
                        >
                          <a>
                            <span className="icon-circular">
                              <span className="material-icons material-icons-outlined">
                                collections_bookmark
                              </span>
                            </span>
                            {getLogin("General_information")}
                          </a>
                        </Link>
                      </h3>
                    </div>
                    <div
                      className={`timlands-step-item ${
                        product?.current_step < 1 && "pe-none"
                      }`}
                    >
                      <h3 className="text">
                        <Link
                          href={`/tw-admin/posts/edit-product/prices?id=${id}`}
                        >
                          <a>
                            <span className="icon-circular">
                              <span className="material-icons material-icons-outlined">
                                payments
                              </span>
                            </span>
                            {getLogin("Price_and_developments")}
                          </a>
                        </Link>
                      </h3>
                    </div>
                    <div
                      className={`timlands-step-item ${
                        product?.current_step < 2 && "pe-none"
                      }`}
                    >
                      <h3 className="text">
                        <Link
                          href={`/tw-admin/posts/edit-product/description?id=${id}`}
                        >
                          <a>
                            <span className="icon-circular">
                              <span className="material-icons material-icons-outlined">
                                description
                              </span>
                            </span>
                            {getLogin("Desciprion_intrustions")}
                          </a>
                        </Link>
                      </h3>
                    </div>
                    <div
                      className={`timlands-step-item ${
                        product?.current_step < 3 && "pe-none"
                      }`}
                    >
                      <h3 className="text">
                        <Link
                          href={`/tw-admin/posts/edit-product/medias?id=${id}`}
                        >
                          <a>
                            <span className="icon-circular">
                              <span className="material-icons material-icons-outlined">
                                mms
                              </span>
                            </span>
                            {getLogin("Gallery_and_folders")}
                          </a>
                        </Link>
                      </h3>
                    </div>
                    {/* <div className="timlands-step-item ">
                      <h3 className="text">
                        <Link
                          href={`/tw-admin/posts/edit-product/complete?id=${product.id}`}
                        >
                          <a>
                            <span className="icon-circular">
                              <span className="material-icons material-icons-outlined">
                                publish
                              </span>
                            </span>
                            {getAll("Publish_service")}
                          </a>
                        </Link>
                      </h3>
                    </div> */}
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
                            disabled={!product ? true : false}
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
                            {getLogin("Choose_the_principal")}
                          </label>
                          <select
                            id="input-catetory"
                            name="category"
                            className="timlands-inputs select"
                            disabled={!product ? true : false}
                            autoComplete="off"
                            onChange={formik.handleChange}
                            value={formik.values.category}
                            defaultValue={formik.values.category}
                            //onChange={() => setmainCat(values.catetory)}
                          >
                            <option value="">
                              {getLogin("Choose_the_principal")}
                            </option>
                            {!categories && (
                              <option value="">{getAll("Please_wait")}</option>
                            )}
                            {categories &&
                              Object.keys(categories).map((key: any) => (
                                <option
                                  value={categories[key].id}
                                  key={categories[key].id}
                                >
                                  {categories[key].name_ar}
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
                            disabled={!product ? true : false}
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
                              {getAll("Choose_a_subcategory")}
                            </option>

                            {!subCategories && (
                              <option value="">{getAll("Please_wait")}</option>
                            )}
                            {subCategories &&
                              Object.keys(subCategories)
                                .filter(
                                  (key) =>
                                    subCategories[key].parent_id ==
                                    formik.values.category
                                )
                                .map((key: any) => (
                                  <option
                                    value={subCategories[key].id}
                                    key={subCategories[key].id}
                                  >
                                    {subCategories[key].name_ar}
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
                        disabled={!product ? true : false}
                        onBlur={formik.setFieldTouched}
                      />
                      <div className="col-md-12">
                        <div className="py-4 d-flex">
                          <span className="me-auto"></span>
                          <button
                            type="submit"
                            disabled={
                              (!product ? true : false) || formik.isSubmitting
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
