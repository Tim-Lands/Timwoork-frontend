import PropTypes from "prop-types";
import { LanguageContext } from "../../../contexts/languageContext/context";

import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
function Subcategories({ postsList, categoryID }) {
  const [list, setList] = useState({ subcategories: [] });
  const { language } = useContext(LanguageContext);
  useEffect(() => {
    postsList.forEach((posts) => {
      if (posts.id === categoryID) {
        setList(posts);
      }
    });
  }, [categoryID]);
  return (
    <motion.div
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="nav-subcategories-list"
    >
      <div className="nav-subcategories-list-content">
        <ul className="list-subcategories-withicons ">
          {list?.subcategories?.map((item) => {
            return (
              <li key={item.id} className="">
                <Link
                  href={`/products?categoryID=${categoryID}&subcategoryID=${item.id}`}
                >
                  <a className="sub">
                    {item[which(language)]}
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </motion.div>
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
Subcategories.propTypes = {
  postsList: PropTypes.array,
  categoryID: PropTypes.number,
};
export default Subcategories;
