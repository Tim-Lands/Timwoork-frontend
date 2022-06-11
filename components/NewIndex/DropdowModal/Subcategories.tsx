import PropTypes from "prop-types";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
function Subcategories({ right = 0, postsList, categoryID }) {
  console.log(categoryID, postsList);
  return (
    <motion.div
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="nav-subcategories-list"
      style={{ right }}
    >
      <div className="nav-subcategories-list-content">
        <ul className="list-subcategories-withicons row">
          <li className="col-lg-3 col-md-4 col-sm-6">
            <Link href={`/`}>
              <a>إضافة خدمة جديدة</a>
            </Link>
          </li>
          <li className="col-lg-3 col-md-4 col-sm-6">
            <Link href={`/`}>
              <a>إضافة خدمة جديدة</a>
            </Link>
          </li>
          <li className="col-lg-3 col-md-4 col-sm-6">
            <Link href={`/`}>
              <a>إضافة خدمة جديدة</a>
            </Link>
          </li>
          <li className="col-lg-3 col-md-4 col-sm-6">
            <Link href={`/`}>
              <a>إضافة خدمة جديدة</a>
            </Link>
          </li>
          <li className="col-lg-3 col-md-4 col-sm-6">
            <Link href={`/`}>
              <a>إضافة خدمة جديدة</a>
            </Link>
          </li>
          <li className="col-lg-3 col-md-4 col-sm-6">
            <Link href={`/`}>
              <a>إضافة خدمة جديدة</a>
            </Link>
          </li>
          <li className="col-lg-3 col-md-4 col-sm-6">
            <Link href={`/`}>
              <a>إضافة خدمة جديدة</a>
            </Link>
          </li>
          <li className="col-lg-3 col-md-4 col-sm-6">
            <Link href={`/`}>
              <a>إضافة خدمة جديدة</a>
            </Link>
          </li>
          <li className="col-lg-3 col-md-4 col-sm-6">
            <Link href={`/`}>
              <a>إضافة خدمة جديدة</a>
            </Link>
          </li>
          <li className="col-lg-3 col-md-4 col-sm-6">
            <Link href={`/`}>
              <a>إضافة خدمة جديدة</a>
            </Link>
          </li>
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
