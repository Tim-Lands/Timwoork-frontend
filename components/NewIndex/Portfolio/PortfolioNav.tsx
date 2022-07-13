import Link from "next/link";
import React from "react";
import { FaAngleDown, FaHeart } from "react-icons/fa";

function PortfolioNav() {
  return (
    <nav className="portfolios-nav d-flex">
      <ul className="portfolios-nav-list me-auto">
        <li>
          <button className="portfolio-item">تصميم المواقع</button>
        </li>
        <li>
          <button className="portfolio-item">التصميم الغرافيكي</button>
        </li>
        <li>
          <button className="portfolio-item">تسجيلات صوتية</button>
        </li>
        <li>
          <button className="portfolio-item">تصميم UI/UX</button>
        </li>
      </ul>
      <ul className="portfolios-nav-list ml-auto">
        <li>
          <Link href={`/user/myfavorites`}>
            <a className="portfolio-item">
              <span className="counts">20+</span>
              <FaHeart /> المفضلة
            </a>
          </Link>
        </li>
        <li>
          <button className="portfolio-item">
            الإعدادات <FaAngleDown />{" "}
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default PortfolioNav;
