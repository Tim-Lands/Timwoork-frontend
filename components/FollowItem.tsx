import Image from "next/image";
import Link from "next/link";
import React, { ReactElement } from "react";
import PropTypes from "prop-types";

function FollowItem({ avatar, fullname, level }): ReactElement {
  return (
    <div className="follower-user-item">
      <div className="follower-user-item-aside me-auto">
        <div className="follower-user-item-img">
          <Image src={avatar} width={50} height={50} />
        </div>
        <div className="follower-user-item-content">
          <h3 className="title">
            <Link href={`/user/profile/username`}>
              <a>{fullname}</a>
            </Link>
          </h3>
          <p className="meta">{level}</p>
        </div>
      </div>
      <div className="follower-user-item-tools ml-auto">
        <button type="button" className="btn butt-sm butt-light flex-center">
          <span className="material-icons material-icons-outlined">
            person_remove
          </span>
          Following
        </button>
      </div>
    </div>
  );
}

export default FollowItem;

FollowItem.propTypes = {
  fullname: PropTypes.string,
  avatar: PropTypes.string,
  level: PropTypes.string,
};
