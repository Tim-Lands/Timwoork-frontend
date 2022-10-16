import React, { ReactElement, useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import Image from "next/image";
import { FaEye, FaTag } from "react-icons/fa";
import { GiTrophyCup } from "react-icons/gi";
import { useAppSelector } from "@/store/hooks";

import {
  AiFillHeart,
  AiFillLike,
  AiOutlineComment,
  AiOutlineHeart,
  AiOutlineLike,
} from "react-icons/ai";
import { motion } from "framer-motion";
function ContestPost({
  title,
  author,
  status,
  favorated,
  level,
  username,
  avatar,
  size,
  category,
  price,
  slug,
  liked,
}): ReactElement {
  const [isFavorated, setIsFavorated] = useState(favorated);
  const [isLiked, setIsLiked] = useState(liked);
  const sizeClass = () => {
    switch (size) {
      case "small":
        return " small";
      case "small2":
        return " small2";
      default:
        return "";
    }
  };
  const sizeStatusClass = () => {
    switch (status) {
      case 1:
        return " blue";
      case 2:
        return " red";
      case 3:
        return " green";
      default:
        return "";
    }
  };
  const { getAll } = useAppSelector((state) => state.languages);

  return (
    <div className={"contest-post-item" + sizeClass()}>
      <div className="contest-post-item-content">
        <div className="contest-post-item-content-head">
          <Link href={`/u/${username}`}>
            <a className="user-mata-post">
              <div className="user-mata-post-img">
                <Image src={avatar} width={30} height={30} alt={author} />
              </div>
              <div className="user-mata-post-content">
                <p className="text-user">
                  <span className="text">{author}</span>
                </p>
                <p className="text-meta">
                  <span className="text">{level}</span>
                </p>
              </div>
            </a>
          </Link>
          <div className="user-mata-post-tools">
            <motion.button
              whileTap={{ scale: 1.2 }}
              onClick={() => setIsLiked(!isLiked)}
              transition={{ delay: 0.3, duration: 0.1 }}
              type="button"
              className={`circular-button ${isLiked ? " active" : ""}`}
            >
              {isLiked ? <AiFillLike /> : <AiOutlineLike />}
            </motion.button>
            <motion.button
              whileTap={{ scale: 1.2 }}
              onClick={() => setIsFavorated(!isFavorated)}
              transition={{ delay: 0.3, duration: 0.1 }}
              type="button"
              className={`circular-button ${isFavorated ? " active" : ""}`}
            >
              {isFavorated ? <AiFillHeart /> : <AiOutlineHeart />}
            </motion.button>
          </div>
        </div>
        <div className="p-2 px-3">
          <h3 className="title">
            <Link href={`/contests/${slug}`}>
              <a>{title}</a>
            </Link>
          </h3>
          <ul className="nav post-meta">
            <li className="post-meta-tag">
              <Link href={`/test`}>
                <a>
                  <FaTag /> {category}
                </a>
              </Link>
            </li>
            <li className="post-meta-status">
              <span className={`label-status ${sizeStatusClass()}`}>
                {" "}
                {getAll("Writing_and_translation")}{" "}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="contest-post-item-footer">
        <ul className="contest-post-list me-auto">
          <li>
            <FaEye /> 230
          </li>
          <li>
            <AiOutlineComment /> 230
          </li>
          <li>
            <AiOutlineLike /> 230
          </li>
        </ul>
        <ul className="contest-post-list ml-auto">
          <li className="price">
            <GiTrophyCup /> {price}$
          </li>
        </ul>
      </div>
    </div>
  );
}
ContestPost.propTypes = {
  title: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  author: PropTypes.string,
  slug: PropTypes.string,
  size: PropTypes.string,
  username: PropTypes.string,
  level: PropTypes.string,
  liked: PropTypes.bool,
  status: PropTypes.number,
  price: PropTypes.number,
  category: PropTypes.string,
  favorated: PropTypes.bool,
};

export default ContestPost;
