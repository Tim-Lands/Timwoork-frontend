import LastSeen from "@/components/LastSeen";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaBell, FaClock } from "react-icons/fa";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { useAppSelector } from "@/store/hooks";

function Notifications({ refs, setShowNotificationsMenu }) {
  const {
    languages: { getAll, language },
    notifications: { all: notification },
  } = useAppSelector((state) => state);
  function switchNotifyType(notification) {
    const { type, to, content } = notification?.data;
    const { item_id } = content;
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
        return `/p/${item_id}`;

      case "system":
        return content?.product_id ? `/p/${content?.product_id}:` : "";

      default:
        return `/mysales/${item_id}`;
    }
  }

  function switchNotifyContent(notification) {
    switch (notification?.data?.type) {
      case "system":
        return (
          notification?.data[`title_${language}`] || notification?.data?.title
        );
      case "order":
        return (
          <>
            {notification?.data[`title_${language}`] ||
              notification?.data?.title}{" "}
            <strong>
              {notification?.data?.content[`title_${language}`] |
                notification?.data?.content?.cause}
            </strong>
          </>
        );
      case "rating":
        return (
          <>
            {notification?.data[`title_${language}`]}
            <strong>{notification?.data?.content[`title_${language}`]}</strong>
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
              {notification.data.map((notification) => (
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

Notifications.propTypes = {
  refs: PropTypes.any,
  setShowNotificationsMenu: PropTypes.func,
};
export default Notifications;
