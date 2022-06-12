import PropTypes from "prop-types";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
function Subcategories({ right = 0, postsList, categoryID }) {
  const [list, setList] = useState({ subcategories: [] });
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
      style={{ right }}
    >
      <div className="nav-subcategories-list-content">
        <ul className="list-subcategories-withicons ">
          {list?.subcategories?.map((item) => {
            return (
              <li key={item.id} className="">
                <a
                  className="sub"
                  href={`/products?categoryID=${categoryID}&subcategoryID=${item.id}`}
                >
                  {item.name_ar}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </motion.div>
  );
}
Subcategories.propTypes = {
  right: PropTypes.number,
  postsList: PropTypes.array,
  categoryID: PropTypes.number,
};
export default Subcategories;
