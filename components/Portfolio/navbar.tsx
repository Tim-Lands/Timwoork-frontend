import { useAppSelector } from "@/store/hooks";
import Link from "next/link";
import { FaHeart, FaImages, FaRss, FaUserCircle } from "react-icons/fa";
import { ReactElement } from "react";
function Navbar({ active }: { active: string }): ReactElement {
  const {
    languages: { getAll },
    user,
  } = useAppSelector((state) => state);
  return (
    <div className="portfolios-container">
      <nav className="portfolios-nav d-flex">
        <ul className="portfolios-nav-list me-auto">
          <li className={active === "profile" ? "active" : ""}>
            <Link href={`/user/profile`}>
              <a className="portfolio-item">
                <FaUserCircle /> {getAll("Profile")}
              </a>
            </Link>
          </li>
          <li className={active === "portfolio" ? "active" : ""}>
            <Link href={`/portfolios/user/${user.username}`}>
              <a className="portfolio-item">
                <FaImages /> {getAll("Business_gallery")}
              </a>
            </Link>
          </li>
          <li className={active === "followers" ? "active" : ""}>
            <Link href={`/user/myfollowers`}>
              <a className="portfolio-item">
                <FaRss /> {getAll("Following")}
              </a>
            </Link>
          </li>
          <li className={active === "favorite" ? "active" : ""}>
            <Link href={`/user/myfavorites`}>
              <a className="portfolio-item">
                <FaHeart /> {getAll("Favorite")}
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
export default Navbar;
