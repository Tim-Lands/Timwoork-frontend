import React, { ReactElement } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { connect } from "react-redux";
import { logout } from "../../../store/auth/authActions";
import useSWR from 'swr'
import { message } from 'antd';

const sidebarLinks = [
    {
        id: 1,
        name: 'الرئيسية',
        icon: 'dashboard',
        href: '/tw-admin'
    },
    {
        id: 3,
        name: 'إدارة المستخدمين',
        icon: 'people',
        href: '/tw-admin/users'
    },
    {
        id: 4,
        name: 'الخدمات',
        icon: 'collections_bookmark',
        href: '/tw-admin/posts',
    },
    {
        id: 6,
        name: 'إدارة المحتوى',
        icon: 'event_note',
        href: null,
        hasSubMenu: [
            {
                id: 1,
                name: 'الشارات',
                href: '/tw-admin/cms/Badges'
            },
            {
                id: 2,
                name: 'المستويات',
                href: '/tw-admin/cms/Levels'
            },
            {
                id: 3,
                name: 'إدارة التصنيفات',
                href: '/tw-admin/cms/categories'
            },
            {
                id: 4,
                name: 'الوسوم',
                href: '/tw-admin/cms/tags'
            },
            {
                id: 5,
                name: 'البلدان',
                href: '/tw-admin/cms/countries'
            },
            {
                id: 6,
                name: 'المهارات',
                href: '/tw-admin/cms/skills'
            },
            {
                id: 7,
                name: 'اللغات',
                href: '/tw-admin/cms/languages'
            },
        ]
    },
    {
        id: 9,
        name: 'رسائل اتصل بنا',
        icon: 'email',
        href: '/tw-admin/contacts'
    },
]
function index(): ReactElement {
    const { data: userData, error }: any = useSWR(`dashboard/me`)
    const submenu = true
    const path = useRouter()
    return (
        <div className={"dashboard-sidebar"}>
            {error && message.error('للأسف لم يتم جلب معلومات المستخدم')}
            {userData &&
                <div className="dashboard-sidebar-inner">
                    {/*userData.user_details.profile &&
                        <div className="dashbord-user-details">
                            <Link href={`/u/${userData.user_details.username}`}>
                                <a className="dashbord-user-avatar">
                                    {userData.user_details.profile.avatar_url == 'avatar.png' ?
                                        <ImageLogo src="/avatar2.jpg" width={30} height={30} /> :
                                        <ImageLogo
                                            loader={myLoader}
                                            src={userData.user_details.profile.avatar_url}
                                            quality={60}
                                            width={30}
                                            height={30}
                                            placeholder='blur'
                                            blurDataURL='/avatar2.jpg'
                                        />
                                    }
                                </a>
                            </Link>
                            <div className="dashbord-user-content">
                                <h3 className="user-title">
                                    <Link href={`/u/${userData.user_details.username}`}>
                                        <a className="dashbord-user-avatar">
                                            {userData.user_details.profile.first_name + ' ' + userData.user_details.profile.last_name}
                                        </a>
                                    </Link>
                                </h3>
                                <ul className="meta">
                                    <li>
                                        <a onClick={() => {
                                            props.logout();
                                        }}>
                                            <span className="material-icons">logout</span> خروج
                                        </a>
                                    </li>
                                    <li>
                                        <Link href="/dashboard/settings">
                                            <a>
                                                <span className="material-icons">settings</span> الإعدادات
                                            </a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                                    */}

                    <ul className="dashboard-sidebar-list">
                        {sidebarLinks.map(e => (
                            <>
                                <li key={e.id} className={"dash-item" + (e.href == path.route ? ' active' : '')}>

                                    {(e.href == null) ?
                                        <a className="dash-link">
                                            <span className="material-icons material-icons-outlined">{e.icon}</span> {e.name}
                                        </a>
                                        :
                                        <Link href={e.href}>
                                            <a className="dash-link">
                                                <span className="material-icons material-icons-outlined">{e.icon}</span> {e.name}
                                            </a>
                                        </Link>
                                    }
                                    {
                                        (submenu && (e.hasSubMenu &&
                                            <motion.ul initial={{ opacity: 0, scaleY: 0 }} animate={{ opacity: 1, scaleY: 1 }} className="sub-dashnav-list">
                                                {e.hasSubMenu.map(p => (
                                                    <li key={p.id} className={"subdash-item" + (p.href == path.route ? ' active' : '')}>
                                                        <Link href={p.href}>
                                                            <a className="subdash-link">
                                                                {p.name}
                                                            </a>
                                                        </Link>
                                                    </li>
                                                ))}
                                            </motion.ul>
                                        ))
                                    }
                                </li>
                            </>
                        ))}
                    </ul>
                </div>
            }
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(index);