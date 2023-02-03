import { motion } from "framer-motion";
import { ReactElement } from "react";
import CreatableSelect from "react-select/creatable";
import API from "../../config";
import { useState } from "react";
import { useAppSelector } from "@/store/hooks";

function Tags({
  validationsErrors,
  values,
  onChange,
  onBlur,
}: {
  validationsErrors: any;
  values?: Array<any>;
  onChange?: Function;
  onBlur?: Function;
}): ReactElement {
  const { getAll } = useAppSelector((state) => state.languages);
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
        style={{ marginTop: "1rem", position: "relative", maxWidth: 1300 }}
      >
        {isLoadingTags && (
          <span
            className="spinner-border spinner-border-sm"
            role="status"
          ></span>
        )}
        <CreatableSelect
          id="color"
          options={dataTags}
          placeholder={getAll("Tags")}
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
  return (
    <>
      <p
        className="label-text"
        style={{
          fontWeight: "bold",
          marginTop: 10,
          marginBottom: -9,
        }}
      >
        {getAll("Key_words")}
      </p>
      <MySelect value={values} onChange={onChange} onBlur={onBlur} />
      {validationsErrors && validationsErrors.tags && (
        <div style={{ overflow: "hidden" }}>
          <motion.div
            initial={{ y: -70, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="timlands-form-note form-note-error"
          >
            <p className="text">{validationsErrors.tags[0]}</p>
          </motion.div>
        </div>
      )}
    </>
  );
}
export default Tags;
