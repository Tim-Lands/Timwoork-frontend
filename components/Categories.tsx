import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
function Categories({ categories, onClickCategory, href }) {
  return (
    <div className="container">
      <div className="app-bill bg-transparent my-5" style={{ borderRadius: 7 }}>
        <div className="app-bill-content">
          
          <div className="row">
            {categories &&
              categories.map((e: any) => {
                return (
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
                          <Link href={`${href}${e.id}`}>
                            <a href="">
                              <img
                                src={e.image}
                                onClick={() => onClickCategory(e.id)}
                              />
                            </a>
                          </Link>
                        </span>
                      </div>
                      <div className="main-category-item-title">
                        <h3 className="title">{e.name}</h3>
                      </div>
                    </div>
                  </div>
                );
              })}
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
  href: PropTypes.string,
};
