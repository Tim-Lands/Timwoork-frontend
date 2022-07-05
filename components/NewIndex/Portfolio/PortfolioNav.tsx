import Link from "next/link";
import React from "react";
import { FaAngleDown, FaHeart } from "react-icons/fa";

function PortfolioNav() {
  return (
    <nav className="portfolios-nav d-flex">
      <ul className="portfolios-nav-list me-auto">
        <li>
          <button className="portfolio-item">Web Designs</button>
        </li>
        <li>
          <button className="portfolio-item">Motions Graphic</button>
        </li>
        <li>
          <button className="portfolio-item">Records</button>
        </li>
        <li>
          <button className="portfolio-item">UI/UX Designs</button>
        </li>
      </ul>
      <ul className="portfolios-nav-list ml-auto">
        <li>
          <Link href={`/user/myfavorites`}>
            <a className="portfolio-item">
              <span className="counts">20+</span>
              <FaHeart /> Go to My Favorites
            </a>
          </Link>
        </li>
        <li>
          <button className="portfolio-item">
            Settings <FaAngleDown />{" "}
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default PortfolioNav;
