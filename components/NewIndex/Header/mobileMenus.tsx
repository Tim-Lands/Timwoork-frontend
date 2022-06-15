import { Drawer } from "antd";
import React, { useState, useEffect } from "react";
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
  const [visible, setVisible] = useState(false);
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
                placeholder="البحث في الموقع..."
                className="form-serach-nav"
              />
              <button
                className="btn butt-xs butt-primary2"
                onClick={() => {
                  router.push(`/products?query=${query}`);
                  onClose();
                }}
              >
                البحث
              </button>
            </div>
          </div>
          <Link href={"/products"}>
            <div className="products" onClick={onClose}>
              <MdOutlineShoppingCart />
              تصفح الخدمات
            </div>
          </Link>
          <div className="collapses">
            <div className="society">
              <Collapse>
                <Panel
                  header="أقسام تيم وورك"
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
                            <h4 className="title">المسابقات</h4>
                            <p className="text">قريبا</p>
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
                            <h4 className="title">المشاريع</h4>
                            <p className="text">قريبا</p>
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
                            <h4 className="title">الاعمال</h4>
                            <p className="text">قريبا</p>
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
                            <h4 className="title">مجتمع تيم وورك</h4>
                            <p className="text">قريبا</p>
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
                              <h4 className="title">المدونة</h4>
                              <p className="text">معلومات عامة ومفيدة</p>
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
                    <Panel header={post.name_ar} key={post.id}>
                      {post.subcategories.map((category) => {
                        return (
                          <a
                            key={category.id}
                            href={`products?categoryID=${post.id}&subcategoryID=${category.id}`}
                            className="sideSubCat"
                            onClick={() => setVisible(false)}
                          >
                            {category.name_ar}
                          </a>
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
MobileMenu.propTypes = {
  postsList: PropTypes.array,
};
export default MobileMenu;
