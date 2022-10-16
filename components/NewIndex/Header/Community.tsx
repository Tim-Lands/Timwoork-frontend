import Link from "next/link";
import { useAppSelector } from "@/store/hooks";

import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { RiUserSmileLine } from "react-icons/ri";

const Community = ({ refs }) => {
  const { getAll } = useAppSelector((state) => state.languages);

  return (
    <motion.div
      ref={refs}
      initial={{ y: 100, opacity: 0, rotate: 10 }}
      animate={{ y: 0, opacity: 1, rotate: 0 }}
      className="nav-menu-dropdown"
    >
      <ul className="menu-list-dropdown">
        <li>
          <Link href={`/`}>
            <a className="dropd-item">
              <div className="dropd-item-img">
                <span className="icon-item link-circular-button">
                  <span className="material-icons material-icons-outlined">
                    flag_circle
                  </span>
                </span>
              </div>
              <div className="dropd-item-content">
                <h4 className="title">{getAll("Competitions")}</h4>
                <p className="text">{getAll("Soon")}</p>
              </div>
            </a>
          </Link>
        </li>
        <li>
          <Link href={`/`}>
            <a className="dropd-item">
              <div className="dropd-item-img">
                <span className="icon-item link-circular-button">
                  <span className="material-icons material-icons-outlined">
                    account_balance_wallet
                  </span>
                </span>
              </div>
              <div className="dropd-item-content">
                <h4 className="title">{getAll("Projects")}</h4>
                <p className="text">{getAll("Soon")}</p>
              </div>
            </a>
          </Link>
        </li>
        <li>
          <Link href={`/`}>
            <a className="dropd-item">
              <div className="dropd-item-img">
                <span className="icon-item link-circular-button">
                  <span className="material-icons material-icons-outlined">
                    photo_library
                  </span>
                </span>
              </div>
              <div className="dropd-item-content">
                <h4 className="title">{getAll("Business")}</h4>
                <p className="text">{getAll("Soon")}</p>
              </div>
            </a>
          </Link>
        </li>
        <li>
          <Link href={`/`}>
            <a className="dropd-item">
              <div className="dropd-item-img">
                <span className="icon-item link-circular-button">
                  <RiUserSmileLine />
                </span>
              </div>
              <div className="dropd-item-content">
                <h4 className="title">{getAll("Timwoork_community")}</h4>
                <p className="text">{getAll("Soon")}</p>
              </div>
            </a>
          </Link>
        </li>
        <li>
          <Link href={`/blog`}>
            <a className="dropd-item">
              <div className="dropd-item-img">
                <span className="icon-item link-circular-button">
                  <span className="material-icons material-icons-outlined">
                    edit_note
                  </span>
                </span>
              </div>
              <div className="dropd-item-content">
                <h4 className="title">{getAll("Blog")}</h4>
                <p className="text">{getAll("general_information")}</p>
              </div>
            </a>
          </Link>
        </li>
      </ul>
    </motion.div>
  );
};
Community.propTypes = {
  refs: PropTypes.any,
};

export default Community;
