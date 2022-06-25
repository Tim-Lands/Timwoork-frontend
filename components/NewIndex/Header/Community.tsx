import Link from "next/link";
import { LanguageContext } from "../../../contexts/languageContext/context";
import React, { useContext } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { RiUserSmileLine } from "react-icons/ri";

const Community = ({ refs }) => {
  const { getSectionLanguage } = useContext(LanguageContext);
  const getLanguage = getSectionLanguage("soon");
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
                <h4 className="title">{getLanguage("Competitions")}</h4>
                <p className="text">{getLanguage("Soon")}</p>
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
                <h4 className="title">{getLanguage("Projects")}</h4>
                <p className="text">{getLanguage("Soon")}</p>
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
                <h4 className="title">{getLanguage("Business")}</h4>
                <p className="text">{getLanguage("Soon")}</p>
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
                <h4 className="title">{getLanguage("Timwoork_community")}</h4>
                <p className="text">{getLanguage("Soon")}</p>
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
                <h4 className="title">{getLanguage("Blog")}</h4>
                <p className="text">{getLanguage("general_information")}</p>
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
