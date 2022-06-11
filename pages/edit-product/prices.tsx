import { ReactElement, useEffect, useState, useRef } from "react";
import { Field, FieldArray, Form, Formik } from "formik";
import { motion } from "framer-motion";
import Layout from "@/components/Layout/HomeLayout";
import router from "next/router";
import { message } from "antd";
import Cookies from "js-cookie";
import API from "../../config";
import useSWR from "swr";
import { MetaTags } from "@/components/SEO/MetaTags";
import Link from "next/link";
import PropTypes from "prop-types";

function Prices({ query }) {
  const stepsView = useRef(null);

  let token = Cookies.get("token");
  if (!token && typeof window !== "undefined")
    token = localStorage.getItem("token");
  const { id } = query;
  const { data: getProduct }: any = useSWR(`api/my_products/product/${id}`);
  const [validationsErrors, setValidationsErrors]: any = useState({});

  const { data: userInfo }: any = useSWR("api/me");
  const veriedEmail = userInfo && userInfo.user_details.email_verified_at;
  async function getProductId() {
    try {
      const res: any = await API.get(`api/my_products/product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 422) {
        router.push("/add-new");
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        router.push("/add-new");
      }
      if (error.response && error.response.status === 404) {
        router.push("/add-new");
      }
    }
  }
  /* async function stepFive() {
        try {
            const res = await API.post(`api/product/${query.id}/product-step-five`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (res.status === 200) {

            }
        } catch (error: any) {
            message.error('حدث خطأ غير متوقع');
        }
    } */
  useEffect(() => {
    stepsView.current && stepsView.current.scrollIntoView();
    if (!token) {
      router.push("/login");
      return;
    }
    getProductId();
  }, []);
  return (
    <>
      <MetaTags
        title="تعديل الخدمة - السعر والمدة"
        metaDescription="تعديل الخدمة - السعر والمدة"
        ogDescription="تعديل الخدمة - السعر والمدة"
      />
      {token && veriedEmail && (
        <div className="container-fluid">
          <div className="row justify-content-md-center my-3">
            <div className="col-md-7 pt-3">
              <Formik
                isInitialValid={true}
                initialValues={{
                  price: getProduct && getProduct.data.price,
                  duration: getProduct && getProduct.data.duration,
                  developments:
                    (getProduct && getProduct.data.developments) || null,
                }}
                enableReinitialize={true}
                onSubmit={async (values) => {
                  setValidationsErrors({});
                  try {
                    const res = await API.post(
                      `api/product/${id}/product-step-two`,
                      values,
                      {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      }
                    );
                    // Authentication was successful.
                    if (res.status === 200) {
                      message.success("لقد تم التحديث بنجاح");
                      router.push(
                        `/edit-product/description?id=${getProduct?.data.id}`
                      );
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
                }}
              >
                {({ errors, touched, isSubmitting, values }) => (
                  <Form>
                    <div
                      className={
                        "timlands-panel " + (isSubmitting ? " is-loader" : "")
                      }
                    >
                      <div className="timlands-steps-cont">
                        <div className="timlands-steps">
                          <div className="timlands-step-item">
                            <h3 className="text">
                              <Link href={`/edit-product/overview?id=${id}`}>
                                <a>
                                  <span className="icon-circular">
                                    <span className="material-icons material-icons-outlined">
                                      collections_bookmark
                                    </span>
                                  </span>
                                  معلومات عامة
                                </a>
                              </Link>
                            </h3>
                          </div>
                          <div
                            className={`timlands-step-item ${getProduct?.data.current_step < 1 && "pe-none"
                              } active`}
                            ref={stepsView}
                          >
                            <h3 className="text">
                              <Link href={`/edit-product/prices?id=${id}`}>
                                <a>
                                  <span className="icon-circular">
                                    <span className="material-icons material-icons-outlined">
                                      payments
                                    </span>
                                  </span>
                                  السعر والتطويرات
                                </a>
                              </Link>
                            </h3>
                          </div>
                          <div
                            className={`timlands-step-item ${getProduct?.data.current_step < 2 && "pe-none"
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
                                  الوصف وتعليمات المشتري
                                </a>
                              </Link>
                            </h3>
                          </div>
                          <div
                            className={`timlands-step-item ${getProduct?.data.current_step < 3 && "pe-none"
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
                                  مكتبة الصور والملفات
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
                                      publish
                                    </span>
                                  </span>
                                  نشر الخدمة
                                </a>
                              </Link>
                            </h3>
                          </div>
                        </div>
                      </div>
                      <div className="timlands-panel-header mt-3">
                        <div className="flex-center">
                          <h2 className="title">
                            <span className="material-icons material-icons-outlined">
                              payments
                            </span>
                            إضافة السعر
                          </h2>
                          <div
                            className={
                              "header-butt" + (isSubmitting ? " is-loader" : "")
                            }
                          >
                          </div>
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
                                سعر الخدمة
                              </label>
                              <Field
                                id="input-price"
                                name="price"
                                disabled={!getProduct ? true : false}
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
                                مدة التسليم
                              </label>
                              <div className="rel-form">
                                <Field
                                  id="input-duration"
                                  type="number"
                                  disabled={!getProduct ? true : false}
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
                                  <p className="text">بالأيام</p>
                                </div>
                              </div>
                              <motion.div
                                initial={{ y: -70, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="timlands-form-note"
                              >
                                <p className="text">
                                  حدد مدة تسليم مناسبة لك. يستطيع المشتري إلغاء
                                  الخدمة مباشرة في حال التأخر بتسليم الخدمة في
                                  الموعد المحدد
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
                                التطويرات
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
                                                    عنوان التطوير
                                                  </label>
                                                  <Field
                                                    id={"input-name-" + index}
                                                    placeholder="عنوان التطوير..."
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
                                                    سعر التطوير
                                                  </label>
                                                  <Field
                                                    id={
                                                      "input-price-" + index
                                                    }
                                                    placeholder="سعر التطوير..."
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
                                                    مدة التطوير
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
                                                        بالأيام
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
                                          تطويرات الخدمة المقدمة اختيارية فقط
                                          ولا يمكن أن تجبر المشتري على طلبها.
                                          اعرف طريقة استخدامها بشكل صحيح
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
                                          أضف تطويرا للخدمة
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
                                className="btn flex-center butt-primary2-out me-auto butt-xs"
                              >
                                <span className="material-icons-outlined">
                                  chevron_right
                                </span>
                                <span className="text">المرحلة السابقة</span>
                                <div
                                  className="spinner-border spinner-border-sm text-white"
                                  role="status"
                                ></div>
                              </button>
                              <button
                                type="submit"
                                disabled={
                                  (!getProduct ? true : false) || isSubmitting
                                }
                                className="btn flex-center butt-green ml-auto butt-sm"
                              >
                                <span className="text">حفظ التغييرات</span>
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
