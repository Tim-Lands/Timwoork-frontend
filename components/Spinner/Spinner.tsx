/*
|--------------------------------------------------------------------------
| Form Element components.
|--------------------------------------------------------------------------
|
| A collection of form elements ready to plug in to other compents.
| They all have error messages ready to be displayed.
|
*/

import PropTypes from "prop-types";
import { ReactElement } from "react";
import { LanguageContext } from "../../contexts/languageContext/context";
import { useContext } from "react";

export function SmallSpinner(props: any): ReactElement {
  const { getSectionLanguage } = useContext(LanguageContext);
  const getAll = getSectionLanguage("all");
  return props.show ? (
    <div className="spinner-border spinner-border-sm text-light" role="status">
      {" "}
      <span className="visually-hidden">{getAll("Loading")}</span>{" "}
    </div>
  ) : (
    <span></span>
  );
}
SmallSpinner.propTypes = {
  show: PropTypes.bool.isRequired,
};
