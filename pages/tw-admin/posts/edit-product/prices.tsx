import { ReactElement, useEffect, useState, useRef } from "react";
import { Field, FieldArray, Form, Formik } from "formik";
import { motion } from "framer-motion";
import Layout from "@/components/Layout/DashboardLayout";
import router from "next/router";
import { message } from "antd";
import Cookies from "js-cookie";
import { MetaTags } from "@/components/SEO/MetaTags";
import Link from "next/link";
import PropTypes from "prop-types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ProductsActions } from "@/store/tw-admin/products/ProductsActions";

function Prices({ query }) {
  const [validationsErrors, setValidationsErrors]: any = useState({});
  const token = useRef(Cookies.get("token_dash"));
  const { getAll } = useAppSelector((state) => state.languages);
  const productState = useAppSelector(state=>state.dashboardProducts.currProduct)
  const product = productState.data
  const dispatch = useAppDispatch()


  useEffect(() => {
    if (!token) {
      router.push("/tw-admin/login");
      return;
    }
    dispatch(ProductsActions.getOne({id:query.id}))
  }, [query.id]);
  return (
    <>
      <MetaTags
        title={getAll("Service_editing_Price")}
        metaDescription={getAll("Service_editing_Price")}
        ogDescription={getAll("Service_editing_Price")}
      />
      {token && !productState.loading && (
        <div className="container-fluid">
          <div className="row justify-content-md-center my-3">
            <div className="col-md-8 pt-3">
              <Formik
                isInitialValid={true}
                initialValues={{
                  price: product.price,
                  duration: product.duration,
                  developments: product.developments || null,
                }}
                enableReinitialize={true}
                onSubmit={async (values) => {
                  setValidationsErrors({});
                  const { id } = query;
                  try {
                     const {price, duration, developments} = values
                     await dispatch(ProductsActions.updateStepTwo({
                      id,
                      price,
                      duration,
                      developments
                     }))
                    // Authentication was successful.
                      message.success(getAll("The_update_has"));
                    
                  } catch (error: any) {
                    if (
                      error.response &&
                      error.response.data &&
                      error.response.data.errors
                    ) {
                      setValidationsErrors(error.response.data.errors);
                    }
                  }
                }}
              >
                {({ errors, touched, isSubmitting, values }) => (
                  <Form>
                    <div
                      className={
                        "timlands-panel " + (isSubmitting ? " is-loader" : "")
                      }
                    >
                      <div className="timlands-steps">
                        <div className="timlands-step-item">
                          <h3 className="text">
                            <Link
                              href={`/tw-admin/posts/edit-product/overview?id=${query.id}`}
                            >
                              <a>
                                <span className="icon-circular">
                                  <span className="material-icons material-icons-outlined">
                                    collections_bookmark
                                  </span>
                                </span>
                                {getAll("General_information")}
                              </a>
                            </Link>
                          </h3>
                        </div>
                        <div
                          className={`timlands-step-item ${
                            product.current_step < 1 && "pe-none"
                          } active`}
                        >
                          <h3 className="text">
                            <Link
                              href={`/tw-admin/posts/edit-product/prices?id=${query.id}`}
                            >
                              <a>
                                <span className="icon-circular">
                                  <span className="material-icons material-icons-outlined">
                                    payments
                                  </span>
                                </span>
                                {getAll("Price_and_developments")}
                              </a>
                            </Link>
                          </h3>
                        </div>
                        <div
                          className={`timlands-step-item ${
                            product.current_step < 2 && "pe-none"
                          }`}
                        >
                          <h3 className="text">
                            <Link
                              href={`/tw-admin/posts/edit-product/description?id=${query.id}`}
                            >
                              <a>
                                <span className="icon-circular">
                                  <span className="material-icons material-icons-outlined">
                                    description
                                  </span>
                                </span>
                                {getAll("Desciprion_intrustions")}
                              </a>
                            </Link>
                          </h3>
                        </div>
                        <div
                          className={`timlands-step-item ${
                            product.current_step < 3 && "pe-none"
                          }`}
                        >
                          <h3 className="text">
                            <Link
                              href={`/tw-admin/posts/edit-product/medias?id=${query.id}`}
                            >
                              <a>
                                <span className="icon-circular">
                                  <span className="material-icons material-icons-outlined">
                                    mms
                                  </span>
                                </span>
                                {getAll("Gallery_and_folders")}
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
                      <div className="timlands-panel-header mt-3">
                        <div className="flex-center">
                          <h2 className="title">
                            <span className="material-icons material-icons-outlined">
                              payments
                            </span>
                            {getAll("Add_price")}
                          </h2>
                        </div>
                      </div>
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
                                disabled={!product ? true : false}
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
                                {getAll("Service_price")}
                              </label>
                              <div className="rel-form">
                                <Field
                                  id="input-duration"
                                  type="number"
                                  disabled={!product ? true : false}
                                  name="duration"
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
                              <button
                                onClick={() => router.back()}
                                type="button"
                                className="btn flex-center butt-primary2-out me-auto butt-md"
                              >
                                <span className="material-icons-outlined">
                                  chevron_right
                                </span>
                                <span className="text">
                                  {getAll("Previous_step")}
                                </span>
                              </button>
                              <button
                                type="submit"
                                disabled={
                                  (!product ? true : false) || isSubmitting
                                }
                                className="btn flex-center butt-green ml-auto butt-sm"
                              >
                                <span className="text">
                                  {getAll("Save_edits")}
                                </span>
                              </button>
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
