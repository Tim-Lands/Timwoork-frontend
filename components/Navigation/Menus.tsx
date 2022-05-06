import React, { useState, useRef } from "react";
import Link from "next/link";
import Explores from "../Explores";
import { motion } from "framer-motion";
import { useOutsideAlerter } from "../useOutsideAlerter";
import { isMobile } from "react-device-detect";
import router from "next/router";
import PropTypes from "prop-types";

function Menus({ darkMode }) {
  const [showExplore, setShowExplore] = useState(false);
  const setShowExploreHandle = () => {
    if (isMobile) {
      router.push("/category");
    } else {
      setShowExplore(!showExplore);
    }
  };
  const setHideExploreHandle = () => {
    setShowExplore(false);
  };
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setHideExploreHandle);
  return (
    <ul
      className="nav app-navbar is-desktop d-flex "
      style={{
        paddingLeft: 0,
        marginBottom: 0,
        listStyle: "none",
        margin: 0,
        paddingInlineStart: 15,
      }}
    >
      <li>
        <motion.button
          whileHover={{
            color: !darkMode ? "#000" : "#fff",
            scale: 1.07,
          }}
          whileTap={{
            scale: 1.02,
          }}
          className={"explore-butt " + (showExplore && "is-open")}
          onClick={setShowExploreHandle}
          style={{
            fontWeight: 600,
            color: !darkMode ? "#666" : "#f1f1f1",
            display: "flex",
            paddingInline: 7,
            paddingBlock: 0,
            border: 0,
            backgroundColor: "transparent",
            fontSize: 14,
            height: 50,
            alignItems: "center",
            alignContent: "center",
          }}
        >
          <i className="material-icons material-icons-outlined">
            chrome_reader_mode
          </i>
          <span style={{ marginInline: 4 }}> التصنيفات </span>
          <i className="fa fa-angle-down"></i>
        </motion.button>
        {showExplore && (
          <motion.div
            ref={wrapperRef}
            initial={{ y: 90, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="timlands-explores"
          >
            <Explores />
          </motion.div>
        )}
      </li>
      <li>
        <Link href="/products">
          <motion.a
            whileHover={{
              color: !darkMode ? "#000" : "#fff",
              scale: 1.07,
            }}
            whileTap={{
              scale: 1.02,
            }}
            style={{
              fontWeight: 600,
              color: !darkMode ? "#666" : "#f1f1f1",
              display: "flex",
              paddingInline: 7,
              paddingBlock: 0,
              fontSize: 14,
              height: 50,
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <i className="material-icons material-icons-outlined">table_view</i>{" "}
            تصفح الخدمات
          </motion.a>
        </Link>
      </li>
      <li>
        <Link href="/blog">
          <motion.a
            whileHover={{
              color: !darkMode ? "#000" : "#fff",
              scale: 1.07,
            }}
            whileTap={{
              scale: 1.02,
            }}
            style={{
              fontWeight: 600,
              color: !darkMode ? "#666" : "#f1f1f1",
              display: "flex",
              paddingInline: 7,
              paddingBlock: 0,
              fontSize: 14,
              height: 50,
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <i className="material-icons material-icons-outlined">article</i>{" "}
            المدونة
          </motion.a>
        </Link>
      </li>
      <li>
        <Link href="/community">
          <motion.a
            whileHover={{
              color: !darkMode ? "#000" : "#fff",
              scale: 1.07,
            }}
            whileTap={{
              scale: 1.02,
            }}
            style={{
              fontWeight: 600,
              color: !darkMode ? "#666" : "#f1f1f1",
              display: "flex",
              paddingInline: 7,
              paddingBlock: 0,
              fontSize: 14,
              height: 50,
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <i className="material-icons material-icons-outlined">forum</i>{" "}
            مجتمع تيم ورك
          </motion.a>
        </Link>
      </li>
    </ul>
  );
}

export default Menus;
Menus.propTypes = {
  darkMode: PropTypes.any,
};
