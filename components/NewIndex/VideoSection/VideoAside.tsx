import React, { ReactElement } from "react";
import { LanguageContext } from "../../../contexts/languageContext/context";
import { useContext } from "react";

function VideoAside(): ReactElement {
  const { getSectionLanguage } = useContext(LanguageContext);
  const getAll = getSectionLanguage("all");
  return (
    <div className="video-section">
      <div className="innerVideo">
        <div className="row">
          <div className="col-lg-6">
            <div className="video-section-play">
              <iframe
                className="video-section-play-inner"
                src="https://www.youtube.com/embed/P1mXw7bNGS4"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              ></iframe>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="video-section-content">
              <div className="video-section-header">
                <h3 className="title">{getAll("Timwoork’s_advantages")}</h3>
              </div>
              <div className="video-section-body">
                <ul className="video-section-list">
                  <li>
                    <h4 className="title">
                      <span className="material-icons">check_circle</span>
                      {getAll("The_duration_of")}
                    </h4>
                    <p className="text">{getAll("Timwoork_is_better")}</p>
                  </li>
                  <li>
                    <h4 className="title">
                      <span className="material-icons">check_circle</span>
                      {getAll("Full_guarantee_of")}
                    </h4>
                    <p className="text">
                      {getAll("Timwoork_guarantees_buyers")}
                    </p>
                  </li>
                  <li>
                    <h4 className="title">
                      <span className="material-icons">check_circle</span>
                      <span> {getAll("The_Website’s_commission")}</span>
                    </h4>
                    <p className="text">{getAll("Timwoork’s_commission_is")}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoAside;
