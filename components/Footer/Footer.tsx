import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  FaTiktok,
  FaFacebook,
  FaYoutube,
  FaTwitter,
  FaInstagram,
  FaTelegram,
} from "react-icons/fa";
import Language from "@/components/DropdowModal/Language";
import { Tooltip } from "antd";
import { BlogActions } from "@/store/blog/blogActions";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

function Footer() {
  const dispatch = useAppDispatch();
  const {
    products: { popular },
    blog: { footer },
    user: { isLogged },
    currency: { my: currency },
    categories: { main: categories },
  } = useAppSelector((state) => state);
  useEffect(() => {
    if (!footer.loaded) dispatch(BlogActions.getFooterData({ per_page: 5 }));
  }, [footer]);
  const [isLanguageVisible, setIsLanguageVisible] = useState(false);
  const { getAll } = useAppSelector((state) => state.languages);

  return (
    <>
      {isLanguageVisible && (
        <Language setIsConfirmText={setIsLanguageVisible} />
      )}
      <div className="footer-inner">
        <div className=" footer-cont">
          <div className="footer-item">
            <h3 className="title">{getAll("Websites’_links")}</h3>
            <ul className="footerlist">
              <li>
                <Link href="/privacy">
                  <a>{getAll("Privacy_policy")}</a>
                </Link>
              </li>
              <li>
                <Link href="/terms">
                  <a>{getAll("Terms_of_use")}</a>
                </Link>
              </li>
              <li>
                <Link href="/about-us">
                  <a>{getAll("About_website")}</a>
                </Link>
              </li>
              <li>
                <Link href="/contactus">
                  <a>{getAll("Contact_us")}</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-item">
            <h3 className="title">{getAll("Active_Categories")}</h3>
            <ul className="footerlist">
              {categories.map((category, index) => {
                if (index > 7) return;
                return (
                  <li key={category.id}>
                    <Link href={`/products?categoryID=${category?.id}`}>
                      {category.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="footer-item">
            <h3 className="title">{getAll("Most_popular_services")}</h3>
            <ul className="footerlist">
              {popular.data.map((product, index) => {
                if (index > 4) return;
                return (
                  <li key={product.id} style={{ width: 350 }}>
                    <Link href={`/p/${product.id}`}>
                      <a className="text-truncate">{product.title}</a>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="footer-item">
            <h3 className="title">{getAll("Blog")}</h3>
            <ul className="footerlist">
              {footer.data.map((post) => (
                <li key={post.id} style={{ width: 350 }}>
                  <Link href={`/blog/${post.slug}`}>
                    <a className="text-truncate">{post.title.rendered}</a>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="payments-me">
              <h4 className="title">{getAll("Payment_methods")}</h4>
              <Tooltip title={getAll("Visa")}>
                <img src="/png1.png" alt="" height={38} className="mx-1" />
              </Tooltip>
              <Tooltip title={getAll("Mastercard")}>
                <img src="/png2.png" alt="" height={38} className="mx-1" />
              </Tooltip>
              <Tooltip title={getAll("PayPal")}>
                <img src="/png4.png" alt="" height={38} className="mx-1" />
              </Tooltip>
            </div>
            <div className="payments-me mt-2">
              <h4 className="title">{getAll("Withdrawl_methods")}</h4>
              <Tooltip title={getAll("Western_Union")}>
                <img src="/western.png" alt="" height={38} className="mx-1" />
              </Tooltip>
              <Tooltip title={getAll("Wise")}>
                <img src="/png3.png" alt="" height={30} className="mx-1" />
              </Tooltip>
              <Tooltip title={getAll("Algery_Post")}>
                <img src="/ccp.png" alt="" height={30} className="mx-1" />
              </Tooltip>
              <Tooltip title={getAll("Bank_transfer")}>
                <img src="/bank.png" alt="" height={30} className="mx-1" />
              </Tooltip>
              <Tooltip title={getAll("Money_order")}>
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
                © 2021-2022 Timlands {getAll("All_rights_reserved")}
              </p>
            </div>
            <div className="left-footer">
              <ul className="currency">
                {/* <li>
                  <button type="button" className="rounded-button">
                    <FaGlobe /> العربية
                  </button>
                </li> */}
                <li className="rounded-button">
                  <Link
                    href={isLogged ? `/user/personalInformations` : "/login"}
                  >
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

export default Footer;
