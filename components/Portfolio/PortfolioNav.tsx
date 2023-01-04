import Link from "next/link";
import { FavoritesActions } from "@/store/favorites/favoritesAction";
import { useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

function PortfolioNav() {
  const {
    languages: { getAll },
    favorites,
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
