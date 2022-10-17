import React, { ReactElement } from "react";
import PropTypes from "prop-types";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import { useAppSelector } from "@/store/hooks";

function ContestSingleInfo({
  created_at,
  deleveryTime,
  contestantsCount,
  winnersCount,
  sharesCount,
  viewsCount,
  likesCount,
}): ReactElement {
  const { getAll } = useAppSelector((state) => state.languages);
  return (
    <div className="p-3 bg-white portfolio-sidebar single-info-portfolio-container">
      <h3 className="title">{getAll("Information_about_the")}</h3>
      <div className="single-info-portfolio">
        <table className="table table-borderles">
          <tbody>
            <tr>
              <th>{getAll("Publication_date")}</th>
              <td>{created_at}</td>
            </tr>
            <tr>
              <th>{getAll("Delivery_period")}</th>
              <td>{deleveryTime}</td>
            </tr>
            <tr>
              <th>{getAll("Competitors")}</th>
              <td>{contestantsCount}</td>
            </tr>
            <tr>
              <th>{getAll("Winners’_number")}</th>
              <td>{winnersCount}</td>
            </tr>
            <tr>
              <th>{getAll("Participations_number")}</th>
              <td>{sharesCount}</td>
            </tr>
            <tr>
              <th>{getAll("Views")}</th>
              <td>{viewsCount}</td>
            </tr>
            <tr>
              <th>{getAll("Likes")}</th>
              <td>{likesCount}</td>
            </tr>
            <tr>
              <th>{getAll("Share_competition")}</th>
              <td>
                <a href="" className="share-item">
                  <FaFacebook />
                </a>
                <a href="" className="share-item">
                  <FaTwitter />
                </a>
                <a href="" className="share-item">
                  <FaLinkedin />
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
ContestSingleInfo.propTypes = {
  created_at: PropTypes.any,
  deleveryTime: PropTypes.any,
  contestantsCount: PropTypes.number,
  winnersCount: PropTypes.number,
  sharesCount: PropTypes.number,
  viewsCount: PropTypes.number,
  likesCount: PropTypes.number,
};

export default ContestSingleInfo;
