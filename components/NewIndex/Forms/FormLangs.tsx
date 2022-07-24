import React from "react";
import PropTypes from "prop-types";

function FormLangs({checkedLangs, default_lang, onClick}) {
  return (
    <ul className="timlands-checked-items">
      <li className={default_lang=='ar'?"active":''} onClick={()=>checkedLangs['ar']?onClick('ar'):null}>
        <a>AR</a>
      </li>
      <li className={default_lang=='en'?"active":''} onClick={()=>checkedLangs['en']?onClick('en'):null}>
        <a>EN</a>
      </li>
      <li className={default_lang=='fr'?"active":''} onClick={()=>checkedLangs['fr']?onClick('fr'):null}>
        <a>FR</a>
      </li>
    </ul>
  );
}
FormLangs.propTypes = {
  onClick: PropTypes.func,
  default_lang: PropTypes.string,
  checkedLangs: PropTypes.object
}
export default FormLangs;
