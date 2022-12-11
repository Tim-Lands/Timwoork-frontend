import Layout from "../../components/Layout/HomeLayout";
import { ReactElement, useEffect, useState } from "react";
import { useFormik } from "formik";
import { message } from "antd";
import { motion } from "framer-motion";
import { CategoriesService } from "@/services/categories";
import router from "next/router";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { MyProductsActions } from "store/myProducts/myProductsActions";
import Navbar from "components/productModify/navbar";
import Tags from "@/components/add-new/Tags";

import API from "../../config";
import PropTypes from "prop-types";
import { MetaTags } from "@/components/SEO/MetaTags";
import CreatableSelect from "react-select/creatable";
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
  const {
    user,
    myProducts: { product: getProduct },
    categories: { product: categories },
    languages: { getAll },
  } = useAppSelector((state) => state);
  const [subCategories, setSubCategories]: any = useState({
    subCategories: { subcategories: {} },
  });
  const dispatch = useAppDispatch();
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
  const veriedEmail = user.email_verified;
  const [validationsErrors, setValidationsErrors]: any = useState({});
  const clearValidationHandle = () => {
    setValidationsErrors({});
  };
  const formik = useFormik({
    initialValues: {
      category: getProduct?.subcategory?.category?.id,
      title: getProduct?.title,
      subcategory: getProduct?.subcategory?.id,
      tags: getProduct?.product_tag,
    },
    isInitialValid: true,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        setValidationsErrors({});
        await dispatch(
          MyProductsActions.modifySteps({
            url: `api/product/${id}/product-step-one`,
            id,
            body: values,
          })
        ).unwrap();

        message.success(getAll("The_update_has"));
        router.push(`/edit-product/prices?id=${getProduct?.id}`);
      } catch (error: any) {
        if (error.errors) {
          setValidationsErrors(error.errors);
        }
      }
    },
  });
  useEffect(() => {
    if (!formik.values.category) return;
    CategoriesService.getProductsSubCategories(formik.values.category)
      .then((res) => setSubCategories(res))
      .catch(() => {});
  }, [formik.values.category]);

  if (!query) return message.error(getAll("An_error_occurred"));

  useEffect(() => {
    if (!user.isLogged && !user.loading) {
      router.push("/login");
      return;
    }
  }, [user]);
  return (
    <>
      <MetaTags
        title={getAll("Service_editing_General")}
        metaDescription={getAll("Service_editing_General")}
        ogDescription={getAll("Service_editing_General")}
      />
      {user.isLogged && veriedEmail && (
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
                  <Navbar
                    active="general"
                    navigate={true}
                    url="edit-product"
                    id={id}
                    priceClass={getProduct.current_step < 1 && "pe-none"}
                    descriptionClass={getProduct.current_step < 2 && "pe-none"}
                    galleryClass={getProduct.current_step < 3 && "pe-none"}
                  />

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
                            {getAll("Choose_the_principal")}
                          </label>
                          <select
                            id="input-catetory"
                            name="category"
                            className="timlands-inputs select"
                            disabled={!getProduct ? true : false}
                            autoComplete="off"
                            onChange={formik.handleChange}
                            value={formik.values.category}
                            //onChange={() => setmainCat(values.catetory)}
                          >
                            <option value="">
                              {" "}
                              {getAll("Choose_the_principal")}
                            </option>
                            {!categories && (
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
                          {validationsErrors &&
                            validationsErrors.subcategory && (
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
                      <Tags
                        values={formik.values.tags}
                        onChange={formik.setFieldValue}
                        onBlur={formik.setFieldTouched}
                        validationsErrors={validationsErrors}
                      />

                      <div className="col-md-12">
                        <div className="py-4 d-flex">
                          <span className="me-auto"></span>
                          <NavigationButtons
                            isBackVisible={false}
                            onNextClick={formik.handleSubmit}
                            nextTitle={getAll("Next_step")}
                          />
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
