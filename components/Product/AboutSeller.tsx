import PropTypes from "prop-types";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { LanguageContext } from "../../contexts/languageContext/context";

export default function AboutSeller({
  avatar,
  myLoader,
  fullname,
  country,
  badge,
  username,
  getOrCreateChat,
  email,
  userId,
}) {
  const { getSectionLanguage } = useContext(LanguageContext);
  const getAll = getSectionLanguage();
  return (
    <div className="timwoork-single-seller-info">
      <div className="seller-info-header">
        <h2 className="title">{getAll("About_seller")}</h2>
      </div>
      <div className="seller-info-container">
        <div className="d-flex">
          <div className="seller-info-avatar">
            {avatar == "avatar.png" ? (
              <Image
                className="circular-img huge-size"
                src="/avatar2.jpg"
                width={100}
                height={100}
              />
            ) : (
              <Image
                className="circular-img huge-size"
                loader={myLoader}
                src={avatar}
                quality={1}
                width={100}
                height={100}
                placeholder="blur"
                blurDataURL="/avatar2.jpg"
              />
            )}
          </div>
          <div className="seller-info-content">
            <h3 className="user-title">{fullname}</h3>
            <ul className="user-meta nav">
              <li>
                <span className="material-icons material-icons-outlined">
                  badge
                </span>{" "}
                {badge !== null && badge.name_ar}
              </li>
              {country !== null && (
                <li>
                  <span className="material-icons material-icons-outlined">
                    place
                  </span>{" "}
                  {getAll("Algeria")}
                </li>
              )}
            </ul>
            <div className="seller-info-butts d-flex">
              <Link href={"/u/" + username}>
                <a className="btn butt-primary butt-sm flex-center">
                  <i className="material-icons material-icons-outlined">
                    account_circle
                  </i>{" "}
                  {getAll("Profile")}
                </a>
              </Link>
              <a
                className="btn butt-green butt-sm flex-center"
                onClick={() => getOrCreateChat(email, userId, username)}
              >
                <i className="material-icons material-icons-outlined">email</i>{" "}
                {getAll("Contact_seller_one")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
AboutSeller.propTypes = {
  avatar: PropTypes.string,
  myLoader: PropTypes.any,
  fullname: PropTypes.string,
  country: PropTypes.object,
  badge: PropTypes.object,
  username: PropTypes.string,
  getOrCreateChat: PropTypes.func,
  email: PropTypes.string,
  userId: PropTypes.any,
};
