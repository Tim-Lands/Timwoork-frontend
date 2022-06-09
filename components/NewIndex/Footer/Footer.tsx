import Link from "next/link";
import React, { useState } from "react";
import {
  FaTiktok,
  FaFacebook,
  FaYoutube,
  FaTwitter,
  FaInstagram,
  FaTelegram,
  FaGlobe,
  FaDollarSign,
} from "react-icons/fa";
import Currency from "@/components/NewIndex/DropdowModal/Currency";
import Language from "@/components/NewIndex/DropdowModal/Language";
import { Tooltip } from "antd";

function Footer() {
  const [isCurrencyVisible, setIsCurrencyVisible] = useState(false);
  const [isLanguageVisible, setIsLanguageVisible] = useState(false);
  return (
    <>
      {isCurrencyVisible && (
        <Currency setIsConfirmText={setIsCurrencyVisible} />
      )}
      {isLanguageVisible && (
        <Language setIsConfirmText={setIsLanguageVisible} />
      )}
      <div>
        <div className="footer-inner" style={{ marginTop: 0 }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-sm-6 p-0">
                <div className="footer-item">
                  <h3 className="title">الخدمات الأكثر شعبية</h3>
                  <ul className="footerlist">
                    <li>
                      <Link href={"/"}>
                        <a>ال ضتصنيف الأول</a>
                      </Link>
                    </li>
                    <li>
                      <Link href={"/"}>
                        <a>التصنيف الثاني</a>
                      </Link>
                    </li>
                    <li>
                      <Link href={"/"}>
                        <a>التصنيف الثالث</a>
                      </Link>
                    </li>
                    <li>
                      <Link href={"/"}>
                        <a>التصنيف الرابع</a>
                      </Link>
                    </li>
                  </ul>
                  <div className="payments-me">
                    <h4 className="title">وسائل الدفع</h4>
                    <Tooltip title="الفيزا كارد">
                      <img
                        src="/png1.png"
                        alt=""
                        height={38}
                        className="mx-1"
                      />
                    </Tooltip>
                    <Tooltip title="الماستر كارد">
                      <img
                        src="/png2.png"
                        alt=""
                        height={38}
                        className="mx-1"
                      />
                    </Tooltip>
                    <Tooltip title="الوايز">
                      <img
                        src="/png3.png"
                        alt=""
                        height={30}
                        className="mx-1"
                      />
                    </Tooltip>
                    <Tooltip title="البايبال">
                      <img
                        src="/png4.png"
                        alt=""
                        height={38}
                        className="mx-1"
                      />
                    </Tooltip>
                    <Tooltip title="بريد الجزائر">
                      <img src="/ccp.png" alt="" height={30} className="mx-1" />
                    </Tooltip>
                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-sm-6 p-0">
                <div className="footer-item">
                  <h3 className="title">التصنيفات</h3>
                  <ul className="footerlist">
                    <li>
                      <Link href={"/"}>
                        <a>التصنيف الأول</a>
                      </Link>
                    </li>
                    <li>
                      <Link href={"/"}>
                        <a>التصنيف الثاني</a>
                      </Link>
                    </li>
                    <li>
                      <Link href={"/"}>
                        <a>التصنيف الأول</a>
                      </Link>
                    </li>
                    <li>
                      <Link href={"/"}>
                        <a>التصنيف الثاني</a>
                      </Link>
                    </li>
                    <li>
                      <Link href={"/"}>
                        <a>التصنيف الثالث</a>
                      </Link>
                    </li>
                    <li>
                      <Link href={"/"}>
                        <a>التصنيف الرابع</a>
                      </Link>
                    </li>
                    <li>
                      <Link href={"/"}>
                        <a>التصنيف الخامس</a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 p-0">
                <div className="footer-item">
                  <h3 className="title">التصنيفات</h3>
                  <ul className="footerlist">
                    <li>
                      <Link href={"/"}>
                        <a>التصنيف الأول</a>
                      </Link>
                    </li>
                    <li>
                      <Link href={"/"}>
                        <a>التصنيف الثاني</a>
                      </Link>
                    </li>
                    <li>
                      <Link href={"/"}>
                        <a>التصنيف الثالث</a>
                      </Link>
                    </li>
                    <li>
                      <Link href={"/"}>
                        <a>التصنيف الرابع</a>
                      </Link>
                    </li>
                    <li>
                      <Link href={"/"}>
                        <a>التصنيف الخامس</a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 p-0">
                <div className="footer-item">
                  <h3 className="title">المدونة</h3>
                  <ul className="footerlist">
                    <li>
                      <Link href={"/"}>
                        <a>هذا النص هو مثال لنص يمكن أن يستبدل في نفس..</a>
                      </Link>
                    </li>
                    <li>
                      <Link href={"/"}>
                        <a>المساحة، لقد تم توليد هذا النص من...</a>
                      </Link>
                    </li>
                    <li>
                      <Link href={"/"}>
                        <a>توليد هذا النص من مولد النص العربى، حيث...</a>
                      </Link>
                    </li>
                    <li>
                      <Link href={"/"}>
                        <a>على المصمم أن يضع نصوصا مؤقتة على التصميم</a>
                      </Link>
                    </li>
                    <li>
                      <Link href={"/"}>
                        <a>أن يستبدل في نفس المساحة، لقد تم توليد هذا النص</a>
                      </Link>
                    </li>
                    <li>
                      <Link href={"/"}>
                        <a>يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا </a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <div className="footer-bottom-inner">
              <div className="right-footer">
                <img src="/logofoot.png" alt="" />
                <p className="text">© 2021-2022 Timwoork جميع الحقوق محفوظة</p>
              </div>
              <div className="left-footer">
                <ul className="currency">
                  <li>
                    <button
                      type="button"
                      className="rounded-button"
                      onClick={() => setIsLanguageVisible(true)}
                    >
                      <FaGlobe /> العربية
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="rounded-button"
                      onClick={() => setIsCurrencyVisible(true)}
                    >
                      <FaDollarSign /> الدولار
                    </button>
                  </li>
                </ul>
                <ul className="socials">
                  <li>
                    <a href="" rel="noreferrer" target="_blank">
                      <FaTiktok />
                    </a>
                  </li>
                  <li>
                    <a href="" rel="noreferrer" target="_blank">
                      <FaFacebook />
                    </a>
                  </li>
                  <li>
                    <a href="" rel="noreferrer" target="_blank">
                      <FaYoutube />
                    </a>
                  </li>
                  <li>
                    <a href="" rel="noreferrer" target="_blank">
                      <FaInstagram />
                    </a>
                  </li>
                  <li>
                    <a href="" rel="noreferrer" target="_blank">
                      <FaTwitter />
                    </a>
                  </li>
                  <li>
                    <a href="" rel="noreferrer" target="_blank">
                      <FaTelegram />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="col-lg-3 col-sm-6 p-0">
          <div className="footer-item">
            <h3 className="title">التصنيفات</h3>
            <ul className="footerlist">
              <li>
                <Link href={"/"}>
                  <a>التصنيف الأول</a>
                </Link>
              </li>
              <li>
                <Link href={"/"}>
                  <a>التصنيف الثاني</a>
                </Link>
              </li>
              <li>
                <Link href={"/"}>
                  <a>التصنيف الثالث</a>
                </Link>
              </li>
              <li>
                <Link href={"/"}>
                  <a>التصنيف الرابع</a>
                </Link>
              </li>
              <li>
                <Link href={"/"}>
                  <a>التصنيف الخامس</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-lg-3 col-sm-6 p-0">
          <div className="footer-item">
            <h3 className="title">المدونة</h3>
            <ul className="footerlist">
              <li>
                <Link href={"/"}>
                  <a>هذا النص هو مثال لنص يمكن أن يستبدل في نفس..</a>
                </Link>
              </li>
              <li>
                <Link href={"/"}>
                  <a>المساحة، لقد تم توليد هذا النص من...</a>
                </Link>
              </li>
              <li>
                <Link href={"/"}>
                  <a>توليد هذا النص من مولد النص العربى، حيث...</a>
                </Link>
              </li>
              <li>
                <Link href={"/"}>
                  <a>على المصمم أن يضع نصوصا مؤقتة على التصميم</a>
                </Link>
              </li>
              <li>
                <Link href={"/"}>
                  <a>أن يستبدل في نفس المساحة، لقد تم توليد هذا النص</a>
                </Link>
              </li>
              <li>
                <Link href={"/"}>
                  <a>يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا </a>
                </Link>
              </li>
            </ul>
          </div>
        </div> */}
      </div>
      {/* <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-inner">
            <div className="right-footer">
              <img src="/logofoot.png" alt="" />
              <p className="text">© 2021-2022 Timwoork جميع الحقوق محفوظة</p>
            </div>
            <div className="left-footer">
              <ul className="currency">
                <li>
                  <button
                    type="button"
                    className="rounded-button"
                    onClick={() => setIsLanguageVisible(true)}
                  >
                    <FaGlobe /> العربية
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="rounded-button"
                    onClick={() => setIsCurrencyVisible(true)}
                  >
                    <FaDollarSign /> الدولار
                  </button>
                </li>
              </ul>
              <ul className="socials">
                <li>
                  <a href="" rel="noreferrer" target="_blank">
                    <FaTiktok />
                  </a>
                </li>
                <li>
                  <a href="" rel="noreferrer" target="_blank">
                    <FaFacebook />
                  </a>
                </li>
                <li>
                  <a href="" rel="noreferrer" target="_blank">
                    <FaYoutube />
                  </a>
                </li>
                <li>
                  <a href="" rel="noreferrer" target="_blank">
                    <FaInstagram />
                  </a>
                </li>
                <li>
                  <a href="" rel="noreferrer" target="_blank">
                    <FaTwitter />
                  </a>
                </li>
                <li>
                  <a href="" rel="noreferrer" target="_blank">
                    <FaTelegram />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default Footer;
