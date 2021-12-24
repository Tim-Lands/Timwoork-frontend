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
import { Menu, Dropdown, Badge, Tooltip } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import 'antd/dist/antd.min.css';
//import { isMobile } from 'react-device-detect';
import { ReactElement, useEffect, useState } from "react";
import Menus from "./Menus";
import Link from "next/link";
import ImageLogo from "next/image";
import logoIMG from '../../public/logo2.png'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { useCart } from "react-use-cart";
import { connect } from "react-redux";
import { logout } from "./../../store/auth/authActions";
import useSWR from 'swr'
import Cookies from 'js-cookie'

function Navbar(props: any): ReactElement {

    const token = Cookies.get('token')
    const [scroll, setScroll] = useState(false);
    const [isMenuShowen, setIsMenuShowen] = useState(true);
    const setIsMenuShowenHandle = () => {
        setIsMenuShowen(!isMenuShowen)
    }
    const { totalUniqueItems } = useCart();
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

    const isDarken = useSelector((state: any) => state.isDarken)

    const { data: userData }: any = useSWR(`api/me`)
    const AccountList = (
        <Menu>
            <Menu.Item key="0">
                <Link href="/myproducts">
                    <a>خدماتي</a>
                </Link>
            </Menu.Item>
            <Menu.Item key="0">
                <Link href="/user/profile">
                    <a>الصفحة الشخصية</a>
                </Link>
            </Menu.Item>
            {userData && (userData.user_details.profile.is_seller == 1) && (<Menu.Item key="7">
                <Link href="/add-new">
                    <a>إضافة خدمة جديدة</a>
                </Link>
            </Menu.Item>)}

            <Menu.Item key="1">
                <Link href="/Orders">
                    <a>الطلبات</a>
                </Link>
            </Menu.Item>
            <Menu.Item key="1">
                <Link href="/user/personalInformations">
                    <a>الإعدادات</a>
                </Link>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="3">
                <a onClick={props.logout}>
                    تسجيل الخروج
                </a>
            </Menu.Item>
        </Menu>
    )
    const myLoader = () => {
        return `${userData.user_details.profile.avatar}`;
    }
    return (
        <div className={"timlands-navbar-container" + (scroll ? ' is-shown' : '')}>
            <nav className="timlands-navbar">
                <div className="d-flex">
                    <div className="nav-container me-auto">
                        <div className="d-flex">
                            <div className="toggle-nav me-auto">
                                <button className="toggle-nav-btn" onClick={setIsMenuShowenHandle}>
                                    <span className="material-icons material-icons-outlined">menu</span>
                                </button>
                            </div>
                            <div className="logo-nav me-auto">
                                <Link href="/">
                                    <a>
                                        <ImageLogo src={logoIMG} />
                                    </a>
                                </Link>
                            </div>
                            {isMenuShowen && <Menus />}
                        </div>
                    </div>
                    <ul className="nav nav-auth ml-auto">

                        <li className="right-butts-icon">
                            <Tooltip placement="bottom" title='الوضع العادي والوضع الليلي'>
                                <motion.a whileTap={{ scale: 0.9 }}>
                                    <Badge count={0} offset={[2, -1]}>
                                        {isDarken ?
                                            <motion.i animate='visible' initial='hidden' variants={DarkIconvariants} className="material-icons material-icons-outlined">light_mode</motion.i>
                                            :
                                            <motion.i animate='visible' initial='hidden' variants={DarkIconvariants} className="material-icons material-icons-outlined">dark_mode</motion.i>
                                        }
                                    </Badge>
                                </motion.a>
                            </Tooltip>
                        </li>
                        {token ?
                            <>

                                {!userData &&
                                    <li className="nav-loading">
                                        <p className="loading-text">
                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> يرجى الإنتظار...
                                        </p>
                                    </li>
                                }
                                {userData &&
                                    <>
                                        <li className="right-butts-icon">
                                            <Tooltip placement="bottom" title='سلة المشتريات'>
                                                <Link href='/cart'>
                                                    <motion.a whileTap={{ scale: 0.9 }}>
                                                        <Badge count={totalUniqueItems} offset={[2, -1]}>
                                                            <i className="material-icons material-icons-outlined">shopping_cart</i>
                                                        </Badge>
                                                    </motion.a>
                                                </Link>
                                            </Tooltip>
                                        </li>
                                        <li className="right-butts-icon">
                                            <Tooltip placement="bottom" title='صندوق الرسائل'>
                                                <motion.a whileTap={{ scale: 0.9 }} className="">
                                                    <Badge count={userData && userData.msg_unread_count} offset={[2, -1]}>
                                                        <i className="material-icons material-icons-outlined">email</i>
                                                    </Badge>
                                                </motion.a>
                                            </Tooltip>
                                        </li>
                                        <li className="right-butts-icon">
                                            <Tooltip placement="bottom" title='الإشعارات'>
                                                <Link href="/notifications">
                                                    <a>
                                                        <Badge count={5} offset={[2, -1]}>
                                                            <i className="material-icons material-icons-outlined">notifications</i>
                                                        </Badge>
                                                    </a>
                                                </Link>
                                            </Tooltip>
                                        </li>
                                        <li className="login-user">
                                            <Dropdown overlay={AccountList} trigger={['click']}>
                                                <a>
                                                    {userData.user_details.profile.avatar == 'avatar.png' ?
                                                        <ImageLogo src="/avatar2.jpg" width={32} height={32} /> :
                                                        <ImageLogo
                                                            loader={myLoader}
                                                            src={userData.user_details.profile.avatar}
                                                            quality={60}
                                                            width={32}
                                                            height={32}
                                                            placeholder='blur'
                                                            blurDataURL='/avatar2.jpg'
                                                        />
                                                    }
                                                    <span className="text"> {userData.user_details.profile.last_name} </span><DownOutlined />
                                                </a>
                                            </Dropdown>
                                        </li>
                                    </>
                                }
                            </>
                            :
                            <>
                                <li className="login-nav-item">
                                    <Link href="/login">
                                        <a className="btn butt-xs flex-center">
                                            تسجيل الدخول
                                        </a>
                                    </Link>
                                </li>
                                <li className="register-nav-item">
                                    <Link href="/register">
                                        <a className="btn butt-sm butt-primary flex-center">
                                            <i className="material-icons material-icons-outlined">person_add_alt</i> التسجيل
                                        </a>
                                    </Link>
                                </li>

                            </>
                        }
                    </ul>
                </div>
            </nav>
            {/*<motion.nav transition={{ duration: 0.8 }} style={{ position: 'relative', zIndex: 500 }} initial={{ y: -90, opacity: 0 }} animate={(scroll ? { y: 0, opacity: 1 } : { y: -90, opacity: 0 })} className={'timlands-sub-navbar'}>
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
            </motion.nav>*/}
        </div>
    );
}
Navbar.propTypes = {
    setIsDarkenHandle: PropTypes.func,
    logout: PropTypes.func,
    isDarken: PropTypes.bool,
    userData: PropTypes.object
};
const mapStateToProps = (state: any) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Navbar);