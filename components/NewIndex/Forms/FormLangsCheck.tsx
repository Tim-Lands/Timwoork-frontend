import React, { useState } from "react";
import FormModal from "./FormModal";
import PropTypes from "prop-types";

function FormLangsCheck({ default_lang, onChange, id}) {
  const [isShowenModal, setIsShowenModal] = useState(false);
  return (
    <>
      {isShowenModal && <FormModal setIsConfirmText={setIsShowenModal} />}
      <div className="form-languages">
        <div className="row">
          <div className="col-4">
            <h4 className="title-lang">لغة العنوان المستخدمة: </h4>
          </div>
          {default_lang != 'ar' &&
            <div className="col">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="ar"
                  id={`flexCheckArabic${id}`}
                  onChange={onChange}
                />

                <label className="form-check-label" htmlFor={`flexCheckArabic${id}`}>
                  العربية
                </label>
              </div>
            </div>}
          {default_lang != 'en' &&
            <div className="col">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="en"
                  id={`flexCheckEnglish${id}`}
                  onChange={onChange}

                />
                <label className="form-check-label" htmlFor={`flexCheckEnglish${id}`}>
                  الإنجليزية
                </label>
              </div>
            </div>}
          {default_lang != 'fr' &&
            <div className="col">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="fr"
                  id={`flexCheckFrench${id}`}
                  onChange={onChange}

                />
                <label className="form-check-label" htmlFor={`flexCheckFrench${id}`}>
                  الفرنسية
                </label>
              </div>
            </div>}
        </div>
      </div>
    </>
  );
}
FormLangsCheck.propTypes = {
  onChange: PropTypes.func,
  default_lang: PropTypes.string,
  id:PropTypes.number
}
export default FormLangsCheck;
