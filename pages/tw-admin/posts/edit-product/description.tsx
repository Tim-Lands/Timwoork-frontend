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
import { useAppSelector } from "@/store/hooks";

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
  const { getAll } = useAppSelector((state) => state.languages);

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
  }, [query.id]);

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
          message.success(getAll("The_update_has"));
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
        title={getAll("Edit_service_Description")}
        metaDescription={getAll("Add_new_service_Description")}
        ogDescription={getAll("Add_new_service_Description")}
      />
      {token && (
        <div className="container-fluid">
          <div className="row justify-content-md-center my-3">
            <div className="col-md-8 pt-3">
              <form onSubmit={formik.handleSubmit}>
                <div
                  className={
                    "timlands-panel" + (formik.isSubmitting ? " is-loader" : "")
                  }
                >
                  <div className="timlands-steps">
                    <div className="timlands-step-item">
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
                            {getAll("General_information")}
                          </a>
                        </Link>
                      </h3>
                    </div>
                    <div
                      className={`timlands-step-item ${
                        product.current_step < 1 && "pe-none"
                      }`}
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
                      className={`timlands-step-item active ${
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
                        <Link href={`/edit-product/medias?id=${query.id}`}>
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
                        {getAll("Desciprion_intrustions")}
                      </h2>
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
                            {getAll("Service_description")}
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
                              {getAll("Enter_an_accurate")}
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
                            {getAll("Instructions_to_the")}
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
                              {getAll("They_are_information")}
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
                              (!product ? true : false) || formik.isSubmitting
                            }
                            className="btn flex-center butt-green ml-auto butt-sm"
                          >
                            <span className="text">{getAll("Save_edits")}</span>
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
  console.log("serverside");
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
