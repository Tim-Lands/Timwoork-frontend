import React, { ReactElement } from "react";
function VideoAside(): ReactElement {
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
                <h3 className="title">ميزات تيم وورك</h3>
              </div>
              <div className="video-section-body">
                <ul className="video-section-list">
                  <li>
                    <h4 className="title">
                      <span className="material-icons">check_circle</span> هذا
                      النص هو مثال لنص يمكن أن يستبدل
                    </h4>
                    <p className="text">
                      هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم
                      توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل
                      هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد
                      الحروف التى يولدها التطبيق
                    </p>
                  </li>
                  <li>
                    <h4 className="title">
                      <span className="material-icons">check_circle</span> هذا
                      النص هو مثال لنص يمكن أن يستبدل
                    </h4>
                    <p className="text">
                      هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم
                      توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل
                      هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد
                      الحروف التى يولدها التطبيق
                    </p>
                  </li>
                  <li>
                    <h4 className="title">
                      <span className="material-icons">check_circle</span> هذا
                      النص هو مثال لنص يمكن أن يستبدل
                    </h4>
                    <p className="text">
                      هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم
                      توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل
                      هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد
                      الحروف التى يولدها التطبيق
                    </p>
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
