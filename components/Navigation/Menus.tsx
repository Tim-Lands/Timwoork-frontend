import React, { useState, useRef } from 'react'
import Link from 'next/link'
import Explores from '../Explores'
import { motion } from 'framer-motion'
import { useOutsideAlerter } from '../useOutsideAlerter'
import { isMobile } from 'react-device-detect';
import router from 'next/router'

function Menus() {
    const [showExplore, setShowExplore] = useState(false)
    const setShowExploreHandle = () => {
        if (isMobile) {
            router.push('/category')
        } else {
            setShowExplore(!showExplore)
        }
    }
    const setHideExploreHandle = () => {
        setShowExplore(false)
    }
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, setHideExploreHandle);
    return (
        <ul className="nav app-navbar">
            <li className={showExplore && 'is-open'}>
                <a className="explore-butt" onClick={setShowExploreHandle} style={{
                    fontWeight: 600,
                    color: '#666',
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
                {showExplore && (
                    <motion.div ref={wrapperRef} initial={{ y: 90, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-explores">
                        <Explores />
                    </motion.div>
                )}
            </li>
            <li>
                <Link href="/products">
                    <a style={{
                        fontWeight: 600,
                        color: '#666',
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
                <Link href="">
                    <a style={{
                        fontWeight: 600,
                        color: '#666',
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
                <Link href="">
                    <a style={{
                        fontWeight: 600,
                        color: '#666',
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
