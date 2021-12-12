import React, { useState, useRef } from 'react'
import Link from 'next/link'
import Explores from '../Explores'
import { motion } from 'framer-motion'
import { useOutsideAlerter } from '../useOutsideAlerter'

function Menus() {
    const [showExplore, setShowExplore] = useState(false)
    const setShowExploreHandle = () => {
        setShowExplore(!showExplore)
    }
    const setHideExploreHandle = () => {
        setShowExplore(false)
    }
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, setHideExploreHandle);
    return (
        <ul className="nav app-navbar">
            <li className={showExplore && 'is-open'}>
                <a className="explore-butt" onClick={setShowExploreHandle}>
                    <i className="material-icons material-icons-outlined">chrome_reader_mode</i> التصنفات <i className="fa fa-angle-down"></i>
                </a>
                {showExplore && (
                    <motion.div ref={wrapperRef} initial={{ y: 90, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-explores">
                        <Explores />
                    </motion.div>
                )}
            </li>
            <li>
                <Link href="">
                    <a>
                        <i className="material-icons material-icons-outlined">question_answer</i> المجتمع
                    </a>
                </Link>
            </li>
            <li>
                <Link href="/products">
                    <a>
                        <i className="material-icons material-icons-outlined">table_view</i> تصفح جميع الخدمات
                    </a>
                </Link>
            </li>
            <li>
                <Link href="">
                    <a>
                        <i className="material-icons material-icons-outlined">article</i> المدونة
                    </a>
                </Link>
            </li>
        </ul>
    )
}

export default Menus
