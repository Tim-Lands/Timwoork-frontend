import LastSeen from "@/components/LastSeen";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaBell, FaClock } from "react-icons/fa";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { LanguageContext } from "../../../contexts/languageContext/context";
import { useContext } from "react";
function Notifications({ notifications, refs, setShowNotificationsMenu }) {
  const { getSectionLanguage, language } = useContext(LanguageContext);
  const getAll = getSectionLanguage();
  function switchNotifyType(notification) {
    const { type, to, slug, content } = notification?.data;
    const { item_id } = content;
    console.log(type);
    switch (type) {
      case "order":
        if (to == "seller") {
          return `/mysales/${item_id}`;
        }
        if (to == "buyer") {
          return `/mypurchases/${item_id}`;
        }
        break;
      case "rating":
        return `/p/${slug}`;

      case "system":
        return content?.product_id ? `/p/${content?.product_id}:` : "";

      default:
        return `/mysales/${item_id}`;
    }
  }

  function switchNotifyContent(notification) {
    switch (notification?.data?.type) {
      case "system":
        return notification?.data[whichTitle(language)];
      case "order":
        return (
          <>
            {notification?.data[whichTitle(language)]}{" "}
            <strong>{notification?.data?.content[whichTitle(language)]}</strong>
          </>
        );
      case "rating":
        return (
          <>
            {notification?.data[whichTitle(language)]}
            <strong>{notification?.data?.content[whichTitle(language)]}</strong>
          </>
        );
    }
  }
  return (
    <motion.div
      ref={refs}
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="nav-popup-dropdown"
    >
      <div className="popup-dropdown-inner">
        <div className="popup-dropdown-header">
          <h4 className="title">
            <FaBell /> {getAll("Notifications")}
          </h4>
        </div>
        <div className="popup-dropdown-body">
          <div className="popup-dropdown-content">
            <ul className="popup-dropdown-content-list">
              {notifications.map((notification) => (
                <li
                  key={notification.id}
                  onClick={() => setShowNotificationsMenu(false)}
                >
                  <Link href={switchNotifyType(notification)}>
                    <a className="new-popup-item" style={{ marginRight: 0 }}>
                      <div className="new-popup-item-image">
                        <Image
                          src={
                            notification?.data?.user_sender?.avatar_url
                              ? notification?.data?.user_sender?.avatar_url
                              : "/logo.png"
                          }
                          width={50}
                          height={50}
                          alt={``}
                        />
                      </div>
                      <div className="new-popup-item-content">
                        <p className="text">
                          {switchNotifyContent(notification)}
                        </p>
                        <p className="meta">
                          <FaClock />{" "}
                          <LastSeen date={notification?.created_at} />
                        </p>
                      </div>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="popup-dropdown-footer">
          <Link href={`/notifications`}>
            <a
              className="nav-see-more"
              style={{ marginRight: 0, borderRadius: 6 }}
            >
              {getAll("View_all_notifications")}
            </a>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
const whichTitle = (language) => {
  switch (language) {
    default:
      return "title_en";
    case "ar":
      return "title_ar";
    case "en":
      return "title_en";
    case "fr":
      return "title_fr";
  }
};
Notifications.propTypes = {
  notifications: PropTypes.array,
  refs: PropTypes.any,
  setShowNotificationsMenu: PropTypes.func,
};
export default Notifications;
