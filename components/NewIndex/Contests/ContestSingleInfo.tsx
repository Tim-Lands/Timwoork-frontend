import React, { ReactElement } from "react";
import PropTypes from "prop-types";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";

function ContestSingleInfo({
  created_at,
  deleveryTime,
  contestantsCount,
  winnersCount,
  sharesCount,
  viewsCount,
  likesCount,
}): ReactElement {
  return (
    <div className="p-3 bg-white portfolio-sidebar single-info-portfolio-container">
      <h3 className="title">معلومات عن المسابقة</h3>
      <div className="single-info-portfolio">
        <table className="table table-borderles">
          <tbody>
            <tr>
              <th>تاريخ النشر:</th>
              <td>{created_at}</td>
            </tr>
            <tr>
              <th>مدة التسليم:</th>
              <td>{deleveryTime}</td>
            </tr>
            <tr>
              <th>المتسابقين:</th>
              <td>{contestantsCount}</td>
            </tr>
            <tr>
              <th>عدد الفائزين:</th>
              <td>{winnersCount}</td>
            </tr>
            <tr>
              <th>عدد المشاركات:</th>
              <td>{sharesCount}</td>
            </tr>
            <tr>
              <th>المشاهدات:</th>
              <td>{viewsCount}</td>
            </tr>
            <tr>
              <th>الإعجابات:</th>
              <td>{likesCount}</td>
            </tr>
            <tr>
              <th>مشاركة المسابقة:</th>
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
