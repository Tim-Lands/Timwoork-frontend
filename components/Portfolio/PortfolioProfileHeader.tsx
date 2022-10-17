import { Badge } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useAppSelector } from "@/store/hooks";

function PortfolioProfileHeader() {
  const { getAll } = useAppSelector((state) => state.languages);

  return (
    <div className="timlands-profile-content bg-white">
      <div className="profile-content-header">
        <Badge status="success">
          <div className="profile-content-avatar">
            <Image
              src={`/avatar3.jpg`}
              quality={80}
              width={120}
              height={120}
              placeholder="blur"
              blurDataURL="/avatar2.jpg"
            />
          </div>
        </Badge>
        <div className="profile-content-head">
          <h4 className="title">Abdelhamid Boumegouas</h4>
          <p className="text">
            @aboumegouass |
            <span className="app-label"> {getAll("VIP_Seller")}</span>
          </p>
          <div className="button-edit d-flex">
            <Link href="/user/personalInformations">
              <a className="btn butt-dark mx-1 flex-center butt-sm">
                <span className="material-icons material-icons-outlined">
                  edit
                </span>{" "}
                {getAll("Edit_profile")}
              </a>
            </Link>
            <Link href="/user/personalInformations">
              <a className="btn butt-green mx-1 flex-center butt-sm">
                <span className="material-icons material-icons-outlined">
                  add_circle
                </span>{" "}
                {getAll("Add_New_Portfolio")}
              </a>
            </Link>
          </div>
        </div>
        <p className="profile-buttons">
          <button
            className="btn butt-primary2 flex-center butt-sm"
            onClick={() =>
              navigator.clipboard.writeText(
                `https://timwoork.com/u/aboumegouass`
              )
            }
          >
            <span className="material-icons material-icons-outlined">
              file_copy
            </span>{" "}
            {getAll("Copy_My_Profile")}
          </button>
        </p>
      </div>
    </div>
  );
}

export default PortfolioProfileHeader;
