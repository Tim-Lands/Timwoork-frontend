import React, { ReactElement } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { connect } from "react-redux";
import { logout } from "../../../store/auth/authActions";

const sidebarLinks = [
    {
        id: 1,
        name: 'الرئيسية',
        icon: 'dashboard',
        href: '/dashboard'
    },
    {
        id: 3,
        name: 'إدارة المستخدمين',
        icon: 'people',
        href: '/dashboard/users'
    },
    {
        id: 4,
        name: 'الخدمات',
        icon: 'collections_bookmark',
        href: '/dashboard/posts',
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
                href: '/dashboard/cms/Badges'
            },
            {
                id: 2,
                name: 'المستويات',
                href: '/dashboard/cms/Levels'
            },
            {
                id: 3,
                name: 'إدارة التصنيفات',
                href: '/dashboard/cms/categories'
            },
            {
                id: 4,
                name: 'الوسوم',
                href: '/dashboard/cms/tags'
            },
            {
                id: 5,
                name: 'البلدان',
                href: '/dashboard/cms/countries'
            },
            {
                id: 6,
                name: 'المهارات',
                href: '/dashboard/cms/skills'
            },
            {
                id: 7,
                name: 'اللغات',
                href: '/dashboard/cms/languages'
            },
        ]
    },
    {
        id: 9,
        name: 'رسائل اتصل بنا',
        icon: 'email',
        href: '/dashboard/contacts'
    },
]
function index(props: any): ReactElement {
    const submenu = true
    const path = useRouter()
    if (props.userData) {
        return (
            <div className={"dashboard-sidebar"}>
                <div className="dashboard-sidebar-inner">
                    <Link href="/">
                        <a>الرئيسية</a>
                    </Link>
                    <div className="dashbord-user-details">
                        <div className="dashbord-user-avatar">
                            {props.userData.profile.avatar == 'avatar.png' ? <img src="/avatar.png" alt="" /> : <img src={props.userData.profile.avatar} alt="" />}
                            
                        </div>
                        <div className="dashbord-user-content">
                            <h3 className="user-title">
                                {props.userData.profile.first_name + ' ' + props.userData.profile.last_name}
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
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.registerLoading,
});

export default connect(mapStateToProps, { logout })(index);