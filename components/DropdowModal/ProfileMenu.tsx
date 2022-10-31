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

import { UserActions } from "../../store/user/UserActions";
import { useAppSelector, useAppDispatch } from "../../store/hooks";

import { message, notification } from "antd";
function ProfileMenu({ refs, setIsShowProfileMenu }) {
  // let token = Cookies.get("token");
  const dispatch = useAppDispatch();
  const {
    languages: { getAll },
    profile,
    user,
  } = useAppSelector((state) => state);

  // if (!token && typeof window !== "undefined")
  //   token = localStorage.getItem("token");

  const logout_all = async () => {
    try {
      await dispatch(UserActions.logoutAll({ id: user.id })).unwrap();
      message.success(getAll("Successfully_signed_out"));
    } catch {
      notification.open({
        message: getAll("An_error_occurred"),
      });
    }
  };
  const logout = async () => {
    dispatch(UserActions.logoutUser({ id: user.id }));
  };
  return (
    <motion.div
      ref={refs}
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="nav-profile-list"
    >
      <Link href={`/user/profile`}>
        <a
          className="nav-profile-list-header"
          onClick={() => setIsShowProfileMenu(false)}
        >
          <div className="nav-profile-list-header-img">
            <Image src={profile?.avatar_path} width={25} height={25} />
          </div>
          <div className="nav-profile-list-header-content">
            <h4 className="title">{profile?.full_name}</h4>
          </div>
        </a>
      </Link>
      <div className="nav-profile-list-content">
        <ul className="list-profile-withicons">
          {profile.is_completed == 1 && (
            <>
              <li onClick={() => setIsShowProfileMenu(false)}>
                <Link href={"/add-new"}>
                  <a>
                    <span className="circul-icon">
                      <IoIosAddCircleOutline />
                    </span>
                    {getAll("Add_new_service")}
                  </a>
                </Link>
              </li>
              <li onClick={() => setIsShowProfileMenu(false)}>
                <Link href={`/mywallet`}>
                  <a>
                    <span className="circul-icon">
                      <MdOutlineAccountBalanceWallet />
                    </span>
                    {getAll("My_portfolio")}
                  </a>
                </Link>
              </li>
              <li onClick={() => setIsShowProfileMenu(false)}>
                <Link href={`/myproducts`}>
                  <a>
                    <span className="circul-icon">
                      <MdOutlineInventory2 />
                    </span>
                    {getAll("My_services")}
                  </a>
                </Link>
              </li>
              <li onClick={() => setIsShowProfileMenu(false)}>
                <Link href={`/mypurchases`}>
                  <a>
                    <span className="circul-icon">
                      <MdOutlineShoppingCart />
                    </span>
                    {getAll("My_purchases")}
                  </a>
                </Link>
              </li>
              <li onClick={() => setIsShowProfileMenu(false)}>
                <Link href={`/mysales`}>
                  <a>
                    <span className="circul-icon">
                      <MdOutlineShop2 />
                    </span>
                    {getAll("My_sells")}
                  </a>
                </Link>
              </li>
            </>
          )}
          <li onClick={() => setIsShowProfileMenu(false)}>
            <Link href={`/user/personalInformations`}>
              <a>
                <span className="circul-icon">
                  <FiSettings />
                </span>
                {getAll("Settings")}
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
              {getAll("Log_out")}
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
              {getAll("Log_out_of")}
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
