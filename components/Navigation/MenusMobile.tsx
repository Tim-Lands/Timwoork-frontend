import React from 'react'
import Link from 'next/link'
import PropTypes from "prop-types";

function Menus({ darkMode }) {
    return (
        <ul className="nav app-navbar is-mobile">
            <li>
                <Link href="/category">
                    <a className="explore-butt" style={{
                        fontWeight: 600,
                        color: !darkMode ? '#666' : '#f1f1f1',
                        display: 'flex',
                        paddingInline: 17,
                        paddingBlock: 0,
                        fontSize: 14,
                        height: 50,
                        alignItems: 'center',
                        alignContent: 'center'
                    }}>
                        <i className="material-icons material-icons-outlined">chrome_reader_mode</i> التصنيفات <i className="fa fa-angle-down"></i>
                    </a>
                </Link>
            </li>
            <li>
                <Link href="/products">
                    <a style={{
                        fontWeight: 600,
                        color: !darkMode ? '#666' : '#f1f1f1',
                        display: 'flex',
                        paddingInline: 17,
                        paddingBlock: 0,
                        fontSize: 14,
                        height: 50,
                        alignItems: 'center',
                        alignContent: 'center'
                    }}>
                        <i className="material-icons material-icons-outlined">table_view</i> تصفح جميع الخدمات
                    </a>
                </Link>
            </li>
            <li>
                <Link href="/blog">
                    <a style={{
                        fontWeight: 600,
                        color: !darkMode ? '#666' : '#f1f1f1',
                        display: 'flex',
                        paddingInline: 17,
                        paddingBlock: 0,
                        fontSize: 14,
                        height: 50,
                        alignItems: 'center',
                        alignContent: 'center'
                    }}>
                        <i className="material-icons material-icons-outlined">article</i> المدونة
                    </a>
                </Link>
            </li>
            <li>
                <Link href="/community">
                    <a style={{
                        fontWeight: 600,
                        color: !darkMode ? '#666' : '#f1f1f1',
                        display: 'flex',
                        paddingInline: 17,
                        paddingBlock: 0,
                        fontSize: 14,
                        height: 50,
                        alignItems: 'center',
                        alignContent: 'center'
                    }}>
                        <i className="material-icons material-icons-outlined">forum</i> مجتمع تيم ورك
                    </a>
                </Link>
            </li>
        </ul>
    )
}

export default Menus
Menus.propTypes = {
    darkMode: PropTypes.any,
}