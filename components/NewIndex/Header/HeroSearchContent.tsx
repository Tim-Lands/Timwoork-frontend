import React, { useState } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";

function HeroSearchContent({ getLanguage }) {
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
          placeholder={getLanguage("Search_in_Timwoork")}
        />
        <button
          type="button"
          className="btn butt-md butt-primary2"
          onClick={() => router.push(`/products?query=${query}`)}
        >
          {getLanguage("Search")}
        </button>
      </div>
    </div>
  );
}
HeroSearchContent.propTypes = {
  getLanguage: PropTypes.func,
};
export default HeroSearchContent;
