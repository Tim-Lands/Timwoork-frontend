import React, { ReactElement, useState } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useAppSelector } from "@/store/hooks";
import CreatableSelect from "react-select/creatable";
import API from "../config";
import SetSelectThemesModal from "./SetSelectThemesModal";

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
      style={{ margin: "1rem 0", position: "relative", maxWidth: 1300 }}
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

export const MenuBar = ({ editor }: any) => {
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
function AddNewMessage({ setIsConfirmText, title }): ReactElement {
  const { getAll } = useAppSelector((state) => state.languages);

  const [toState, setToState] = useState("");
  const [fromState, setFromState] = useState("");
  const [setSlectThemesModal, setSetSlectThemesModal] = useState(false);

  const [messageState, setMessageState] = useState("");
  const [subject, setSubject] = useState("");
  const [validationsErrors, setValidationsErrors]: any = useState({});
  const editor = useEditor({
    extensions: [StarterKit],
    content: "stars && stars.data.buyer_instruct",
  });

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="modal-conferm lg"
    >
      <div className="modal-conferm-inner">
        {setSlectThemesModal && (
          <SetSelectThemesModal
            title={getAll("Select_a_template")}
            setIsConfirmText={setSetSlectThemesModal}
          />
        )}
        <div className="modal-conferm-head">
          <h3 className="title">{title}</h3>
        </div>
        <div className="modal-conferm-body" style={{ paddingTop: 0 }}>
          <div className="row">
            <div className="col-xl-5">
              <div className="timlands-form">
                <label className="label-block" htmlFor="input-fromState">
                  {getAll("From")}
                </label>
                <select
                  id="input-fromState"
                  name="fromState"
                  placeholder={getAll("From") + "..."}
                  className={
                    "timlands-inputs select sm " +
                    (validationsErrors &&
                      validationsErrors.fromState &&
                      " has-error")
                  }
                  onChange={(e) => setFromState(e.target.value)}
                  value={fromState}
                >
                  <option value="1">info@timlands.com</option>
                  <option value="1">contact@timlands.com</option>
                  <option value="1">support@timlands.com</option>
                  <option value="1">timlands@timlands.com</option>
                  <option value="1">chairman@timlands.com</option>
                  <option value="1">info@timwoork.com</option>
                  <option value="1">contact@timwoork.com</option>
                  <option value="1">support@timwoork.com</option>
                  <option value="1">timwoork@timwoork.com</option>
                  <option value="1">chairman@timwoork.com</option>
                </select>

                {validationsErrors && validationsErrors.fromState && (
                  <div style={{ overflow: "hidden" }}>
                    <motion.div
                      initial={{ y: -70, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="timlands-form-note form-note-error"
                    >
                      <p className="text">{validationsErrors.fromState[0]}</p>
                    </motion.div>
                  </div>
                )}
              </div>
            </div>
            <div className="col-xl-7">
              <div className="timlands-form">
                <label className="label-block" htmlFor="input-toState">
                  {getAll("To")}
                </label>
                <div style={{ marginTop: -8 }}>
                  <MySelect
                    value={toState}
                    onChange={(e: any) => setToState(e)}
                    //onBlur={formik.setFieldTouched}
                  />

                  <div style={{ overflow: "hidden" }}>
                    <motion.div
                      style={{ padding: 0, marginTop: 0 }}
                      initial={{ y: -70, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="timlands-form-note"
                    >
                      <p className="text">
                        {getAll("To_select_all")}
                        <strong>(*)</strong>
                      </p>
                    </motion.div>
                  </div>
                </div>
                {validationsErrors && validationsErrors.toState && (
                  <div style={{ overflow: "hidden" }}>
                    <motion.div
                      initial={{ y: -70, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="timlands-form-note form-note-error"
                    >
                      <p className="text">{validationsErrors.toState[0]}</p>
                    </motion.div>
                  </div>
                )}
              </div>
            </div>
            <div className="col-xl-12">
              <div className="timlands-form">
                <label className="label-block" htmlFor="input-subject">
                  {getAll("Subject")}
                </label>
                <input
                  type="text"
                  id="input-subject"
                  name="subject"
                  placeholder={getAll("Subject") + "..."}
                  className={
                    "timlands-inputs sm " +
                    (validationsErrors &&
                      validationsErrors.subject &&
                      " has-error")
                  }
                  onChange={(e) => setSubject(e.target.value)}
                  value={subject}
                />
                {validationsErrors && validationsErrors.subject && (
                  <div style={{ overflow: "hidden" }}>
                    <motion.div
                      initial={{ y: -70, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="timlands-form-note form-note-error"
                    >
                      <p className="text">{validationsErrors.subject[0]}</p>
                    </motion.div>
                  </div>
                )}
              </div>
            </div>
            <div className="col-xl-12">
              <div className="timlands-form">
                <div className="app-content-editor">
                  <MenuBar editor={editor} />
                  <Tiptap
                    value={messageState}
                    changeHandle={(e: any) => setMessageState(e.target.value)}
                    editor={editor}
                  />
                </div>
                {validationsErrors && validationsErrors.messageState && (
                  <div style={{ overflow: "hidden" }}>
                    <motion.div
                      initial={{ y: -70, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="timlands-form-note form-note-error"
                    >
                      <p className="text">
                        {validationsErrors.messageState[0]}
                      </p>
                    </motion.div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="modal-conferm-footer">
          <div className="d-flex">
            <div className="me-auto">
              <button
                className="btn butt-sm butt-green mx-1"
                onClick={() => setValidationsErrors("error")}
              >
                {getAll("Send")}
              </button>
              <button
                className="btn butt-sm butt-red-text mx-1"
                onClick={() => setIsConfirmText(false)}
              >
                {getAll("Cancel")}
              </button>
            </div>
            <button
              className="btn butt-sm butt-blue ml-auto flex-center"
              onClick={() => setSetSlectThemesModal(true)}
            >
              <span className="material-icons material-icons-outlined">
                collections_bookmark
              </span>
              {getAll("Select_a_template")}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default AddNewMessage;
AddNewMessage.propTypes = {
  setIsConfirmText: PropTypes.func,
  handleChange: PropTypes.func,
  setMsg: PropTypes.func,
  msg: PropTypes.string,
  text: PropTypes.string,
  title: PropTypes.string,
  handleFunc: PropTypes.func,
  editor: PropTypes.any,
};
