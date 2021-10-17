import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
const sidebarLinks = [
    {
        id: 1,
        name: 'Dashboard',
        icon: 'dashboard',
        href: '/dashboard/test'
    },
    {
        id: 2,
        name: 'Roles & Permisions',
        icon: 'rule',
        href: '/dashboard/roles'
    },
    {
        id: 3,
        name: 'Users Gestion',
        icon: 'people',
        href: '/dashboard/users'
    },
    {
        id: 4,
        name: 'Posts & Categories',
        icon: 'collections_bookmark',
        href: '/dashboard/posts',
        hasSubMenu: [
            {
                id: 1,
                name: 'Posts',
                href: '/dashboard/posts'
            },
            {
                id: 2,
                name: 'Categories',
                href: '/dashboard/posts/category'
            },
        ]
    },
    {
        id: 5,
        name: 'Payments Method',
        icon: 'credit_score',
        href: '/dashboard/payments'
    },
    {
        id: 6,
        name: 'System Constants',
        icon: 'event_note',
        href: '/dashboard/constants',
        hasSubMenu: [
            {
                id: 1,
                name: 'Pages',
                href: '/dashboard/constants/pages'
            },
            {
                id: 2,
                name: 'Tax Edit',
                href: '/dashboard/constants/tax'
            },
        ]
    },
    {
        id: 7,
        name: 'Badges & Levels',
        icon: 'local_police',
        href: '/dashboard/BadgesAndLevels/Badges',
        hasSubMenu: [
            {
                id: 1,
                name: 'Badges',
                href: '/dashboard/BadgesAndLevels/Badges'
            },
            {
                id: 2,
                name: 'Levels',
                href: '/dashboard/BadgesAndLevels/Levels'
            },
        ]
    },
    {
        id: 8,
        name: 'Contact us',
        icon: 'email',
        href: '/dashboard/contacts'
    },
]
function index() {
    const path = useRouter()
    return (
        <div className="dashboard-sidebar">
            <div className="dashboard-sidebar-inner">
                <div className="dashbord-logo">
                    <img src="/logo.png" alt="" />
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
                                {e.hasSubMenu &&
                                    <ul className="sub-dashnav-list">
                                        {e.hasSubMenu.map(p => (
                                            <li key={p.id} className={"subdash-item" + (p.href == path.route ? ' active' : '')}>
                                                <Link href={p.href}>
                                                    <a className="subdash-link">
                                                        {p.name}
                                                    </a>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
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
