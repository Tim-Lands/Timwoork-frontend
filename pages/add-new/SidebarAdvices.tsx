import React from "react";
import { LanguageContext } from "../../contexts/languageContext/context";
import { useContext } from "react";

function SidebarAdvices() {
  const { getSectionLanguage } = useContext(LanguageContext);
  const getAll = getSectionLanguage("all");
  return (
    <div className="add-product-advices">
      <img className="advice-img" src="/1999310.png" alt="" />
      <h3 className="advice-title">{getAll("Tips_to_add")}</h3>
      <ul className="advice-list">
        <li>{getAll("Add_a_brief")}</li>
        <li>{getAll("Choose_the_suitable")}</li>
        <li>{getAll("Write_an_attractive")}</li>
        <li>{getAll("Add_an_expressive")}</li>
        <li>{getAll("Set_an_appropriate")}</li>
        <li>{getAll("Set_the_delivery")}</li>
        <li> {getAll("Add_development_that")}</li>
      </ul>
    </div>
  );
}

export default SidebarAdvices;
