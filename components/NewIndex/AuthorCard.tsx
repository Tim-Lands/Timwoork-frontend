import Image from "next/image";
import Link from "next/link";
import React, { ReactElement, useState } from "react";
import { MdMyLocation } from "react-icons/md";
import PropTypes from "prop-types";
import { LanguageContext } from "../../contexts/languageContext/context";
import { useContext } from "react";

function AuthorCard({
  bio,
  author,
  isFollower,
  country,
  username,
  avatar,
}): ReactElement {
  const [isFollowing, setIsFollowing] = useState(isFollower);
  const { getSectionLanguage } = useContext(LanguageContext);
  const getAll = getSectionLanguage();

  return (
    <div className="p-3 bg-white portfolio-sidebar">
      <h3 className="title">{getAll("About_the_competition")}</h3>
      <div className="user-info-portfolio">
        <Image src={avatar} width={50} height={50} />
        <h3 className="user-title">
          <Link href={`/u/${username}`}>
            <a>{author}</a>
          </Link>
        </h3>
        <p className="meta">
          {" "}
          <MdMyLocation /> {country}
        </p>
        <p className="text" style={{ marginBlock: 6 }}>
          {bio}
        </p>
        <div className="btns-follow">
          {isFollowing && (
            <button
              type="button"
              className="btn butt-sm butt-green flex-center"
              onClick={() => setIsFollowing(!isFollowing)}
            >
              <span className="material-icons material-icons-outlined">
                person_add
              </span>
              {getAll("Follow")}
            </button>
          )}
          {!isFollowing && (
            <button
              type="button"
              className="btn butt-sm butt-light flex-center"
              onClick={() => setIsFollowing(!isFollowing)}
            >
              <span className="material-icons material-icons-outlined">
                person_remove
              </span>
              {getAll("Followed")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
AuthorCard.propTypes = {
  bio: PropTypes.string.isRequired,
  isFollower: PropTypes.bool,
  avatar: PropTypes.string,
  author: PropTypes.string,
  username: PropTypes.string,
  country: PropTypes.string,
};

export default AuthorCard;
