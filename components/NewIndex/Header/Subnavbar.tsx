import React, { useState, useRef, useContext } from "react";
import { LanguageContext } from "../../../contexts/languageContext/context";
import PropTypes from "prop-types";
import Subcategories from "../DropdowModal/Subcategories";
import useOnScreen from "../../useOnScreen";
import { Dropdown } from "antd";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
function Subnavbar({ visible, postsList }) {
  const { getSectionLanguage } = useContext(LanguageContext);
  const getLanguage = getSectionLanguage("categories");
  const end = useRef(null);
  const start = useRef(null);
  const middle = useRef(null);
  const scroll = useRef(null);
  const [categoryID, setCategoryID] = useState(0);
  const categories = {
    data: [
      {
        id: 8,
        name_ar: getLanguage("All_services"),
        to: "products",
        end: true,
      },
      {
        id: 1,
        name_ar: getLanguage("Business"),
        to: "products?categoryID=12",
        start: true,
        categoryID: 12,
      },
      {
        id: 2,
        name_ar: getLanguage("Programming_and_development"),

        to: "products?categoryID=11",
        categoryID: 11,
      },
      {
        name_ar: getLanguage("E_marketing"),
        id: 3,
        to: "products?categoryID=10",
        categoryID: 10,
      },
      {
        id: 4,
        name_ar: getLanguage("Online_training"),

        to: "products?categoryID=9",
        categoryID: 9,
      },
      {
        id: 5,
        name_ar: getLanguage("Video_design"),
        to: "products?categoryID=8",
        categoryID: 8,
      },
      {
        id: 6,
        name_ar: getLanguage("General_design"),

        to: "products?categoryID=7",
        categoryID: 7,
      },
      {
        name_ar: getLanguage("Audio"),
        id: 7,
        to: "products?categoryID=6",
        categoryID: 6,
      },
    ],
  };
  const [selected, setSelected] = useState(false);
  const [showLeft, setShowLeft] = useState(true);
  const [showRight, setShowRight] = useState(true);
  useOnScreen(end, setShowLeft);
  useOnScreen(start, setShowRight);
  return (
    <nav className={`new-subnavbar ${visible ? "" : "show"}`}>
      <div className="container d-flex align-items-center">
        <span className="arrows-sub">
          <IoIosArrowForward
            style={{
              cursor: showRight ? "pointer" : "default",
              fontSize: 19,
              color: showRight ? "black" : "lightgray",
            }}
            onClick={() => {
              if (showRight) scroll.current.scrollLeft += 60;
            }}
          />
        </span>
        <ul
          className="subnavbar-nav nav"
          ref={scroll}
          onMouseLeave={() => {
            setSelected(false);
          }}
        >
          {categories &&
            categories.data.map((e: any, index: number) => {
              return e.end ? (
                <li
                  className={`sub ${selected === e.id ? "selectedSub" : ""}`}
                  ref={e.end ? end : e.start ? start : middle}
                  onMouseEnter={() => {
                    if (!e.end) {
                      setSelected(e.id);
                      setCategoryID(e.categoryID);
                    } else {
                      setSelected(false);
                    }
                  }}
                >
                  <Link href={e.to}>
                    <a style={{ fontWeight: "bold" }}>
                      {e.name_ar}
                    </a>
                  </Link>
                </li>
              ) : (
                <Dropdown
                  key={e.id}
                  placement={index > 3 ? "bottomLeft" : "bottomRight"}
                  overlay={
                    <Subcategories
                      postsList={postsList}
                      categoryID={categoryID}
                    />
                  }
                >
                  <li
                    className={`sub ${selected === e.id ? "selectedSub" : ""}`}
                    ref={e.end ? end : e.start ? start : middle}
                    onMouseEnter={() => {
                      if (!e.end) {
                        setSelected(e.id);
                        setCategoryID(e.categoryID);
                      } else {
                        setSelected(false);
                      }
                    }}
                  >
                    <a href={e.to} style={{ fontWeight: "bold" }}>
                      {e.name_ar}
                    </a>
                  </li>
                </Dropdown>
              );
            })}
        </ul>
        <span className="arrows-sub">
          <IoIosArrowBack
            className="arrows"
            style={{
              cursor: showLeft ? "pointer" : "default",
              fontSize: 19,
              color: showLeft ? "black" : "lightgray",
            }}
            onClick={() => {
              if (showLeft) scroll.current.scrollLeft -= 60;
            }}
          />
        </span>
      </div>
    </nav>
  );
}
Subnavbar.propTypes = {
  visible: PropTypes.bool,
  postsList: PropTypes.array,
};
export default Subnavbar;
