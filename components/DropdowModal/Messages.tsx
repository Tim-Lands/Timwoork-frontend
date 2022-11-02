import LastSeen from "@/components/LastSeen";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaClock, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { useAppSelector } from "@/store/hooks";

function Messages({ refs, setShowMessagesMenu }) {
  const {
    languages: { getAll, language },
    chat: {
      all: { data },
    },
  } = useAppSelector((state) => state);

  return (
    <motion.div
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      ref={refs}
      className="nav-popup-dropdown"
    >
      <div className="popup-dropdown-inner">
        <div className="popup-dropdown-header">
          <h4 className="title">
            <FaEnvelope /> {getAll("Messages")}
          </h4>
        </div>
        <div className="popup-dropdown-body">
          <div className="popup-dropdown-content">
            <ul className="popup-dropdown-content-list">
              {data?.map((message) => {
                return (
                  <li
                    key={message?.id}
                    onClick={() => {
                      setShowMessagesMenu(false);
                    }}
                  >
                    <Link href={`/conversations/${message.id}`}>
                      <a className="new-popup-item" style={{ marginRight: 0 }}>
                        <div className="new-popup-item-image">
                          <Image
                            src={message?.members[0].profile.avatar_url}
                            width={50}
                            height={50}
                            alt={``}
                          />
                        </div>
                        <div className="new-popup-item-content">
                          <p className="text">
                            {language === "ar" && getAll("Have")}{" "}
                            {message?.members[0].username}
                            {" " + getAll("have_commented") + " "}
                            <strong>{message[`title_${language}`]}</strong>
                          </p>
                          <p className="meta">
                            <FaClock />{" "}
                            <LastSeen
                              date={message?.latest_message?.updated_at}
                            />
                          </p>
                        </div>
                      </a>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="popup-dropdown-footer">
          <Link href={`/conversations`}>
            <a
              className="nav-see-more"
              style={{ marginRight: 0, borderRadius: 6 }}
            >
              {getAll("View_all_messages")}
            </a>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

Messages.propTypes = {
  messages: PropTypes.array,
  refs: PropTypes.any,
  setShowMessagesMenu: PropTypes.func,
};
export default Messages;
