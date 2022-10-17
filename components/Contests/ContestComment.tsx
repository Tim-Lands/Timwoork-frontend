import Image from "next/image";
import Link from "next/link";
import React, { ReactElement } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BsCheck2All, BsClock, BsPersonBadge } from "react-icons/bs";
import PropTypes from "prop-types";
import { useAppSelector } from "@/store/hooks";

function ContestComment({
  text,
  author,
  time,
  level,
  username,
  avatar,
}): ReactElement {
  const { getAll } = useAppSelector((state) => state.languages);
  return (
    <div className="contest-comment-item">
      <div className="contest-comment-item-head flex-center">
        <Link href={`/u/${username}`}>
          <a className="contest-comment-item-head-user me-auto flex-center">
            <div className="contest-comment-user-avatar">
              <Image src={avatar} width={35} height={35} />
            </div>
            <div className="contest-comment-user-body">
              <h4 className="user-title">{author}</h4>
              <ul className="meta">
                <li>
                  <BsClock /> {time}
                </li>
                <li>
                  <BsPersonBadge /> {level}
                </li>
              </ul>
            </div>
          </a>
        </Link>
        <div className="contest-comment-item-head-tools ml-auto">
          <button type="button" className="btn butt-xs butt-dark mx-1">
            <BsCheck2All />{" "}
            <span className="text"> {getAll("Winner_selection")}</span>
          </button>
          <button type="button" className="btn butt-xs butt-light mx-1">
            <AiOutlineEdit />
          </button>
          <button type="button" className="btn butt-xs butt-red mx-1">
            <AiOutlineDelete />
          </button>
          <button type="button" className="btn butt-xs butt-orange mx-1">
            {getAll("Report")}
          </button>
        </div>
      </div>
      <div className="contest-comment-item-content">
        <p className="text">{text}</p>
      </div>
    </div>
  );
}

export default ContestComment;
ContestComment.propTypes = {
  text: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  author: PropTypes.string,
  username: PropTypes.string,
  level: PropTypes.string,
  time: PropTypes.string,
};
