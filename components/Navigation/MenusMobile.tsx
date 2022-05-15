import React from "react";
import Link from "next/link";
import { AiOutlineShoppingCart } from "@react-icons/all-files/ai/AiOutlineShoppingCart";
import { motion } from "framer-motion";
import { TiGroupOutline } from "@react-icons/all-files/ti/TiGroupOutline";
import { BiTrophy } from "@react-icons/all-files/bi/BiTrophy";
import { BiBriefcase } from "@react-icons/all-files/bi/BiBriefcase";
import { BiImage } from "@react-icons/all-files/bi/BiImage";
import { Popover } from "antd";
import PropTypes from "prop-types";
import { useRef, useEffect } from "react";
import { useOutsideAlerter } from "../useOutsideAlerter";

function Menus({ darkMode, setIsMenuShowenMob, button }) {
  const wrapList = useRef();
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setHideMenuHandle();
    });
    return () => {
      window.removeEventListener("scroll", () => {
        setHideMenuHandle();
      });
    };
  });
  const setHideMenuHandle = () => {
    setIsMenuShowenMob(false);
  };
  useOutsideAlerter(wrapList, setHideMenuHandle, button);
  return (
    <ul className="nav app-navbar is-mobile" ref={wrapList}>
      <li>
        <Link href="/category">
          <a
            className="explore-butt"
            style={{
              fontWeight: 600,
              color: !darkMode ? "#666" : "#f1f1f1",
              display: "flex",
              paddingInline: 17,
              paddingBlock: 0,
              fontSize: 14,
              height: 50,
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <i className="material-icons material-icons-outlined">
              chrome_reader_mode
            </i>{" "}
            التصنيفات <i className="fa fa-angle-down"></i>
          </a>
        </Link>
      </li>

      <li>
        <Link href="/products">
          <a
            style={{
              fontWeight: 600,
              color: !darkMode ? "#666" : "#f1f1f1",
              display: "flex",
              paddingInline: 17,
              paddingBlock: 0,
              fontSize: 14,
              height: 50,
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <AiOutlineShoppingCart style={{ marginLeft: 3, fontSize: 22 }} />
            الخدمات
          </a>
        </Link>
      </li>

      <Popover content={content} trigger="click" placement="bottom">
        <li>
          <motion.a
            whileTap={{
              color: "red",
            }}
            className="explore-butt"
            style={{
              fontWeight: 600,
              color: !darkMode ? "#666" : "#f1f1f1",
              display: "flex",
              paddingInline: 17,
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
      <Popover content={content} trigger="click" placement="bottom">
        <li>
          <motion.a
            whileTap={{
              color: "red",
            }}
            className="explore-butt"
            style={{
              fontWeight: 600,
              color: !darkMode ? "#666" : "#f1f1f1",
              display: "flex",
              paddingInline: 17,
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
      <Popover content={content} trigger="click" placement="bottom">
        <li>
          <motion.a
            whileTap={{
              color: "red",
            }}
            className="explore-butt"
            style={{
              fontWeight: 600,
              color: !darkMode ? "#666" : "#f1f1f1",
              display: "flex",
              paddingInline: 17,
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
          <a
            style={{
              fontWeight: 600,
              color: !darkMode ? "#666" : "#f1f1f1",
              display: "flex",
              paddingInline: 17,
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
          </a>
        </Link>
      </li>
      <Popover content={content} trigger="click" placement="bottom">
        <li>
          <motion.a
            whileTap={{
              color: "red",
            }}
            className="explore-butt"
            style={{
              fontWeight: 600,
              color: !darkMode ? "#666" : "#f1f1f1",
              display: "flex",
              paddingInline: 17,
              paddingBlock: 0,
              fontSize: 14,
              height: 50,
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <TiGroupOutline style={{ marginLeft: 3, fontSize: 23 }} />
            المستقلين
          </motion.a>
        </li>
      </Popover>
      <li>
        <Link href="/club">
          <a
            style={{
              fontWeight: 600,
              color: !darkMode ? "#666" : "#f1f1f1",
              display: "flex",
              paddingInline: 17,
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
          </a>
        </Link>
      </li>
    </ul>
  );
}
const content = <div>قريبا</div>;

export default Menus;
Menus.propTypes = {
  darkMode: PropTypes.any,
  setIsMenuShowenMob: PropTypes.func,
  button: PropTypes.any,
};
