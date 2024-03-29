import { Badge } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useAppSelector } from "@/store/hooks";

function PortfolioProfileHeader({
  showAddBtn,
  otherProfile,
  otherUsername,
}: {
  showAddBtn: boolean;
  otherProfile?: any;
  otherUsername?: string;
}) {
  const {
    languages: { getAll },
    profile,
    user,
  } = useAppSelector((state) => state);
  const myLoader = () => {
    return `${otherProfile?.avatar_url || profile.avatar_path}`;
  };

  return (
    <div className="timlands-profile-content bg-white">
      <div className="profile-content-header">
        <Badge status="success">
          <div className="profile-content-avatar">
            <Image
              loader={myLoader}
              src={otherProfile?.avatar_url || profile.avatar_path}
              quality={80}
              width={120}
              height={120}
              placeholder="blur"
              blurDataURL="/avatar2.jpg"
            />
          </div>
        </Badge>
        <div className="profile-content-head">
          <h4 className="title">
            {otherProfile?.full_name || profile.full_name}
          </h4>
          <p className="text">
            @{otherUsername || user.username} |
            <span className="app-label">
              {" "}
              {otherProfile?.level?.name || profile.level.name}
            </span>
          </p>
          <div className="button-edit d-flex">
            {!otherProfile && (
              <Link href="/user/personalInformations">
                <a className="btn butt-dark mx-1 flex-center butt-sm">
                  <span className="material-icons material-icons-outlined">
                    edit
                  </span>{" "}
                  {getAll("Edit_profile")}
                </a>
              </Link>
            )}
            {showAddBtn && (
              <Link href="/portfolios/project-modify/add">
                <a className="btn butt-green mx-1 flex-center butt-sm">
                  <span className="material-icons material-icons-outlined">
                    add_circle
                  </span>{" "}
                  {getAll("Add_New_project")}
                </a>
              </Link>
            )}
          </div>
        </div>
        <p className="profile-buttons">
          <button
            className="btn butt-primary2 flex-center butt-sm"
            onClick={() =>
              navigator.clipboard.writeText(
                `https://timwoork.com/user/profile/${
                  otherUsername || user.username
                }`
              )
            }
          >
            <span className="material-icons material-icons-outlined">
              file_copy
            </span>{" "}
            {getAll("Copy_my_profils")}
          </button>
        </p>
      </div>
    </div>
  );
}

export default PortfolioProfileHeader;
