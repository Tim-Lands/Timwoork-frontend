import { motion } from "framer-motion";
import router from "next/router";
import SidebarAdvices from "./SidebarAdvices";
import { MetaTags } from "@/components/SEO/MetaTags";
import PropTypes from "prop-types";
import { message } from "antd";
import Layout from "@/components/Layout/HomeLayout";
import API from "../../config";
import { ReactElement, useEffect, useState, useRef } from "react";
import useSWR from "swr";
import { useAppSelector } from "@/store/hooks";

// import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
import { useFormik } from "formik";
import FormLangs from "@/components/Forms/FormLangs";
import FormModal from "@/components/Forms/FormModal";

// export const MenuBar = ({ editor }) => {
//   if (!editor) {
//     return null;
//   }

//   return (
//     <div className="menubar">
//       <button
//         type="button"
//         onClick={() => editor.chain().focus().toggleBold().run()}
//         className={editor.isActive("bold") ? "is-active" : ""}
//       >
//         <span className="material-icons material-icons-outlined">
//           format_bold
//         </span>
//       </button>
//       <button
//         type="button"
//         onClick={() => editor.chain().focus().toggleItalic().run()}
//         className={editor.isActive("italic") ? "is-active" : ""}
//       >
//         <span className="material-icons material-icons-outlined">
//           format_italic
//         </span>
//       </button>
//       <button
//         type="button"
//         onClick={() => editor.chain().focus().toggleStrike().run()}
//         className={editor.isActive("strike") ? "is-active" : ""}
//       >
//         <span className="material-icons material-icons-outlined">
//           strikethrough_s
//         </span>
//       </button>
//       <button
//         type="button"
//         onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
//         className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
//       >
//         h1
//       </button>
//       <button
//         type="button"
//         onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
//         className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
//       >
//         h2
//       </button>
//       <button
//         type="button"
//         onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
//         className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
//       >
//         h3
//       </button>
//       <button
//         type="button"
//         onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
//         className={editor.isActive("heading", { level: 4 }) ? "is-active" : ""}
//       >
//         h4
//       </button>
//       <button
//         type="button"
//         onClick={() => editor.chain().focus().toggleBulletList().run()}
//         className={editor.isActive("bulletList") ? "is-active" : ""}
//       >
//         <span className="material-icons material-icons-outlined">
//           format_list_bulleted
//         </span>
//       </button>
//       <button
//         type="button"
//         onClick={() => editor.chain().focus().toggleOrderedList().run()}
//         className={editor.isActive("orderedList") ? "is-active" : ""}
//       >
//         <span className="material-icons material-icons-outlined">
//           format_list_numbered
//         </span>
//       </button>
//       <button
//         type="button"
//         onClick={() => editor.chain().focus().setHorizontalRule().run()}
//       >
//         <span className="material-icons material-icons-outlined">
//           horizontal_rule
//         </span>
//       </button>
//     </div>
//   );
// };
// const Tiptap = (props: any) => {
//   return (
//     <EditorContent
//       content={props.value}
//       editor={props.editor}
//       onChange={props.changeHandle}
//       style={{ minHeight: 170 }}
//     />
//   );
// };
let testTime;

