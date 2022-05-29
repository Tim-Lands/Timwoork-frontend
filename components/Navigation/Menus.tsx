import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Explores from "../Explores";
import { Badge } from "antd";
import { PRIMARY } from "../../styles/variables";
import { motion } from "framer-motion";
import { AiOutlineShoppingCart } from "@react-icons/all-files/ai/AiOutlineShoppingCart";
import { TiGroupOutline } from "@react-icons/all-files/ti/TiGroupOutline";
import { BiTrophy } from "@react-icons/all-files/bi/BiTrophy";
import { CgEreader } from "@react-icons/all-files/cg/CgEreader";
import { BiBriefcase } from "@react-icons/all-files/bi/BiBriefcase";
import { MdOutlineForum, MdOutlineArticle } from "react-icons/md";
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
        paddingTop: 6,
        margin: 0,
      }}
    >
      <li>
        <motion.button
          ref={button}
          whileHover={{
            color: !darkMode ? "#d2ac02" : "#d2ac02",
            scale: 1.07,
          }}
          whileTap={{
            scale: 1.02,
          }}
          className={"explore-butt " + (showExplore && "is-open")}
          onClick={setShowExploreHandle}
          style={{
            fontWeight: "bold",
            color: !darkMode ? "#666" : "#f1f1f1",
            display: "flex",
            paddingInline: 0,
            paddingBlock: 0,
            flexDirection: "column",
            border: 0,
            backgroundColor: "transparent",
            fontSize: 13,
            height: 50,
            alignItems: "center",
            alignContent: "center",
          }}
        >
          <CgEreader style={{ fontSize: 18, color: "inherit" }} />

          <span>
            التصنيفات
            <i className="fa fa-angle-down" style={{ paddingRight: 5 }}></i>
          </span>
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
              fontWeight: "bold",
              // color: !darkMode ? "#666" : "#f1f1f1",
              display: "flex",
              paddingInline: 0,
              flexDirection: "column",
              paddingBlock: 0,
              fontSize: 13,
              height: 50,
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <AiOutlineShoppingCart
              style={{ marginLeft: 3, fontSize: 19, fontWeight: "bold" }}
            />
            الخدمات
          </motion.a>
        </Link>
      </li>
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
              fontWeight: "bold",
              color: !darkMode ? "#666" : "#f1f1f1",
              display: "flex",
              paddingInline: 0,
              flexDirection: "column",
              paddingBlock: 0,
              fontSize: 13,
              height: 50,
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <MdOutlineForum style={{ fontSize: 18 }} />
            المنتدى
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
              fontWeight: "bold",
              color: !darkMode ? "#666" : "#f1f1f1",
              display: "flex",
              flexDirection: "column",
              paddingInline: 0,
              paddingBlock: 0,
              fontSize: 13,
              height: 50,
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <MdOutlineArticle style={{ fontSize: 18 }} />
            المدونة
          </motion.a>
        </Link>
      </li>
      <li>
        <Badge count={"قريبا"} offset={[7, 5]} color={PRIMARY} size="small">
          <motion.a
            style={{
              fontWeight: "bold",
              color: !darkMode ? "#ccc" : "#f1f1f1",
              display: "flex",
              paddingInline: 0,
              paddingBlock: 0,
              fontSize: 13,
              flexDirection: "column",
              height: 50,
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <BiTrophy style={{ marginLeft: 3, fontSize: 19 }} />
            المسابقات
          </motion.a>
        </Badge>
      </li>
      <li>
        <Badge count={"قريبا"} offset={[3, 5]} color={PRIMARY} size="small">
          <motion.a
            style={{
              fontWeight: "bold",
              color: !darkMode ? "#ccc" : "#f1f1f1",
              display: "flex",
              paddingInline: 0,
              paddingBlock: 0,
              flexDirection: "column",
              fontSize: 13,
              height: 50,
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <BiBriefcase style={{ marginLeft: 3, fontSize: 19 }} />
            المشاريع
          </motion.a>
        </Badge>
      </li>

      <li>
        <Badge count={"قريبا"} offset={[-2, 5]} color={PRIMARY} size="small">
          <motion.a
            style={{
              fontWeight: "bold",
              color: !darkMode ? "#ccc" : "#f1f1f1",
              display: "flex",
              paddingInline: 0,
              flexDirection: "column",
              paddingBlock: 0,
              fontSize: 13,
              height: 50,
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <BiImage style={{ marginLeft: 3, fontSize: 20 }} />
            الاعمال
          </motion.a>
        </Badge>
      </li>
      <li>
        <Badge count={"قريبا"} offset={[7, 5]} color={PRIMARY} size="small">
          <motion.a
            style={{
              fontWeight: "bold",
              color: !darkMode ? "#ccc" : "#f1f1f1",
              display: "flex",
              paddingInline: 0,
              paddingBlock: 0,
              flexDirection: "column",
              fontSize: 13,
              height: 50,
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <TiGroupOutline style={{ marginLeft: 3, fontSize: 19 }} />
            المستقلين
          </motion.a>
        </Badge>
      </li>
    </ul>
  );
}
export default Menus;
Menus.propTypes = {
  darkMode: PropTypes.any,
};
