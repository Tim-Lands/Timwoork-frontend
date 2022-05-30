import React, { ReactElement, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import useSWR from 'swr'

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
        href: '/tw-admin/users',
        hasSubMenu: [
            {
                id: 1,
                name: 'جميع المستخدمين',
                href: '/tw-admin/users'
            },
            {
                id: 2,
                name: 'المعلقة مؤقتا',
                href: '/tw-admin/users/suspondedstimer'
            },
            {
                id: 3,
                name: 'المعلقة دائما',
                href: '/tw-admin/users/suspondedspermanent'
            },
        ]
    },
    {
        id: 4,
        name: 'الخدمات',
        icon: 'collections_bookmark',
        href: '/tw-admin/posts',
        hasSubMenu: [
            {
                id: 1,
                name: 'جميع الخدمات',
                href: '/tw-admin/posts'
            },

            {
                id: 2,
                name: 'الخدمات النشطة',
                href: '/tw-admin/posts/activates'
            },
            {
                id: 4,
                name: 'الخدمات المرفوضة',
                href: '/tw-admin/posts/canceled'
            },
            {
                id: 5,
                name: 'الخدمات قيد الانتظار',
                href: '/tw-admin/posts/pendings'
            },

            {
                id: 7,
                name: 'الخدمات المؤرشفة',
                href: '/tw-admin/posts/archived'
            },
        ]
    },
    {
        id: 166,
        name: 'طلبات السحب',
        icon: 'assignment',
        href: '/tw-admin/withdrawables',
    },
    {
        id: 145,
        name: 'نشاطات المستخدمين',
        icon: 'event_repeat',
        href: null,
        hasSubMenu: [
            {
                id: 1,
                name: 'جميع الإشعارات',
                href: '/tw-admin/activities'
            },
            {
                id: 4,
                name: 'رسائل البائعين والمشتريين',
                href: '/tw-admin/activities/messages'
            },
            {
                id: 5,
                name: 'المعاملات المالية',
                href: '/tw-admin/activities/transfers'
            },
        ]
    },
    {
        id: 12,
        name: 'بوابات الدفع',
        icon: 'payments',
        href: '/tw-admin/payments',
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
        name: 'الرسائل',
        icon: 'email',
        href: null,
        hasSubMenu: [
            {
                id: 1,
                name: 'جميع الرسائل',
                href: '/tw-admin/contacts'
            },
            {
                id: 2,
                name: 'رسائل اتصل بنا',
                href: '/tw-admin/contacts/contactus'
            },
        ]
    },
]
function index(): ReactElement {
    const { data: userData }: any = useSWR(`dashboard/me`)
    const [showedMenues, setShowedMenues] = useState({})
    const submenu = true
    const path = useRouter()
    console.log(showedMenues)
    return (
        <div className={"dashboard-sidebar"}>
            {userData &&
                <div className="dashboard-sidebar-inner">

                    <ul className="dashboard-sidebar-list">
                        {sidebarLinks.map(e => {
                            return (
                                <>
                                    <li key={e.id} className={"dash-item" + (e.href == path.route ? ' active' : '')}>

                                        {
                                            e.hasSubMenu ?
                                                <a className="dash-link" onClick={() => setShowedMenues({ ...showedMenues, [e.id]: !showedMenues[e.id] })}>
                                                    <span className="material-icons material-icons-outlined">{e.icon}</span> {e.name}
                                                </a>
                                                :
                                                <Link href={e.href}>
                                                    <a className="dash-link" onClick={() => setShowedMenues({ ...showedMenues, [e.id]: !showedMenues[e.id] })}>
                                                        <span className="material-icons material-icons-outlined">{e.icon}</span> {e.name}
                                                    </a>
                                                </Link>
                                        }
                                        {
                                            (submenu && (e.hasSubMenu &&
                                                <motion.ul initial={{ opacity: 0, scaleY: 0 }} animate={{ opacity: 1, scaleY: 1 }} className="sub-dashnav-list">
                                                    {e.hasSubMenu.map(p => (
                                                        <li key={p.id} className={`subdash-item d-${showedMenues[e.id] ? 'block' : 'none'}` + (p.href == path.route ? ' active' : '')}>
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
                            )
                        })}
                    </ul>
                </div>
            }
        </div>
    )
}
export default index