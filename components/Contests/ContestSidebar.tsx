import router from "next/router";
import React from "react";
import { useAppSelector } from "@/store/hooks";
function ContestSidebar() {
  const { getAll } = useAppSelector((state) => state.languages);
  return (
    <div className="contest-sidebar">
      <div className="box-sidebar sidebar-search">
        <input type="text" placeholder={getAll("Research_in_competitions")} />
        <button className="btn butt-primary2 butt-sm">
          {getAll("Search")}
        </button>
      </div>
      <div className="box-sidebar">
        <div className="box-sidebar-head">
          <h4 className="title">{getAll("Competitions_categories")}</h4>
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
                  {getAll("All_categories")}
                </span>
              </div>
            </div>

            <div className="list-inner">
              <div className={`list-cat-item`} onClick={() => {}}>
                <span className="item-cat-label">
                  <span className="material-icons material-icons-outlined">
                    home
                  </span>
                  {getAll("Websites_design")}
                </span>
              </div>
            </div>

            <div className="list-inner">
              <div className={`list-cat-item`} onClick={() => {}}>
                <span className="item-cat-label">
                  <span className="material-icons material-icons-outlined">
                    home
                  </span>
                  {getAll("Audios_recording")}
                </span>
              </div>
            </div>

            <div className="list-inner">
              <div className={`list-cat-item`} onClick={() => {}}>
                <span className="item-cat-label">
                  <span className="material-icons material-icons-outlined">
                    home
                  </span>
                  {getAll("Choose_names")}
                </span>
              </div>
            </div>

            <div className="list-inner">
              <div className={`list-cat-item`} onClick={() => {}}>
                <span className="item-cat-label">
                  <span className="material-icons material-icons-outlined">
                    home
                  </span>
                  {getAll("Logos_design")}
                </span>
              </div>
            </div>
            <div className="list-inner">
              <div className={`list-cat-item`} onClick={() => {}}>
                <span className="item-cat-label">
                  <span className="material-icons material-icons-outlined">
                    home
                  </span>
                  {getAll("Videos")}
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
