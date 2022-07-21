import router from "next/router";
import React from "react";

function ContestSidebar() {
  return (
    <div className="contest-sidebar">
      <div className="box-sidebar sidebar-search">
        <input type="text" placeholder="البحث في صفحة المسابقات" />
        <button className="btn butt-primary2 butt-sm">بحث</button>
      </div>
      <div className="box-sidebar">
        <div className="box-sidebar-head">
          <h4 className="title">أقسام المسابقات</h4>
        </div>
        <div className="filter-categories-list">
          <div className="categories-list-inner">
            <div className="list-inner">
              <div
                className="list-cat-item displayed"
                onClick={() => {
                  router.push({ pathname: "/products" });
                }}
              >
                <span className="item-cat-label">
                  <span className="material-icons material-icons-outlined"></span>
                  جميع الأقسام
                </span>
              </div>
            </div>

            <div className="list-inner">
              <div
                className={`list-cat-item`}
                onClick={() => console.log("shkd")}
              >
                <span className="item-cat-label">
                  <span className="material-icons material-icons-outlined">
                    home
                  </span>
                  تصميم مواقع
                </span>
              </div>
            </div>

            <div className="list-inner">
              <div
                className={`list-cat-item`}
                onClick={() => console.log("shkd")}
              >
                <span className="item-cat-label">
                  <span className="material-icons material-icons-outlined">
                    home
                  </span>
                  تسجيلات صوتية
                </span>
              </div>
            </div>

            <div className="list-inner">
              <div
                className={`list-cat-item`}
                onClick={() => console.log("shkd")}
              >
                <span className="item-cat-label">
                  <span className="material-icons material-icons-outlined">
                    home
                  </span>
                  اختيار الاسماء
                </span>
              </div>
            </div>

            <div className="list-inner">
              <div
                className={`list-cat-item`}
                onClick={() => console.log("shkd")}
              >
                <span className="item-cat-label">
                  <span className="material-icons material-icons-outlined">
                    home
                  </span>
                  تصميم شعارات
                </span>
              </div>
            </div>
            <div className="list-inner">
              <div
                className={`list-cat-item`}
                onClick={() => console.log("shkd")}
              >
                <span className="item-cat-label">
                  <span className="material-icons material-icons-outlined">
                    home
                  </span>
                  فيديوهات
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContestSidebar;
