import { ReactElement, useEffect, useState, useRef } from "react";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import router from "next/router";
import { MetaTags } from "@/components/SEO/MetaTags";
import PropTypes from "prop-types";
import { message } from "antd";
import Layout from "@/components/Layout/DashboardLayout";
import Cookies from "js-cookie";
import API from "../../../../config";
import Link from "next/link";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import cookies from "next-cookies";

export const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="menubar">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        <span className="material-icons material-icons-outlined">
          format_bold
        </span>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        <span className="material-icons material-icons-outlined">
          format_italic
        </span>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "is-active" : ""}
      >
        <span className="material-icons material-icons-outlined">
          strikethrough_s
        </span>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
      >
        h1
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
      >
        h2
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
      >
        h3
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive("heading", { level: 4 }) ? "is-active" : ""}
      >
        h4
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "is-active" : ""}
      >
        <span className="material-icons material-icons-outlined">
          format_list_bulleted
        </span>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "is-active" : ""}
      >
        <span className="material-icons material-icons-outlined">
          format_list_numbered
        </span>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        <span className="material-icons material-icons-outlined">
          horizontal_rule
        </span>
      </button>
    </div>
  );
};
const Tiptap = (props: any) => {
  return (
    <EditorContent
      content={props.value}
      editor={props.editor}
      onChange={props.changeHandle}
      style={{ minHeight: 170 }}
    />
  );
};
function Description({ query, product }) {
  console.log(product)
  const token = useRef(Cookies.get("token_dash"));
  const id = query.id;
  const [validationsErrors, setValidationsErrors]: any = useState({});
  const editor = useEditor({
    extensions: [StarterKit],
    content: product && product.content,
  });
  const buyerInstruct = useEditor({
    extensions: [StarterKit],
    content: product && product.buyer_instruct,
  });

  const html = editor && editor.getHTML();
  const buyerInstructhtml = buyerInstruct && buyerInstruct.getHTML();
  useEffect(() => {
    if (!token) {
      router.push("/tw-admin/login");
      return;
    }
  }, [query.id])

  const formik = useFormik({
    initialValues: {
      buyer_instruct: buyerInstructhtml,
      content: html,
    },
    isInitialValid: true,
    enableReinitialize: true,
    onSubmit: async (values) => {
      setValidationsErrors({});
      try {
        const { id } = query;
        const res = await API.post(
          `dashboard/products/${id}/step_three`,
          values,
          {
            headers: {
              Authorization: `Bearer ${token.current}`,
            },
          }
        );
        // Authentication was successful.
        if (res.status === 200) {
          message.success("لقد تم التحديث بنجاح");
          router.push(`/tw-admin/posts/edit-product/medias?id=${product.id}`);
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
  return (
    <>
      <MetaTags
        title="تعديل الخدمة - الوصف وتعليمات المشتري"
        metaDescription="إضافة خدمة جديدة - الوصف وتعليمات المشتري"
        ogDescription="إضافة خدمة جديدة - الوصف وتعليمات المشتري"
      />
      {token  && (
        <div className="container-fluid">
          <div className="row justify-content-md-center my-3">
            <div className="col-md-7 pt-3">
              <form onSubmit={formik.handleSubmit}>
                <div
                  className={
                    "timlands-panel" + (formik.isSubmitting ? " is-loader" : "")
                  }
                >
                  <div className="timlands-steps">
                    <div className="timlands-step-item">
                      <h3 className="text">
                        <Link href={`/tw-admin/posts/edit-product/overview?id=${id}`}>
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
                      className={`timlands-step-item ${product.current_step < 1 && "pe-none"
                        }`}
                    >
                      <h3 className="text">
                        <Link href={`/tw-admin/posts/edit-product/prices?id=${query.id}`}>
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
                      className={`timlands-step-item active ${product.current_step < 2 && "pe-none"
                        }`}
                    >
                      <h3 className="text">
                        <Link href={`/tw-admin/posts/edit-product/description?id=${query.id}`}>
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
                      className={`timlands-step-item ${product.current_step < 3 && "pe-none"
                        }`}
                    >
                      <h3 className="text">
                        <Link href={`/edit-product/medias?id=${query.id}`}>
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
                   {/*  <div className="timlands-step-item ">
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
                            نشر الخدمة
                          </a>
                        </Link>
                      </h3>
                    </div> */}
                  </div>
                  <div className="timlands-panel-header mt-3">
                    <div className="flex-center">
                      <h2 className="title">
                        <span className="material-icons material-icons-outlined">
                          description
                        </span>
                        الوصف وتعليمات المشتري
                      </h2>
                      <div
                        className={
                          "header-butt" +
                          (formik.isSubmitting ? " is-loader" : "")
                        }
                      >
                        <button
                          type="submit"
                          disabled={
                            (!product ? true : false) || formik.isSubmitting
                          }
                          className="btn flex-center butt-green mr-auto butt-xs"
                        >
                          <span className="text">حفظ التغييرات</span>
                          <div
                            className="spinner-border spinner-border-sm text-white"
                            role="status"
                          ></div>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="timlands-content-form">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="timlands-form">
                          <label
                            className="label-block"
                            htmlFor="input-content"
                          >
                            وصف الخدمة
                          </label>
                          <div className="app-content-editor">
                            <MenuBar editor={editor} />
                            <Tiptap
                              value={formik.values.content}
                              changeHandle={formik.handleChange}
                              editor={editor}
                            />
                          </div>
                          <motion.div
                            initial={{ y: -70, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="timlands-form-note"
                          >
                            <p className="text">
                              أدخل وصف الخدمة بدقة يتضمن جميع المعلومات والشروط
                              . يمنع وضع البريد الالكتروني، رقم الهاتف أو أي
                              معلومات اتصال أخرى.
                            </p>
                          </motion.div>
                          {validationsErrors && validationsErrors.content && (
                            <div style={{ overflow: "hidden" }}>
                              <motion.div
                                initial={{ y: -70, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="timlands-form-note form-note-error"
                              >
                                <p className="text">
                                  {validationsErrors.content[0]}
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
                            htmlFor="input-buyer_instruct"
                          >
                            تعليمات المشتري
                          </label>
                          <div className="app-content-editor">
                            <MenuBar editor={buyerInstruct} />
                            <Tiptap
                              value={formik.values.buyer_instruct}
                              changeHandle={formik.handleChange}
                              editor={buyerInstruct}
                            />
                          </div>
                          <motion.div
                            initial={{ y: -70, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="timlands-form-note"
                          >
                            <p className="text">
                              المعلومات التي تحتاجها من المشتري لتنفيذ الخدمة.
                              تظهر هذه المعلومات بعد شراء الخدمة فقط
                            </p>
                          </motion.div>
                          {validationsErrors &&
                            validationsErrors.buyer_instruct && (
                              <div style={{ overflow: "hidden" }}>
                                <motion.div
                                  initial={{ y: -70, opacity: 0 }}
                                  animate={{ y: 0, opacity: 1 }}
                                  className="timlands-form-note form-note-error"
                                >
                                  <p className="text">
                                    {validationsErrors.buyer_instruct[0]}
                                  </p>
                                </motion.div>
                              </div>
                            )}
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="py-4 d-flex">
                          <button
                            type="submit"
                            disabled={
                              (!product ? true : false) ||
                              formik.isSubmitting
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
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default Description;
Description.getLayout = function getLayout(page): ReactElement {
  return <Layout>{page}</Layout>;
};
export async function getServerSideProps(ctx) {
  console.log('serverside')
  const token = cookies(ctx).token_dash || "";
  const uriString = `dashboard/products/${ctx.query.id}`;
  // Fetch data from external API
  const res = await API.get(uriString, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return { props: { query: ctx.query, product: res.data.data } };
}
Description.propTypes = {
  query: PropTypes.any,
  product: PropTypes.any,
};
MenuBar.propTypes = {
  editor: PropTypes.any,
};
