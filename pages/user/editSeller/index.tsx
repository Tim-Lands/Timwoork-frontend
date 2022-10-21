import React, { ReactElement, useEffect, useState } from "react";
import Layout from "@/components/Layout/HomeLayout";
import API from "../../../config";
import { motion } from "framer-motion";
import { message } from "antd";
import "antd/dist/antd.min.css";
import useSWR from "swr";
import Loading from "@/components/Loading";
import router from "next/router";
import { useAppSelector } from "@/store/hooks";

import { MetaTags } from "@/components/SEO/MetaTags";
import PropTypes from "prop-types";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useFormik } from "formik";
import FormLangsCheck from "@/components/Forms/FormLangsCheck";
import FormLangs from "@/components/Forms/FormLangs";
import FormModal from "@/components/Forms/FormModal";

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

MenuBar.propTypes = {
  editor: PropTypes.any,
};
let testTime;
const Tiptap = (props: any) => {
  return (
    <EditorContent
      content={props.value}
      editor={props.editor}
      onChange={props.changeHandle}
      onKeyDown={props.onKeyDown}
      onKeyUp={props.onKeyUp}
      style={{ minHeight: 170 }}
    />
  );
};

const EditSeller = () => {
  const user = useAppSelector((state) => state.user);
  const [validationsErrors, setValidationsErrors]: any = useState({});
  const { data: userInfo }: any = useSWR("api/me");
  const [isShowenModal, setIsShowenModal] = useState(false);
  const [checkedLangs, setCheckedLangs] = useState({
    ar: false,
    fr: false,
    en: false,
  });
  const [selectedLang, setSelectedLang] = useState("");
  const [subtitles, setSubtitles] = useState({ ar: null, fr: null, en: null });
  const [userLang, setUserLang] = useState();
  const veriedEmail = user.email_verified;
  const editor = useEditor({
    extensions: [StarterKit],
    content:
      userInfo &&
      userInfo.user_details.profile.profile_seller &&
      userInfo.user_details.profile.profile_seller.bio,
  });
  const { getAll } = useAppSelector((state) => state.languages);

  const html = editor && editor.getHTML();

  const addSubtitle = (subtitle) => {
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

  const formik = useFormik({
    initialValues: {
      bio: html,
      portfolio:
        userInfo &&
        userInfo.user_details.profile.profile_seller &&
        userInfo.user_details.profile.profile_seller.portfolio,
    },
    isInitialValid: true,
    enableReinitialize: true,
    onSubmit: async (values) => {
      setValidationsErrors({});
      try {
        if (subtitles["ar"]) values.bio = subtitles["ar"];
        if (subtitles["en"]) values.bio = subtitles["en"];
        if (subtitles["fr"]) values.bio = subtitles["fr"];
        await API.post("api/sellers/detailsStore", values);
        // Authentication was successful.

        message.success(getAll("The_update_has"));
        router.push("/user/profile");
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
  useEffect(() => {
    if (!user.isLogged && !user.loading) {
      router.push("/login");
      return;
    }
  }, [user]);
  // Return statement.

  const detectLang = async (txt) => {
    const res = await API.post(`/api/detectLang`, { sentence: txt });
    setCheckedLangs({ ...checkedLangs, [res.data.data]: false });
    setUserLang(res.data.data);
  };
  return (
    <>
      <MetaTags
        title={getAll("Edit_the_sellers")}
        metaDescription={getAll("Edit_the_sellers")}
        ogDescription={getAll("Edit_the_sellers")}
      />
      {veriedEmail && (
        <>
          {!userInfo && <Loading />}
          {userInfo &&
            userInfo.user_details.profile &&
            userInfo.user_details.profile.profile_seller !== null && (
              <>
                <div className="row justify-content-md-center mt-3">
                  <div className="col-lg-7">
                    {isShowenModal && (
                      <FormModal
                        onSubmit={(txt) => addSubtitle(txt)}
                        setIsConfirmText={setIsShowenModal}
                      />
                    )}

                    <form onSubmit={formik.handleSubmit}>
                      <div className="login-panel update-form">
                        <div
                          className={
                            "panel-modal-body login-panel-body auto-height" +
                            (formik.isSubmitting ? " is-loading" : "")
                          }
                        >
                          {!formik.isSubmitting ? (
                            ""
                          ) : (
                            <motion.div
                              initial={{ opacity: 0, y: 50 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="is-loading"
                            >
                              <div className="spinner-border" role="status">
                                <span className="visually-hidden">
                                  Loading...
                                </span>
                              </div>
                            </motion.div>
                          )}
                          <div className="update-form-header">
                            <h1 className="title">تعديل المعلومات البائع</h1>
                          </div>
                          <div className="row">
                            <div className="col-md-12">
                              <div className="timlands-form">
                                <label
                                  className="label-block"
                                  htmlFor="portfolio"
                                >
                                  رابط أعمالك
                                </label>
                                <input
                                  id="portfolio"
                                  name="portfolio"
                                  placeholder="رابط أعمالك..."
                                  onChange={formik.handleChange}
                                  value={formik.values.portfolio}
                                  className={
                                    "timlands-inputs " +
                                    (validationsErrors &&
                                      validationsErrors.portfolio &&
                                      " has-error")
                                  }
                                  autoComplete="off"
                                />
                                {validationsErrors &&
                                  validationsErrors.portfolio && (
                                    <div style={{ overflow: "hidden" }}>
                                      <motion.div
                                        initial={{ y: -70, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        className="timlands-form-note form-note-error"
                                      >
                                        <p className="text">
                                          {validationsErrors.portfolio[0]}
                                        </p>
                                      </motion.div>
                                    </div>
                                  )}
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="timlands-form">
                                <label className="label-block" htmlFor="bio">
                                  {getAll("Brief_me_about")}
                                </label>
                                <div className="app-content-editor">
                                  <FormLangsCheck
                                    id={1}
                                    default_lang={userLang}
                                    onChange={(e) => {
                                      setCheckedLangs({
                                        ...checkedLangs,
                                        [e.target.value]: e.target.checked,
                                      });
                                      if (!e.target.checked)
                                        setSubtitles({
                                          ...subtitles,
                                          [e.target.value]: null,
                                        });
                                    }}
                                  />
                                  <MenuBar editor={editor} />
                                  <Tiptap
                                    value={formik.values.bio}
                                    changeHandle={formik.handleChange}
                                    editor={editor}
                                    onKeyDown={() => {
                                      clearTimeout(testTime);
                                    }}
                                    onKeyUp={() => {
                                      testTime = setTimeout(
                                        () => detectLang(formik.values["bio"]),
                                        3000
                                      );
                                    }}
                                  />
                                  <FormLangs
                                    onClick={(lang) => {
                                      setIsShowenModal(true);
                                      setSelectedLang(lang);
                                    }}
                                    checkedLangs={checkedLangs}
                                    default_lang={userLang}
                                  />
                                </div>
                                {validationsErrors && validationsErrors.bio && (
                                  <div style={{ overflow: "hidden" }}>
                                    <motion.div
                                      initial={{ y: -70, opacity: 0 }}
                                      animate={{ y: 0, opacity: 1 }}
                                      className="timlands-form-note form-note-error"
                                    >
                                      <p className="text">
                                        {validationsErrors.bio[0]}
                                      </p>
                                    </motion.div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="panel-modal-footer">
                            <div className="d-flex">
                              <button
                                type="submit"
                                disabled={formik.isSubmitting}
                                className="btn me-auto butt-primary butt-md"
                              >
                                {getAll("Update_basic_information")}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </>
            )}
        </>
      )}
    </>
  );
};
export default EditSeller;
EditSeller.getLayout = function getLayout(page: any): ReactElement {
  return <Layout>{page}</Layout>;
};
