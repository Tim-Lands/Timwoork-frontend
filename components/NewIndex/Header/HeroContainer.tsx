import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { LanguageContext } from "../../../contexts/languageContext/context";
import API from "../../../config";
import HeroSearchContent from "./HeroSearchContent";

function HeroContainer() {
  const { language, getSectionLanguage } = useContext(LanguageContext);
  const getAll = getSectionLanguage();
  const [topCategories, setTopCaegories] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const res = await API.get("api/top_categories");
    setTopCaegories(res?.data);
  };
  return (
    <div className="hero-container">
      <div className="inner">
        <h1 className="main-title">{getAll("Buy_chat_sell")}</h1>
        <h1 className="sub-title">{getAll("Discover_Timwoork’s_most")}</h1>
        <div className="hero-container-search">
          <HeroSearchContent />
          <ul className="popular-search">
            {topCategories.slice(0, 4).map((category) => (
              <li key={category} className="pop-item ">
                <Link
                  href={`/products?categoryID=${category.parent_id}&subcategoryID=${category.id}`}
                >
                  <a className="">{category[which(language)]}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
const which = (language) => {
  switch (language) {
    default:
      return "name_en";
    case "ar":
      return "name_ar";
    case "en":
      return "name_en";
  }
};
export default HeroContainer;
