import React, { ReactElement } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'

const sidebarLinks = [
    {
        id: 1,
        name: 'الرئيسية',
        icon: 'dashboard',
        href: '/dashboard'
    },
    {
        id: 2,
        name: 'الأدوار والصلاحيات',
        icon: 'rule',
        href: '/dashboard/roles'
    },
    {
        id: 3,
        name: 'إدارة المستخدمين',
        icon: 'people',
        href: '/dashboard/users'
    },
    {
        id: 4,
        name: 'الخدمات والمنتجات',
        icon: 'collections_bookmark',
        href: '/dashboard/posts',
        hasSubMenu: [
            {
                id: 1,
                name: 'إدارة الخدمات',
                href: '/dashboard/posts'
            },
            {
                id: 2,
                name: 'إدارة التصنيفات',
                href: '/dashboard/posts/categories'
            },
        ]
    },
    {
        id: 5,
        name: 'إدارة طرق الدفع',
        icon: 'credit_score',
        href: '/dashboard/payments'
    },
    {
        id: 6,
        name: 'إدارة المحتوى',
        icon: 'event_note',
        href: '/dashboard/constants',
        hasSubMenu: [
            {
                id: 1,
                name: 'الصفحات',
                href: '/dashboard/constants/pages'
            },
            {
                id: 2,
                name: 'العمولات',
                href: '/dashboard/constants/tax'
            },
        ]
    },
    {
        id: 7,
        name: 'الشارات والمستويات',
        icon: 'local_police',
        href: '/dashboard/BadgesAndLevels/Badges',
        hasSubMenu: [
            {
                id: 1,
                name: 'الشارات',
                href: '/dashboard/BadgesAndLevels/Badges'
            },
            {
                id: 2,
                name: 'المستويات',
                href: '/dashboard/BadgesAndLevels/Levels'
            },
        ]
    },
    {
        id: 8,
        name: 'الوسوم',
        icon: 'tag',
        href: '/dashboard/tags'
    },
    {
        id: 9,
        name: 'رسائل اتصل بنا',
        icon: 'email',
        href: '/dashboard/contacts'
    },
]
function index(): ReactElement {
    const submenu = true
    const path = useRouter()
    return (
        <div className={"dashboard-sidebar"}>
            <div className="dashboard-sidebar-inner">
                <div className="dashbord-user-details">
                    <div className="dashbord-user-avatar">
                        <img src="/avatar.png" alt="" />
                    </div>
                    <div className="dashbord-user-content">
                        <h3 className="user-title">عبد الحميد بومقواس</h3>
                        <ul className="meta">
                            <li>
                                <a >
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
                                <Link href={e.href}>
                                    <a className="dash-link">
                                        <span className="material-icons material-icons-outlined">{e.icon}</span> {e.name}
                                    </a>
                                </Link>
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

export default index