function Description({ query }) {
  const user = useAppSelector((state) => state.user);

  const [checkedLangsDesc, setCheckedLangsDesc] = useState({
    ar: false,
    fr: false,
    en: false,
  });
  const [checkedLangsInstruc, setCheckedLangsInstruc] = useState({
    ar: false,
    fr: false,
    en: false,
  });
  const [selectedLangDesc, setSelectedLangDesc] = useState("");
  const [selectedLangInstruc, setSelectedLangInstruc] = useState("");
  const [subtitlesDesc, setSubtitlesDesc] = useState({
    ar: null,
    fr: null,
    en: null,
  });
  const [subtitlesInstruc, setSubtitlesInstruc] = useState({
    ar: null,
    fr: null,
    en: null,
  });
  const [isSubtitlesDesc, setIsSubtitlesDesc] = useState({
    ar: false,
    fr: false,
    en: false,
  });
  const [isSubtitlesInstruc, setIsSubtitlesInstruc] = useState({
    ar: false,
    fr: false,
    en: false,
  });

  const [isShownDescModal, setIsShownDescModal] = useState(false);
  const [isShownInstrucModal, setIsShownInstrucModal] = useState(false);
  const [userLang, setUserLang] = useState();

  const { getAll, language } = useAppSelector((state) => state.languages);

  const { data: getProduct }: any = useSWR(
    `api/my_products/product/${query.id}`
  );
  const [validationsErrors, setValidationsErrors]: any = useState({});
  const veriedEmail = user.email_verified;
  // const editor = useEditor({
  //   extensions: [StarterKit],
  //   content: stars && stars.data.content,
  // });
  // const buyerInstruct = useEditor({
  //   extensions: [StarterKit],
  //   content: stars && stars.data.buyer_instruct,
  // });
  // const html = editor && editor.getHTML();
  // const buyerInstructhtml = buyerInstruct && buyerInstruct.getHTML();
  const addSubtitleDesc = (subtitle) => {
    switch (selectedLangDesc) {
      case "ar":
        setSubtitlesDesc({ ...subtitlesDesc, ar: subtitle });
        break;
      case "en":
        setSubtitlesDesc({ ...subtitlesDesc, en: subtitle });
        break;
      case "fr":
        setSubtitlesDesc({ ...subtitlesDesc, fr: subtitle });
        break;
    }
  };

  const addSubtitleInstruc = (subtitle) => {
    switch (selectedLangInstruc) {
      case "ar":
        setSubtitlesInstruc({ ...subtitlesInstruc, ar: subtitle });
        break;
      case "en":
        setSubtitlesInstruc({ ...subtitlesInstruc, en: subtitle });
        break;
      case "fr":
        setSubtitlesInstruc({ ...subtitlesInstruc, fr: subtitle });
        break;
    }
  };
  const formik = useFormik({
    initialValues: {
      // buyer_instruct: buyerInstructhtml,
      buyer_instruct: "",
      // content: html,
      content: "",
    },
    isInitialValid: true,
    enableReinitialize: true,
    onSubmit: async (values) => {
      setValidationsErrors({});

      try {
        const id = query.id;
        const body: any = { ...values };
        if (!isSubtitlesInstruc["ar"] && subtitlesInstruc["ar"])
          body["buyer_instruct_ar"] = subtitlesInstruc["ar"];
        if (!isSubtitlesInstruc["ar"] && subtitlesInstruc["en"])
          body["buyer_instruct_en"] = subtitlesInstruc["en"];
        if (!isSubtitlesInstruc["ar"] && subtitlesInstruc["fr"])
          body["buyer_instruct_fr"] = subtitlesInstruc["fr"];

        if (!isSubtitlesDesc["ar"] && setSubtitlesDesc["ar"])
          body["content_ar"] = subtitlesDesc["ar"];
        if (!isSubtitlesDesc["ar"] && setSubtitlesDesc["en"])
          body["content_en"] = subtitlesDesc["en"];
        if (!isSubtitlesDesc["ar"] && setSubtitlesDesc["fr"])
          body["content_fr"] = subtitlesDesc["fr"];
        const res = await API.post(`api/product/${id}/product-step-three`, {
          ...body,
          content: values.content.replace(/\n/g, "<br />"),
          buyer_instruct: values.buyer_instruct.replace(/\n/g, "<br />"),
        });
        // Authentication was successful.
        if (res.status === 200) {
          message.success(getAll("The_update_has"));
          router.push({
            pathname: "/add-new/medias",
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
  const detectLang = async (txt, callback) => {
    const res = await API.post(`/api/detectLang`, { sentence: txt });
    callback(res.data.data);
  };

  async function getProductId() {
    try {
      // const res: any =
      await API.get(`api/my_products/product/${query.id}`);
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
  const stepsView = useRef(null);

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
      {user.isLogged && (
        <div className="container-fluid">
          <div
            className="row my-3"
            style={{ maxWidth: 1300, marginInline: "auto" }}
          >
            <div className="col-md-4">
              <SidebarAdvices />
            </div>
            <div className="col-md-8 pt-3">
              {veriedEmail && (
                <form onSubmit={formik.handleSubmit}>
                  <div
                    className={
                      "timlands-panel" +
                      (formik.isSubmitting ? " is-loader" : "")
                    }
                  >
                    {isShownDescModal && (
                      <FormModal
                        defaultValue={subtitlesDesc[selectedLangDesc]}
                        isSwitchChecked={isSubtitlesDesc[selectedLangDesc]}
                        onSwitch={() =>
                          setIsSubtitlesDesc({
                            ...isSubtitlesDesc,
                            [selectedLangDesc]:
                              !isSubtitlesDesc[selectedLangDesc],
                          })
                        }
                        onSubmit={(txt) => addSubtitleDesc(txt)}
                        setIsConfirmText={setIsShownDescModal}
                      />
                    )}
                    {isShownInstrucModal && (
                      <FormModal
                        defaultValue={subtitlesInstruc[selectedLangInstruc]}
                        isSwitchChecked={
                          isSubtitlesInstruc[selectedLangInstruc]
                        }
                        onSwitch={() =>
                          setIsSubtitlesInstruc({
                            ...isSubtitlesInstruc,
                            [selectedLangInstruc]:
                              !isSubtitlesInstruc[selectedLangInstruc],
                          })
                        }
                        onSubmit={(txt) => addSubtitleInstruc(txt)}
                        setIsConfirmText={setIsShownInstrucModal}
                      />
                    )}

                    <div className="timlands-steps-cont">
                      <div className="timlands-steps">
                        <div className="timlands-step-item">
                          <h4 className="text">
                            <span className="icon-circular">
                              <span className="material-icons material-icons-outlined">
                                collections_bookmark
                              </span>
                            </span>
                            {getAll("General_information")}
                          </h4>
                        </div>
                        <div className="timlands-step-item">
                          <h4 className="text">
                            <span className="icon-circular">
                              <span className="material-icons material-icons-outlined">
                                payments
                              </span>
                            </span>
                            {getAll("Upgrades_price")}
                          </h4>
                        </div>
                        <div
                          className="timlands-step-item active"
                          ref={stepsView}
                        >
                          <h4 className="text">
                            <span className="icon-circular">
                              <span className="material-icons material-icons-outlined">
                                description
                              </span>
                            </span>
                            {getAll("Description_and_instructions")}
                          </h4>
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
                            <label
                              className="label-block"
                              htmlFor="input-content"
                            >
                              {getAll("Service_description")}
                            </label>
                            <div className="app-content-editor">
                              <textarea
                                name="content"
                                id="content"
                                className="descriptionInputHold"
                                onChange={(e) => formik.handleChange(e)}
                                onKeyUp={() => {
                                  testTime = setTimeout(() => {
                                    detectLang(
                                      formik.values["content"],
                                      (res) => {
                                        setCheckedLangsDesc({
                                          ...checkedLangsDesc,
                                          [res]: false,
                                        });
                                        setUserLang(res);
                                      }
                                    );
                                  }, 3000);
                                }}
                                onKeyDown={() => {
                                  clearTimeout(testTime);
                                }}
                                // onChange={formik.setFieldValue}
                              ></textarea>
                              <FormLangs
                                onClick={(lang) => {
                                  setIsShownDescModal(true);
                                  setSelectedLangDesc(lang);
                                }}
                                default_lang={userLang}
                              />
                              {/* <MenuBar editor={editor} />
                              <Tiptap
                                value={formik.values.content}
                                changeHandle={formik.handleChange}
                                editor={editor}
                              /> */}
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
                              <textarea
                                name="buyer_instruct"
                                className="descriptionInputHold"
                                id="buyer_instruct"
                                onChange={(e) => formik.handleChange(e)}
                                onKeyUp={() => {
                                  testTime = setTimeout(() => {
                                    detectLang(
                                      formik.values["buyer_instruct"],
                                      (res) => {
                                        setCheckedLangsInstruc({
                                          ...checkedLangsInstruc,
                                          [res]: false,
                                        });
                                        setUserLang(res);
                                      }
                                    );
                                  }, 3000);
                                }}
                                onKeyDown={() => {
                                  clearTimeout(testTime);
                                }}
                              ></textarea>
                              <FormLangs
                                onClick={(lang) => {
                                  setIsShownInstrucModal(true);
                                  setSelectedLangInstruc(lang);
                                }}
                                default_lang={userLang}
                              />{" "}
                              {/* <MenuBar editor={buyerInstruct} />
                              <Tiptap
                                value={formik.values.buyer_instruct}
                                changeHandle={formik.handleChange}
                                editor={buyerInstruct}
                              /> */}
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
                              {language === "ar" ? (
                                <span className="material-icons-outlined">
                                  chevron_right
                                </span>
                              ) : (
                                <span className="material-icons-outlined">
                                  chevron_left
                                </span>
                              )}
                              <span className="text">
                                {getAll("Previous_step")}
                              </span>
                            </button>
                            <button
                              type="submit"
                              disabled={
                                (!getProduct ? true : false) ||
                                formik.isSubmitting
                              }
                              className="btn flex-center butt-green ml-auto butt-sm"
                            >
                              <span className="text">
                                {getAll("Next_step")}
                              </span>
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
              )}
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
  // const token = cookies(ctx).token || "";
  // const uriString = `api/my_products/product/${ctx.query.id}`;
  // // Fetch data from external API
  // const res = await API.get(uriString, {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // });

  return { props: { query: ctx.query } };
}
Description.propTypes = {
  query: PropTypes.any,
  // stars: PropTypes.any,
};
// MenuBar.propTypes = {
//   editor: PropTypes.any,
// };
