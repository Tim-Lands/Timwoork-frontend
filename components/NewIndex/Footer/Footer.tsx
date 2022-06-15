import Link from "next/link";
import React, { useEffect, useState } from "react";
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
import API from "../../../config";
function Footer() {
  const [isCurrencyVisible, setIsCurrencyVisible] = useState(false);
  const [isLanguageVisible, setIsLanguageVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const [currency, setCurrency] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const [categoriesRes, blogPostsRes, popularProductsRes, currencyRes] = await Promise.all(
      [
        API.get("api/top_main_categories"),
        API.get("https://timwoork.net/wp-json/wp/v2/posts?per_page=5"),
        API.get("api/filter?paginate=5&popular"),
        API.get('api/currency')
      ]
    ).then((responses) => responses.map((res) => res?.data));
    setCurrency(currencyRes?.data)
    setCategories(categoriesRes?.data);
    setBlogPosts(blogPostsRes);
    setPopularProducts(popularProductsRes?.data?.data);
  };
  return (
    <>
      {isCurrencyVisible && (
        <Currency currencies={currency} setIsConfirmText={setIsCurrencyVisible} />
      )}
      {isLanguageVisible && (
        <Language setIsConfirmText={setIsLanguageVisible} />
      )}
      <div className="footer-inner">
        <div className=" footer-cont">
          <div className="footer-item">
            <h3 className="title">روابط الموقع</h3>
            <ul className="footerlist">
              <li>
                <Link href="/privacy">
                  <a>سياسة الخصوصية</a>
                </Link>
              </li>
              <li>
                <Link href="/terms">
                  <a>شروط الإستخدام</a>
                </Link>
              </li>
              <li>
                <Link href="/about-us">
                  <a>حول الموقع</a>
                </Link>
              </li>
              <li>
                <Link href="/contactus">
                  <a>اتصل بنا</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-item">
            <h3 className="title">التصنيفات النشطة</h3>
            <ul className="footerlist">
              {categories.map((category) => {
                return (
                  <li key={category.id}>
                    <Link href={`/products?categoryID=${category?.id}`}>
                      {category.name_ar}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="footer-item">
            <h3 className="title">الخدمات الأكثر شعبية</h3>
            <ul className="footerlist">
              {popularProducts.map((product) => {
                return (
                  <li key={product.id} style={{ width: 350 }}>
                    <Link href={`/p/${product.slug}`}>
                      <a className="text-truncate">{product.title}</a>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="footer-item">
            <h3 className="title">المدونة</h3>
            <ul className="footerlist">
              {blogPosts.map((post) => (
                <li key={post.id} style={{ width: 350 }}>
                  <Link href={`/blog/${post.slug}`}>
                    <a className="text-truncate">{post.title.rendered}</a>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="payments-me">
              <h4 className="title">وسائل الدفع</h4>
              <Tooltip title="الفيزا كارد">
                <img src="/png1.png" alt="" height={38} className="mx-1" />
              </Tooltip>
              <Tooltip title="الماستر كارد">
                <img src="/png2.png" alt="" height={38} className="mx-1" />
              </Tooltip>
              <Tooltip title="البايبال">
                <img src="/png4.png" alt="" height={38} className="mx-1" />
              </Tooltip>
            </div>
            <div className="payments-me mt-2">
              <h4 className="title">وسائل السحب</h4>
              <Tooltip title="ويستر يونيون">
                <img src="/western.png" alt="" height={38} className="mx-1" />
              </Tooltip>
              <Tooltip title="الوايز">
                <img src="/png3.png" alt="" height={30} className="mx-1" />
              </Tooltip>
              <Tooltip title="بريد الجزائر">
                <img src="/ccp.png" alt="" height={30} className="mx-1" />
              </Tooltip>
              <Tooltip title="حوالة بنكية">
                <img src="/bank.png" alt="" height={30} className="mx-1" />
              </Tooltip>
              <Tooltip title="حوالة مالية">
                <img src="/cash.png" alt="" height={30} className="mx-1" />
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-inner">
            <div className="right-footer">
              <img src="img/logofoot.png" alt="" />
              <p className="text">© 2021-2022 Timlands جميع الحقوق محفوظة</p>
            </div>
            <div className="left-footer">
              <ul className="currency">
                <li>
                  <button type="button" className="rounded-button">
                    <FaGlobe /> العربية
                  </button>
                </li>
                <li className="rounded-button">
                  <Link href="/user/personalInformations">
                    <a className="rounded-button">
                      <FaDollarSign /> الدولار
                    </a>
                  </Link>
                </li>
              </ul>
              <ul className="socials">
                <li>
                  <a
                    href="https://www.tiktok.com/@timwoorkdotcom"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <FaTiktok />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.facebook.com/timWorkDotCom"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <FaFacebook />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/channel/UC9SRbfwKagfcaG5TYzi5Acg"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <FaYoutube />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/timwoorkdotcom/"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <FaInstagram />
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/timwoorkDotCom"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <FaTwitter />
                  </a>
                </li>
                <li>
                  <a
                    href="https://t.me/timwoork"
                    rel="noreferrer"
                    target="_blank"
                  >
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
