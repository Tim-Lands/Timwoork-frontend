import Link from "next/link";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { IoIosAddCircleOutline } from "react-icons/io";
import {
  MdLogout,
  MdOutlineAccountBalanceWallet,
  MdOutlineInventory2,
  MdOutlineShop2,
  MdOutlineShoppingCart,
} from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import PropTypes from "prop-types";
import API from "../../../config";
import Cookies from "js-cookie";
import router from "next/router";
import { message, notification } from "antd";

function ProfileMenu({ user_details, refs, setIsShowProfileMenu }) {
  let token = Cookies.get("token");
  if (!token && typeof window !== "undefined")
    token = localStorage.getItem("token");

  const logout_all = async () => {
    try {
      const res = await API.post(
        "api/logout_all",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status == 200) {
        message.success("لقد تم تسجيل الخروج بنجاح");
      }
    } catch (error) {
      notification.open({
        message: "حدث خطأ",
      });
    }
  };
  const logout = async () => {
    try {
      const res = await API.post(
        "api/logout_user",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        Cookies.remove("token");
        router.reload();
      }
    } catch (error) {
      () => {};
    }
  };
  return (
    <motion.div
      ref={refs}
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="nav-profile-list"
    >
      <Link href={`/`}>
        <a
          className="nav-profile-list-header"
          onClick={() => setIsShowProfileMenu(false)}
        >
          <div className="nav-profile-list-header-img">
            <Image
              src={user_details?.profile?.avatar_path}
              width={25}
              height={25}
            />
          </div>
          <div className="nav-profile-list-header-content">
            <h4 className="title">{user_details?.profile?.full_name}</h4>
          </div>
        </a>
      </Link>
      <div className="nav-profile-list-content">
        <ul className="list-profile-withicons">
          <li onClick={() => setIsShowProfileMenu(false)}>
            <Link href={"/add-new"}>
              <a>
                <span className="circul-icon">
                  <IoIosAddCircleOutline />
                </span>
                إضافة خدمة جديدة
              </a>
            </Link>
          </li>
          <li onClick={() => setIsShowProfileMenu(false)}>
            <Link href={`/mywallet`}>
              <a>
                <span className="circul-icon">
                  <MdOutlineAccountBalanceWallet />
                </span>
                محفظتي
              </a>
            </Link>
          </li>
          <li onClick={() => setIsShowProfileMenu(false)}>
            <Link href={`/myproducts`}>
              <a>
                <span className="circul-icon">
                  <MdOutlineInventory2 />
                </span>
                خدماتي
              </a>
            </Link>
          </li>
          <li onClick={() => setIsShowProfileMenu(false)}>
            <Link href={`/mypurchases`}>
              <a>
                <span className="circul-icon">
                  <MdOutlineShoppingCart />
                </span>
                مشترياتي
              </a>
            </Link>
          </li>
          <li onClick={() => setIsShowProfileMenu(false)}>
            <Link href={`/mysales`}>
              <a>
                <span className="circul-icon">
                  <MdOutlineShop2 />
                </span>
                مبيعاتي
              </a>
            </Link>
          </li>
          <li onClick={() => setIsShowProfileMenu(false)}>
            <Link href={`/user/personalInformations`}>
              <a>
                <span className="circul-icon">
                  <FiSettings />
                </span>
                الإعدادات
              </a>
            </Link>
          </li>
          <li
            onClick={() => {
              setIsShowProfileMenu(false);
              logout();
            }}
          >
            <a>
              <span className="circul-icon">
                <MdLogout />
              </span>
              تسجيل الخروج
            </a>
          </li>
          <li
            onClick={() => {
              setIsShowProfileMenu(false);
              logout_all();
            }}
          >
            <a>
              <span className="circul-icon">
                <MdLogout />
              </span>
              الخروج من جميع الأجهزة
            </a>
          </li>
        </ul>
      </div>
    </motion.div>
  );
}
ProfileMenu.propTypes = {
  setIsShowProfileMenu: PropTypes.func,
  user_details: PropTypes.any,
  refs: PropTypes.any,
};
export default ProfileMenu;
