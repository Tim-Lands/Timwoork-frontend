import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion'
function Community() {
    return (
        <motion.div initial={{ y: 100, opacity: 0, rotate: 10 }} animate={{ y: 0, opacity: 1, rotate: 0 }} className='nav-menu-dropdown'>
            <ul className="menu-list-dropdown">
                <li>
                    <Link href={`/`}>
                        <a className='dropd-item'>
                            <div className="dropd-item-img">
                                <span className='icon-item link-circular-button'>
                                    <span className="material-icons material-icons-outlined">shopping_cart</span>
                                </span>
                            </div>
                            <div className="dropd-item-content">
                                <h4 className="title">المسابقات</h4>
                                <p className="text">هذا النص شرح للرابط</p>
                            </div>
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href={`/`}>
                        <a className='dropd-item'>
                            <div className="dropd-item-img">
                                <span className='icon-item link-circular-button'>
                                    <span className="material-icons material-icons-outlined">shopping_cart</span>
                                </span>
                            </div>
                            <div className="dropd-item-content">
                                <h4 className="title">المسابقات</h4>
                                <p className="text">هذا النص شرح للرابط</p>
                            </div>
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href={`/`}>
                        <a className='dropd-item'>
                            <div className="dropd-item-img">
                                <span className='icon-item link-circular-button'>
                                    <span className="material-icons material-icons-outlined">shopping_cart</span>
                                </span>
                            </div>
                            <div className="dropd-item-content">
                                <h4 className="title">المسابقات</h4>
                                <p className="text">هذا النص شرح للرابط</p>
                            </div>
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href={`/`}>
                        <a className='dropd-item'>
                            <div className="dropd-item-img">
                                <span className='icon-item link-circular-button'>
                                    <span className="material-icons material-icons-outlined">shopping_cart</span>
                                </span>
                            </div>
                            <div className="dropd-item-content">
                                <h4 className="title">المسابقات</h4>
                                <p className="text">هذا النص شرح للرابط</p>
                            </div>
                        </a>
                    </Link>
                </li>
            </ul>
        </motion.div>
    )
}

export default Community