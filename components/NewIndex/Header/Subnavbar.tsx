import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import Subcategories from "../DropdowModal/Subcategories";
import useOnScreen from "../../useOnScreen";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
function Subnavbar({ visible, postsList }) {
  const [isSubcategoriesToggle, setIsSubcategoriesToggle] = useState(false);
  const end = useRef(null);
  const start = useRef(null);
  const middle = useRef(null);
  const scroll = useRef(null);
  const [categoryID, setCategoryID] = useState(0);
  const categories = {
    data: [
      {
        id: 1,
        name_ar: "اعمال",
        to: "products?categoryID=12",
        start: true,
        categoryID: 12,
      },
      {
        id: 2,
        name_ar: "برمجة وتطوير",
        to: "products?categoryID=11",
        categoryID: 11,
      },
      {
        id: 3,
        name_ar: "تسويق الكتروني",
        to: "products?categoryID=10",
        categoryID: 10,
      },
      {
        id: 4,
        name_ar: "تدريب عن بعد",
        to: "products?categoryID=9",
        categoryID: 9,
      },
      {
        id: 5,
        name_ar: "تصميم فيديو",
        to: "products?categoryID=8",
        categoryID: 8,
      },
      {
        id: 6,
        name_ar: "تصميم عام",
        to: "products?categoryID=7",
        categoryID: 7,
      },
      {
        id: 7,
        name_ar: "صوتيات",
        to: "products?categoryID=6",
        categoryID: 6,
      },
      {
        id: 8,
        name_ar: "كل التصنيفات",
        to: "products",
        end: true,
      },
    ],
  };
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
            setIsSubcategoriesToggle(false);
          }}
        >
          {categories &&
            categories.data.map((e: any) => (
              <li
                ref={e.end ? end : e.start ? start : middle}
                key={e.id}
                onMouseEnter={() => {
                  if (!e.end) {
                    setIsSubcategoriesToggle(true);
                    setCategoryID(e.categoryID);
                  } else {
                    setIsSubcategoriesToggle(false);
                  }
                }}
              >
                <a href={e.to}>{e.name_ar}</a>
              </li>
            ))}
          {isSubcategoriesToggle && (
            <Subcategories postsList={postsList} categoryID={categoryID} />
          )}
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
