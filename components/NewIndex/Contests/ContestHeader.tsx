import Link from "next/link";
import React from "react";
import { LanguageContext } from "../../../contexts/languageContext/context";
import { useContext } from "react";

function ContestHeader() {
  const { getSectionLanguage } = useContext(LanguageContext);
  const getAll = getSectionLanguage();
  return (
    <div className="timlands-top-header">
      <ul className="timlands-tabs-nav me-auto">
        <li className="active">
          <button type="button" className="tab-butt-nav">
            {getAll("Lastest")}
          </button>
        </li>
        <li>
          <button type="button" className="tab-butt-nav">
            {getAll("Most_popular")}
          </button>
        </li>
        <li>
          <button type="button" className="tab-butt-nav">
            {getAll("Most_shared")}
          </button>
        </li>
      </ul>
      <ul className="timlands-tabs-nav ml-auto">
        <li>
          <Link href={`/contests/add-new`}>
            <a className="btn butt-sm butt-green flex-center">
              <span className="material-icons material-icons-outlined">
                add_circle
              </span>{" "}
              {getAll("Add_new_competition")}
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default ContestHeader;
