import PropTypes from "prop-types";
import { Menu, Dropdown, Badge, Tooltip } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import 'antd/dist/antd.min.css';
//import { isMobile } from 'react-device-detect';
import { ReactElement, useState } from "react";
import Menus from "./Menus";
import Link from "next/link";
import ImageLogo from "next/image";
import logoIMG from '../../public/logo2.png'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { connect } from "react-redux";
import { logout } from "./../../store/auth/authActions";
import useSWR from 'swr'
import Cookies from 'js-cookie'

function Navbar(props: any): ReactElement {
    const token = Cookies.get('token')
    const [isMenuShowen, setIsMenuShowen] = useState(true);
    const setIsMenuShowenHandle = () => {
        setIsMenuShowen(!isMenuShowen)
    }
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
            {userData && (userData.user_details.profile.is_seller == 1) && (<Menu.Item key="0">
                <Link href="/myproducts">
                    <a>خدماتي</a>
                </Link>
            </Menu.Item>)}
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
                <Link href="/mypurchases">
                    <a>مشترياتي</a>
                </Link>
            </Menu.Item>
            {userData && (userData.user_details.profile.is_seller == 1) && (
                <Menu.Item key="43">
                    <Link href="/mysales">
                        <a>مبيعاتي</a>
                    </Link>
                </Menu.Item>)}
            <Menu.Item key="14">
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
        <div className={"timlands-navbar-container"}>
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
                                                        <Badge count={userData && userData.cart_items_count} offset={[2, -1]}>
                                                            <i className="material-icons material-icons-outlined">shopping_cart</i>
                                                        </Badge>
                                                    </motion.a>
                                                </Link>
                                            </Tooltip>
                                        </li>
                                        <li className="right-butts-icon">
                                            <Tooltip placement="bottom" title='صندوق الرسائل'>
                                                <Link href='/chat'>
                                                    <motion.a whileTap={{ scale: 0.9 }}>
                                                        <Badge count={userData && userData.msg_unread_count} offset={[2, -1]}>
                                                            <i className="material-icons material-icons-outlined">email</i>
                                                        </Badge>
                                                    </motion.a>
                                                </Link>
                                            </Tooltip>
                                        </li>
                                        <li className="right-butts-icon">
                                            <Tooltip placement="bottom" title='الإشعارات'>
                                                <Link href="/notifications">
                                                    <a>
                                                        <Badge count={userData && userData.unread_notifications_count} offset={[2, -1]}>
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