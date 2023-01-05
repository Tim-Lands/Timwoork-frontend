import Link from "next/link";
import { FavoritesActions } from "@/store/favorites/favoritesAction";
import { PortfolioActions } from "@/store/portfolio/portfolioActions";
import { useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

function PortfolioNav() {
  const {
    languages: { getAll },
    favorites,
    portfolio: { all },
  } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (favorites.loaded) return;
    dispatch(FavoritesActions.getFavorites());
  }, [favorites.loaded]);
  return (
    <nav className="portfolios-nav d-flex">
      <ul className="portfolios-nav-list me-auto">
        <li>
          <button
            className={`portfolio-item now ${
              all.category_id === 12 ? "active" : ""
            }`}
            onClick={() => {
              dispatch(PortfolioActions.setCategory(12));
            }}
          >
            {getAll("Buisiness")}
          </button>
        </li>
        <li>
          <button
            className={`portfolio-item now ${
              all.category_id === 11 ? "active" : ""
            }`}
            onClick={() => {
              dispatch(PortfolioActions.setCategory(1));
            }}
          >
            {getAll("Programming_and_development")}
          </button>
        </li>
        <li>
          <button
            className={`portfolio-item now ${
              all.category_id === 6 ? "active" : ""
            }`}
            onClick={() => {
              dispatch(PortfolioActions.setCategory(6));
            }}
          >
            {getAll("Audio")}
          </button>
        </li>
        <li>
          <button
            className={`portfolio-item now ${
              all.category_id === 7 ? "active" : ""
            }`}
            onClick={() => {
              dispatch(PortfolioActions.setCategory(7));
            }}
          >
            {getAll("General_design")}
          </button>
        </li>
      </ul>
      <ul className="portfolios-nav-list ml-auto">
        <li>
          <Link href={`/user/myfavorites`}>
            <a className="portfolio-item now mx-3">
              <span className="counts">{favorites.data.length}</span>
              <FaHeart /> {getAll("Favorite")}
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default PortfolioNav;
