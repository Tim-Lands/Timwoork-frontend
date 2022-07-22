import { Drawer } from "antd";
import React, { useState, useEffect, useContext } from "react";
import { LanguageContext } from "../../../contexts/languageContext/context";
import PropTypes from "prop-types";
import { RiUserSmileLine } from "react-icons/ri";
import useSWR from "swr";
import { useRouter } from "next/router";
import {
  MdOutlineShoppingCart,
  MdNotificationsNone,
  MdOutlineMailOutline,
  MdBackupTable,
} from "react-icons/md";
import { FaGlobe, FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
// import Image from "next/image";
import Link from "next/link";
import { Collapse } from "antd";
const { Panel } = Collapse;
const MobileMenu = ({ postsList }) => {
  const { language, getSectionLanguage } = useContext(LanguageContext);
  const [visible, setVisible] = useState(false);
  const getLanguage = getSectionLanguage("main");
  const getLanguageSoon = getSectionLanguage("soon");
  const { data: userInfo }: any = useSWR("api/me");
  const [size, setSize] = useState("70%");
  const [query, setQuery] = useState("");
  const router = useRouter();
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  useEffect(() => {
    setSize(whichSize(window.innerWidth));

    window.addEventListener("resize", () => {
      setSize(whichSize(window.innerWidth));
    });
    return () => {
      window.removeEventListener("resize", () => {
        setSize(whichSize(window.innerWidth));
      });
    };
  }, []);
  return (
    <>
      <GiHamburgerMenu onClick={showDrawer} className="toggleButton" />
      <Drawer
        placement="left"
        onClose={onClose}
        title={
          <img
            src="img/logo6.png"
            height="23"
            alt=""
            style={{ cursor: "pointer" }}
          />
        }
        visible={visible}
        style={{ zIndex: 9000 }}
        width={size}
      >
        <div className="side-new-nav">
          <div className="new-search-bar side">
            <div className="new-search-bar-form">
              <span className="new-searchbar">
                <FaSearch />
              </span>
              <input
                type="text"
                onKeyDown={(e) =>
                  e.keyCode === 13 && router.push(`/products?query=${query}`)
                }
                onChange={(e) => setQuery(e.target.value)}
                placeholder={getLanguage("Search_in_Timwoork")}
                className="form-serach-nav"
              />
              <button
                className="btn butt-xs butt-primary2"
                onClick={() => {
                  router.push(`/products?query=${query}`);
                  onClose();
                }}
              >
                {getLanguage("Search")}
              </button>
            </div>
          </div>
          <Link href={"/products"}>
            <div className="products" onClick={onClose}>
              <MdOutlineShoppingCart />
              {getLanguage("Browsing_services")}
            </div>
          </Link>
          <div className="collapses">
            <div className="society">
              <Collapse>
                <Panel
                  header={getLanguage("Timwoork_sections")}
                  key="1"
                  extra={<MdBackupTable style={{ marginLeft: 20 }} />}
                >
                  <div className="nav-menu-dropdown">
                    <ul className="menu-list-dropdown">
                      <li>
                        {/* <Link href={`/`}> */}
                        <a className="dropd-item">
                          <div className="dropd-item-img">
                            <span className="icon-item link-circular-button">
                              <span className="material-icons material-icons-outlined">
                                flag_circle
                              </span>
                            </span>
                          </div>
                          <div className="dropd-item-content">
                            <h4 className="title">
                              {getLanguageSoon("Competitions")}
                            </h4>
                            <p className="text">{getLanguageSoon("Soon")}</p>
                          </div>
                        </a>
                        {/* </Link> */}
                      </li>
                      <li>
                        {/* <Link href={`/`}> */}
                        <a className="dropd-item">
                          <div className="dropd-item-img">
                            <span className="icon-item link-circular-button">
                              <span className="material-icons material-icons-outlined">
                                account_balance_wallet
                              </span>
                            </span>
                          </div>
                          <div className="dropd-item-content">
                            <h4 className="title">
                              {getLanguageSoon("Projects")}
                            </h4>
                            <p className="text">{getLanguageSoon("Soon")}</p>
                          </div>
                        </a>
                        {/* </Link> */}
                      </li>
                      <li>
                        {/* <Link href={`/`}> */}
                        <a className="dropd-item">
                          <div className="dropd-item-img">
                            <span className="icon-item link-circular-button">
                              <span className="material-icons material-icons-outlined">
                                photo_library
                              </span>
                            </span>
                          </div>
                          <div className="dropd-item-content">
                            <h4 className="title">
                              {getLanguageSoon("Business")}
                            </h4>
                            <p className="text">{getLanguageSoon("Soon")}</p>
                          </div>
                        </a>
                        {/* </Link> */}
                      </li>
                      <li>
                        {/* <Link href={`/`}> */}
                        <a className="dropd-item">
                          <div className="dropd-item-img">
                            <span className="icon-item link-circular-button">
                              <RiUserSmileLine />
                            </span>
                          </div>
                          <div className="dropd-item-content">
                            <h4 className="title">
                              {getLanguageSoon("Timwoork_community")}
                            </h4>
                            <p className="text">{getLanguageSoon("Soon")}</p>
                          </div>
                        </a>
                        {/* </Link> */}
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
                              <h4 className="title">
                                {getLanguageSoon("Blog")}
                              </h4>
                              <p className="text">
                                {getLanguageSoon("general_information")}
                              </p>
                            </div>
                          </a>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </Panel>
              </Collapse>
            </div>
            {postsList.map((post) => {
              return (
                <div key={post.id} className="w-100">
                  <Collapse
                    style={{
                      background: "white",
                      borderRadius: 5,
                      borderBottom: 0,
                    }}
                  >
                    <Panel header={post[which(language)]} key={post.id}>
                      {post.subcategories.map((category) => {
                        return (
                          <Link
                            key={category.id}
                            href={`products?categoryID=${post.id}&subcategoryID=${category.id}`}
                          >
                            <a
                              onClick={() => setVisible(false)}
                              className="sideSubCat"
                            >
                              {category[which(language)]}
                            </a>
                          </Link>
                        );
                      })}
                    </Panel>
                  </Collapse>
                </div>
              );
            })}
          </div>
          <ul className="aside-navbar mt-auto mb-3">
            {userInfo && (
              <>
                <li className="circular-newitem">
                  <Link href={"/cart"}>
                    <MdOutlineShoppingCart onClick={onClose} />
                  </Link>
                </li>
                <li className="circular-newitem">
                  <Link href="/conversations">
                    <MdOutlineMailOutline onClick={onClose} />
                  </Link>
                </li>
                <li className="circular-newitem">
                  <Link href="/notifications">
                    <MdNotificationsNone onClick={onClose} />
                  </Link>
                </li>
                <li className="circular-newitem">
                  <FaGlobe />
                </li>
              </>
            )}
          </ul>
        </div>
      </Drawer>
    </>
  );
};
function whichSize(width) {
  if (width > 900) return "40%";
  else if (width > 500) return "60%";
  else if (width < 350) return "90%";
  else return "80%";
}
const which = (language) => {
  switch (language) {
    default:
      return "name_en";
    case "ar":
      return "name_ar";
    case "en":
      return "name_en";
  }
};
MobileMenu.propTypes = {
  postsList: PropTypes.array,
};
export default MobileMenu;
