import Link from "next/link";
import { useAppSelector } from "@/store/hooks";

import HeroSearchContent from "./HeroSearchContent";

function HeroContainer() {
  const {
    languages: { getAll },
    categories: { top: topCategories },
  } = useAppSelector((state) => state);

  return (
    <div className="hero-container">
      <div className="inner">
        <h1 className="main-title">{getAll("Buy_chat_sell")}</h1>
        <h1 className="sub-title">{getAll("Discover_Timwoork’s_most")}</h1>
        <div className="hero-container-search">
          <HeroSearchContent />
          <ul className="popular-search">
            {topCategories.slice(0, 4).map((category, index) => (
              <li key={index} className="pop-item ">
                <Link
                  href={`/products?categoryID=${category.parent_id}&subcategoryID=${category.id}`}
                >
                  <a className="">{category.name}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HeroContainer;
