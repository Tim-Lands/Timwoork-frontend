import PropTypes from "prop-types";
import { Menu, Dropdown, Badge, Tooltip, message } from 'antd';
import { DownOutlined } from '@ant-design/icons';
//import { isMobile } from 'react-device-detect';
import { ReactElement, useState } from "react";
import Menus from "./Menus";
import Link from "next/link";
import ImageLogo from "next/image";
import logoIMG from '../../public/logo.png'
import { motion } from 'framer-motion'
import API from '../../config'
import { connect } from "react-redux";
import { logout } from "./../../store/auth/authActions";
import useSWR from 'swr'
import Cookies from 'js-cookie'
import router from "next/router";

function Navbar(props: any): ReactElement {
    const token = Cookies.get('token')
    const { data: userInfo }: any = useSWR('api/me')

    //store username, email & userID in Cookies just for chat
    if(token){
        const email = userInfo && userInfo.user_details.email;
        const username = userInfo && userInfo.user_details.username;
        const userID = userInfo && userInfo.user_details.id;
        Cookies.set('_email', email)
        Cookies.set('_username', username)
        Cookies.set('_userID', userID)

    }
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
    const [darkLoading, setSarkLoading] = useState(false)
    async function darkModeToggle() {
        setSarkLoading(true)
        try {
            const res = await API.post("api/mode", null, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            // Authentication was successful.
            if (res.status === 200) {
                router.reload()
                setSarkLoading(false)
            }
        } catch (error: any) {
            message.error('حدث خطأ غير متوقع')
            setSarkLoading(false)
        }
    }
    const { data: userData }: any = useSWR(`api/me`)
    const AccountList = (
        <Menu>
            <Menu.Item key="0">
                <Link href="/user/profile">
                    <a>الصفحة الشخصية</a>
                </Link>
            </Menu.Item>
            {userData && (userData.user_details.profile.is_seller == 1) && (<Menu.Item key="0">
                <Link href="/myproducts">
                    <a>خدماتي</a>
                </Link>
            </Menu.Item>)}
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
    const darkMode = userData && userData.user_details.profile.dark_mode
    return (
        <div className={"timlands-navbar-container"} style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 999,
        }}>
            <nav className="timlands-navbar" style={{
                backgroundColor: !darkMode ? '#fff' : '#212121',
                paddingBlock: 7,
                paddingInline: 19,
                position: 'relative',
                zIndex: 600
            }}>
                <div className="d-flex">
                    <div className="nav-container me-auto">
                        <div className="d-flex" style={{
                            alignContent: 'center',
                            alignItems: 'center'
                        }}>
                            <div className="toggle-nav me-auto">
                                <button className="toggle-nav-btn" onClick={setIsMenuShowenHandle} style={{
                                    display: 'flex',
                                    width: 35,
                                    height: 35,
                                    backgroundColor: 'transparent',
                                    color: !darkMode ? '#999' : '#333',
                                    alignItems: 'center',
                                    alignContent: 'center',
                                    justifyContent: 'center',
                                    borderWidth: 0,
                                }}>
                                    <span className="material-icons material-icons-outlined">menu</span>
                                </button>
                            </div>
                            <div className="logo-nav me-auto" style={{ display: 'flex' }}>
                                <Link href="/">
                                    <a>
                                        <ImageLogo src={logoIMG} />
                                    </a>
                                </Link>
                            </div>
                            {isMenuShowen && <Menus darkMode={darkMode} />}
                        </div>
                    </div>
                    <ul className="nav nav-auth ml-auto" style={{
                        alignItems: 'center',
                        alignContent: 'center'
                    }}>
                        {token ?
                            <>
                                {!userData &&
                                    <li className="nav-loading" style={{
                                        display: 'flex',
                                        alignContent: 'center',
                                        alignItems: 'center',
                                        margin: 0
                                    }}>
                                        <p className="loading-text" style={{
                                            fontSize: 13,
                                            fontWeight: 'bold',
                                            color: !darkMode ? '#666' : '#ddd',
                                            margin: 0
                                        }}>
                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> يرجى الإنتظار...
                                        </p>
                                    </li>
                                }
                                {userData &&
                                    <>
                                        <li
                                            className="right-butts-icon"
                                            style={{
                                                opacity: (darkLoading ? 0.5 : 1),
                                                display: 'flex',
                                                alignItems: 'center',
                                                alignContent: 'center',
                                                marginTop: 4
                                            }}
                                        >
                                            <Tooltip placement="bottom" title='الوضع العادي والوضع الليلي'>
                                                <motion.a onClick={darkModeToggle} whileTap={{ scale: 0.9 }} style={{
                                                    display: 'flex',
                                                    alignContent: 'center',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    alignSelf: 'center',
                                                    color: !darkMode ? '#777' : '#ddd',
                                                    height: 40,
                                                    width: 40,
                                                }}>
                                                    <Badge count={0} offset={[2, -1]}>
                                                        {userData.user_details.profile.dark_mode == 1 ?
                                                            <motion.i animate='visible' initial='hidden' variants={DarkIconvariants} className="material-icons material-icons-outlined">light_mode</motion.i>
                                                            :
                                                            <motion.i animate='visible' initial='hidden' variants={DarkIconvariants} className="material-icons material-icons-outlined">dark_mode</motion.i>
                                                        }
                                                    </Badge>
                                                </motion.a>
                                            </Tooltip>
                                        </li>
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
                                <li className="register-nav-item" style={{ padding: 7 }}>
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
            </nav >
        </div >
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