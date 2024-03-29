import { useFormik } from "formik";
import { motion } from "framer-motion";
import router from "next/router";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import Navbar from "components/productModify/navbar";
import { MyProductsActions } from "store/myProducts/myProductsActions";
import { MetaTags } from "@/components/SEO/MetaTags";
import PropTypes from "prop-types";
import { message } from "antd";
import Layout from "@/components/Layout/HomeLayout";
import API from "../../config";
import { ReactElement, useEffect, useState, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import NavigationButtons from "@/components/NavigationButtons";

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
function Description({ query }) {
  const dispatch = useAppDispatch();
  const stepsView = useRef(null);
  const id = query.id;
  const { getAll } = useAppSelector((state) => state.languages);
  const user = useAppSelector((state) => state.user);
  const getProduct = useAppSelector((state) => state.myProducts.product);
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
  const editor = useEditor(
    {
      extensions: [StarterKit],
      content: getProduct.content,
    },
    [getProduct]
  );
  const buyerInstruct = useEditor(
    {
      extensions: [StarterKit],
      content: getProduct.buyer_instruct,
    },
    [getProduct]
  );
  const html = editor && editor.getHTML();
  const buyerInstructhtml = buyerInstruct && buyerInstruct.getHTML();
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
        await dispatch(
          MyProductsActions.modifySteps({
            url: `api/product/${id}/product-step-three`,
            id,
            body: values,
          })
        ).unwrap();
        message.success(getAll("The_update_has"));
        router.push(`/edit-product/medias?id=${getProduct.id}`);
      } catch (error: any) {
        if (error.errors) {
          setValidationsErrors(error.errors);
        }
      }
    },
  });
  async function getProductId() {
    try {
      // const res: any =
      await API.get(`api/my_products/product/${query.id}`);
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
    stepsView.current && stepsView.current.scrollIntoView();

    if (!user.isLogged && !user.loading) {
      router.push("/login");
      return;
    }
    getProductId();
  }, [user]);
  return (
    <>
      <MetaTags
        title={getAll("Add_new_service_Description")}
        metaDescription={getAll("Add_new_service_Description")}
        ogDescription={getAll("Add_new_service_Description")}
      />
      {user.isLogged && veriedEmail && (
        <div className="container-fluid">
          <div className="row justify-content-md-center my-3">
            <div className="col-md-7 pt-3">
              <form onSubmit={formik.handleSubmit}>
                <div
                  className={
                    "timlands-panel" + (formik.isSubmitting ? " is-loader" : "")
                  }
                >
                  <Navbar
                    active="description"
                    navigate={true}
                    url="edit-product"
                    id={id}
                    priceClass={getProduct.current_step < 1 && "pe-none"}
                    descriptionClass={getProduct.current_step < 2 && "pe-none"}
                    galleryClass={getProduct.current_step < 3 && "pe-none"}
                  />

                  <div className="timlands-panel-header mt-3">
                    <div className="flex-center">
                      <h2 className="title">
                        <span className="material-icons material-icons-outlined">
                          description
                        </span>
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
                          ></label>
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
                            <p className="text"></p>
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
                          ></label>
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
                            <p className="text"></p>
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
                        <NavigationButtons onNextClick={formik.handleSubmit} nextTitle={getAll('Next_step')} backTitle={getAll('Previous_step')}/>
                          
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
export async function getServerSideProps({ query }) {
  return { props: { query } };
}
Description.propTypes = {
  query: PropTypes.any,
};
MenuBar.propTypes = {
  editor: PropTypes.any,
};
