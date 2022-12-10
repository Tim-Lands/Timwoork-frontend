import { useAppSelector } from "@/store/hooks";
import Link from "next/link";
import { FaHeart, FaImages, FaRss, FaUserCircle } from "react-icons/fa";
import { ReactElement } from "react";
import { Tooltip } from "antd";
function Navbar({ active }: { active: string }): ReactElement {
  const {
    languages: { getAll },
  } = useAppSelector((state) => state);
  return (
    <div className="portfolios-container">
      <nav className="portfolios-nav d-flex">
        <ul className="portfolios-nav-list me-auto">
          <li className={active === "profile" ? "active" : ""}>
            <Link href={`/user/profile`}>
              <a className="portfolio-item now">
                <FaUserCircle /> {getAll("Profile")}
              </a>
            </Link>
          </li>
          <li className={active === "portfolio" ? "active" : ""}>
            <Link href={`/portfolios/me`}>
              <a className="portfolio-item now">
                <FaImages /> {getAll("Business_gallery")}
              </a>
            </Link>
          </li>
          <Tooltip title={getAll("Soon")}>
            <li className={active === "followers" ? "active" : ""}>
              {/* <Link href={`/user/myfollowers`}> */}
              <a className="portfolio-item">
                <FaRss /> {getAll("Following")}
              </a>
              {/* </Link> */}
            </li>
          </Tooltip>
          <Tooltip title={getAll("Soon")}>
            <li className={active === "favorite" ? "active" : ""}>
              {/* <Link href={`/user/myfavorites`}> */}
              <a className="portfolio-item">
                <FaHeart /> {getAll("Favorite")}
              </a>
              {/* </Link> */}
            </li>
          </Tooltip>
        </ul>
      </nav>
    </div>
  );
}
export default Navbar;
