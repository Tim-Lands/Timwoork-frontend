import React from "react";
import Link from "next/link";
function HeroSearch() {
  return (
    <div className="timlands-hero-search">
      <div className="rel-search" style={{ marginInline: 10 }}>
        <input
          type="text"
          placeholder="Search in Wazzfny..."
          className="timlands-inputs"
        />

        <button className="search-btn">
          <span className="material-icons material-icons-outlined">search</span>
        </button>
        <ul className="popular-searchs-list nav">
          <li className="popular-title">Popular Search: </li>
          <li className="popular-item">
            <Link href="dd">
              <a className="popular-link">Web Design</a>
            </Link>
          </li>
          <li className="popular-item">
            <Link href="dd">
              <a className="popular-link">Write and Traduction</a>
            </Link>
          </li>
          <li className="popular-item">
            <Link href="dd">
              <a className="popular-link">Photoshop</a>
            </Link>
          </li>
          <li className="popular-item">
            <Link href="dd">
              <a className="popular-link">Graphic Design</a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default HeroSearch;
