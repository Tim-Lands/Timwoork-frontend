/*
|--------------------------------------------------------------------------
| A collection of navbar components.
|--------------------------------------------------------------------------
|
| Use any one you like. Once you decided for one, you might want to consider
| deleting the others to keep you javascript bundle size as small as possible.
|
*/
import PropTypes from "prop-types";

import {ReactElement, useEffect, useState} from "react";
import Logo from "../Logo";
import Menus from "./Menus";
import Link from "next/link";
import { motion } from 'framer-motion'
 /**
 * A Link that can be displayed in the menu.
 * @param {object} props
 */
// The horizontal menu bar.

export function LangList(): ReactElement {

    return (
        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="list-lang-items">
            <ul className="items-list">
                <li className="lang-item">
                    <a className="lang-link">
                        English
                    </a>
                </li>
                <li className="lang-item">
                    <a className="lang-link">
                        العربية
                    </a>
                </li>
            </ul>
        </motion.div>
    )
}
export function Navbar({isDarken, setIsDarkenHandle}): ReactElement {
    const [scroll, setScroll] = useState(false);
    useEffect(() => {
      window.addEventListener("scroll", () => {
        setScroll(window.scrollY > 60);
      });
    }, []); 
    const DarkIconvariants = {
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.41 },
        },
        hidden: {
            opacity: 0,
            y: 80,
            transition: { duration: 0.41 },
        },
      }
    const [showLang, setShowLang] = useState(false)
    const setShowLangHandle = () => {
        setShowLang(!showLang)
    } 
    return (
        <div className={"timlands-navbar-container" + (scroll ? ' is-shown' : '')}>
            <nav className="timlands-navbar">
                <div className="d-flex">
                    <div className="nav-container me-auto">
                        <div className="d-flex">
                            <div className="logo-nav me-auto">
                                <Logo />
                            </div>
                            <Menus />
                        </div>
                    </div>
                    <ul className="nav nav-auth ml-auto">
                        <li className="circular-item language-nav-item">
                            <motion.button whileTap={{ scale: 0.9 }} onClick={setShowLangHandle} className="language-nav-butt circular-center">
                                <i className="material-icons">language</i>
                            </motion.button>
                            {showLang && <LangList />}
                        </li>
                        <li className="login-nav-item">
                            <a href="/user/login">
                                تسجيل الدخول
                            </a>
                        </li>
                        <li className="register-nav-item">
                            <Link href="">
                                <a className="btn butt-sm butt-primary flex-center">
                                    <i className="material-icons material-icons-outlined">person_add_alt</i> التسجيل
                                </a>
                            </Link>
                        </li>
                        <li className="circular-item">
                            <motion.button whileTap={{ scale: 0.9 }} onClick={setIsDarkenHandle} className="language-nav-butt circular-center">
                            {isDarken ? 
                                <motion.i animate='visible' initial='hidden' variants={DarkIconvariants} className="material-icons material-icons-outlined">light_mode</motion.i> 
                                : 
                                <motion.i animate='visible' initial='hidden' variants={DarkIconvariants} className="material-icons material-icons-outlined">dark_mode</motion.i>
                            }
                            </motion.button>
                        </li>
                    </ul>
                </div>
            </nav>
            <motion.nav transition={{ duration: 0.8 }} style={{ position: 'relative', zIndex: 500 }} initial={{ y: -90, opacity: 0 }} animate={(scroll ? { y: 0, opacity: 1 } : { y: -90, opacity: 0 })} className={'timlands-sub-navbar'}>
                <ul className="nav sub-navbar-cats">
                    <li className="category-title">التصنيفات الشائعة</li>
                    <li className="category-item active">
                        <Link href="">
                            <a className="category-link">التصميم الغرافيكي</a>
                        </Link>
                    </li>
                    <li className="category-item">
                        <Link href="">
                            <a className="category-link">التسويق الرقمي</a>
                        </Link>
                    </li>
                    <li className="category-item">
                        <Link href="">
                            <a className="category-link">الكتابة والترجمة</a>
                        </Link>
                    </li>
                    <li className="category-item">
                        <Link href="">
                            <a className="category-link">الفيديوهات والحركات</a>
                        </Link>
                    </li>
                    <li className="category-item">
                        <Link href="">
                            <a className="category-link">برمجة وتقنيات</a>
                        </Link>
                    </li>
                    <li className="category-item">
                        <Link href="">
                            <a className="category-link">إدارة أعمال</a>
                        </Link>
                    </li>
                </ul>
            </motion.nav>
        </div>
    );
}
Navbar.propTypes = {
    setIsDarkenHandle: PropTypes.func,
    isDarken: PropTypes.bool,
};