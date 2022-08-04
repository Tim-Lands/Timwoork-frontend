import React, { useState, useContext } from "react";
import { LanguageContext } from "../../../contexts/languageContext/context";
import { useRouter } from "next/router";

function HeroSearchContent() {
  const { getSectionLanguage } = useContext(LanguageContext);
  const getAll = getSectionLanguage();
  const [query, setQuery] = useState("");
  const router = useRouter();
  return (
    <div className="container-search-form" style={{ width: "fit-content" }}>
      <div className="container-search-form-input">
        <span className="input-icon-search">
          <span className="material-icons material-icons-outlined">search</span>
        </span>
        <input
          onKeyDown={(e) =>
            e.keyCode === 13 && router.push(`/products?query=${query}`)
          }
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder={getAll("Search_in_Timwoork")}
        />
        <button
          type="button"
          className="btn butt-md butt-primary2"
          onClick={() => router.push(`/products?query=${query}`)}
        >
          {getAll("Search")}
        </button>
      </div>
    </div>
  );
}

export default HeroSearchContent;
