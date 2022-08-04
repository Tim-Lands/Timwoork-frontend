import React from "react";
import PropTypes from "prop-types";

function FormLangs({ default_lang, onClick, checkedLangs }) {
  return (
    <ul className="timlands-checked-items">
      <li
        className={default_lang == "ar" ? "active" : ""}
        onClick={() => onClick("ar")}
      >
        <a>AR</a>
      </li>
      <li
        className={default_lang == "en" ? "active" : ""}
        onClick={() => onClick("en")}
      >
        <a>EN</a>
      </li>
      <li
        className={default_lang == "fr" ? "active" : ""}
        onClick={() => onClick("fr")}
      >
        <a>FR</a>
      </li>
    </ul>
  );
}
FormLangs.propTypes = {
  onClick: PropTypes.func,
  default_lang: PropTypes.string,
  checkedLangs: PropTypes.any,
};
export default FormLangs;
