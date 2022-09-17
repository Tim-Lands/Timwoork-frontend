import LastSeen from "@/components/LastSeen";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaClock, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { LanguageContext } from "../../../contexts/languageContext/context";
import { useContext } from "react";

function Messages({ messages, refs, setShowMessagesMenu }) {
  const { getSectionLanguage, language } = useContext(LanguageContext);
  const getAll = getSectionLanguage();
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
              {messages?.map((message) => {
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
                            <strong>
                              {message && message[whichTitle(language)]}
                            </strong>
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

              {/* <li>
                                <Link href={`/`}>
                                    <a className='new-popup-item'>
                                        <div className="new-popup-item-image">
                                            <Image src={`/avatar3.jpg`} width={50} height={50} alt={``} />
                                        </div>
                                        <div className="new-popup-item-content">
                                            <p className="text">قام فلان بن فلان بالتعليق على خدمتك <strong>اكتشف سوق تيم ورك للخدمات الالكترونية</strong></p>
                                            <p className="meta"><FaClock /> <LastSeen date={`2022-04-29T00:53:50.000000Z`} /></p>
                                        </div>
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href={`/`}>
                                    <a className='new-popup-item'>
                                        <div className="new-popup-item-image">
                                            <Image src={`/avatar3.jpg`} width={50} height={50} alt={``} />
                                        </div>
                                        <div className="new-popup-item-content">
                                            <p className="text">قام فلان بن فلان بالتعليق على خدمتك <strong>اكتشف سوق تيم ورك للخدمات الالكترونية</strong></p>
                                            <p className="meta"><FaClock /> <LastSeen date={`2022-04-29T00:53:50.000000Z`} /></p>
                                        </div>
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href={`/`}>
                                    <a className='new-popup-item'>
                                        <div className="new-popup-item-image">
                                            <Image src={`/avatar3.jpg`} width={50} height={50} alt={``} />
                                        </div>
                                        <div className="new-popup-item-content">
                                            <p className="text">قام فلان بن فلان بالتعليق على خدمتك <strong>اكتشف سوق تيم ورك للخدمات الالكترونية</strong></p>
                                            <p className="meta"><FaClock /> <LastSeen date={`2022-04-29T00:53:50.000000Z`} /></p>
                                        </div>
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href={`/`}>
                                    <a className='new-popup-item'>
                                        <div className="new-popup-item-image">
                                            <Image src={`/avatar3.jpg`} width={50} height={50} alt={``} />
                                        </div>
                                        <div className="new-popup-item-content">
                                            <p className="text">قام فلان بن فلان بالتعليق على خدمتك <strong>اكتشف سوق تيم ورك للخدمات الالكترونية</strong></p>
                                            <p className="meta"><FaClock /> <LastSeen date={`2022-04-29T00:53:50.000000Z`} /></p>
                                        </div>
                                    </a>
                                </Link>
                            </li> */}
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
const whichTitle = (language) => {
  switch (language) {
    default:
      return "title_en";
    case "ar":
      return "title";
    case "en":
      return "title_en";
    case "fr":
      return "title_fr";
  }
};
Messages.propTypes = {
  messages: PropTypes.array,
  refs: PropTypes.any,
  setShowMessagesMenu: PropTypes.func,
};
export default Messages;
