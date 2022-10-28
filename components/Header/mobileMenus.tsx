import { Drawer } from "antd";
import React, { useState, useEffect } from "react";
import { useAppSelector } from "@/store/hooks";

import PropTypes from "prop-types";
import { RiUserSmileLine } from "react-icons/ri";
import LanguageModel from "../DropdowModal/Language";
import { useRouter } from "next/router";
import {
  MdOutlineShoppingCart,
  MdNotificationsNone,
  MdOutlineMailOutline,
  MdBackupTable,
} from "react-icons/md";
import { FaGlobe, FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import Link from "next/link";
import { Collapse } from "antd";
const { Panel } = Collapse;
const MobileMenu = ({ postsList }) => {
  const { getAll } = useAppSelector((state) => state.languages);
  const user = useAppSelector((state) => state.user);

  const [visible, setVisible] = useState(false);
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
  const [isLanguage, setIsLanguage] = useState(false);

  return (
    <>
      {isLanguage && <LanguageModel setIsConfirmText={setIsLanguage} />}
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
                placeholder={getAll("Search_in_Timwoork")}
                className="form-serach-nav"
              />
              <button
                className="btn butt-xs butt-primary2"
                onClick={() => {
                  router.push(`/products?query=${query}`);
                  onClose();
                }}
              >
                {getAll("Search")}
              </button>
            </div>
          </div>
          <Link href={"/products"}>
            <div className="products" onClick={onClose}>
              <MdOutlineShoppingCart />
              {getAll("Browsing_services")}
            </div>
          </Link>
          <div className="collapses">
            <div className="society">
              <Collapse>
                <Panel
                  header={getAll("Timwoork_sections")}
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
                            <h4 className="title">{getAll("Competitions")}</h4>
                            <p className="text">{getAll("Soon")}</p>
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
                            <h4 className="title">{getAll("Projects")}</h4>
                            <p className="text">{getAll("Soon")}</p>
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
                            <h4 className="title">{getAll("Business")}</h4>
                            <p className="text">{getAll("Soon")}</p>
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
                              {getAll("Timwoork_community")}
                            </h4>
                            <p className="text">{getAll("Soon")}</p>
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
                              <h4 className="title">{getAll("Blog")}</h4>
                              <p className="text">
                                {getAll("general_information")}
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
                    <Panel header={post.name} key={post.id}>
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
                              {category.name}
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
            {user.isLogged && (
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
              </>
            )}
            <li
              className="circular-newitem"
              onClick={() => {
                onClose();
                setIsLanguage(true);
              }}
            >
              <FaGlobe />
            </li>
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

MobileMenu.propTypes = {
  postsList: PropTypes.array,
};
export default MobileMenu;
