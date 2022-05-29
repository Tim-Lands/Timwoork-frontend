import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import LastSeen from "@/components/LastSeen";
import { PRIMARY } from "../../styles/variables";
import { AiOutlineClockCircle } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { lighten } from "@mui/material";
import notifications from "../../public/notifications.png";
import logo from "../../public/logo.png";
import Image from "next/image";
function Notifications({ data, refer }) {
  return (
    <div ref={refer} className="navbar-conversations-container">
      <div className="header">
        {data?.data?.data?.length > 0 ? (
          data?.data?.data?.map((item, index) => {
            if (index < 10) {
              return (
                <Link
                  key={item.id}
                  href={switchNotifyType(
                    item.data.to,
                    item.data.type,
                    item.data.content.item_id,
                    item.data.content.slug
                  )}
                >
                  <div className="item">
                    <div className="rowItem">
                      {item.data.user_sender.full_name === "اﻹدارة" ? (
                        <div
                          className="d-flex align-items-center justify-content-center "
                          style={{
                            backgroundColor: lighten(PRIMARY, 0.8),
                            width: 35,
                            height: 35,
                            borderRadius: "100%",
                          }}
                        >
                          <Image src={logo} width={20} height={20} />
                        </div>
                      ) : item.data.user_sender.avatar_path ? (
                        <img
                          width={35}
                          style={{ borderRadius: "100%" }}
                          height={35}
                          src={item.data.user_sender.avatar_path}
                          alt={item.data.user_sender.username}
                        />
                      ) : (
                        <FaUserCircle
                          style={{ height: 35, width: 35, color: "lightgray" }}
                        />
                      )}
                      <p>
                        <span style={{ color: PRIMARY }}>
                          {item.data.content.title}{" "}
                        </span>
                        {item.data.title}
                      </p>
                    </div>
                    <p>
                      <AiOutlineClockCircle />
                      <LastSeen date={item.updated_at} />
                    </p>
                  </div>
                </Link>
              );
            }
          })
        ) : (
          <div className="noData">
            <Image
              src={notifications}
              alt="لا توجد اشعارات"
              width={60}
              height={60}
            />
            <p>لا توجد لديك اشعارات</p>
          </div>
        )}
      </div>
      {data?.data?.data?.length > 0 && (
        <div className="footer">
          <Link href="/notifications">
            <button>
              جميع الاشعارات <IoMdNotificationsOutline size={16} />
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
function switchNotifyType(to, type, item_id, slug) {
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
      return ``;

    default:
      return `/mysales/${item_id}`;
  }
}
Notifications.propTypes = {
  data: PropTypes.any,
  refer: PropTypes.any,
};

export default Notifications;
