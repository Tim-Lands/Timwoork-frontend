import Link from "next/link";
import React from "react";
import { FaAngleDown, FaHeart } from "react-icons/fa";
import { useAppSelector } from "@/store/hooks";

function PortfolioNav() {
  const { getAll } = useAppSelector((state) => state.languages);

  return (
    <nav className="portfolios-nav d-flex">
      <ul className="portfolios-nav-list me-auto">
        <li>
          <button className="portfolio-item">
            {getAll("Websites_design")}
          </button>
        </li>
        <li>
          <button className="portfolio-item">{getAll("Graphic_design")}</button>
        </li>
        <li>
          <button className="portfolio-item">
            {getAll("Audios_recording")}
          </button>
        </li>
        <li>
          <button className="portfolio-item">{getAll("Design")}</button>
        </li>
      </ul>
      <ul className="portfolios-nav-list ml-auto">
        <li>
          <Link href={`/user/myfavorites`}>
            <a className="portfolio-item">
              <span className="counts">20+</span>
              <FaHeart /> {getAll("Favorite")}
            </a>
          </Link>
        </li>
        <li>
          <button className="portfolio-item">
            {getAll("Settings")} <FaAngleDown />{" "}
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default PortfolioNav;
