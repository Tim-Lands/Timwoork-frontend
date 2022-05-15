import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Explores from "../Explores";
import { Popover } from "antd";
import { motion } from "framer-motion";
import { AiOutlineShoppingCart } from "@react-icons/all-files/ai/AiOutlineShoppingCart";
import { TiGroupOutline } from "@react-icons/all-files/ti/TiGroupOutline";
import { BiTrophy } from "@react-icons/all-files/bi/BiTrophy";
import { BiBriefcase } from "@react-icons/all-files/bi/BiBriefcase";
import { BiImage } from "@react-icons/all-files/bi/BiImage";
import { useOutsideAlerter } from "../useOutsideAlerter";
import { isMobile } from "react-device-detect";
import router from "next/router";
import PropTypes from "prop-types";

function Menus({ darkMode }) {
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setHideExploreHandle();
    });
    return () => {
      window.removeEventListener("scroll", () => {
        setHideExploreHandle();
      });
    };
  });
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
  const button = useRef(null);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setHideExploreHandle, button);

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
          ref={button}
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
            paddingInline: 0,
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
              paddingInline: 0,
              paddingBlock: 0,
              fontSize: 14,
              height: 50,
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <AiOutlineShoppingCart
              style={{ marginLeft: 3, fontSize: 22, fontWeight: "bold" }}
            />
            الخدمات
          </motion.a>
        </Link>
      </li>
      <Popover content={content} trigger="hover">
        <li>
          <motion.a
            whileHover={{
              color: !darkMode ? "red" : "red",
              scale: 1.07,
            }}
            whileTap={{
              scale: 1.02,
            }}
            style={{
              fontWeight: 600,
              color: !darkMode ? "#666" : "#f1f1f1",
              display: "flex",
              paddingInline: 0,
              paddingBlock: 0,
              fontSize: 14,
              height: 50,
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <BiTrophy style={{ marginLeft: 3, fontSize: 22 }} />
            المسابقات
          </motion.a>
        </li>
      </Popover>
      <Popover content={content} trigger="hover">
        <li>
          <motion.a
            whileHover={{
              color: !darkMode ? "red" : "red",
              scale: 1.07,
            }}
            whileTap={{
              scale: 1.02,
            }}
            style={{
              fontWeight: 600,
              color: !darkMode ? "#666" : "#f1f1f1",
              display: "flex",
              paddingInline: 0,
              paddingBlock: 0,
              fontSize: 14,
              height: 50,
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <BiBriefcase style={{ marginLeft: 3, fontSize: 22 }} />
            المشاريع
          </motion.a>
        </li>
      </Popover>

      <Popover content={content} trigger="hover">
        <li>
          <motion.a
            whileHover={{
              color: !darkMode ? "red" : "red",
              scale: 1.07,
            }}
            whileTap={{
              scale: 1.02,
            }}
            style={{
              fontWeight: 600,
              color: !darkMode ? "#666" : "#f1f1f1",
              display: "flex",
              paddingInline: 0,
              paddingBlock: 0,
              fontSize: 14,
              height: 50,
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <BiImage style={{ marginLeft: 3, fontSize: 27 }} />
            الاعمال
          </motion.a>
        </li>
      </Popover>

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
              paddingInline: 0,
              paddingBlock: 0,
              fontSize: 14,
              height: 50,
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <i
              className="material-icons material-icons-outlined"
              style={{ fontSize: 25 }}
            >
              article
            </i>{" "}
            المدونة
          </motion.a>
        </Link>
      </li>
      <Popover content={content} trigger="hover">
        <li>
          <motion.a
            whileHover={{
              color: !darkMode ? "red" : "red",
              scale: 1.07,
            }}
            whileTap={{
              scale: 1.02,
            }}
            style={{
              fontWeight: 600,
              color: !darkMode ? "#666" : "#f1f1f1",
              display: "flex",
              paddingInline: 0,
              paddingBlock: 0,
              fontSize: 14,
              height: 50,
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <TiGroupOutline style={{ marginLeft: 3, fontSize: 22 }} />
            المستقلين
          </motion.a>
        </li>
      </Popover>
      <li>
        <Link href="/club">
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
              paddingInline: 0,
              paddingBlock: 0,
              fontSize: 14,
              height: 50,
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <i
              className="material-icons material-icons-outlined"
              style={{ fontSize: 25 }}
            >
              forum
            </i>{" "}
            المنتدي
          </motion.a>
        </Link>
      </li>
    </ul>
  );
}
const content = <div>قريبا</div>;
export default Menus;
Menus.propTypes = {
  darkMode: PropTypes.any,
};
