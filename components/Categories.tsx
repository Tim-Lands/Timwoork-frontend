import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
const placeholders = [
  {
    id: 1,
    name_ar: "",
  },
  {
    id: 2,
    name_ar: "",
  },
  {
    id: 3,
    name_ar: "",
  },
  {
    id: 4,
    name_ar: "",
  },
  {
    id: 5,
    name_ar: "",
  },
  {
    id: 6,
    name_ar: "",
  },
  {
    id: 7,
    name_ar: "",
  },
  {
    id: 8,
    name_ar: "",
  },
  {
    id: 9,
    name_ar: "",
  },
  {
    id: 10,
    name_ar: "",
  },
  {
    id: 11,
    name_ar: "",
  },
  {
    id: 12,
    name_ar: "",
  },
];
function Categories({ categories, onClickCategory }) {
  //const { data: categories }: any = useSWR(`api/get_categories`)
  return (
    <div className="container">
      <div className="app-bill my-5" style={{ borderRadius: 7 }}>
        <div className="app-bill-content">
          <div className="timlands-horizontale-header">
            <h3 className="title">
              التصنيفات الأكثر شعبية
            </h3>
            <div className="aside-button">
              <Link href={`link`}>
                <a className='btn butt-sm butt-light'>
                  المزيد...
                </a>

              </Link>
            </div>

          </div>
          {!categories && (
            <div className="row">
              {placeholders &&
                placeholders.map((e: any) => (
                  <div className="col-md-3 col-6" key={e.id}>
                    <div className="placeholder-category-item">
                      <div className="placeholder-category-item-icon">
                        <span
                          className={"material-icons material-icons-outlined"}
                        >
                          {e.icon}
                        </span>
                      </div>
                      <div className="placeholder-category-item-title">
                        <h3 className="title">{e.name_ar}</h3>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
          <div className="row">
            {categories &&
              categories.data.map((e: any) => (
                <div
                  onClick={() => onClickCategory(e.id)}
                  className="col-md-3 col-6"
                  key={e.id}
                >
                  <div className="main-category-item">
                    <div className="main-category-item-icon">
                      <span
                        className={"material-icons material-icons-outlined"}
                      >
                        <img src={e.image} />
                      </span>
                    </div>
                    <div className="main-category-item-title">
                      <h3 className="title">{e.name_ar}</h3>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Categories;
Categories.propTypes = {
  categories: PropTypes.any,
  onClickCategory: PropTypes.func,
};
