import React, { ReactElement } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
export function FormInput({
  name,
  value,
  title,
  handleChange,
  onKeyDown,
  validationsErrors,
  isLoading,
  onKeyUp,
  type = "text",
  isVisibleBtn = false,
  setIsShowenPass,
  isShowenPass,
  size,
}: any): ReactElement {
  return (
    <div className={`timlands-form ${size}`} style={{ position: "relative" }}>
      <label className="label-block" htmlFor={`input-${name}`}>
        {title}
      </label>
      <input
        type={type}
        id={`input-${name}`}
        name={name}
        disabled={isLoading}
        placeholder={title}
        className={"timlands-inputs " + (validationsErrors && " has-error")}
        autoComplete="off"
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onChange={handleChange}
        value={value}
      />
      {isVisibleBtn && (
        <button
          className={`form-toggle-password ${isShowenPass ? "is-active" : ""}`}
          type="button"
          onClick={() => setIsShowenPass(!isShowenPass)}
        >
          <span className="material-icons material-icons-outlined">
            {isShowenPass ? "visibility_off" : "visibility"}
          </span>
        </button>
      )}
      {validationsErrors && (
        <div style={{ overflow: "hidden" }}>
          <motion.div
            initial={{ y: -12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="timlands-form-note form-note-error"
          >
            <p className="text">{validationsErrors}</p>
          </motion.div>
        </div>
      )}
    </div>
  );
}

FormInput.propTypes = {
  value: PropTypes.any.isRequired,
  name: PropTypes.string,
  setIsShowenPass: PropTypes.func,
  isShowenPass: PropTypes.bool,
  handleChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  title: PropTypes.string,
  isLoading: PropTypes.bool,
  isVisibleBtn: PropTypes.bool,
  type: PropTypes.string,
  size: PropTypes.string,
  validationsErrors: PropTypes.string,
};
export function FormSelect(props: any): ReactElement {
  const lang: any = Cookies.get("lang");
  return (
    <div className="timlands-form">
      <label className="label-block" htmlFor={`input-${props.name}`}>
        {props.title}
      </label>
      <select
        id={`input-${props.name}`}
        name={props.name}
        disabled={props.isLoading}
        className={
          "timlands-inputs select " + (props.validationsErrors && " has-error")
        }
        onChange={props.handleChange}
        value={props.value}
      >
        <option value="">{props.title}</option>
        {props.data &&
          props.data.map((item: any, i: number) => (
            <option key={i} value={item.id}>
              {lang == "ar" ? item.name_ar : item.name_en}
            </option>
          ))}
      </select>
      {props.validationsErrors && (
        <div style={{ overflow: "hidden" }}>
          <div className="timlands-form-note form-note-error">
            <p className="text">{props.validationsErrors}</p>
          </div>
        </div>
      )}
    </div>
  );
}

FormSelect.propTypes = {
  value: PropTypes.any.isRequired,
  name: PropTypes.string,
  isLoading: PropTypes.bool,
  handleChange: PropTypes.func.isRequired,
  title: PropTypes.string,
  validationsErrors: PropTypes.string,
  data: PropTypes.array,
};
export function FormSelect2(props: any): ReactElement {
  return (
    <div className="timlands-form">
      <label className="label-block" htmlFor={`input-${props.name}`}>
        {props.title}
      </label>
      <select
        id={`input-${props.name}`}
        name={props.name}
        disabled={props.isLoading}
        className={
          "timlands-inputs select " + (props.validationsErrors && " has-error")
        }
        onChange={props.handleChange}
        value={props.value}
      >
        <option value="">{props.title}</option>
        {props.data &&
          props.data.map((item: any, i: number) => (
            <option key={i} value={item.name}>
              {item.name}
            </option>
          ))}
      </select>
      {props.validationsErrors && (
        <div style={{ overflow: "hidden" }}>
          <div className="app-form-note form-note-error">
            <p className="text">{props.validationsErrors}</p>
          </div>
        </div>
      )}
    </div>
  );
}

FormSelect2.propTypes = {
  value: PropTypes.any.isRequired,
  name: PropTypes.string,
  isLoading: PropTypes.bool,
  handleChange: PropTypes.func.isRequired,
  title: PropTypes.string,
  validationsErrors: PropTypes.string,
  data: PropTypes.array,
};

export function FormTextarea({
  name,
  value,
  title,
  handleChange,
  validationsErrors,
  isLoading,
  minHeight = 150,
  onKeyUp,
  onKeyDown
}: any): ReactElement {
  return (
    <div className="timlands-form">
      <label className="label-block" htmlFor={`input-${name}`}>
        {title}
      </label>
      <textarea
        id={`input-${name}`}
        name={name}
        disabled={isLoading}
        placeholder={title}
        style={{
          minHeight: minHeight,
        }}
        className={"timlands-inputs " + (validationsErrors && " has-error")}
        autoComplete="off"
        onChange={handleChange}
        value={value}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
      >
        {value}
      </textarea>
      {validationsErrors && (
        <div style={{ overflow: "hidden" }}>
          <motion.div
            initial={{ y: -12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="app-form-note form-note-error"
          >
            <p className="text">{validationsErrors}</p>
          </motion.div>
        </div>
      )}
    </div>
  );
}

FormTextarea.propTypes = {
  value: PropTypes.any.isRequired,
  name: PropTypes.string,
  isLoading: PropTypes.bool,
  handleChange: PropTypes.func.isRequired,
  title: PropTypes.string,
  minHeight: PropTypes.number,
  validationsErrors: PropTypes.string,
  onkeyUp: PropTypes.func,
  onkeyDown: PropTypes.func
};
