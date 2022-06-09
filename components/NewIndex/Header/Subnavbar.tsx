import React from "react";
import PropTypes from "prop-types";

function Subnavbar({ visible }) {
  const categories = {
    data: [
      {
        id: 1,
        name_ar: "اعمال",
        to: "products?categoryID=12",
      },
      {
        id: 2,
        name_ar: "برمجة وتطوير",
        to: "products?categoryID=11",
      },
      {
        id: 3,
        name_ar: "تسويق الكتروني",
        to: "products?categoryID=10",
      },
      {
        id: 4,
        name_ar: "تدريب عن بعد",
        to: "products?categoryID=9",
      },
      {
        id: 5,
        name_ar: "تصميم فيديو",
        to: "products?categoryID=8",
      },
      {
        id: 6,
        name_ar: "تصميم عام",
        to: "products?categoryID=7",
      },
      {
        id: 7,
        name_ar: "صوتيات",
        to: "products?categoryID=6",
      },
      {
        id: 8,
        name_ar: "كل التصنيفات",
        to: "products",
      },
    ],
  };
  //const { data: categories }: any = useSWR(`api/get_categories`);
  return (
    <nav className={`new-subnavbar ${visible ? "" : "show"}`}>
      <div className="container">
        <ul className="subnavbar-nav nav">
          {categories &&
            categories.data.map((e: any) => (
              <li key={e.id}>
                <a href={e.to}>{e.name_ar}</a>
              </li>
            ))}
        </ul>
      </div>
    </nav>
  );
}
Subnavbar.propTypes = {
  visible: PropTypes.bool,
};
export default Subnavbar;
