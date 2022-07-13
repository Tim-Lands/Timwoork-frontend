import React, { useState } from "react";
import FormModal from "./FormModal";

function FormLangsCheck() {
  const [isShowenModal, setIsShowenModal] = useState(false);
  return (
    <>
      {isShowenModal && <FormModal setIsConfirmText={setIsShowenModal} />}
      <div className="form-languages">
        <button type="button" onClick={() => setIsShowenModal(true)}>
          إظهار الفورم
        </button>
        <div className="row">
          <div className="col-4">
            <h4 className="title-lang">لغة العنوان المستخدمة: </h4>
          </div>
          <div className="col">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                العربية
              </label>
            </div>
          </div>
          <div className="col">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                الإنجليزية
              </label>
            </div>
          </div>
          <div className="col">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                الفرنسية
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FormLangsCheck;
