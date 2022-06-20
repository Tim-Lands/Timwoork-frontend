import Link from "next/link";
import React, { useEffect, useState, useContext } from "react";
import {
  FaTiktok,
  FaFacebook,
  FaYoutube,
  FaTwitter,
  FaInstagram,
  FaTelegram,
  FaGlobe,
} from "react-icons/fa";
import Currency from "@/components/NewIndex/DropdowModal/Currency";
import Language from "@/components/NewIndex/DropdowModal/Language";
import { Tooltip } from "antd";
import { LanguageContext } from "../../../contexts/languageContext/context";
import API from "../../../config";
import Cookies from "js-cookie";

function Footer() {
  const [isCurrencyVisible, setIsCurrencyVisible] = useState(false);
  const [isLanguageVisible, setIsLanguageVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const [currency, setCurrency]: any = useState({
    name: "Dollar",
    symbol: "$",
  });
  const { language, getSectionLanguage } = useContext(LanguageContext);
  const getLanguage = getSectionLanguage("main");
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const token = Cookies.get("token") || localStorage.getItem("token");
    API.get("api/me", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setCurrency(res?.data?.user_details?.profile?.currency);
      })
      .catch(() => {});
    const [categoriesRes, blogPostsRes, popularProductsRes] = await Promise.all(
      [
        API.get("api/top_main_categories"),
        API.get("https://timwoork.net/wp-json/wp/v2/posts?per_page=5"),
        API.get("api/filter?paginate=5&popular"),
      ]
    ).then((responses) => responses.map((res) => res?.data));
    setCategories(categoriesRes?.data);
    setBlogPosts(blogPostsRes);
    setPopularProducts(popularProductsRes?.data?.data);
  };
  return (
    <>
      {isCurrencyVisible && (
        <Currency
          currencies={currency}
          setIsConfirmText={setIsCurrencyVisible}
        />
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
                  <a>{getLanguage("Privacy_policy")}</a>
                </Link>
              </li>
              <li>
                <Link href="/terms">
                  <a>{getLanguage("Terms_of_use")}</a>
                </Link>
              </li>
              <li>
                <Link href="/about-us">
                  <a>{getLanguage("About_website")}</a>
                </Link>
              </li>
              <li>
                <Link href="/contactus">
                  <a>{getLanguage("Contact_us")}</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-item">
            <h3 className="title">التصنيفات النشطة</h3>
            <ul className="footerlist">
              {categories.map((category, index) => {
                if (index > 7) return;
                return (
                  <li key={category.id}>
                    <Link href={`/products?categoryID=${category?.id}`}>
                      {category[which(language)]}
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
              <p className="text">
                © 2021-2022 Timlands {getLanguage("All_rights_reserved")}
              </p>
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
                      {currency?.name + "   " + currency?.symbol}
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
    </>
  );
}
const which = (language) => {
  switch (language) {
    default:
      return "name_en";
    case "ar":
      return "name_ar";
    case "en":
      return "name_en";
  }
};
export default Footer;
