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
                <h3 className="title">مميزات تيم وورك</h3>
              </div>
              <div className="video-section-body">
                <ul className="video-section-list">
                  <li>
                    <h4 className="title">
                      <span className="material-icons">check_circle</span>
                      مدة تعليق الإرباح فقط 3 أيام ووسائل سحب الأموال المتنوعة
                    </h4>
                    <p className="text">
                      تمتاز منصة تيم ورك بأفضلية عن المنصات الأخرى بمدة تعليق
                      الإرباح لا تتجاوز ثلاثة أيام ووسائل السحب المتنوعة مثل باي
                      بال ووايس والحوالة المالية والتحويل البنكي وعبر CCP
                      للجزائريين
                    </p>
                  </li>
                  <li>
                    <h4 className="title">
                      <span className="material-icons">check_circle</span>
                      ضمان كامل لحقوقك ودعم فني متميز وعلى مدار الساعة
                    </h4>
                    <p className="text">
                      يضمن تيم ورك لمشتري ومقدمي الخدمات حقوقهم عبر سياسات صارمة
                      تكفل السلامة والموثوقية لعمليات بيع وشراء الخدمات. يمكنك
                      المطالبة باسترداد مبلغ الخدمة دائما إن لم تنفذ بالكامل
                      وفقاً لما يعرضه البائع في وصف الخدمة الخاصة به. نحن نعمل
                      لمساعدتك في حل أي مشكلة قد تواجهك وللإجابة عن أي استفسار،
                      بفريق دعم فني متواجد ومتعاون على مدار 24 ساعة وطوال أيام
                      الأسبوع.
                    </p>
                  </li>
                  <li>
                    <h4 className="title">
                      <span className="material-icons">check_circle</span>
                      <span> عمولة الموقع قد تصل إلى</span>
                      <span style={{ fontFamily: "Arial", paddingRight: 3 }}>
                        {" "}
                        11%{" "}
                      </span>
                    </h4>
                    <p className="text">
                      تعتبر عمولة منصة تيم ورك من اقل العمولات المفروضة على
                      الأرباح في مواقع بيع وشراء الخدمات المصغرة ونعمل في تيم
                      ورك إلى تخفيض هذه النسبة من اجل تشجيع الشباب العربي للعمل
                      والكسب عبر منصة تيم ورك لبيع وشراء الخدمات المصغرة
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
